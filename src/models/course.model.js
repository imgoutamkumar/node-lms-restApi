const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    lectures: [
      {
        title: {
          type: String,
          required: true,
        },
        isFreePreview: {
          type: Boolean,
          required: true,
          default: false,
        },
        video: {
          type: String,
          required: true,
        },
        uploaded_at: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);
const Course = mongoose.model("courses", courseSchema);
module.exports = Course;
