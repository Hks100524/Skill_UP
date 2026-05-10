const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const connectDB = require("../config/db");
const Course = require("../models/Course");
const baseLearningCourses = require("./learningCourses");
const { enhanceLearningCourses } = require("./learningSyllabusOverrides");

const seedLearningCourses = async () => {
  try {
    await connectDB();

    const learningCourses = enhanceLearningCourses(baseLearningCourses);

    await Course.deleteMany({});
    await Course.insertMany(learningCourses);

    console.log(`Seeded ${learningCourses.length} learning courses.`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Learning course seed failed:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedLearningCourses();
