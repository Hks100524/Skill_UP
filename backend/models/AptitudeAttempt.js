const mongoose = require("mongoose");

const aptitudeAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["Quantitative", "Logical Reasoning", "Verbal Ability", "Technical", "Mock Tests"],
      required: true,
    },
    topic: {
      type: String,
      default: null,
    },
    score: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctAnswers: {
      type: Number,
      required: true,
    },
    accuracy: {
      type: Number,
      required: true,
    },
    timeTaken: {
      type: Number,
      default: 0, // in seconds
    },
    attemptDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AptitudeAttempt", aptitudeAttemptSchema);
