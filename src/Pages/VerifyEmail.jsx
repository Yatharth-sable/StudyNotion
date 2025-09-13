import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { useNavigate, Link } from "react-router-dom";
import { sendOtp } from "../services/operation/authApi";
import { signUp } from "../services/operation/authApi";
import { FaArrowLeft } from "react-icons/fa6";
import { FaRedoAlt } from "react-icons/fa";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { loading, signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!signupData) {
      console.log("Signup data not found");
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      contactNumber,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        contactNumber,
        navigate
      )
    );
  };

  return (
    <div className="text-white w-full justify-center flex items-center min-h-screen bg-richblack-900 px-4">
      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <div className="w-[90%] max-w-md flex flex-col bg-richblack-800 p-6 sm:p-8 border border-richblack-700 rounded-lg shadow-md">
          <h1 className="text-white text-2xl font-semibold mb-2">Verify Email</h1>
          <p className="text-richblack-100 text-sm mb-4">
            A verification code has been sent to your email. Enter the code below.
          </p>

          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col items-center w-full"
          >
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="text-richblack-100 text-2xl px-1">-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  className="w-12 h-14 sm:w-14 sm:h-16 mx-1 border border-richblack-600 rounded-md bg-richblack-700 text-white text-xl text-center caret-white outline-none focus:border-yellow-50 focus:ring-2 focus:ring-yellow-200 transition duration-200"
                />
              )}
            />

            <button
              type="submit"
              className="bg-yellow-50 text-black font-semibold px-4 py-2 w-full rounded-md hover:bg-yellow-100 transition duration-200 mt-6"
            >
              Verify Email
            </button>
          </form>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-2 sm:gap-0">
            <Link
              to="/login"
              className="flex flex-row items-center gap-2 text-richblack-50 hover:text-white"
            >
              <FaArrowLeft />
              <span>Back to login</span>
            </Link>

            <button
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
              className="flex flex-row items-center gap-2 text-richblack-50 hover:text-white"
            >
              <FaRedoAlt className="font-bold" />
              <span>Resend it</span>
            </button>
          </div>

          {
            console.log(signupData.email)
          }
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
