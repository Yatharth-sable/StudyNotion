import React from "react";
import InstructorImage from "../../../assets/Images/Instructor.png";
import Highlight from "./Highlight";
import { FaLocationArrow } from "react-icons/fa6";
import CTAButton from "./CTAButton";
import { Link } from "react-router-dom";

const InstructorSection = () => {
  return (
    <div className="mt-16 ">
      <div className="flex flex-col sm:flex-row gap-20 items-center">
        <div className="w-[50%] mx-auto shadow-[-10px_-10px_0px_#FFFFFF] sm:shadow-[-20px_-20px_0px_#FFFFFF]
">
          <img src={InstructorImage} alt="InstructorImage" />
        </div>

        <div className="w-[50%] flex-col gap-10  ">
          <div className="text-4xl font-semibold text-white">
            Become an
            <br />
            <Highlight text={" Instructor"}> </Highlight>
          </div>
          <div className="text-md font-base text-richblack-300 py-4">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
            <br />
          </div>

          <div className="flex flex-row w-fit ">

            <CTAButton active={true} linkto={"signup"}>
              <div className="flex flex-row items-center gap-2">
                {/* Start Teaching Today */}
               Start Teaching Today
                <FaLocationArrow></FaLocationArrow>
              </div>
            </CTAButton>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
