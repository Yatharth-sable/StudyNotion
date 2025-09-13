import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../services/operation/authApi";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="text-white w-full  min-h-screen flex px-3 justify-center ">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className=" w-full max-w-md  flex flex-col justify-center   ">
          <h1 className="text-3xl font-semibold my-3">
            {!emailSent ? "Reset Your Password" : "Check Your Email"}
          </h1>
          <p className="text-richblack-100  my-3 ">
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : ` We have sent the reset email to your email ${email}`}
          </p>

          <form className=" flex flex-col  gap-y-4" onSubmit={submitHandler}>
            {!emailSent && (
              <label className="text-richblack-25 text-md ">
                Email Address
                <sup className="text-pink-400">*</sup>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="flex flex-col  sm:w-full w-fit bg-richblack-800 px-3 border-b-2 border-b-richblack-600 py-3  rounded-xl mt-1 my-3 text-md font-medium  focus:border-blue-200 focus:outline-none"
                />
              </label>
            )}
            <button
              type="submit"
              className="bg-yellow-50 py-3 sm:w-full w-fit px-3 rounded-lg text-black font-semibold my-3"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <div >
            <Link to="/login" className="flex flex-row items-center gap-2 text-richblack-50 hover:text-white">
             <p> <FaArrowLeft></FaArrowLeft> </p>
              <p >
                Back to Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
