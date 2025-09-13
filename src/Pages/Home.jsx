import React from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Highlight from "../components/core/HomePage/Highlight";
import CTAButton from "../components/core/HomePage/CTAButton";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Banner from "../assets/Images/banner.mp4";

import TimelineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import GlowEffect from "../components/core/HomePage/Gloweffect";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/footer";
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
  return (
    <div>
      {/* section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between ">
        <Link to="/signup">
          <div className="group mt-16  p-2 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-50 transition-all duration-200 hover:scale-95 w-fit shadow-[-2px_-2px_0px_0px_#ffffff2e_inset]">
            <div className="flex flex-row items-center gap-2  rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 ">
              <p>Become an Instructor</p>
              <FaLocationArrow />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future With
          <Highlight text={" Coding Skills"}></Highlight>
        </div>

        <div className="text-richblack-300 mt-4 w-[90%] text-center text-lg font-thin">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className=" mx-2 my-10 relative max-w-[1035px]  ">
          {/* elliptical Gradient Glow behind Video */}

          <GlowEffect width={"1000px"} height={"500px"}></GlowEffect>
          <video
            muted
            loop
            autoPlay
            className="relative z-10 w-full 
              h-auto 
              shadow-[10px_10px_0px_0px_#F5F5F5] 
              sm:h-[400px] sm:shadow-[20px_20px_0px_0px_#F5F5F5] 
              md:h-[400px] md:shadow-[20px_20px_0px_0px_#F5F5F5] 
              lg:h-[450px]"
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* code section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row flex-col  md:flex-row md:items-center  "}
            heading={
              <div className="text-4xl font-semibold  ">
                Unlock Your
                <Highlight text={" coding potential "}></Highlight>
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btntext: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{ btntext: "learn more", linkto: "/login", active: false }}
            codeblock={`<!DOCTYPE html>
                        <html>
                          <head>
                            <title>Example</title>
                            <link rel="stylesheet" />
                          </head>
                          <body>
                            <h1><a href="/">Header</a></h1>
                            <nav>
                              <a href="one/">One</a>
                            </nav>`}
            codeColor={"text-caribbeangreen-50"}
          ></CodeBlocks>
        </div>

        {/* code section 2 */}
        <div>
          <CodeBlocks
            position={"md:flex-row-reverse  flex-col  md:flex-row md:items-center"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <Highlight text={" coding in seconds"}></Highlight>
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btntext: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{ btntext: "learn more", linkto: "/login", active: false }}
            codeblock={`<!DOCTYPE html>
                        <html>
                          <head>
                            <title>Example</title>
                            <link rel="stylesheet" />
                          </head>
                          <body>
                            <h1><a href="/">Header</a></h1>
                            <nav>
                              <a href="one/">One</a>
                            </nav>`}
            codeColor={"text-red"}
          ></CodeBlocks>
        </div>
        <ExploreMore> </ExploreMore>
      </div>

      {/* section 2 */}

      <div className="bg-pure-greys-5 text-richblack-700 ">
        <div className="homepage_bg sm:h-[180px] lg:h-[290px] h-[100px] "> 
          <div className="w-11/12 max-w-maxContent flex flex-col  items-center justify-between gap-7 mx-auto">
            <div className=" lg:h-[130px] h-[50px] "></div>

            <div className="flex flex-row gap-8 text-white">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex gap-2 items-center">
                  Explore Full Catalog
                  <FaLocationArrow></FaLocationArrow>
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div className="flex gap-3 items-center">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5">
          <div className="flex flex-col sm:flex-row gap-8 mb-10 mt-[95px] p-3 justify-center ">
            <div className="text-4xl font-semibold w-fit pr-2 flex flex-col">
              Get the skills you need for a
              <Highlight text={" job that is in demand."}></Highlight>
            </div>

            <div className="flex flex-col gap-10 sm:w-[45%] w-fit items-start pl-2  justify-center  ">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
          <TimelineSection></TimelineSection>
          <LearningLanguageSection></LearningLanguageSection>
        </div>
      </div>

      {/* section 3 */}

      <div className="w-11/12 mx-auto max-w-maxContent flex-colitems-center bg-richblack-900 justify-between gap-8   ">
        <InstructorSection></InstructorSection>

        <h2 className=" text-center text-4xl font-semibold mt-10 sm:mt-20  lg:mt-40 mb-10 text-white">
          {" "}
          Reviews from other Learners
        </h2>
              {/* Review Slider here  */}
              <ReviewSlider></ReviewSlider>
      </div>
    
      {/*  footer */}
      <Footer> </Footer>
    </div>
  );
};

export default Home;
