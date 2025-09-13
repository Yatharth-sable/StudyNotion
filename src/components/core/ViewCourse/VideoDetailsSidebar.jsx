import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import IconBtn from "../../common/IconBtn";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const location = useLocation();

  useEffect(() => {
    if (!courseSectionData.length) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex =
      courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
        (data) => data._id === subSectionId
      );
    const activeSubSectionId =
      courseSectionData[currentSectionIndex]?.subSection?.[
        currentSubSectionIndex
      ]?._id;

    setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
    setVideoBarActive(activeSubSectionId);
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <div className="w-80 bg-richblack-900 text-white h-full flex flex-col border-r border-richblack-700">
      {/* Header */}
      <div className="p-4 flex flex-col gap-4 border-b border-richblack-700">
        {/* Navigation + Review Button */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="text-sm font-medium text-richblack-200 hover:text-yellow-300 transition"
          >
            ← Back
          </button>
          <IconBtn text="Add Review" onClick={() => setReviewModal(true)} />
        </div>

        {/* Course Info */}
        <div>
          <p className="font-semibold text-lg truncate">
            {courseEntireData?.courseName}
          </p>
          <p className="text-sm text-richblack-300">
            {completedLectures?.length} / {totalNoOfLectures} completed
          </p>
        </div>
      </div>

      {/* Sections List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {courseSectionData.map((section, index) => (
          <div key={index} className="border-b border-richblack-800">
            {/* Section Header */}
            <div
              onClick={() =>
                setActiveStatus((prev) =>
                  prev === section?._id ? "" : section?._id
                )
              }
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-richblack-800 transition"
            >
              <span className="font-medium">{section?.sectionName}</span>
              <FiChevronDown
                className={`transition-transform duration-300 ${
                  activeStatus === section?._id ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Subsections */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                activeStatus === section?._id ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="flex flex-col gap-1 pb-2">
                {section.subSection.map((topic, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                      );
                      setVideoBarActive(topic?._id);
                    }}
                    className={`flex items-center gap-3 px-6 py-2 cursor-pointer rounded-md transition
                      ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 text-richblack-900 font-medium"
                          : "bg-transparent text-richblack-200 hover:bg-richblack-800"
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      readOnly
                      className="accent-yellow-400"
                    />
                    <span className="truncate">{topic.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
