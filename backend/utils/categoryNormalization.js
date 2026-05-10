/**
 * Backend utility to normalize category names to proper enum values
 */

const categoryMapping = {
  quantitative: "Quantitative",
  logical: "Logical Reasoning",
  verbal: "Verbal Ability",
  technical: "Technical",
  "mock-tests": "Mock Tests",
  mock: "Mock Tests",
};

/**
 * Normalize category name to proper enum value
 * Handles both URL slugs (lowercase) and title-cased values
 * @param {string} categoryInput - The category value to normalize
 * @returns {string} - The normalized category enum value
 */
const normalizeCategory = (categoryInput) => {
  if (!categoryInput) return "General";

  // Check if already a proper enum value
  const validEnums = ["Quantitative", "Logical Reasoning", "Verbal Ability", "Technical", "Mock Tests"];
  if (validEnums.includes(categoryInput)) {
    return categoryInput;
  }

  // Try to map from lowercase/slug format
  const normalized = String(categoryInput).trim().toLowerCase();
  return categoryMapping[normalized] || "General";
};

module.exports = { normalizeCategory };
