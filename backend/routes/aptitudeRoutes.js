const express = require("express");

const {
  getAllQuestions,
  getQuestionsByTopic,
  saveAttempt,
} = require("../controllers/aptitudeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/questions", getAllQuestions);
router.get("/questions/:topic", getQuestionsByTopic);

// Protected route to save attempt
router.post("/save-attempt", authMiddleware.protect, saveAttempt);

module.exports = router;
