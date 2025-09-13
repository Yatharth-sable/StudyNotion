const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  courses: [   // ✅ make it plural + array
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    }
  ],
}, { timestamps: true }); // optional but recommended

module.exports = mongoose.model("Category", categorySchema);
