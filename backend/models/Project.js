const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    techStack: [
      {
        type: String,
      },
    ],
    githubUrl: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);