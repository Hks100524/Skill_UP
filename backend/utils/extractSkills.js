// Comprehensive technical skills database
const technicalSkills = {
  frontend: [
    "React",
    "Vue.js",
    "Angular",
    "Svelte",
    "Next.js",
    "Nuxt",
    "Flutter",
    "React Native",
    "HTML",
    "CSS",
    "Sass",
    "Tailwind",
    "Tailwind CSS",
    "Bootstrap",
    "Material UI",
    "Figma",
    "Framer",
    "Accessibility",
    "Redux",
    "MobX",
    "Zustand",
    "Webpack",
    "Vite",
    "Jest",
  ],
  backend: [
    "Node.js",
    "Express",
    "Express.js",
    "Django",
    "Flask",
    "FastAPI",
    "Spring Boot",
    "Java",
    "Python",
    "C#",
    ".NET",
    "Ruby",
    "Rails",
    "PHP",
    "Laravel",
    "Go",
    "Rust",
    "Kotlin",
  ],
  database: [
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Firebase",
    "DynamoDB",
    "Cassandra",
    "Neo4j",
    "Elasticsearch",
    "SQL",
    "NoSQL",
  ],
  devops: [
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "GCP",
    "Google Cloud",
    "Heroku",
    "Vercel",
    "Netlify",
    "Jenkins",
    "GitLab CI",
    "GitHub Actions",
    "CircleCI",
    "Terraform",
  ],
  tools: [
    "Git",
    "GitHub",
    "GitLab",
    "Bitbucket",
    "Jira",
    "Slack",
    "Postman",
    "REST APIs",
    "GraphQL",
    "API",
    "APIs",
    "Agile",
    "Scrum",
    "Asana",
  ],
  other: [
    "JavaScript",
    "TypeScript",
    "Testing",
    "Performance",
    "System Design",
    "Microservices",
    "Design Patterns",
    "Machine Learning",
    "AI",
    "ML",
    "TensorFlow",
    "PyTorch",
    "Data Science",
    "Analytics",
    "Web Development",
  ],
};

// Flatten and create case-insensitive lookup
const createSkillsMap = () => {
  const map = new Map();
  Object.values(technicalSkills).forEach((skillArray) => {
    skillArray.forEach((skill) => {
      map.set(skill.toLowerCase(), skill);
    });
  });
  return map;
};

const skillsMap = createSkillsMap();

const normalizeForMatching = (value) =>
  String(value || "")
    .toLowerCase()
    // keep only letters + numbers so "node.js" => "nodejs", ".net" => "net"
    .replace(/[^a-z0-9]+/g, "");

/**
 * Extract skills from resume text
 * @param {string} resumeText - Raw text from resume
 * @returns {Array} - Array of detected skills
 */
const extractSkills = (resumeText) => {
  if (!resumeText || typeof resumeText !== "string") {
    return [];
  }

  const detectedSkills = new Set();
  const normalizedText = normalizeForMatching(resumeText);

  skillsMap.forEach((originalSkill, skillLower) => {
    const normalizedSkill = normalizeForMatching(skillLower);
    if (normalizedSkill && normalizedText.includes(normalizedSkill)) {
      detectedSkills.add(originalSkill);
    }
  });

  return Array.from(detectedSkills).sort((a, b) => a.localeCompare(b));
};

/**
 * Get skill categories from detected skills
 * @param {Array} skills - Array of detected skills
 * @returns {Object} - Categorized skills
 */
const categorizeSkills = (skills) => {
  const categories = {
    frontend: [],
    backend: [],
    database: [],
    devops: [],
    tools: [],
    other: [],
  };

  skills.forEach((skill) => {
    if (technicalSkills.frontend.includes(skill)) {
      categories.frontend.push(skill);
    } else if (technicalSkills.backend.includes(skill)) {
      categories.backend.push(skill);
    } else if (technicalSkills.database.includes(skill)) {
      categories.database.push(skill);
    } else if (technicalSkills.devops.includes(skill)) {
      categories.devops.push(skill);
    } else if (technicalSkills.tools.includes(skill)) {
      categories.tools.push(skill);
    } else {
      categories.other.push(skill);
    }
  });

  return categories;
};

module.exports = {
  extractSkills,
  categorizeSkills,
  technicalSkills,
};
