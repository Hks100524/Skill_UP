const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const connectDB = require("../config/db");
const AptitudeQuestion = require("../models/AptitudeQuestion");
const aptitudeQuestions = require("./aptitudeQuestions");
const mockTestQuestions = require("./mockTestQuestions");

const seedAptitudeQuestions = async () => {
  try {
    await connectDB();

    await AptitudeQuestion.deleteMany({
      category: { $in: ["quantitative", "logical", "verbal", "technical", "mock-test"] },
    });

    await AptitudeQuestion.insertMany([...aptitudeQuestions, ...mockTestQuestions]);

    console.log(
      `Seeded ${aptitudeQuestions.length + mockTestQuestions.length} aptitude and mock test questions.`,
    );

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Aptitude seed failed:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedAptitudeQuestions();
