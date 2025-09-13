import React from "react";

import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineimage from "../../../assets/Images/TimelineImage.png";
import GlowEffect from "./Gloweffect";

const timeline = [
  {
    logo: logo1,
    heading: "Leadership",
    description: "Fully committed to the success company",
  },
  {
    logo: logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    logo: logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skills",
  },
  {
    logo: logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];

const TimeLineSection = () => {
  return (
    <div>
      <div className="flex md:flex-row flex-col gap-14 items-center">
        <div className="w-[45%] flex flex-col gap-10">
          {timeline.map((element, index) => {
            return (
              <div className="flex  gap-6 relative " key={index}>
                {/* drop-shadow-[0_0_62px_#00FFFF] */}

                <div
                  className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center  
                	 drop-shadow-2xl  z-10 "
                >
                  <img src={element.logo} alt={`timeline logo ${index}`}></img>
                  {/* Timeline Line (only if not last item) */}
                  {index !== timeline.length - 1 && (
                    <div className="absolute  top-full left-1/2 -translate-x-1/2 h-[75%] border-r-2 border-dashed border-blue-400 z-10 drop-shadow-[0_0_100px_#00FFFF] w-px  "></div>
                  )}
                </div>

                <div className="  ">
                  <h2 className=" font-semibold text-[18px] ">
                    {element.heading}
                  </h2>
                  <p className="text-base "> {element.description} </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative">
          <GlowEffect width={"600px"} height={"300px"}></GlowEffect>
          <div className="relative shadow-blue-300 z-10 ">
            <img
              src={timelineimage}
              alt="timeline"
              className="shadow-white object-cover h-fit w-[714px] "
            />

            <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase sm:py-10 py-5 left-[50%]    sm:translate-x-[-50%] translate-x-[-50%] sm:translate-y-[-50%] translate-y-[-30%] ">
              <div className="flex flex-row sm:gap-5 gap-3 items-center border-r border-caribbeangreen-300 sm:px-7 px-4">
                <p className="text-3xl font-bold">10</p>
                <p className="text-caribbeangreen-300 text-sm">
                  Years of Experince
                </p>
              </div>

              <div className="flex flex-row gap-5 items-center sm:px-7 px-4">
                <p className="text-3xl font-bold">250</p>
                <p className="text-caribbeangreen-300 text-sm">
                  TYPES OF COURSES
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineSection;
