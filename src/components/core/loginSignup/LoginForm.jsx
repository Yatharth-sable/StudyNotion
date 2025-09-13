import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {login} from "../../../services/operation/authApi"

const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;

  const [accountType, setAccountType] = useState("student");

  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prevdata) => ({
      ...prevdata,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
        dispatch(login(email, password, navigate))
  }

  return (
    <div className="flex flex-col w-full gap-y-3 mt-6">
      {/* Buttons instructor and Student */}
      <div className="w-fit flex gap-x-1 p-1 bg-richblack-800 rounded-full">
        <button
          onClick={() => setAccountType("student")}
          className={`${
            accountType === "student"
              ? "bg-richblack-900 rounded-full text-richblack-50"
              : ""
          } px-5 py-2 transition-all duration-200 text-richblack-400`}
        >
          Student
        </button>

        <button
          onClick={() => setAccountType("instructor")}
          className={`${
            accountType === "instructor"
              ? "bg-richblack-900 rounded-full text-richblack-50"
              : ""
          } px-6 py-2 transition-all duration-200 text-richblack-400`}
        >
          Instructor
        </button>
      </div>

      <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-3 mt-6">
        {/* Email */}
        <label className="w-full mb-3">
          <p className="text-richblack-5 leading-3 mb-1 text-[0.875rem]">
            Email Address
            <sup className="text-pink-400">*</sup>
          </p>

          <input
            required
            type="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Enter email address"
            name="email"
            className="bg-richblack-800 text-richblack-5 mt-2 w-full py-3 rounded-[0.75rem] px-3 text-md focus:border-blue-200  focus:ring-0 outline-none border-b-2 border-richblack-900 "
          />
        </label>

        {/* Password */}
        <div className="relative">
          <label className="w-full">
            <p className="text-richblack-5 leading-4">
              Password
              <sup className="text-pink-400">*</sup>
            </p>

            <input
              required
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={changeHandler}
              placeholder="Enter Your password"
              name="password"
              className="bg-richblack-800 mt-2 w-full text-richblack-5 items-center py-3 rounded-[0.75rem] px-3 text-md focus:border-blue-200  focus:ring-0 outline-none border-b-2 border-richblack-900"
            />
          </label>

          {/* eye toggle */}
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-2/3 -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <BiHide fill="#AFB2BF" fontSize={24} />
            ) : (
              <BiShow fill="#AFB2BF" fontSize={24} />
            )}
          </span>
        </div>

        {/* Forgot Password */}
        <div className="text-blue-100 flex justify-end">
          <Link to="/forgot-password">Forgot Password</Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-yellow-100 rounded-[0.75rem] py-2 mt-3 text-lg w-full font-medium"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
