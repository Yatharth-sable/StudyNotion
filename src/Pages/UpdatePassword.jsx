import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/operation/authApi";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  
  const {loading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div className="w-full min-h-screen justify-center flex items-center">
      {loading ? (
        <div> </div>
      ) : (
        <div className=" py-2   items-center ">
          <h1 className="text-white py-2 text-xl">Choose new password</h1>
          <p className="text-richblack-100  ">Almost done. Enter your new password and youre all set.</p>

          <form onSubmit={submitHandler} className="py-2 mt-2">
            <label className="text-richblack-25 text-md py-4 ">
              New password
              <sup className="text-pink-400">*</sup>

            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="flex flex-col  sm:w-full w-fit bg-richblack-800 px-3 border-b-2 border-b-richblack-600 py-3  rounded-xl mt-1 my-3 text-md font-medium  focus:border-blue-200 focus:outline-none"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)} 
                className="absolute  top-1/3 mt-2 -translate-y-1/2 right-3 cursor-pointer " 
                 >
                {showPassword ? (
                  <FaEye fontSize={22}></FaEye>
                ) : (
                  <FaEyeSlash fontSize={22}></FaEyeSlash>
                )}
              </span>
               </div>
            </label>

            <label className="text-richblack-25 text-md ">
              Confirm new password
              <sup className="text-pink-400">*</sup>
              <div className="relative" > 

              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm  Password"
                className="flex flex-col  sm:w-full  bg-richblack-800 px-3 border-b-2 border-b-richblack-600 py-3  rounded-xl mt-1 my-3 text-md font-medium  focus:border-blue-200 focus:outline-none"
              />
               <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 -translate-y-1/2  right-3 cursor-pointer  " 
                >
                {showConfirmPassword ? (
                  <FaEye fontSize={24}></FaEye>
                ) : (
                  <FaEyeSlash fontSize={24}></FaEyeSlash>
                )}
              </span>
              
              </div>

            </label>

            <button
              type="submit"
              className="bg-yellow-50 py-3 sm:w-full w-fit px-3 rounded-lg text-black font-semibold my-3"
            >
              Reset Password
            </button>
          </form>

          <div>
            <Link
              to="/login"
              className="flex flex-row items-center gap-2 text-richblack-50 hover:text-white"
            >
              <p><FaArrowLeft></FaArrowLeft></p>
              <p>Back to login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
