const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const { title, description, techStack, githubUrl, liveUrl, thumbnail } = req.body;

    const newProject = new Project({
      title,
      description,
      techStack,
      githubUrl,
      liveUrl,
      thumbnail,
      userId: req.user?._id,
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      project: newProject,
    });

  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// 🔥 IMPORT FROM GITHUB
const importGithubProject = async (req, res) => {
  try {
    const { repo } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    //  DUPLICATE CHECK (by github URL + userId)
    const exists = await Project.findOne({ githubUrl: repo.html_url, userId });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Already imported",
      });
    }

    const newProject = new Project({
      title: repo.name,
      description: repo.description || "No description",
      techStack: repo.language ? [repo.language] : [],
      githubUrl: repo.html_url,
      userId,
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      project: newProject,
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};

//  GET ALL - filter by logged-in user
const getAllProjects = async (req, res) => {
  try {
    const userId = req.user?._id;
    const projects = await Project.find({ userId }).sort({ createdAt: -1 });

    res.json({ success: true, projects });

  } catch {
    res.status(500).json({ success: false });
  }
};

//  GET ONE - only owner's project
const getProjectById = async (req, res) => {
  try {
    const userId = req.user?._id;
    const project = await Project.findOne({ _id: req.params.id, userId });

    if (!project) return res.status(404).json({ success: false });

    res.json({ success: true, project });

  } catch {
    res.status(500).json({ success: false });
  }
};

// DELETE - only owner's project
const deleteProject = async (req, res) => {
  try {
    const userId = req.user?._id;
    await Project.findOneAndDelete({ _id: req.params.id, userId });
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
};

// UPDATE - only owner's project
const updateProject = async (req, res) => {
  try {
    const userId = req.user?._id;
    const updated = await Project.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );

    res.json({ success: true, project: updated });
  } catch {
    res.status(500).json({ success: false });
  }
};

module.exports = {
  createProject,
  importGithubProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  updateProject,
};