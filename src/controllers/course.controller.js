const Course = require("../models/course.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const createCourse = async (req, res) => {
  const data = req.body;
  const creatorId = req.userId;
  const role = req.role;
  if (role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }

  try {
    const course = new Course(data);
    course.creator_id = creatorId;
    const saveCourse = await course.save();
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: saveCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const allCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      success: true,
      message: "All courses",
      courses: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const courseDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(400).json({
        success: false,
        message: "course does not exist with this Id",
      });
    }
    res.status(200).json({
      success: true,
      message: "Course details retrieved successfully.",
      course: course,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Some error occured",
    });
  }
};

const courseUpdateById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const data = req.body;
    const updatedCourse = await Course.updateOne(
      { _id: id, creator_id: userId },
      data
    );
    if (!updatedCourse) {
      return res.status(400).json({
        success: false,
        message: "course not found or unauthorized",
      });
    }
    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Some error occured",
    });
  }
};

const courseDeleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const course = await Course.deleteOne({ _id: id, creator_id: userId });

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "course not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Some error occured",
    });
  }
};

const createReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { comment } = req.body;
    const { id } = req.params;
    const course = await Course.findById(id);
    const review = {
      comment: comment,
      user: userId,
    };
    course.reviews.push(review);
    await course.save();
    res.status(200).json({
      success: true,
      message: "review created successfully",
      review: review,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Some error occured",
    });
  }
};

const allReviewsByCourseIdandUserId = async (req, res) => {
  try {
    const userId = req.userId;
    const courseId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not authenticated.",
        reviews: resReviewsData,
      });
    }
    const course = await Course.find(
      { _id: courseId }
      /* {
        reviews: {
          $elemMatch: { user: userId },
        },
      } */
    );
    const resReviewsData = course.reviews.map((review) => ({
      // This will contain only the reviews by the specified user
      ...review.toObject(), // Convert Mongoose document to plain object
      userName: user.name, // Add your extra data here
      userImage: user.image,
    }));
    res.status(200).json({
      success: true,
      message: "Course details retrieved successfully.",
      reviews: resReviewsData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Some error occured",
    });
  }
};

module.exports = {
  createCourse,
  allCourses,
  courseDetailsById,
  courseUpdateById,
  courseDeleteById,
  createReview,
  allReviewsByCourseIdandUserId,
};
