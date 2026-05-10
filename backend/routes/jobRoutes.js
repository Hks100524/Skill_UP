const express = require("express");
const multer = require("multer");
const { analyzeResume } = require("../controllers/aiController");
const {
  applyToJob,
  getMyApplications,
  updateApplicationStatus,
} = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only PDF and DOCX files are allowed."
        )
      );
    }
  },
});

/**
 * POST /api/jobs/analyze-resume
 * Upload resume and get job recommendations
 * Body: multipart/form-data with 'resume' file
 * Response: { success, data: { detectedRole, experienceLevel, extractedSkills, matchingTechnologies, recommendedJobs } }
 */
router.post("/analyze-resume", upload.single("resume"), analyzeResume);

/**
 * POST /api/jobs/apply
 * Save a job application (protected)
 */
router.post("/apply", authMiddleware.protect, applyToJob);

/**
 * GET /api/jobs/my-applications
 * Get user's job applications (protected)
 */
router.get("/my-applications", authMiddleware.protect, getMyApplications);

/**
 * PATCH /api/jobs/applications/:applicationId/status
 * Update application status (protected)
 */
router.patch("/applications/:applicationId/status", authMiddleware.protect, updateApplicationStatus);

router.use((err, req, res, next) => {
    
  // File type / fileFilter errors
  if (err && err.message && err.message.includes("Invalid file type")) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Multer size limit errors
  if (err && err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File size limit exceeded. Max allowed is 10MB.",
    });
  }

  // General multer/unexpected upload errors
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Failed to upload resume.",
    });
  }

  return next(err);
});

module.exports = router;
