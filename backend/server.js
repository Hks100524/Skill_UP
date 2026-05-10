const express = require("express");
const cors = require("cors");

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const aiRoutes = require("./routes/aiRoutes");
const aptitudeRoutes = require("./routes/aptitudeRoutes");
const jobRoutes = require("./routes/jobRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const chatRoutes = require("./routes/chatRoutes");
const excelQuestionRoutes = require("./routes/excelQuestionRoutes"); // excel question upload route imported here

// ðŸ”¥ SAFE IMPORT (IMPORTANT)
let courseRoutes;

try {
  courseRoutes = require("./routes/courseRoutes");
} catch (err) {
  console.log("Course routes not found âŒ");
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/aptitude", aptitudeRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/excel", excelQuestionRoutes); //excel question upload route used here 

// ðŸ”¥ SAFE USE (NO CRASH)
if (courseRoutes) {
  app.use("/api/courses", courseRoutes);
}

// Test Route
app.get("/", (req, res) => {
  res.send("Skill_UP Backend Running ðŸš€");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
