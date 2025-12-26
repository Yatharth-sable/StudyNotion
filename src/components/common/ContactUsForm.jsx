import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import countryCode from "../../data/countryCode.json";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("logging data", data);
    try {
      setLoading(true);
      const response = { status: "ok" };
    } catch (err) {
      console.log("Error", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      onSubmit={handleSubmit(submitContactForm)}
    className="bg-richblack-900 flex items-center justify-center px-4"
    >
      <div className="max-w-xl w-full">
        <div className="gap-5 flex flex-col">
          {/* first name and last name */}
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label htmlFor="firstname" className="text-richblack-5 mb-1 text-left">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                placeholder="Enter first name"
                id="firstname"
                className="rounded-md bg-richblack-800 p-3 text-richblack-5 placeholder:text-richblack-400"
                {...register("firstname", { required: true })}
              />
              {errors.firstname && (
                <span className="text-pink-200 text-sm mt-1">
                  Enter Your First Name
                </span>
              )}
            </div>

            <div className="flex flex-col w-1/2 text-left">
              <label htmlFor="lastname" className="text-richblack-5 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                placeholder="Enter last name"
                id="lastname"
                className="rounded-md bg-richblack-800 p-3 text-richblack-5 placeholder:text-richblack-400"
                {...register("lastname", { required: true })}
              />
            </div>
          </div>

          {/* email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-richblack-5 mb-1 text-left">
              Email Address
            </label>
            <input
              type="text"
              placeholder="Enter email address"
              id="email"
              name="email"
              className="rounded-md bg-richblack-800 p-3 text-richblack-5 placeholder:text-richblack-400"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-pink-200 text-sm mt-1">
                Enter your Email
              </span>
            )}
          </div>

          {/* phone number */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phonenumber" className="text-richblack-5 text-left">
              Phone Number
            </label>
            <div className="flex flex-row gap-4 ">
              <select
                name="dropdown"
                id="dropdown"
                className="w-1/4 rounded-md bg-richblack-800 p-3 text-richblack-5"
                {...register("coutrycode", { required: true })}
              >
                {countryCode.map((element, index) => (
                  <option value={element.code} key={index}>
                    {element.code} - {element.country}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                name="phonenumber"
                id="phonenumber"
                placeholder="12345 679890"
                className="w-3/4 rounded-md bg-richblack-800 p-3 text-richblack-5 placeholder:text-richblack-400 "
                {...register("phonenumber", {
                  required: {
                    value: true,
                    message: "Please Enter Phone number",
                  },
                  maxLength: { value: 10, message: "Invalid Phone Number" },
                  minLength: { value: 8, message: "Invalid Phone number " },
                })}
              />
            </div>
            {errors.phoneNo && (
              <span className="text-pink-200 text-sm mt-1">
                {errors.phoneNo.message}
              </span>
            )}
          </div>

          {/* message */}
          <div className="flex flex-col">
            <label htmlFor="message" className="text-richblack-5 mb-1 text-left">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="4"
              placeholder="Enter your message here"
              className="rounded-md bg-richblack-800 p-3 text-richblack-5 placeholder:text-richblack-400"
              {...register("message", { required: true })}
            ></textarea>
            {errors.message && (
              <span className="text-pink-200 text-sm mt-1">
                Enter Your message here
              </span>
            )}
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="mt-4 w-full bg-yellow-50 text-black font-semibold py-3 rounded hover:bg-yellow-100"
          >
            Send Message
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactUsForm;
