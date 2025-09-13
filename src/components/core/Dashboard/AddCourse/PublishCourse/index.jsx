import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { resetCourseState, setStep } from "../../../../../Slice/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { editCourseDetails } from "../../../../../services/operation/courseDetailsApi";
import { useNavigate } from "react-router-dom";

const PublishCourse = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
      (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      goToCourses();
      return;
    }

    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData, token);
    if (result) {
      goToCourses();
    }

    setLoading(false);
  };

  const onsubmit = () => {
    handleCoursePublish();
  };

  return (
    <div className="rounded-lg border border-richblack-700 bg-richblack-800 p-6 shadow-md">
      {/* Header */}
      <h2 className="text-lg font-semibold text-white mb-4">Publish Course</h2>

      <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
        {/* Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="h-5 w-5 rounded-md border border-richblack-600 bg-richblack-700 text-yellow-50 focus:ring-2 focus:ring-yellow-100"
          />
          <label htmlFor="public" className="ml-3 text-richblack-200 cursor-pointer">
            Make this course public
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="rounded-lg bg-richblack-700 px-4 py-2 text-sm font-medium text-richblack-200 hover:bg-richblack-600 transition-all disabled:opacity-50"
          >
            Back
          </button>

          <IconBtn
            disabled={loading}
            type="submit"
            text="Save Changes"
          />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
