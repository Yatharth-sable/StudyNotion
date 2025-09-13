import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import {
  getFullDetailsOfCourse,
} from "../services/operation/courseDetailsApi";
import {
  setCourseSectionData,
  setTotalNoOfLectures,
  setCompletedLectures,
  setEntireCourseData,
} from "../Slice/viewCourseSlice";
import VideoDetailSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);

      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));

      let lectures = 0;
      courseData.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    };
    setCourseSpecificDetails();
  }, []);

  return (
    <div className="flex  bg-richblack-900 text-white">
      {/* Sidebar */}
      <div className="w-[300px] border-r border-richblack-700 bg-richblack-800 ">
        <VideoDetailSidebar setReviewModal={setReviewModal} />
      </div>

      {/* Video Player + Outlet */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-richblack-800 rounded-lg shadow-lg w-[500px] max-w-full p-6">
            <CourseReviewModal setReviewModal={setReviewModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCourse;
