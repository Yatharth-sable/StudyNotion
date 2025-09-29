import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { settingsEndpoints } from "../../../../../services/apis";
import { COURSE_STATUS } from "../../../../../utils/constants";
import IconBtn from "../../../../common/IconBtn";
import { setStep, setCourse } from "../../../../../Slice/courseSlice";
import { BiUpload } from "react-icons/bi";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { IoMdRocket } from "react-icons/io";
import { toast } from "react-hot-toast";
import RequirementField from "../RequirementField";
import ChipInput from "./ChipInput";
import Upload from "./Upload";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operation/courseDetailsApi";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();

      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tags);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category?._id);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      JSON.stringify(currentValues.courseTags) !==
        JSON.stringify(course.tags) ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category?._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    )
      return true;
    else return false;
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);

        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseTags.toString() !== course.tags.toString()) {
          formData.append("tags", JSON.stringify(data.courseTags));
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory !== course.category?._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        if (data.courseImage && data.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);

        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tags", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    console.log("API raw result:", result);

    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
      console.log("going to step 2");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border border-richblack-700 bg-richblack-800 p-6 space-y-6"
    >
      {/* Course Title */}
      <div className="flex flex-col gap-2">
        <label htmlFor="courseTitle" className="text-sm text-richblack-200">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="w-full rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5"
          type="text"
        />
        {errors.courseTitle && (
          <span className="text-xs text-pink-200">
            Course Title is required
          </span>
        )}
      </div>

      {/* Course Description */}
      <div className="flex flex-col gap-2">
        <label htmlFor="courseShortDesc" className="text-sm text-richblack-200">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Short Description"
          {...register("courseShortDesc", { required: true })}
          className="min-h-[120px] w-full rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5"
        />
        {errors.courseShortDesc && (
          <span className="text-xs text-pink-200">
            Course Description is required
          </span>
        )}
      </div>

      {/* Course Price */}
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="coursePrice" className="text-sm text-richblack-200">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-300 text-lg" />
          <input
            id="coursePrice"
            placeholder="Enter Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
            className="w-full rounded-md border border-richblack-600 bg-richblack-700 pl-10 pr-3 py-2 text-richblack-5"
          />
        </div>
        {errors.coursePrice && (
          <span className="text-xs text-pink-200">
            Course Price is required
          </span>
        )}
      </div>

      {/* Course Category */}
      <div className="flex flex-col gap-2">
        <label htmlFor="courseCategory" className="text-sm text-richblack-200">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
          className="w-full rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="text-xs text-pink-200">
            Course Category is required
          </span>
        )}
      </div>

      {/* Tags Input */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter tags and press enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Upload Thumbnail */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* Benefits */}
      <div className="flex flex-col gap-2">
        <label htmlFor="courseBenefits" className="text-sm text-richblack-200">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter the benefits of the course"
          {...register("courseBenefits", { required: true })}
          className="min-h-[120px] w-full rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5"
        />
        {errors.courseBenefits && (
          <span className="text-xs text-pink-200">
            Benefits of the course are required
          </span>
        )}
      </div>

      {/* Requirement Field */}
      <RequirementField
        name="courseRequirements"
        label="Requirements/Instruction"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <div className="flex justify-end">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Continue Without Saving
          </button>
        )}

        <IconBtn
          disabled={loading}
          type="submit"
          text={loading ? "Saving..." : !editCourse ? "Next" : "Save Changes"}
        />
      </div>
    </form>
  );
};

export default CourseInformationForm;
