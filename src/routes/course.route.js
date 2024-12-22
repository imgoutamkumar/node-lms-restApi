const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const {
  createCourse,
  allCourses,
  courseDetailsById,
  courseUpdateById,
  courseDeleteById,
  createReview,
  allReviewsByCourseIdandUserId,
} = require("../controllers/course.controller");
const router = express.Router();

router.post("/create", verifyToken, createCourse);
router.get("/all-courses", allCourses);
router.get("/details/:id", courseDetailsById);
router.put("/update/:id", verifyToken, courseUpdateById);

router.delete("/delete/:id", verifyToken, courseDeleteById);
router.put("/:id/review", verifyToken, createReview);
router.get("/:id/reviews", verifyToken, allReviewsByCourseIdandUserId);

module.exports = router;
