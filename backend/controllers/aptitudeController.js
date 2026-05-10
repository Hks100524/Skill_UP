const AptitudeQuestion = require("../models/AptitudeQuestion");
const AptitudeAttempt = require("../models/AptitudeAttempt");
const { normalizeCategory } = require("../utils/categoryNormalization");

const toBoolean = (value) =>
  ["1", "true", "yes", "on"].includes(String(value).trim().toLowerCase());

const getAllQuestions = async (req, res) => {
  try {
    const category = (req.query.category || "").trim().toLowerCase();
    const topic = (req.query.topic || "").trim().toLowerCase();
    const group = (req.query.group || "").trim();
    const limitValue = Number.parseInt(req.query.limit, 10);
    const randomize = toBoolean(req.query.random);

    const query = {};

    if (category) {
      query.category = category;
    }

    if (topic) {
      query.topic = topic;
    }

    if (group) {
      query.group = group;
    }

    const hasLimit = !Number.isNaN(limitValue) && limitValue > 0;
    let questions = [];
    let totalCount = 0;

    if (randomize) {
      totalCount = await AptitudeQuestion.countDocuments(query);
      const sampleSize = hasLimit ? Math.min(limitValue, totalCount) : totalCount;

      if (sampleSize > 0) {
        questions = await AptitudeQuestion.aggregate([
          { $match: query },
          { $sample: { size: sampleSize } },
        ]);
      }
    } else {
      let request = AptitudeQuestion.find(query).sort({ createdAt: 1 }).lean();

      if (hasLimit) {
        request = request.limit(limitValue);
      }

      questions = await request;
      totalCount = questions.length;
    }

    res.json({
      success: true,
      count: questions.length,
      totalCount,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load aptitude questions.",
    });
  }
};

const getQuestionsByTopic = async (req, res) => {
  try {
    const topic = (req.params.topic || "").trim().toLowerCase();
    const category = (req.query.category || "").trim().toLowerCase();
    const group = (req.query.group || "").trim();

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required.",
      });
    }

    const query = { topic };

    if (category) {
      query.category = category;
    }

    if (group) {
      query.group = group;
    }

    const questions = await AptitudeQuestion.find(query)
      .sort({ createdAt: 1 })
      .lean();

    res.json({
      success: true,
      topic,
      category: category || null,
      group: group || null,
      count: questions.length,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load aptitude questions.",
    });
  }
};

/**
 * Save aptitude attempt
 * POST /api/aptitude/save-attempt
 */
const saveAttempt = async (req, res) => {
  try {
    const { category, topic, score, totalQuestions, correctAnswers, timeTaken } =
      req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!category || score === undefined || !totalQuestions) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: category, score, totalQuestions",
      });
    }

    // Normalize category to proper enum value
    const normalizedCategory = normalizeCategory(category);

    // Calculate accuracy
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

    const newAttempt = new AptitudeAttempt({
      userId,
      category: normalizedCategory,
      topic: topic || null,
      score,
      totalQuestions,
      correctAnswers: correctAnswers || 0,
      accuracy,
      timeTaken: timeTaken || 0,
    });

    await newAttempt.save();

    res.status(201).json({
      success: true,
      message: "Attempt saved successfully",
      attempt: newAttempt,
    });
  } catch (error) {
    console.error("Error saving attempt:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save attempt",
    });
  }
};

module.exports = {
  getAllQuestions,
  getQuestionsByTopic,
  saveAttempt,
};

