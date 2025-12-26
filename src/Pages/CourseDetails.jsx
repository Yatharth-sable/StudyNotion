import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operation/studentFeatureAPI";
import { fetchCourseDetails } from "../services/operation/courseDetailsApi";
import GetAvgRating from "../utils/avgRating";
import ConfirmationModal from "../components/common/ConfirmationModal";
import Error from "./Error";
import RatingStars from "../components/common/RatingStars";
import { formatDate } from "./../services/formatDate";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { TiInfoLarge } from "react-icons/ti";
import { MdKeyboardArrowDown } from "react-icons/md";
import formatTime from "../utils/formateTime";

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { paymentLoading } = useSelector((state) => state.course);
  const { loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState();
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState();
  
  const [isActive, setIsActive] = useState(Array(0));


  useEffect(() => {
    let lectures = 0;
    courseData?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [courseData]);

  useEffect(() => {
    const count = GetAvgRating(courseData?.courseDetails.ratingAndReviews);
    setAvgReviewCount(count);
  }, [courseData]);

  useEffect(() => {
    const getFullCourseDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        setCourseData(result);
      } catch (err) {
        console.log("Could not fetch coursedetails in course");
      }
    };
    getFullCourseDetails();
  }, [courseId]);

  if (loading || !courseData) {
    return <div>Loading...</div>;
  }

  if (!courseData.success) {
    return (
      <div>
        <Error></Error>
      </div>
    );
  }

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not Loggedin",
      text2: "Please Login to Purchase the course",
      btntext1: "Login",
      btntext2: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e != id)
    );
  };

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
  } = courseData?.courseDetails;


  return (
    <div className="flex flex-col  text-white relative ">
      {/* section1 */}

      <div className="bg-richblack-800 relative pl-16 p-6 shadow-lg flex flex-col gap-4">
        {/* Course Name */}
        <p className="text-3xl font-semibold text-richblack-25">{courseName}</p>

        {/* Course Description */}
        <p className="text-richblack-200  text-base leading-relaxed">
          {courseDescription}
        </p>

        {/* Ratings & Reviews */}
        <div className="flex items-center gap-3 text-richblack-100">
          <span className="text-yellow-50 font-medium">{avgReviewCount}</span>
          <RatingStars rating={Number(avgReviewCount) || 0} size={24} />
          <span className="text-sm">{`(${ratingAndReviews.length} reviews)`}</span>
          <span className="text-sm">{`${studentsEnrolled.length} enrolled`}</span>
        </div>

        {/* Instructor */}
        <div className="text-richblack-200 text-sm">
          <p>
            Created By{" "}
            <span className="font-medium text-richblack-25">
              {`${instructor.firstName}`}
            </span>
          </p>
        </div>

        {/* Extra Info */}
        <div className="flex items-center gap-4 text-richblack-100 text-sm">
          <div className="flex items-center gap-2">
            <TiInfoLarge className="text-lg" />
            <p>
              Created At{" "}
              <span className="text-richblack-25">
                {formatDate(courseData?.courseDetails.category.createdAt)}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Earth icon can be added here */}
            <p>English</p>
          </div>
        </div>
      </div>

      <div className="bg-richblack-700 w-fit  rounded-md right-0 mr-20 mt-10 flex-col flex items-end absolute">
        <CourseDetailsCard
          course={courseData?.courseDetails}
          setConfirmationModal={setConfirmationModal}
          handleBuyCourse={handleBuyCourse}
        ></CourseDetailsCard>
      </div>
      <div className="ml-16 mt-7 p-6 border w-[63%] border-richblack-700">
        <p className="text-richblack-5 text-2xl font-inter font-medium">
          What Will you Learn
        </p>
        <div>{whatYouWillLearn}</div>
      </div>

      <div className="ml-16  py-3">
        <div className="mt-7 w-[63%] border-richblack-700">
          <p className="text-richblack-5 text-2xl font-inter font-medium">
            Course Content:{" "}
          </p>
        </div>

        <div className="flex gap-x-3 flex-row text-richblack-50">
          <span>{courseContent.length} Sections •</span>

          <span> {totalNoOfLectures} lectures •</span>
          <span>{courseData.data?.totalDuration} Total length</span>

          <div className="flex text-yellow-50 flex-row pr-14 justify-end w-[50%]">
            <button className="" onClick={() => setIsActive([])}>
              Collapse all Sections
            </button>
          </div>
        </div>
      </div>

     {/* Course Sections */}
<div className="ml-16 mt-5 w-[63%]">
  {courseContent.map((section) => (
    <div
      key={section._id}
      className="border border-richblack-300 mb-2 rounded-md overflow-hidden"
    >
      {/* Section Header */}
      <button
        onClick={() => handleActive(section._id)}
        className="flex justify-between items-center w-full px-6 py-4 bg-richblack-800 text-richblack-25 text-lg"
      >
        <div className="flex items-center gap-2">
          <MdKeyboardArrowDown
            className={`transition-transform duration-300 ${
              isActive.includes(section._id) ? "rotate-180" : ""
            }`}
          />
          <p>{section.sectionName}</p>
        </div>

        <p className="text-yellow-50 text-sm">
          {section.subSection.length} lectures
        </p>
      </button>

      {/* Subsections */}
      {isActive.includes(section._id) && (
        <div className="bg-richblack-900">
          {section.subSection.map((sub) => (
            
            <div
              key={sub._id}
              className="flex justify-between w-full px-12 py-3 border-t border-richblack-700 hover:bg-richblack-800"
            >
              <p className="text-richblack-50 text-sm">{sub.title}</p>
              
              <span className="text-xs text-richblack-300">
        
         <p>{formatTime(Math.floor(sub.timeDuration * 60))}</p>


              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  ))}
</div>


      <div className="ml-16 mt-10 flex gap-y-2 flex-col ">
        <p className="text-richblack-25 font-normal text-2xl">Author</p>
        <div className="flex flex-row gap-x-2  items-center mt-2 ">
          <img
            src={instructor.image}
            width={44}
            height={44}
            className="rounded-full"
            alt=""
          />
          <p> {instructor.firstName} </p>
        </div>
        <p className="text-richblack-200 font-medium ml-2 mt-1">
          {instructor.additionalDetails.about}
        </p>
      </div>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal}></ConfirmationModal>
      )}
    </div>
  );
};

export default CourseDetails;
