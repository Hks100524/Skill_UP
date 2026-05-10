const Job = require("../models/Job");
const { parseResume, cleanText } = require("../utils/parseResume");
const { extractSkills } = require("../utils/extractSkills");
const { detectRole } = require("../utils/detectRole");
const { detectExperienceLevel } = require("../utils/detectExperienceLevel");
const { matchJobs } = require("../utils/matchJobs");
const {
  getOpenRouterClient,
  getOpenRouterModel,
} = require("../utils/openRouterClient");
const {
  generateLocalAIResponse,
  isOpenRouterAuthError,
} = require("../utils/aiFallback");

const askAI = async (req, res) => {
  try {
    const { message } = req.body;
    const openRouter = getOpenRouterClient();

    const completion = await openRouter.chat.completions.create({
      model: getOpenRouterModel(),
      messages: [
        {
          role: "system",
          content:
            "You are Skill_UP AI assistant helping students with coding, aptitude, careers, and learning.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.status(200).json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    if (isOpenRouterAuthError(error)) {
      console.warn("OpenRouter auth failed. Returning local fallback reply.");
      return res.status(200).json({
        reply: generateLocalAIResponse(req.body?.message),
        usedFallback: true,
      });
    }

    console.log(error);
    res.status(500).json({
      error:
        error.message === "OPENROUTER_API_KEY is not configured"
          ? "AI service not configured"
          : "AI failed",
    });
  }
};

/**
 * Analyze resume and provide job recommendations
 * POST /api/jobs/analyze-resume
 */
const analyzeResume = async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded. Please upload a resume.",
      });
    }

    const { originalname, mimetype, buffer } = req.file;

    // Validate file type
    const validMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validMimeTypes.some((type) => mimetype.includes(type))) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Only PDF and DOCX files are supported.",
      });
    }

    // Parse resume
    let resumeText = await parseResume(buffer, mimetype);
    resumeText = cleanText(resumeText);

    if (!resumeText || resumeText.length < 50) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from resume. Please try another file.",
      });
    }

    // Extract skills
    const extractedSkills = extractSkills(resumeText);

    if (extractedSkills.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "No technical skills detected in resume. Please ensure your resume contains relevant skills.",
      });
    }

    // Detect role
    const detectedRole = detectRole(extractedSkills, resumeText);

    // Detect experience level
    const experienceLevel = detectExperienceLevel(resumeText, extractedSkills);

    // Get matching technologies (technologies that appear in resume but can be learned)
    const suggestedTechnologies = ["Next.js", "GraphQL", "Tailwind CSS", "Vite"];

    // Fetch all active jobs
    const allJobs = await Job.find({ isActive: true }).limit(50);

    // Match jobs
    const recommendedJobs = matchJobs(
      allJobs,
      extractedSkills,
      detectedRole,
      experienceLevel
    ).slice(0, 8); // Return top 8 matches

    // Format response to match frontend expectations
    const response = {
      success: true,
      data: {
        detectedRole,
        experienceLevel,
        extractedSkills,
        matchingTechnologies: suggestedTechnologies,
        recommendedJobs: recommendedJobs.map((job) => ({
          // Spec fields
          matchPercentage: job.matchPercentage,
          requiredSkills: job.requiredSkills || [],

          // Existing frontend fields (keep for compatibility)
          company: job.company,
          role: job.role,
          location: job.location,

          // Spec-required fields
          jobType: job.jobType,
          salaryRange: job.salaryRange,

          // Existing frontend fields (compat)
          type: job.jobType,
          salary: job.salaryRange,
          match: job.matchPercentage,
          avatar: job.companyLogo || job.company.charAt(0),
          avatarClass:
            "from-[#ece8f6] via-[#d8d0ea] to-[#bda7df]",
          skills: job.requiredSkills || [],
          applyLink: job.applyLink,
        })),
      },
      message: `Found ${recommendedJobs.length} job recommendations based on your resume.`,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Resume analysis error:", error);

    // Handle specific errors
    if (error.message.includes("Empty file provided")) {
      return res.status(400).json({
        success: false,
        message: "Resume is empty. Please upload a valid PDF or DOCX resume.",
      });
    }

    if (error.message.includes("PDF parsing failed")) {
      return res.status(400).json({
        success: false,
        message: "Failed to parse PDF. Please try a different file.",
      });
    }
    if (error.message.includes("DOCX parsing failed")) {
      return res.status(400).json({
        success: false,
        message: "Failed to parse DOCX. Please try a different file.",
      });
    }
    if (error.message.includes("Unsupported file type")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error analyzing resume. Please try again.",
      error: error.message,
    });
  }
};

module.exports = { askAI, analyzeResume };
