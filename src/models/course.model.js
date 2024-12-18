const mongoose = require("mongoose");
const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isFreePreview: {
    type: Boolean,
    required: true,
    default: false,
  },
  videoUrl: {
    type: String,
    //required: true,
  },
  public_id: {
    type: String,
    //required: true,
  },
  uploaded_at: {
    type: Date,
    default: Date.now(),
  },
});
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    level: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    primaryLanguage: {
      type: String,
      require: true,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
      require: true,
    },
    objectives: {
      type: String,
      require: true,
    },
    welcomeMessage: {
      type: String,
      require: true,
    },
    imageUrl: {
      type: String,
      require: true,
    },
    lectures: [lectureSchema],

    students: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    creator_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    coupanCode: {
      type: String,
    },
    discount: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Course = mongoose.model("courses", courseSchema);
module.exports = Course;
