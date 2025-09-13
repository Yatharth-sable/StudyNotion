import React from "react";
import Lesson1 from "../../../assets/Logo/Lesson1.svg";
import Lesson2 from "../../../assets/Logo/Lesson2.svg";
import Beginner1 from "../../../assets/Logo/Beginner1.svg";
import Beginner2 from "../../../assets/Logo/Beginner2.svg";

const CourseCart = ({ index, cardData, currentCart, setCurrentCard }) => {
  const isActive = cardData.heading === currentCart;
  return (
    <div
      className={`flex relative flex-col gap-1 rounded-md drop-shadow-xl h-[250px] w-[300px] justify-between items-center cursor-pointer transition-all duration-300 ${
        isActive
          ? "bg-white text-richblack-500 shadow-richblue-500"
          : "bg-richblack-800 text-white "
      } `}
      onClick={() => setCurrentCard(cardData.heading)}
    >
      {/* heading and description part of cart */}
      <div className={` relative z-10 py-3 px-5 flex flex-col `}>
        <div
          className={`py-2 ${isActive ? "text-black font-bold" : "text-white"}`}
        >
          {cardData.heading}
        </div>
        <div
          className={` text-md ${
            isActive ? "text-richblack-500" : "text-richblack-400  hover:text-richblack-100 transition-all  duration-200  "
          }`}
        >
          {cardData.description}
        </div>
      </div>
 
  {/* bottom part of card lesson and beginner */}
      <div className="flex flex-row justify-between px-4 py-2 items-center  mb-1 w-full border-t border-richblack-600 border-dashed  ">
        <div className="flex flex-row gap-2">
          <img src={isActive ? Beginner1 : Beginner2} alt="beginner img" />
          <div
            className={` ${isActive ? "text-blue-500" : "text-richblack-300"}`}
          >
            {cardData.level}
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <img src={isActive ? Lesson1 : Lesson2} alt="Lesson img" />
          <div
            className={` ${isActive ? "text-blue-500" : "text-richblack-300"}`}
          >
            {cardData.lessionNumber} Lesson
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCart;
