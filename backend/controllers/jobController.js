const JobApplication = require("../models/JobApplication");
const Job = require("../models/Job");

/**
 * Save a job application
 * POST /api/jobs/apply
 */
const applyToJob = async (req, res) => {
  try {
    const { jobId, company, role, matchPercentage, applyLink, status } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!company || !role || !applyLink) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: company, role, applyLink",
      });
    }

    // Check if already applied
    const existingApplication = await JobApplication.findOne({
      userId,
      company,
      role,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied to this job",
      });
    }

    const newApplication = new JobApplication({
      userId,
      jobId: jobId || null,
      company,
      role,
      matchPercentage: matchPercentage || 0,
      applyLink,
      status: status || "Applied",
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Application saved successfully",
      application: newApplication,
    });
  } catch (error) {
    console.error("Error saving application:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save application",
    });
  }
};

/**
 * Get user's job applications
 * GET /api/jobs/my-applications
 */
const getMyApplications = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const applications = await JobApplication.find({ userId })
      .sort({ appliedAt: -1 })
      .lean();

    res.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

/**
 * Update application status
 * PATCH /api/jobs/applications/:applicationId/status
 */
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { applicationId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!status || !["Applied", "Interview", "Offered", "Rejected", "Saved"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const application = await JobApplication.findOneAndUpdate(
      { _id: applicationId, userId },
      { status },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.json({
      success: true,
      message: "Status updated successfully",
      application,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};

module.exports = {
  applyToJob,
  getMyApplications,
  updateApplicationStatus,
};
