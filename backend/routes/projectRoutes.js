const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  createProject,
  importGithubProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  updateProject,
} = require("../controllers/projectController");

const router = express.Router();

// Apply auth middleware to all project routes
router.use(authMiddleware.protect);

// CREATE
router.post("/", createProject);

//  IMPORT GITHUB
router.post("/import", importGithubProject);

// GET ALL
router.get("/", getAllProjects);

// GET ONE
router.get("/:id", getProjectById);

// DELETE
router.delete("/:id", deleteProject);

// UPDATE
router.put("/:id", updateProject);

module.exports = router;
