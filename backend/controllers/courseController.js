const Course = require("../models/Course");

const normalizeSlug = (value) => String(value || "").trim().toLowerCase();

const buildCourseQuery = (req) => {
  const query = {};
  const category = normalizeSlug(req.query.category);
  const level = normalizeSlug(req.query.level);
  const badge = String(req.query.badge || "").trim();

  if (category) {
    query.category = category;
  }

  if (level) {
    query.level = level;
  }

  if (badge) {
    query.badge = badge;
  }

  return query;
};

const getCourses = async (req, res) => {
  try {
    const query = buildCourseQuery(req);

    const courses = await Course.find(query)
      .sort({ category: 1, order: 1, title: 1 })
      .lean();

    return res.json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load learning courses.",
    });
  }
};

const getCourseBySlug = async (req, res) => {
  try {
    const slug = normalizeSlug(req.params.slug);

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Course slug is required.",
      });
    }

    const course = await Course.findOne({ slug }).lean();

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Learning course not found.",
      });
    }

    return res.json({
      success: true,
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load the requested course.",
    });
  }
};

const getCoursesByCategory = async (req, res) => {
  try {
    const category = normalizeSlug(req.params.category);

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required.",
      });
    }

    const courses = await Course.find({ category })
      .sort({ order: 1, title: 1 })
      .lean();

    return res.json({
      success: true,
      category,
      count: courses.length,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load courses for the selected category.",
    });
  }
};

const createCourse = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      slug: normalizeSlug(req.body.slug),
      category: normalizeSlug(req.body.category),
    };

    const course = await Course.create(payload);

    return res.status(201).json({
      success: true,
      course,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create course.",
    });
  }
};

module.exports = {
  getCourses,
  getCourseBySlug,
  getCoursesByCategory,
  createCourse,
};
