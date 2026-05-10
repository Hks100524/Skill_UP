require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("../models/Job");
const connectDB = require("../config/db");

const jobsData = [
  // ========== Frontend ==========
  {
    company: "Google India",
    role: "Senior Frontend Engineer",
    location: "Bangalore, India",
    jobType: "Hybrid",
    salaryRange: "20-35 LPA",
    requiredSkills: [
      "React",
      "TypeScript",
      "GraphQL",
      "Tailwind",
      "Performance",
    ],
    experienceLevel: "Senior",
    applyLink: "https://careers.google.com/jobs",
    companyLogo: "G",
    description:
      "Join Google's frontend team building innovative user experiences for billions of users.",
  },
  {
    company: "Microsoft India",
    role: "Full Stack Developer",
    location: "Hyderabad, India",
    jobType: "Remote",
    salaryRange: "18-30 LPA",
    requiredSkills: ["React", "Node.js", "Express", "GraphQL", "TypeScript"],
    experienceLevel: "Mid Level",
    applyLink: "https://careers.microsoft.com/jobs",
    companyLogo: "M",
    description:
      "Build scalable cloud solutions using modern web technologies and Azure services.",
  },
  {
    company: "Razorpay",
    role: "React Developer",
    location: "Pune, India",
    jobType: "Hybrid",
    salaryRange: "12-22 LPA",
    requiredSkills: ["React", "Redux", "REST APIs", "Testing", "JavaScript"],
    experienceLevel: "Mid Level",
    applyLink: "https://careers.razorpay.com/jobs",
    companyLogo: "R",
    description: "Build payment solutions using React and modern web stack.",
  },
  {
    company: "Swiggy",
    role: "SDE-2 Frontend",
    location: "Bangalore, India",
    jobType: "Hybrid",
    salaryRange: "18-28 LPA",
    requiredSkills: [
      "React",
      "TypeScript",
      "Webpack",
      "Performance",
      "Testing",
    ],
    experienceLevel: "Mid Level",
    applyLink: "https://careers.swiggy.in/jobs",
    companyLogo: "S",
    description:
      "Build high-performance frontend solutions for food delivery platform.",
  },
  {
    company: "Freshworks",
    role: "Frontend Engineer",
    location: "Chennai, India",
    jobType: "Hybrid",
    salaryRange: "10-18 LPA",
    requiredSkills: [
      "React",
      "Vue.js",
      "Figma",
      "Accessibility",
      "CSS",
    ],
    experienceLevel: "Mid Level",
    applyLink: "https://careers.freshworks.com/jobs",
    companyLogo: "F",
    description:
      "Create beautiful and accessible user interfaces for CRM platform.",
  },
  {
    company: "Flipkart",
    role: "UI Engineer",
    location: "Bangalore, India",
    jobType: "On-site",
    salaryRange: "15-25 LPA",
    requiredSkills: ["React", "Redux", "Performance", "Tailwind CSS", "Figma"],
    experienceLevel: "Mid Level",
    applyLink: "https://www.flipkartcareers.com/jobs",
    companyLogo: "F",
    description: "Build UI components for India's largest e-commerce platform.",
  },
  {
    company: "Zoho",
    role: "Frontend Developer",
    location: "Chennai, India",
    jobType: "On-site",
    salaryRange: "12-20 LPA",
    requiredSkills: ["React", "TypeScript", "Node.js", "Testing", "SQL"],
    experienceLevel: "Mid Level",
    applyLink: "https://www.zoho.com/careers/",
    companyLogo: "Z",
    description: "Develop business software solutions using modern web stack.",
  },
  {
    company: "PayPal India",
    role: "Frontend Architect",
    location: "Bangalore, India",
    jobType: "Remote",
    salaryRange: "35-55 LPA",
    requiredSkills: [
      "React",
      "TypeScript",
      "System Design",
      "Performance",
      "GraphQL",
    ],
    experienceLevel: "Senior",
    applyLink: "https://careers.pypl.com/",
    companyLogo: "P",
    description: "Design scalable frontend architecture for payment solutions.",
  },

  // ========== Backend ==========
  {
    company: "Amazon India",
    role: "Backend Developer",
    location: "Bangalore, India",
    jobType: "Hybrid",
    salaryRange: "20-35 LPA",
    requiredSkills: ["Java", "Python", "AWS", "System Design", "SQL"],
    experienceLevel: "Senior",
    applyLink: "https://www.amazon.jobs/en-in/",
    companyLogo: "A",
    description:
      "Build scalable backend services for world's largest e-commerce platform.",
  },
  {
    company: "Accenture",
    role: "Python Developer",
    location: "Bangalore, India",
    jobType: "Hybrid",
    salaryRange: "10-18 LPA",
    requiredSkills: ["Python", "Flask", "Django", "SQL", "Git"],
    experienceLevel: "Fresher",
    applyLink: "https://www.accenture.com/in-en/careers",
    companyLogo: "A",
    description: "Build scalable backend solutions using Python and web frameworks.",
  },
  {
    company: "IBM India",
    role: "DevOps Engineer",
    location: "Multiple Locations, India",
    jobType: "Hybrid",
    salaryRange: "16-26 LPA",
    requiredSkills: ["Docker", "Kubernetes", "Jenkins", "AWS", "Git"],
    experienceLevel: "Mid Level",
    applyLink: "https://www.ibm.com/careers/",
    companyLogo: "I",
    description:
      "Manage deployment pipelines and infrastructure for global clients.",
  },
  {
    company: "Deloitte India",
    role: "Cloud Engineer",
    location: "Gurgaon, India",
    jobType: "On-site",
    salaryRange: "18-28 LPA",
    requiredSkills: ["AWS", "Docker", "Kubernetes", "Terraform", "Python"],
    experienceLevel: "Mid Level",
    applyLink: "https://www2.deloitte.com/in/en/careers",
    companyLogo: "D",
    description:
      "Design and implement cloud infrastructure solutions for enterprises.",
  },

  // ========== Full Stack / MERN ==========
  {
    company: "Atlassian",
    role: "Full Stack Engineer",
    location: "Remote, India",
    jobType: "Remote",
    salaryRange: "25-45 LPA",
    requiredSkills: ["React", "Node.js", "MongoDB", "Express", "Docker"],
    experienceLevel: "Senior",
    applyLink: "https://www.atlassian.com/company/careers",
    companyLogo: "A",
    description:
      "Engineer innovative team collaboration tools with global impact.",
  },
  {
    company: "Booking.com India",
    role: "Senior Full Stack Engineer",
    location: "Gurugram, India",
    jobType: "Hybrid",
    salaryRange: "30-50 LPA",
    requiredSkills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "System Design",
    ],
    experienceLevel: "Senior",
    applyLink: "https://careers.booking.com/",
    companyLogo: "B",
    description: "Build travel platform used by millions worldwide.",
  },
  {
    company: "TCS",
    role: "Full Stack Developer",
    location: "Multiple Locations, India",
    jobType: "Hybrid",
    salaryRange: "8-15 LPA",
    requiredSkills: ["Java", "Spring Boot", "Angular", "SQL", "Git"],
    experienceLevel: "Fresher",
    applyLink: "https://www.tcs.com/careers",
    companyLogo: "T",
    description: "Start your IT career with India's leading IT services company.",
  },
  {
    company: "Zoho",
    role: "MERN Stack Developer",
    location: "Hyderabad, India",
    jobType: "Hybrid",
    salaryRange: "12-24 LPA",
    requiredSkills: ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
    experienceLevel: "Mid Level",
    applyLink: "https://www.zoho.com/careers/",
    companyLogo: "Z",
    description: "Build full-stack web applications with MERN stack.",
  },

  // ========== UI/UX ==========
  {
    company: "Adobe (Dummy)",
    role: "UI/UX Designer",
    location: "Noida, India",
    jobType: "Hybrid",
    salaryRange: "12-28 LPA",
    requiredSkills: ["Figma", "Design Patterns", "Accessibility", "React", "Tailwind"],
    experienceLevel: "Mid Level",
    applyLink: "https://www.adobe.com/careers.html",
    companyLogo: "AD",
    description:
      "Design modern user experiences with accessibility-first UI and prototyping workflows.",
  },

  // ========== Mobile ==========
  {
    company: "Jio Platforms",
    role: "React Native Developer",
    location: "Mumbai, India",
    jobType: "Hybrid",
    salaryRange: "15-25 LPA",
    requiredSkills: ["React Native", "JavaScript", "TypeScript", "Git", "Docker"],
    experienceLevel: "Mid Level",
    applyLink: "https://careers.jio.com/jobs",
    companyLogo: "J",
    description: "Develop mobile apps for Jio's digital ecosystem.",
  },

  // ========== AI/ML ==========
  {
    company: "NVIDIA India (Dummy)",
    role: "AI/ML Engineer",
    location: "Bangalore, India",
    jobType: "Hybrid",
    salaryRange: "25-55 LPA",
    requiredSkills: [
      "Python",
      "Machine Learning",
      "TensorFlow",
      "SQL",
      "Docker",
      "AWS",
      "Git",
    ],
    experienceLevel: "Senior",
    applyLink: "https://www.nvidia.com/en-in/about-nvidia/careers/",
    companyLogo: "N",
    description:
      "Build and deploy machine learning models at scale with production-grade pipelines.",
  },
  {
    company: "Databricks India (Dummy)",
    role: "Machine Learning Engineer",
    location: "Remote, India",
    jobType: "Remote",
    salaryRange: "20-45 LPA",
    requiredSkills: [
      "Python",
      "ML",
      "PyTorch",
      "Data Science",
      "SQL",
      "AWS",
      "Git",
    ],
    experienceLevel: "Mid Level",
    applyLink: "https://www.databricks.com/company/careers",
    companyLogo: "D",
    description:
      "Develop ML workflows and optimize training/inference pipelines for data-driven products.",
  },
  {
    company: "HuggingFace India (Dummy)",
    role: "AI Engineer (NLP/LLM)",
    location: "Hyderabad, India",
    jobType: "Hybrid",
    salaryRange: "18-40 LPA",
    requiredSkills: [
      "Python",
      "Machine Learning",
      "TensorFlow",
      "REST APIs",
      "Docker",
      "Git",
    ],
    experienceLevel: "Mid Level",
    applyLink: "https://huggingface.co/jobs",
    companyLogo: "H",
    description:
      "Engineer NLP features and integrate ML services with robust API and deployment patterns.",
  },
];

const seedJobs = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log("Connected to MongoDB");

    // Clear existing jobs
    await Job.deleteMany({});
    console.log("Cleared existing jobs");

    // Insert new jobs
    const insertedJobs = await Job.insertMany(jobsData);
    console.log(`✅ Successfully seeded ${insertedJobs.length} jobs`);

    // Display sample
    console.log("\nSample jobs inserted:");
    insertedJobs.slice(0, 3).forEach((job) => {
      console.log(`  - ${job.role} at ${job.company}`);
    });
  } catch (error) {
    console.error("❌ Error seeding jobs:", error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("\nDatabase connection closed");
  }
};

// Run seed if this file is executed directly
if (require.main === module) {
  seedJobs();
}

module.exports = seedJobs;
