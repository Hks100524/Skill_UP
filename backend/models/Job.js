const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Job role is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Job location is required"],
      trim: true,
    },
    jobType: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site"],
      default: "Hybrid",
    },
    salaryRange: {
      type: String,
      required: [true, "Salary range is required"],
      trim: true,
    },
    requiredSkills: {
      type: [String],
      required: [true, "Required skills must be provided"],
    },
    experienceLevel: {
      type: String,
      enum: ["Fresher", "Mid Level", "Senior"],
      default: "Mid Level",
    },
    applyLink: {
      type: String,
      required: [true, "Apply link is required"],
      trim: true,
    },
    companyLogo: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
