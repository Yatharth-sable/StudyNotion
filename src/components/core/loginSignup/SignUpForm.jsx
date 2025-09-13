import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiHide, BiShow } from "react-icons/bi";
import { useDispatch } from "react-redux"
import countryCodes  from "../../../data/countryCode.json";
import {ACCOUNT_TYPE} from "../../../utils/constants"

import {setSignupData} from "../../../Slice/authSlice"
import { sendOtp } from "../../../services/operation/authApi"



const SignUpForm = () => {

 const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  contactNumber: "",            
});


  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {  password, confirmPassword } = formData
  
  function changeHandler(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  
  const dispatch = useDispatch();

 // Handle Form Submission
  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      accountType,
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))

    // Reset
   setFormData({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  contactNumber: "",
});

    setAccountType(ACCOUNT_TYPE.STUDENT)
  }


  return (
    <div>
      <div>
        <div className="w-fit flex gap-x-1 p-1 bg-richblack-800 rounded-full mt-4  border-richblack-900  border-b-richblack-600">
          <button
            onClick={() => setAccountType(ACCOUNT_TYPE.STUDENT)}
            className={`${
              accountType === ACCOUNT_TYPE.STUDENT
                ? "bg-richblack-900 rounded-full text-richblack-50  "
                : ""
            } px-5 py-2 transition-all w duration-200 text-richblack-400`}
          >
            Student
          </button>
          <button
            onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}
            className={`${
              accountType === ACCOUNT_TYPE.INSTRUCTOR
                ? "bg-richblack-900 rounded-full text-richblack-50"
                : ""
            } px-6 py-2 transition-all duration-200 text-richblack-400`}
          >
            Instructor
          </button>
        </div>

        <form
          onSubmit={submitHandler}
          className="flex flex-col w-full gap-y-3 mt-6"
        >
          {/* First and Last Name */}
          <div className="flex gap-x-2 mt-[20px] ">
            <label className="w-full">
              <p className="text-richblack-5 leading-3 mb-1 text-[0.875rem]">
                First Name <sup className="text-pink-400">*</sup>
              </p>
              <input
                required
                type="text"
                value={formData.firstName}
                name="firstName"
                onChange={changeHandler}
                placeholder="Enter First Name"
                className="bg-richblack-800 w-full text-richblack-5 py-3 mt-2 rounded-[0.75rem] px-3 text-md focus:border-b-blue-200 focus:ring-0 outline-none  border-richblack-900 "
              />
            </label>

            <label className="w-full">
              <p className="text-richblack-5 leading-3 mb-1 text-[0.875rem]">
                Last Name <sup className="text-pink-400">*</sup>
              </p>
              <input
                required
                type="text"
                value={formData.lastName}
                name="lastName"
                onChange={changeHandler}
                placeholder="Enter Last Name"
                className="bg-richblack-800 w-full mt-2 text-richblack-5 items-center py-3 rounded-[0.75rem] px-3 text-md focus:border-b-blue-200 focus:ring-0 outline-none border border-richblack-900"
              />
            </label>
          </div>

          {/* Email */}
          <label className="w-full mt-3">
            <p className="text-richblack-5 leading-3 mb-1 text-[0.875rem]">
              Email <sup className="text-pink-400">*</sup>
            </p>
            <input
              required  
              type="email"
              value={formData.email}
              name="email"
              onChange={changeHandler}
              placeholder="Enter email address"
              className="bg-richblack-800 w-full text-richblack-5 mt-2 py-3 px-3 rounded-[0.75rem] text-md focus:border-b-blue-200 focus:ring-0 outline-none border border-richblack-900"
            />
          </label>

          {/* Phone Number */}
          <div className="w-full">
            <label className="w-full">
              <p className="text-richblack-5 leading-4">
                Phone Number <sup className="text-pink-400">*</sup>
              </p>
              <div className="flex gap-3 w-full mt-2">
                <select
                  // value={formData.countryCode}
                  // onChange={changeHandler}
                  // name="countryCode"
                  className="bg-richblack-800 w-[110px] text-richblack-5 rounded-lg px-3 py-2 focus:border-b-blue-200 focus:ring-0 text-[10px] outline-none border border-richblack-900"
                >
                  {countryCodes.map((item, index) => (
                    <option key={index} value={item.code.replace(/\D/g, "")}>
                        {item.country} ({item.code})
                    </option> 
                  ))}
                </select>

                <input
                  required
                  type="text"
                  value={formData.contactNumber}
                  onChange={changeHandler}
                  name="contactNumber"
                  placeholder="Ph. Number"
                  className="bg-richblack-800 w-full text-richblack-5 items-center py-3 rounded-[0.75rem] pl-3 text-md focus:border-b-blue-200 focus:ring-0 outline-none border border-richblack-900"
                />
              </div>
            </label>
          </div>

          {/* Password & Confirm Password */}
          <div className="flex gap-2">
            <label className="w-full">
              <p className="text-richblack-25">
                Password <sup className="text-pink-400">*</sup>
              </p>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  name="password"
                    autoComplete="new-password"
                  onChange={changeHandler}
                  placeholder="Enter password"
                  className="bg-richblack-800 px-2 py-3 w-full rounded-[0.75rem] mt-2 focus:border-b-blue-200 focus:ring-0 outline-none text-richblack-5 border border-richblack-900"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                > 
                  {showPassword ? (
                    <BiHide fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <BiShow fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </div>
            </label>

            <label className="w-full">
              <p className="text-richblack-25">
                Confirm Password <sup className="text-pink-400">*</sup>
              </p>
              <div className="relative">
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  name="confirmPassword"
                    autoComplete="new-password"
                  onChange={changeHandler}
                  placeholder="Confirm password"
                  className="bg-richblack-800 px-2 py-3 rounded-[0.75rem] mt-2 focus:border-b-blue-200 focus:ring-0 outline-none text-richblack-5 border border-richblack-900 w-full"
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <BiHide fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <BiShow fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <button
            className="bg-yellow-100 rounded-[0.75rem] py-2 mt-5 text-lg w-full font-medium"
            type="submit"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
