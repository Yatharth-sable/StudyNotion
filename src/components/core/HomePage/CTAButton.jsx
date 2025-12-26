import React from "react";
import { Link } from "react-router-dom";

const CTAButton = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center sm:text-[13px] text-[6px] lg:px-6 lg:py-3 px-3 py-2  rounded-md font-bold
      ${
        active
          ? "bg-yellow-50 text-black shadow-[-2px_-2px_0px_0px_#FFFFFF82_inset]"
          : "bg-richblack-800 text-white shadow-[-2px_-2px_0px_0px_#FFFFFF2E_inset] "
      } hover:scale-95 transition-all duration-200 
      `}
      >
        {children}
      </div>
    </Link>
  );
};

export default CTAButton;
