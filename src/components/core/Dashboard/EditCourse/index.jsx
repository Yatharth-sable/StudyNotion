import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import React, { useEffect, useState } from 'react'
import RenderSteps from "../AddCourse/RenderSteps";
import { getFullDetailsOfCourse } from "../../../../services/operation/courseDetailsApi";
import { setCourse, setEditCourse } from "../../../../Slice/courseSlice";

const EditCourse = () => {
     
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const [loading ,setLoading]  = useState(false);
    const {token} = useSelector((state) => state.auth)
    const {course} = useSelector((state) => state.course)

   useEffect(() => {
  const populateCourseDetails = async () => {
    setLoading(true);
    const result = await getFullDetailsOfCourse(courseId, token);
    if (result?.courseDetails) {
      dispatch(setEditCourse(true));
      dispatch(setCourse(result?.courseDetails));
    }
    setLoading(false);
  };

  populateCourseDetails();
}, [courseId, token, dispatch]);


    if (loading) {
        return (
            <div>
                loading ....
            </div>
        )
    }
  return (
    <div className="text-white">
   <h1> Edit Course</h1>

   <div>
    {
        course?(<RenderSteps></RenderSteps>) : ( <p> Course Not Found </p>
        )
    }
   </div>
    </div>
  )
}

export default EditCourse
