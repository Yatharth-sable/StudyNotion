import React from "react";

const Stats = () => {
  const stats = [
    { count: "5k", label: "Action Students" },
    { count: "10+", label: "Mentors" },
    { count: "200", label: "Courses" },
    { count: "50+", label: "Awards" },
  ];
  return (
    <div className="bg-richblack-800 w-full py-12  justify-evenly gap-x-4 items-center text-center flex ">
      {stats.map((value, index) => (
        <div className="" key={index}>
          <h1 className="font-semibold text-3xl ">{value.count}</h1>
          <h2 className="text-richblack-400 pt-2">{value.label}</h2>
        </div>
      ))}
    </div>
  );
};

export default Stats;
