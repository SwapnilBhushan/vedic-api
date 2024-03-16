const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    enrollment: { type: Number, required: true, default: "0" },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    contactNumber: {
      type: String,
      default: '00000000000',
    },
    isHidden: { type: Boolean, required: true, default: false },
    isBookmarked: { type: Boolean, required: true, default: false },
    isReported: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
);

const Courses = mongoose.model("Courses", courseSchema);

module.exports = { Courses };
