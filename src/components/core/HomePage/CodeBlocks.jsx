import React from "react";
import CTAButton from "./CTAButton";
import { FaLocationArrow } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";
import Tilt from "react-parallax-tilt";
const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradiend,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-10 sm:my-14 md:my-20 justify-between gap-10 sm:gap-20`}>

      {/* section 1 */}
      <div className=" md:w-[50%] w-full flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 font-bold ">{subheading}</div>

        <div className="flex mt-7 gap-7 ">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btntext}
              <FaLocationArrow />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btntext}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
       <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        perspective={1000}
        transitionSpeed={600}
        scale={1.02}
        gyroscope={true}
        className="rounded-md"
      >
      <div
        className="h-fit flex  flex-row text-[14px] w-full py-4 lg:w-[500px] gap-2 p-2 border border-richblue-400/30 
          relative  rounded-md z-0"
        style={{
          background:
            "linear-gradient(111.93deg, rgba(14, 26, 45, 0.24) -1.4%, rgba(17, 30, 50, 0.38) 104.96%)",
        }}
      >
        {/* hw => BG gradient */}

        <div className=" absolute z-0 w-[372.95px] h-[257px] -top-10 mb-5 rounded-full bg-[radial-gradient(circle,_#1FA2FF,_#12D8FA,_#A6FFCB)] blur-[68px] opacity-[0.23] backdrop-blur-sm "></div>

        <div className=" text-center flex flex-col w-[10%]  text-richblack-400 font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p> 
        </div>

        <div
          className={`flex-1 min-w-0 z-10 flex flex-col gap-4 font-bold font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          ></TypeAnimation>
        </div>
      </div>
      </Tilt>
    </div>
  );
};

export default CodeBlocks;
