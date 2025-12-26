const User = require("../models/User");
const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

// create the section
// create the section
exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    // check the validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Fill all the fields for validation",
      });
    }

    // ✅ check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // ✅ create section and link it to the course
    const newSection = await Section.create({ 
      sectionName,
      courseId   // store reference for safety
    });

    // ✅ push section into course content
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: newSection._id },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    // ✅ return response
    return res.status(200).json({
      success: true,
      message: "Course Section Created successfully",
      updatedCourseDetails,
    });
  } catch (err) {
    console.error("CREATE SECTION ERROR:", err.message);
    return res.status(500).json({
      success: false,
      message: "Section creation failed, try again later",
      error: err.message,
    });
  }
};


// Update the section
exports.updateSection = async (req, res) => {
  try {
    // Data input
    const { sectionName, sectionId, courseid } = req.body;

    // Validate data
    if (!sectionName || !sectionId || !courseid) {
      return res.status(400).json({
        success: false,
        message: "Missing properties for Update section",
      });
    }

    // Update section
    await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    // Fetch updated course (with populated sections & subsections)
    const updatedCourseDetails = await Course.findById(courseid)
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    // Return updated course
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      updatedCourseDetails: updatedCourseDetails,
    });
  } catch (err) {
    console.error("UPDATE SECTION ERROR:", err.message);
    res.status(400).json({
      success: false,
      message: "Section update failed",
    });
  }
};

// delete section
// delete section
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;  // ✅ send both from frontend

    // check if section exists
    const section = await Section.findById(sectionId);  // ✅ fixed method
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found for delete",
      });
    }

     // delete the subsection
     
    // delete section
    await Section.findByIdAndDelete(sectionId);
     await SubSection.deleteMany({_id: {$in:section.subSection}});

    // remove section from course
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { courseContent: sectionId } },
      { new: true }
    )
      .populate({  
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      updatedCourseDetails,   // ✅ unified response
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Section deletion failed",
    });
  }
};
