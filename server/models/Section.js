const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,   // ✅ ensure every section has a name
    trim: true,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
}, { timestamps: true }); // ✅ track createdAt & updatedAt

module.exports = mongoose.model("Section", sectionSchema);
