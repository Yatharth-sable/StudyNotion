const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;

    console.log("userId:", userId);
    console.log("courseId:", courseId);
    console.log("subSectionId:", subSectionId);

    // 🔹 Check if subsection is valid
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({ success: false, error: "Invalid SubSection" });
    }

    // 🔹 Find or create CourseProgress
    let courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress) {
      console.log("No progress doc found, creating one...");
      courseProgress = await CourseProgress.create({
        courseId,
        userId,
        completedVideos: [],
      });
    }

    // 🔹 Check if already completed
    if (courseProgress.completedVideos.includes(subSectionId)) {
      return res.status(200).json({
        success: true,
        message: "Subsection already marked as completed",
        completedVideos: courseProgress.completedVideos,
      });
    }

    // 🔹 Mark subsection as completed
    courseProgress.completedVideos.push(subSectionId);
    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Course Progress Updated Successfully",
      completedVideos: courseProgress.completedVideos,
    });
  } catch (err) {
    console.error("updateCourseProgress error:", err);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
    