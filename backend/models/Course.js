const mongoose = require("mongoose");

const codeExampleSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      trim: true,
      default: "",
    },
    language: {
      type: String,
      trim: true,
      default: "text",
    },
    code: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false },
);

const sectionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    sidebarLabel: {
      type: String,
      trim: true,
      default: "",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: [String],
      default: [],
    },
    bulletPoints: {
      type: [String],
      default: [],
    },
    codeExample: {
      type: codeExampleSchema,
      default: null,
    },
    notes: {
      type: [String],
      default: [],
    },
  },
  { _id: false },
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      enum: [
        "web-development",
        "programming-languages",
        "data-science-ai",
        "backend-development",
        "mobile-development",
        "devops-cloud",
      ],
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    badge: {
      type: String,
      trim: true,
      default: "Tutorial",
    },
    level: {
      type: String,
      trim: true,
      default: "beginner",
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    sections: {
      type: [sectionSchema],
      validate: {
        validator(value) {
          return Array.isArray(value) && value.length >= 5;
        },
        message: "Each course must have at least five syllabus sections.",
      },
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

courseSchema.index({ category: 1, order: 1, title: 1 });

module.exports = mongoose.model("Course", courseSchema);
