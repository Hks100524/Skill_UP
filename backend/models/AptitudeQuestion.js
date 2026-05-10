const mongoose = require("mongoose");

const aptitudeQuestionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    group: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator(value) {
          return Array.isArray(value) && value.length === 4;
        },
        message: "Each aptitude question must have exactly 4 options.",
      },
    },
    correctAnswer: {
      type: String,
      required: true,
      trim: true,
    },
    explanation: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

aptitudeQuestionSchema.index({ category: 1, topic: 1 });

module.exports = mongoose.model("AptitudeQuestion", aptitudeQuestionSchema);
