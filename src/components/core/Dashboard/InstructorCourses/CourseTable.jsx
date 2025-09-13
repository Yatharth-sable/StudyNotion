import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tr } from "react-super-responsive-table";
import { COURSE_STATUS } from "../../../../utils/constants";
import { Table, Thead, Th, Tbody, Td } from "react-super-responsive-table";
import ConfirmationModal from "../../../common/ConfirmationModal";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operation/courseDetailsApi";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";


const CourseTable = ({ courses, setCourses }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const Navigate = useNavigate();

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <div className="mt-6 rounded-lg border border-richblack-700 bg-richblack-900 p-6">
      <Table className="w-full">
        <Thead>
          <Tr className="border-b border-richblack-700 text-left text-sm text-richblack-200">
            <Th className="py-3">Courses</Th>
            <Th className="py-3">Duration</Th>
            <Th className="py-3">Price</Th>
            <Th className="py-3">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td className="py-4 text-center text-richblack-300">
                No Courses Found
              </Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr
                key={course._id}
                className="border-b border-richblack-800 py-6 text-sm last:border-0"
              >
                <Td className="flex gap-4 py-6">
                  <img
                    src={course?.thumbnail}
                    className="h-[120px] w-[180px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-richblack-200 line-clamp-2">
                      {course.courseDescription}
                    </p>
                    <p className="text-xs text-richblack-400">
                      Created: {new Date(course.createdAt).toLocaleDateString()}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="mt-1 w-fit rounded-md bg-pink-900 px-2 py-[2px] text-xs text-pink-300">
                        Drafted
                      </p>
                    ) : (
                      <p className="mt-1 w-fit rounded-md bg-yellow-900 px-2 py-[2px] text-xs text-yellow-200">
                        Published
                      </p>
                    )}
                  </div>
                </Td>
                <Td className="text-richblack-200">2h 30m</Td>
                <Td className="text-richblack-200">₹{course.price}</Td>
                <Td className="  top-1/2">
                  <button
                    disabled={loading}
                    
                    onClick={() => {
                      Navigate(`/dashboard/edit-course/${course._id}`);
                    }}
                    className="rounded-lg text-richblack-100 text-lg px-2 disabled:opacity-50 hover:text-yellow-400 transition-colors"
                  >
                    <MdEdit />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted.",
                        btnText1: "Delete",
                        btnText2: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                    className="rounded-lg text-richblack-100 text-lg disabled:opacity-50 hover:text-pink-400 transition-colors"
                  >
                    <MdDelete />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseTable;
