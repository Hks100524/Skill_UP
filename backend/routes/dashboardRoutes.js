const express = require("express");
const {
  getDashboard,
  getAptitudeStats,
  getJobApplications,
  getProjects,
} = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect all dashboard routes with auth middleware
router.use(authMiddleware.protect);

/**
 * GET /api/dashboard
 * Get complete dashboard data for logged-in user
 */
router.get("/", getDashboard);

/**
 * GET /api/dashboard/aptitude
 * Get only aptitude stats
 */
router.get("/aptitude", getAptitudeStats);

/**
 * GET /api/dashboard/jobs
 * Get only job application stats
 */
router.get("/jobs", getJobApplications);

/**
 * GET /api/dashboard/projects
 * Get only project data
 */
router.get("/projects", getProjects);

module.exports = router;
