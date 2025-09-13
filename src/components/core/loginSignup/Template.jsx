import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Frame from "../../../assets/Images/frame.png";

const Template = ({
  title,
  desc1,
  desc2,
  signImg,
  loginImg,
  formType,
  setIsLoggedIn,
}) => {
  return (
    <div className="flex flex-col sm:flex-row w-11/12 max-w-[1160px] py-12 mt-10 mx-auto gap-y-0 gap-x-14 sm:justify-between">
      {/* title*/}
      <div className=" w-11/12 max-w-[450px] mx-0 ">
        <h2 className="text-white font-semibold text-[1.875rem] leading[2.375rem]">
          {title}
        </h2>

        {/* description  */}
        <p className="text=[1.125rem leading[1.625rem] mt-4 ">
          <span className=" font-inter text-[18px] text-richblack-100 ">
            {" "}
            {desc1}
          </span>
          <span className=" font-edu-sa font-bold text-[16px] text-blue-100">
            {desc2}
          </span>
        </p>

         {/* login image for mobile   */}
        <div className="relative sm:hidden flex top-10 w-80 h-80 mb-10 ">
          <div className="z-20">
            {formType === "signUp" ? (
              <img src={signImg} alt="" />
            ) : (
              <img src={loginImg} alt="" />
            )}
          </div>
          {/* image bg frame */}
          <div className="absolute z-0   top-0 translate-x-4 translate-y-4 ">
            {" "}
            <img src={Frame} alt="" />
          </div>
        </div>

      {/* form goes */}
        {formType === "login" ? (
          <LoginForm isLsetIsLoggedInoggedIn={setIsLoggedIn}></LoginForm>
        ) : (
          <SignUpForm setIsLoggedIn={setIsLoggedIn}></SignUpForm>
        )}
      </div>

         {/* login image for pc   */}
      <div className="relative hidden sm:flex w-fit ">
        <div className="z-20">
          {formType === "signUp" ? (
            <img src={signImg} alt="" />
          ) : (
            <img src={loginImg} alt="" />
          )}
        </div>
          {/* image bg frame */}
        <div className="absolute z-0   top-0 translate-x-4 translate-y-4 ">
          {" "}
          <img src={Frame} alt="" />
        </div>
      </div>
    </div>
  );
};
export default Template;
