const AptitudeAttempt = require("../models/AptitudeAttempt");
const JobApplication = require("../models/JobApplication");
const Project = require("../models/Project");
const mongoose = require("mongoose");

/**
 * Get complete dashboard data for authenticated user
 * GET /api/dashboard
 */
const getDashboard = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const objectId = new mongoose.Types.ObjectId(userId);

    // Fetch aptitude stats
    const aptitudeStats = await getAptitudeStats(objectId);

    // Fetch job applications
    const jobApplications = await getJobApplications(objectId);

    // Fetch projects
    const projects = await getProjects(objectId);

    res.json({
      success: true,
      data: {
        aptitude: aptitudeStats,
        jobs: jobApplications,
        projects,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
};

/**
 * Get aptitude statistics for user
 */
const getAptitudeStats = async (userId) => {
  try {
    // Get attempts by category
    const categoryCounts = await AptitudeAttempt.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$category",
          attempts: { $sum: 1 },
          avgScore: { $avg: "$score" },
          avgAccuracy: { $avg: "$accuracy" },
          totalQuestions: { $sum: "$totalQuestions" },
          correctAnswers: { $sum: "$correctAnswers" },
        },
      },
    ]);

    // Get total attempts
    const totalAttempts = await AptitudeAttempt.countDocuments({ userId });

    // Get recent attempts (last 5)
    const recentAttempts = await AptitudeAttempt.find({ userId })
      .sort({ attemptDate: -1 })
      .limit(5)
      .lean();

    // Get overall stats
    const allAttempts = await AptitudeAttempt.find({ userId }).lean();
    const overallAvgAccuracy =
      allAttempts.length > 0
        ? Math.round(
            allAttempts.reduce((sum, a) => sum + a.accuracy, 0) /
              allAttempts.length
          )
        : 0;

    // Build category breakdown
    const categoryBreakdown = {
      Quantitative: {
        attempts: 0,
        avgAccuracy: 0,
        topicsCovered: 0,
      },
      "Logical Reasoning": {
        attempts: 0,
        avgAccuracy: 0,
        topicsCovered: 0,
      },
      "Verbal Ability": {
        attempts: 0,
        avgAccuracy: 0,
        topicsCovered: 0,
      },
      Technical: {
        attempts: 0,
        avgAccuracy: 0,
        topicsCovered: 0,
      },
      "Mock Tests": {
        attempts: 0,
        avgAccuracy: 0,
        topicsCovered: 0,
      },
    };

    categoryCounts.forEach((cat) => {
      if (categoryBreakdown[cat._id]) {
        categoryBreakdown[cat._id].attempts = cat.attempts;
        categoryBreakdown[cat._id].avgAccuracy = Math.round(cat.avgAccuracy);
        categoryBreakdown[cat._id].topicsCovered = cat.totalQuestions;
      }
    });

    return {
      totalAttempts,
      overallAvgAccuracy,
      categoryBreakdown,
      recentAttempts: recentAttempts.map((a) => ({
        category: a.category,
        topic: a.topic,
        score: a.score,
        accuracy: a.accuracy,
        date: a.attemptDate,
      })),
    };
  } catch (error) {
    console.error("Error fetching aptitude stats:", error);
    return {
      totalAttempts: 0,
      overallAvgAccuracy: 0,
      categoryBreakdown: {},
      recentAttempts: [],
    };
  }
};

/**
 * Get job applications for user
 */
const getJobApplications = async (userId) => {
  try {
    const applications = await JobApplication.find({ userId })
      .sort({ appliedAt: -1 })
      .limit(10)
      .lean();

    // Count by status
    const statusCounts = await JobApplication.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const stats = {
      applied: 0,
      interviews: 0,
      offered: 0,
      rejected: 0,
      saved: 0,
    };

    statusCounts.forEach((s) => {
      if (s._id === "Applied") stats.applied = s.count;
      if (s._id === "Interview") stats.interviews = s.count;
      if (s._id === "Offered") stats.offered = s.count;
      if (s._id === "Rejected") stats.rejected = s.count;
      if (s._id === "Saved") stats.saved = s.count;
    });

    // Get recently applied (last 4)
    const recentApplications = applications.slice(0, 4).map((app) => ({
      company: app.company,
      role: app.role,
      status: app.status,
      matchPercentage: app.matchPercentage,
      appliedAt: app.appliedAt,
    }));

    return {
      totalApplications: applications.length,
      stats,
      recentApplications,
    };
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return {
      totalApplications: 0,
      stats: {
        applied: 0,
        interviews: 0,
        offered: 0,
        rejected: 0,
        saved: 0,
      },
      recentApplications: [],
    };
  }
};

/**
 * Get projects for user
 */
const getProjects = async (userId) => {
  try {
    const projects = await Project.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    // Count github projects
    const githubCount = projects.filter((p) => p.githubUrl).length;

    return {
      totalProjects: projects.length,
      githubProjects: githubCount,
      recentProjects: projects.slice(0, 6).map((p) => ({
        title: p.title,
        description: p.description,
        techStack: p.techStack,
        githubUrl: p.githubUrl,
        liveUrl: p.liveUrl,
      })),
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      totalProjects: 0,
      githubProjects: 0,
      recentProjects: [],
    };
  }
};

module.exports = {
  getDashboard,
  getAptitudeStats,
  getJobApplications,
  getProjects,
};
