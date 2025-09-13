import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import copy from "copy-to-clipboard";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../Slice/cartSlice";
import { IoMdTime } from "react-icons/io";
import { PiCursorLight } from "react-icons/pi";
import { BsBadgeHd } from "react-icons/bs";

import { TbCertificate2 } from "react-icons/tb";

import { MdOutlineMobileFriendly } from "react-icons/md";



function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { thumbnail: ThumbnailImage, price: CurrentPrice } = course;

  const handleAddToCart = () => {
    if (user && user?.accounType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are a instructor , you cant buy a course");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are Not logged in ",
      text2: "Please Login to add to cart",
      btnText1: "Login",
      btnText2: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };
  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to Clipboard ");
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="w-fit  flex flex-col justify-end gap-y-1  ">
      <img
        src={ThumbnailImage}
        alt="Thumbnail Image"
        className="max-h-[250px] min-h-[150px] w-[350px] rounded-xl"
      />
      <div className="text-white text-2xl font-semibold p-3 pl-4">
        Rs. {CurrentPrice}
      </div>
      <div className="gap-y-2 flex flex-col ">
        <button
          className="bg-yellow-50 text-black font-medium w-[280px] mr-6  px-24 ml-9  p-2 rounded-md flex flex-col cursor-pointer"
          onClick={
            user && course?.studentsEnrolled.includes(user?._id)
              ? () => navigate("/dashboard/enrolled-courses")
              : handleBuyCourse
          }
        >
          {user && course?.studentsEnrolled.includes(user?._id)
            ? "Go to Course"
            : "Buy Now"}
        </button>

        {!course.studentsEnrolled.includes(user?._id) && (
          <button
            className=" bg-richblack-800 text-white font-medium w-[280px] px-24 ml-9  p-2 rounded-md flex flex-col cursor-pointer"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        )}
      </div>

      <div className="">
        <p className="text-sm text-richblack-200 font-inter flex flex-col justify-center items-center   p-3">
          30-Days Money-Back Gurantee
        </p>
        <p className="ml-4 ">This Course Includes:</p>
        <div className="flex flex-col text-caribbeangreen-100 ml-4 pt-2 font-medium">

          {course?.instructions?.length > 0 ? (
            course.instructions.map((item, index) => (
              <p key={index} className="flex flex-col gap-1">
                <span className="flex flex-row items-center gap-2"> <BsBadgeHd></BsBadgeHd>{item} </span>
                <span className="flex flex-row items-center gap-2"> <IoMdTime className="text-lg"></IoMdTime>8 hours on-demand video</span>
                <span className="flex flex-row items-center gap-2"> <PiCursorLight className="text-lg"></PiCursorLight> Full Lifetime access</span>
                <span className="flex flex-row items-center gap-2"> <MdOutlineMobileFriendly  className="text-lg"></MdOutlineMobileFriendly>Access on Mobile and TV</span>
                <span className="flex flex-row items-center gap-2"><TbCertificate2  className="text-lg"></TbCertificate2>Certificate of completion</span>
              </p>
            ))
          ) : (
            <p className="text-richblack-200">Instructor Does no Added Instruction</p>
          )}
        </div>
      </div>
      <div>
        <button
          className="mx-auto flex items-center gap-2 p-3 mb-2 text-yellow-50"
          onClick={handleShare}
        >
          Share
        </button>
      </div>
    </div>
  );
}

export default CourseDetailsCard;
