/**
 * Detect experience level based on resume content
 * @param {string} resumeText - Raw resume text
 * @param {Array} skills - Array of detected skills
 * @returns {string} - Experience level
 */
const detectExperienceLevel = (resumeText = "", skills = []) => {
  const textLower = (resumeText || "").toLowerCase();

  // Senior indicators
  const seniorKeywords = [
    "senior",
    "lead",
    "principal",
    "architect",
    "director",
    "manager",
    "10+ years",
    "15+ years",
    "20+ years",
    "experienced",
    "expert",
    "team lead",
    "tech lead",
  ];

  // Mid-level indicators
  const midKeywords = [
    "mid level",
    "mid-level",
    "2-4 years",
    "3-5 years",
    "intermediate",
    "experienced developer",
  ];

  // Fresher indicators
  const fresherKeywords = [
    "fresher",
    "junior",
    "0-1 years",
    "0-2 years",
    "entry level",
    "graduate",
    "internship",
    "recent graduate",
    "beginner",
  ];

  // Count years of experience if mentioned
  const yearsMatch = resumeText.match(/(\d+)\s*\+?\s*years?/i);
  if (yearsMatch) {
    const years = parseInt(yearsMatch[1], 10);
    if (Number.isFinite(years)) {
      if (years >= 5) return "Senior";
      if (years >= 2) return "Mid Level";
      return "Fresher"; // 0-1
    }
  }

  // Score based on keywords (only if years aren't explicitly stated)
  let seniorScore = 0;
  let midScore = 0;
  let fresherScore = 0;

  seniorKeywords.forEach((keyword) => {
    if (textLower.includes(keyword)) seniorScore += 2;
  });

  midKeywords.forEach((keyword) => {
    if (textLower.includes(keyword)) midScore += 2;
  });

  fresherKeywords.forEach((keyword) => {
    if (textLower.includes(keyword)) fresherScore += 2;
  });

  const hasAnyIndicator =
    seniorScore > 0 || midScore > 0 || fresherScore > 0;

  if (!hasAnyIndicator) {
    // Spec fallback
    return "Not Specified";
  }

  if (seniorScore > midScore && seniorScore > fresherScore) return "Senior";
  if (midScore > fresherScore) return "Mid Level";
  return "Fresher";
};

module.exports = { detectExperienceLevel };
