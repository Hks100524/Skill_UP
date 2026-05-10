/**
 * Detect job role based on skills and keywords
 * @param {Array} skills - Array of detected skills
 * @param {string} resumeText - Raw resume text
 * @returns {string} - Detected job role
 */
const detectRole = (skills, resumeText = "") => {
  const textLower = (resumeText || "").toLowerCase();
  const skillsLower = skills.map((s) => s.toLowerCase());

  // Define role patterns
  const rolePatterns = [
    {
      name: "Frontend Developer",
      keywords: ["frontend", "ui", "web development"],
      skills: ["React", "Vue.js", "Angular", "HTML", "CSS", "Tailwind"],
      minSkillsNeeded: 2,
    },
    {
      name: "Backend Developer",
      keywords: ["backend", "api", "server", "infrastructure"],
      skills: ["Node.js", "Express", "Python", "Django", "Java", "Spring Boot"],
      minSkillsNeeded: 2,
    },
    {
      name: "Full Stack Developer",
      keywords: ["full stack", "fullstack", "mern", "mean"],
      skills: [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "JavaScript",
        "TypeScript",
      ],
      minSkillsNeeded: 3,
    },
    {
      name: "Mobile Developer",
      keywords: ["mobile", "ios", "android", "cross-platform"],
      skills: [
        "React Native",
        "Flutter",
        "Swift",
        "Kotlin",
        "Mobile",
        "iOS",
        "Android",
      ],
      minSkillsNeeded: 2,
    },
    {
      name: "AI/ML Engineer",
      keywords: [
        "machine learning",
        "ai",
        "artificial intelligence",
        "data science",
      ],
      skills: ["Python", "TensorFlow", "PyTorch", "ML", "Machine Learning"],
      minSkillsNeeded: 2,
    },
    {
      name: "DevOps Engineer",
      keywords: [
        "devops",
        "cloud",
        "infrastructure",
        "deployment",
        "containerization",
      ],
      skills: ["Docker", "Kubernetes", "AWS", "Azure", "CI/CD"],
      minSkillsNeeded: 2,
    },
    {
      name: "Cloud Engineer",
      keywords: ["cloud", "aws", "azure", "gcp", "cloud architect"],
      skills: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform"],
      minSkillsNeeded: 2,
    },
    {
      name: "Data Scientist",
      keywords: ["data scientist", "data science", "analytics", "big data"],
      skills: ["Python", "SQL", "Machine Learning", "Data", "Analytics"],
      minSkillsNeeded: 2,
    },
    {
      name: "UI/UX Designer",
      keywords: ["ui", "ux", "design", "designer", "figma"],
      skills: ["Figma", "UI", "UX", "Design", "Accessibility"],
      minSkillsNeeded: 2,
    },
    {
      name: "QA Engineer",
      keywords: ["qa", "testing", "quality assurance", "test automation"],
      skills: ["Testing", "Jest", "Selenium", "QA", "Automation"],
      minSkillsNeeded: 1,
    },
  ];

  // Score each role pattern
  const roleScores = rolePatterns.map((pattern) => {
    let score = 0;

    // Check for keyword matches (high weight)
    const keywordMatches = pattern.keywords.filter((keyword) =>
      textLower.includes(keyword)
    ).length;
    score += keywordMatches * 10;

    // Check for skill matches
    const skillMatches = pattern.skills.filter((skill) =>
      skillsLower.includes(skill.toLowerCase())
    ).length;

    // Only consider if minimum skills threshold is met
    if (skillMatches >= pattern.minSkillsNeeded) {
      score += skillMatches * 5;
    } else {
      score = 0; // Reset if minimum threshold not met
    }

    return {
      role: pattern.name,
      score: score,
      matchedSkills: skillMatches,
    };
  });

  // Sort by score and return highest
  const sortedRoles = roleScores.sort((a, b) => b.score - a.score);

  // If best match has score > 0, return it; otherwise return generic role
  if (sortedRoles[0].score > 0) {
    return sortedRoles[0].role;
  }

  // Fallback logic: if we have some skills, make educated guess
  if (skills.length > 0) {
    if (
      skillsLower.includes("react") ||
      skillsLower.includes("vue.js") ||
      skillsLower.includes("angular")
    ) {
      return "Frontend Developer";
    }
    if (
      skillsLower.includes("node.js") ||
      skillsLower.includes("python") ||
      skillsLower.includes("java")
    ) {
      return "Backend Developer";
    }
    if (skillsLower.includes("javascript") || skillsLower.includes("python")) {
      return "Full Stack Developer";
    }
  }

  return "Software Developer";
};

module.exports = { detectRole };
