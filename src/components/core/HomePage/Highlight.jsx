import React from "react";

const Highlight = ({ text }) => {
  return (
    <span
      className="font-bold text-transparent bg-clip-text "
      style={{
        backgroundImage:
          "linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)",
        WebkitBackgroundClip: "text", 
        WebkitTextFillColor: "transparent",
      }}
    >
      {text}
    </span>
  );
};

export default Highlight;
