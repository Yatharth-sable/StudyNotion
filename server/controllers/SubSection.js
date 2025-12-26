  const SubSection = require("../models/SubSection");
  const Section = require("../models/Section");
  const Course = require("../models/Course");
  const { uploadImageToCloudinary } = require("../utils/imageUploader");

  // =================== CREATE SUBSECTION ===================
  // =================== CREATE SUBSECTION ===================
  // =================== CREATE SUBSECTION ===================
  exports.createSubSection = async (req, res) => {
    try {
      const { sectionId, title, description, courseId } = req.body;
      const video = req.files.video;

      if (!sectionId || !title || !description || !video) {
        return res.status(404).json({
          success: false,
          message: "All Fields are Required",
        });
      }

      // Upload video
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );

      // Create new subsection
      const SubSectionDetails = await SubSection.create({
        title,
        timeDuration: `${uploadDetails.duration}`,
        description,
        videoUrl: uploadDetails.secure_url,
      });

      // Push subsection to Section
      await Section.findByIdAndUpdate(
        sectionId,
        { $push: { subSection: SubSectionDetails._id } },
        { new: true }
      );

      // ✅ Fetch updated course (with populated sections + subsections)
      const updatedCourse = await Course.findById(courseId)
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec();

      return res.status(200).json({
        success: true,
        message: "Subsection created successfully",
        updatedCourseDetails: updatedCourse,
      });
    } catch (error) {
      console.error("Error creating new sub-section:", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };

    
  // =================== UPDATE SUBSECTION ===================
  exports.updateSubSection = async (req, res) => {
    try {
      const { subSectionId, courseId, title, description } = req.body;

      const subSection = await SubSection.findById(subSectionId);
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        });
      }

      // Update fields
      if (title !== undefined) subSection.title = title;
      if (description !== undefined) subSection.description = description;

      // If new video is uploaded
      if (req.files && (req.files.video || req.files.videoFile)) {
        const video = req.files.video || req.files.videoFile;
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        );
        subSection.videoUrl = uploadDetails.secure_url;
        subSection.timeDuration = `${uploadDetails.duration}`;
      }

      await subSection.save();

      // ✅ Return updated course
      const updatedCourse = await Course.findById(courseId)
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec();

      return res.json({
        success: true,
        message: "SubSection updated successfully",
        updatedCourseDetails: updatedCourse,
      });
    } catch (error) {
      console.error("UPDATE SUBSECTION ERROR =>", error.message);
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the SubSection",
      });
    }
  };

  // =================== DELETE SUBSECTION ===================
  exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId, courseId } = req.body;

      // Remove subSection reference from section
      await Section.findByIdAndUpdate(
        sectionId,
        { $pull: { subSection: subSectionId } }
      );

      // Delete the subSection
      const subSection = await SubSection.findByIdAndDelete(subSectionId);
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        });
      }

      // ✅ Return updated course
      const updatedCourse = await Course.findById(courseId)
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec();

      return res.status(200).json({
        success: true,
        message: "Subsection deleted successfully",
        updatedCourseDetails: updatedCourse,
      });
    } catch (error) {
      console.error("DELETE SUBSECTION ERROR =>", error.message); 
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      });
    }
  };
