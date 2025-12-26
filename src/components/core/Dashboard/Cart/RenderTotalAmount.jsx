import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { buyCourse } from "../../../../services/operation/studentFeatureAPI";
import { useNavigate } from "react-router-dom";

const RenderTotalAmount = () => {
  const { total } = useSelector((state) => state.cart);
  const { cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

   const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id)
        buyCourse(token,courses,user,navigate,dispatch)
        //todo : api integrate => payment gateway tk le jayegi 
   } 

  return (
    <div className="flex flex-col text-richblack-300 ">
      <p className="text-lg font-medium">Total:</p>
      <p className="text-yellow-100 font-semibold text-2xl">Rs.{total} </p>
      <div className="flex-row flex  justify-center">
      <IconBtn text={"Buy Now"} onClick={handleBuyCourse} customClasses=" px-8 flex  w-fit " ></IconBtn>
      </div>
    </div>
  );
};

export default RenderTotalAmount;
