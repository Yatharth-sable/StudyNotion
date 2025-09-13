import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import Highlight from "./Highlight";
import CourseCart from "./CourseCart";

const tabsName = [
  "Free",
  "New to Coding",
  "Most popular",
  "Skill paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses); // cart me konse course aayege
  const [currentCart, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );
  // cart me knosa course select hua (highlight)

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div>
      <div
        className="font-semibold text-4xl text-white text-center sm:mt-16 md:mt-24 lg:32 mt-10 
             flex flex-col md:flex-row md:justify-center "
      >
        Unlock the
        <Highlight text={" Power of Code"}></Highlight>
      </div>

      <div className=" flex flex-col md:flex-row justify-center font-mono text-richblack-300 text-center text-md  mt-3       ">
        Learn to Build Anything You Can Imagine
      </div>

      <div className="flex  flex-row  justify-center rounded-full bg-richblack-800 text-richblack-50 mb-10 mt-5  ">
        {tabsName.map((element, index) => {
          return (
            <div
              className={`flex flex-row items-center 
                      text-[12px] sm:text-base lg:text-[16px]
                      rounded-full cursor-pointer 
                      hover:text-richblack-5 
                       md:px-3 lg:px-6 
                      py-2 lg:py-3 
                      m-2  text-center
                      transition-all duration-200 
                  ${
                    currentTab === element
                      ? "bg-richblack-900 text-richblack-5 font-medium drop-shadow-[0_0_7px_#12D8FA] transition-all duration-200"
                      : "text-richblack-200"
                  }`}
              key={index}
              onClick={() => setMyCards(element)}
            >
              {element}
            </div>
          );
        })}
      </div>
      <div className="lg:h-[50px]"></div>

      <div className="lg:h-[150px]">
        <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-4 ">
          {courses.map((element, index) => {
            return (
              <CourseCart
                key={index}
                cardData={element}
                currentCart={currentCart}
                setCurrentCard={setCurrentCard}
              ></CourseCart>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ExploreMore;
