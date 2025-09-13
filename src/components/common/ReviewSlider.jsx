import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"
import { FreeMode, Pagination, Autoplay } from "swiper/modules"
import ReactStars from 'react-stars';
import { GiNinjaStar } from "react-icons/gi"

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15; // ✅ limit words

  useEffect(() => {
    const fetchAllReviews = async () => {
      const { data } = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
      if (data?.success) {
        setReviews(data?.data)
      }
    }
    fetchAllReviews();
  }, [])

  // ✅ helper to truncate review text
  const truncateText = (text) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > truncateWords
      ? words.slice(0, truncateWords).join(" ") + "..."
      : text;
  };

  return (
    <div className="text-white py-14 bg-richblack-900">
     
      <div className="max-w-6xl mx-auto">
        <Swiper
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          spaceBetween={24}
          loop={true}
          autoplay={{ delay: 2500 }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-richblack-800 rounded-xl p-6 shadow-lg h-full flex flex-col justify-between">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={
                      review?.user?.image
                        ? review?.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName}${review?.user?.lastName}`
                    }
                    alt="profile"
                    className="h-10 w-10 object-cover rounded-full border border-richblack-600"
                  />
                  <div>
                    <p className="font-semibold text-sm">{review?.user?.firstName} {review?.user?.lastName}</p>
                    <p className="text-xs text-richblack-300">{review?.user?.email}</p>
                  </div>
                </div>

                {/* Truncated Review Text */}
                <p className="text-sm text-richblack-200 mb-4">
                  {truncateText(review?.review)}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-medium text-sm">
                    {review?.rating.toFixed(1)}
                  </span>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={18}
                    edit={false}
                    activeColor="#FFD700"
                    emptyIcon={<GiNinjaStar />}
                    fullIcon={<GiNinjaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
