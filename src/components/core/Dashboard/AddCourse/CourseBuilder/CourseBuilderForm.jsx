import { useForm } from "react-hook-form";
import { useState } from "react";
import IconBtn from "../../../../common/IconBtn";
import { FaRegPlusSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { BiRightArrow } from "react-icons/bi";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../Slice/courseSlice";
import {
  createSection,
  updateSection,
} from "../../../../../services/operation/courseDetailsApi";
import { toast } from "react-hot-toast";
import NestedView from "./NestedView";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseid: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    if (result) {
  dispatch(setCourse(result.updatedCourseDetails));
}


    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  };

  

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

const goToNext = () => {
  if (!course?.courseContent || course.courseContent.length === 0) {
    toast.error("Please add atleast one Section");
    return;
  }

  if (course.courseContent.some((section) => !section.subSection || section.subSection.length === 0)) {
    toast.error("Please add atleast one lecture in each section");
    return;
  }

  dispatch(setStep(3));
};


  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="text-white">
      {/* Heading */}
      <p className="text-lg font-semibold mb-4">Course Builder</p>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-richblack-800 p-4 rounded-lg"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="sectionName"
            className="text-sm text-richblack-100 font-medium"
          >
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            placeholder="Add Section Name"
            {...register("sectionName", { required: true })}
            className="w-full rounded-md bg-richblack-700 p-3 text-sm text-white outline-none focus:ring-1 focus:ring-yellow-50"
            type="text"
          />
          {errors.sectionName && (
            <span className="text-xs text-pink-200">
              Section Name is Required
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <IconBtn
            type="Submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses="text-yellow-50 "
          >
            <FaRegPlusSquare className="text-yellow-50 text-lg" />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-400 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Nested view */}
      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}


      {/* Navigation */}
      <div className="mt-6 flex justify-end gap-x-3">
        <button
          type="button"
          onClick={goBack}
          className="px-4 py-2 rounded-md bg-richblack-700 text-sm text-richblack-100 hover:bg-richblack-600 transition"
        >
          Back
        </button>

        <IconBtn text="Next" onClick={goToNext}>
          <BiRightArrow />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
