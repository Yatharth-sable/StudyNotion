import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { updateCompletedLectures } from "../../../Slice/viewCourseSlice";
import IconBtn from "../../common/IconBtn";
import { markLectureAsComplete } from "../../../services/operation/courseDetailsApi";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);
  const location = useLocation();

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load video data
  useEffect(() => {
    const setVideoSpecificDetails = () => {
      if (!courseSectionData.length) return;

      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-course");
      } else {
        const filteredSection = courseSectionData.find(
          (course) => course._id === sectionId
        );
        const filteredVideo = filteredSection?.subSection.find(
          (data) => data._id === subSectionId
        );
        setVideoData(filteredVideo);
        setVideoEnded(false);
      }
    };
    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname]);

  // Navigation helpers
  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
      );
    return currentSectionIndex === 0 && currentSubSectionIndex === 0;
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
      );
    const noOfSubSection =
      courseSectionData[currentSectionIndex].subSection.length;
    return (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSection - 1
    );
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
      );
    const noOfSubSection =
      courseSectionData[currentSectionIndex].subSection.length;

    if (currentSubSectionIndex !== noOfSubSection - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
      );

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  // Mark lecture complete
  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId, subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col bg-richblack-900 text-white w-full min-h-screen">
      {!videoData ? (
        <div className="flex items-center justify-center h-full text-2xl font-bold">
          No Video Found
        </div>
      ) : (
        <>
          {/* Video Player */}
          <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden bg-black">
            <video
              ref={videoRef}
              src={videoData?.videoUrl}
              controls
              className="absolute top-0 left-0 w-full h-full object-cover bg-black rounded-lg"
              onEnded={() => setVideoEnded(true)}
            />
          </div>

          {/* Video Actions */}
          {videoEnded && (
            <div className="flex flex-wrap gap-4 items-center justify-between p-4 bg-richblack-800 border-t border-richblack-700">
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onClick={handleLectureCompletion}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="bg-yellow-200 text-black px-4 py-2 rounded-md font-semibold"
                />
              )}

              <IconBtn
                disabled={loading}
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    videoRef.current.play();
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="px-4 py-2 bg-richblack-700 rounded-md text-sm"
              />

              <div className="flex gap-3">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="px-4 py-2 rounded-md bg-richblack-700 hover:bg-richblack-600"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="px-4 py-2 rounded-md bg-yellow-200 text-black font-semibold hover:bg-yellow-300"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Video Info */}
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-white mb-2">
              {videoData.title}
            </h1>
            <p className="text-richblack-200 text-sm leading-6">
              {videoData.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoDetails;
