import React, { useEffect, useState } from "react";
import RatingStars from "../../common/RatingStars";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating";

const Course_Card = ({ course, Height,active }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    if (course?.ratingAndReviews) {
      const count = GetAvgRating(course.ratingAndReviews);
      setAvgReviewCount(count);
    }
  }, [course]);

  return (
    <div className={`transition-all duration-300 ${active ? "hover:scale-105": "" } `}>
      <Link to={`/course/${course?._id}`}>
        <div className={`bg-richblack-800 rounded-xl shadow-lg overflow-hidden border border-richblack-700 ${active ? "hover:shadow-2xl": "" } ` } >
          {/* Thumbnail */}
          <div className="w-full">
            <img
              src={course?.thumbnail || "/placeholder.jpg"}
              alt={course?.courseName || "Course Thumbnail"}
              className={` ${Height} w-full max-w-[600px]  object-cover  rounded-lg`}
            />
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col gap-2">
            {/* Course Title */}
            <p className="text-lg font-semibold text-white line-clamp-2">
              {course?.courseName || "Untitled Course"}
            </p>

            {/* Instructor */}
            <p className="text-sm text-richblack-200">
              {course?.instructor?.firstName || "Unknown"}{" "}
              {course?.instructor?.lastName || ""}
            </p>

            {/* Ratings */}
            <div className="flex items-center gap-2 text-sm text-richblack-100">
              <span>{avgReviewCount || 0}</span>
              <RatingStars rating={avgReviewCount || 0} />
              <span>({course?.ratingAndReviews?.length || 0} Ratings)</span>
            </div>

            {/* Price */}
            <p className="text-base font-bold text-yellow-50">
              {course?.price ? `₹${course.price}` : "Free"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Course_Card;
