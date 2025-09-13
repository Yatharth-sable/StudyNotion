import React from 'react'
import { useDispatch, useSelector } from 'react-redux'    
import ReactStars from 'react-stars'
import { GiNinjaStar } from "react-icons/gi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { removeFromCart } from '../../../../Slice/cartSlice'

const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch();

  return (
    <div className="space-y-6">
      {cart.map((course, index) => (
        <div key={index} className="flex items-start justify-between border-b border-richblack-600 pb-6">
          {/* Left: Thumbnail + Course Details */}
          <div className="flex gap-4">
            <img
              src={course?.thumbnail}
              alt=""
              className="w-40 h-24 rounded-lg object-cover"
            />
            <div className="flex flex-col justify-between">
              <p className="text-lg font-semibold text-richblack-5">{course?.courseName}</p>
              <p className="text-sm text-richblack-300">{course?.category?.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-300 font-semibold text-sm">4.8</span>
                <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                />
                <span className="text-richblack-300 text-sm">
                  {course?.ratingAndReviews?.length} Ratings
                </span>
              </div>
            </div>
          </div>

          {/* Right: Remove Button + Price */}
          <div className="flex flex-col items-end gap-3">
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-2 rounded-md bg-richblack-700 px-3 py-1 text-pink-200 hover:bg-richblack-800 transition"
            >
              <RiDeleteBin6Line />
              <span className="text-sm font-medium">Remove</span>
            </button>
            <p className="text-lg font-semibold text-yellow-50">
              Rs. {course?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RenderCartCourses
