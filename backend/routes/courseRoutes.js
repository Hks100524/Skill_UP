const express = require("express");

const {
  createCourse,
  getCourseBySlug,
  getCourses,
  getCoursesByCategory,
} = require("../controllers/courseController");

const router = express.Router();

router.get("/", getCourses);
router.get("/category/:category", getCoursesByCategory);
router.get("/slug/:slug", getCourseBySlug);
router.post("/", createCourse);

module.exports = router;
