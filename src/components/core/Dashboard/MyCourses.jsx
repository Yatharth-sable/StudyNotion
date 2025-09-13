import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operation/courseDetailsApi";
import IconBtn from "../../common/IconBtn";
import CoursesTable from "../Dashboard/InstructorCourses/CourseTable";
import { MdDeleteOutline } from "react-icons/md";
import { deleteAllCourses } from "../../../services/operation/courseDetailsApi";
import ConfirmationModal from "../../common/ConfirmationModal";


const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    };
    fetchCourses();
  }, [token]);

 

   //  delete the instructor course
  const deleteAllCourse= async () => {
  setLoading(true);
  const res = await deleteAllCourses(user._id,token);

  if (res) {
    // ✅ clear courses immediately in UI
    setCourses([]);
    setConfirmationModal(null)
  }
  setLoading(false);
};

  return (
    <div className="text-white">
      <div className="mb-6 flex items-center justify-between ">
        <h1 className="text-2xl font-semibold text-richblack-5">My Courses</h1>
        <div className="flex gap-5">
             <button 
        onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete All course?",
                        text2:"All the data related to this course will be deleted.",
                        btnText1: "Delete",
                        btnText2: "Cancel",
                        btn1Handler: !loading
                          ? () => deleteAllCourse()
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
         className="flex justify-end items-end text-3xl  transition-all hover:text-pink-400 "> 
         <MdDeleteOutline></MdDeleteOutline>
        </button>
        <IconBtn
          text="Add Course"
          onClick={() => navigate("/dashboard/add-course")}
        />
        </div>
       
      </div>
      

      {courses && (
        <CoursesTable courses={courses} setCourses={setCourses} />
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>

  );
  
};

export default MyCourses;
