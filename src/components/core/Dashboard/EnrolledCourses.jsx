import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operation/profileApi";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledcourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (err) {
      console.log("Unable to fetch Enrolled Courses");
    }
  };

  const navigate = useNavigate();
 

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className="text-white p-6">
      <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>

      {!enrolledcourses ? (
        <div>Loading...</div>
      ) : !enrolledcourses.length ? (
        <p>You have not enrolled in any courses yet.</p>
      ) : (
        <div className="space-y-4 border-x border-richblack-700 ">
          {/* Table Headers */}
          <div className="grid grid-cols-12  items-center bg-richblack-800 p-3 rounded-md gap-4 text-gray-400 font-medium  pb-2">
            <p className="col-span-6">Course Name</p>
            {/* <p className="col-span-2">Duration</p> */}
            <p className="col-span-6 right-0 pl-40">Progress</p>
          </div>

          {/* Course Cards */}
          {enrolledcourses.map((course, index) => (
            <div
              key={course._id}
              className="grid grid-cols-12 gap-4 border-b border-richblack-700 items-center bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition"
            >
              
              <div className="col-span-6 flex items-center gap-4 cursor-pointer"
              onClick={() => {
                navigate(
                  `/view-course/${course?._id}/section/${course.courseContent?.[0]._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]._id}`
                )
              


              }}
              >
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="w-20 h-14 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-gray-400 text-sm">{course.courseDescription}</p>
                </div>
              </div>

              <div className="col-span-2 text-gray-300">{course.totalDuration}</div>

              <div className="col-span-4">
                {course.progressPercentage === 100 ? (
                  <p className="text-green-400 font-semibold">Completed</p>
                ) : (
                  <>
                    <p className="text-gray-300 text-sm mb-1">
                      Progress: {course.progressPercentage || 0}%
                    </p>
                    <ProgressBar
                      completed={course.progressPercentage || 0}
                      height="8px"
                      isLabelVisible={false}
                      bgColor="#0ea5e9"
                      baseBgColor="#374151"
                      borderRadius="4px"
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
