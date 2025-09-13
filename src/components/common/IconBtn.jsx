import React from "react";
import { MdEdit } from "react-icons/md";


const IconBtn = ({ text, onClick, children, disabled, type = "button" ,editIcon ,outline=false,customClasses }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center ${
        outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
    >                                               
      {children && <span>{children}</span>}
      <span>{text}</span>

       {
        editIcon ? <MdEdit></MdEdit> : ""
       } 

    </button>
  );
};

export default IconBtn;
