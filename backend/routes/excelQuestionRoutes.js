const express = require("express");

const router = express.Router();

const XLSX = require("xlsx");

const upload = require("../middleware/upload");

const AptitudeQuestion = require("../models/AptitudeQuestion");

router.post(
  "/upload-excel",
  upload.single("file"),

  async (req, res) => {

    try {

      // Read Excel File
      const workbook = XLSX.readFile(req.file.path);

      const sheetName = workbook.SheetNames[0];

      const sheetData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetName]
      );

      // Convert Excel Data
      const formattedData = sheetData.map((item) => ({

        category: item.category,

        group: item.group,

        topic: item.topic,

        question: item.question,

        options: [
          item.option1,
          item.option2,
          item.option3,
          item.option4,
        ],

        correctAnswer: item.correctAnswer,

        explanation: item.explanation,

        difficulty: item.difficulty,

      }));

      // Save to MongoDB
      await AptitudeQuestion.insertMany(formattedData);

      res.json({
        success: true,
        message: "Excel Questions Uploaded Successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        error: error.message,
      });

    }

  }
);

module.exports = router;