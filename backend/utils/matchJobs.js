/**
 * Calculate match percentage between user skills and job required skills
 * @param {Array} userSkills - User's detected skills
 * @param {Array} jobSkills - Job's required skills
 * @returns {number} - Match percentage (0-100)
 */
const normalizeForSkillComparison = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

/**
 * Calculate match percentage between user skills and job required skills
 * Strict spec:
 *   matchPercentage = (number of matching required skills / total required skills) * 100
 */
const calculateMatchPercentage = (userSkills, jobSkills) => {
  if (!jobSkills || jobSkills.length === 0) return 0;

  const userSet = new Set(
    (userSkills || []).map(normalizeForSkillComparison)
  );

  const jobNormalized = (jobSkills || []).map(normalizeForSkillComparison);

  const matchedSkills = jobNormalized.filter((skill) =>
    userSet.has(skill)
  ).length;

  const matchPercentage = Math.round(
    (matchedSkills / jobNormalized.length) * 100
  );

  return Math.min(100, Math.max(0, matchPercentage));
};

/**
 * Match jobs with user profile and return sorted results
 * NOTE: userRole/userExperienceLevel are accepted for backward compatibility,
 * but match score is based ONLY on skills per spec.
 */
const matchJobs = (
  jobs,
  userSkills,
  userRole = "",
  userExperienceLevel = ""
) => {
  if (!jobs || !Array.isArray(jobs)) return [];

  const jobsWithMatches = jobs
    .filter((job) => job.isActive !== false)
    .map((job) => {
      const matchPercentage = calculateMatchPercentage(
        userSkills,
        job.requiredSkills || []
      );

      return {
        ...job.toObject ? job.toObject() : job,
        matchPercentage,
      };
    });

  return jobsWithMatches.sort(
    (a, b) => b.matchPercentage - a.matchPercentage
  );
};

/**
 * Filter jobs by experience level
 * @param {Array} jobs - Array of jobs
 * @param {string} experienceLevel - Experience level to filter by
 * @returns {Array} - Filtered jobs
 */
const filterJobsByExperience = (jobs, experienceLevel) => {
  if (!experienceLevel) return jobs;

  const levels = {
    Fresher: 0,
    "Mid Level": 1,
    Senior: 2,
  };

  const userLevel = levels[experienceLevel] || 1;

  return jobs.filter((job) => {
    const jobLevel = levels[job.experienceLevel] || 1;
    // Allow jobs at same level or slightly higher
    return jobLevel <= userLevel + 1;
  });
};

module.exports = {
  calculateMatchPercentage,
  matchJobs,
  filterJobsByExperience,
};
