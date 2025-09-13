const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,   // ✅ every subsection should have a title
    trim: true,
  },
  timeDuration: {
    type: String,     // could also be Number if storing duration in seconds
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  videoUrl: {
    type: String,
    required: true,   // ✅ must have a video
  },
}, { timestamps: true }); // ✅ automatically add createdAt & updatedAt

module.exports = mongoose.model("SubSection", subSectionSchema);
