/**
 * Map URL slugs to proper category enum values
 * URL slugs are lowercase, enum values are title-cased
 */
const categoryMap = {
  quantitative: "Quantitative",
  logical: "Logical Reasoning",
  verbal: "Verbal Ability",
  technical: "Technical",
  "mock-tests": "Mock Tests",
  mock: "Mock Tests",
};

/**
 * Normalize category name from URL slug to proper enum value
 * @param {string} categorySlug - The category from URL (e.g., "quantitative", "logical")
 * @returns {string} - The proper enum value (e.g., "Quantitative", "Logical Reasoning")
 */
export const normalizeCategory = (categorySlug) => {
  if (!categorySlug) return "General";
  
  const normalized = String(categorySlug).trim().toLowerCase();
  return categoryMap[normalized] || "General";
};

export default categoryMap;
