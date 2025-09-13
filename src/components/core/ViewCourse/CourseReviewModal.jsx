import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import IconBtn from "../../common/IconBtn";
import { createRating } from "../../../services/operation/courseDetailsApi";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, [setValue]);

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Modal Box */}
      <div className="bg-richblack-900 w-full max-w-lg rounded-xl p-6 shadow-lg border border-richblack-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">
            Add a Review
          </h2>
          <button
            onClick={() => setReviewModal(false)}
            className="text-richblack-300 hover:text-red-400 transition"
          >
            ✕
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 border-b border-richblack-700 pb-4 mb-4">
          <img
            src={user?.image}
            alt="userImage"
            className="aspect-square w-[50px] rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-white">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">Posting Publicly</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Rating */}
          <div className="flex justify-center">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={28}
              activeColor="#ffd700"
            />
          </div>

          {/* Textarea */}
          <div>
            <label
              htmlFor="courseExperience"
              className="block text-sm mb-1 text-richblack-200"
            >
              Add your Experience
            </label>
            <textarea
              id="courseExperience"
              placeholder="Share what you liked about the course..."
              {...register("courseExperience", { required: true })}
              className="w-full rounded-md bg-richblack-800 p-3 text-white min-h-[120px] outline-none border border-richblack-700 focus:border-yellow-400"
            ></textarea>
            {errors.courseExperience && (
              <span className="text-red-400 text-xs">
                Please add your experience
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setReviewModal(false)}
              className="px-4 py-2 rounded-md bg-richblack-700 text-richblack-200 hover:bg-richblack-600 transition"
            >
              Cancel
            </button>
            <IconBtn type="submit" text="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseReviewModal;
