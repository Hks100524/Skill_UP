import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/jobs`,
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Upload resume and get job recommendations
 * @param {File} file - Resume file (PDF or DOCX)
 * @returns {Promise} - Response with job recommendations
 */
export const analyzeResume = (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  return API.post("/analyze-resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * Apply to a job
 * @param {Object} data - Application data { company, role, matchPercentage, applyLink, status? }
 * @returns {Promise}
 */
export const applyToJob = (data) => API.post("/apply", data);

/**
 * Get user's job applications
 * @returns {Promise}
 */
export const getMyApplications = () => API.get("/my-applications");

/**
 * Update application status
 * @param {String} applicationId - Application ID
 * @param {String} status - New status
 * @returns {Promise}
 */
export const updateApplicationStatus = (applicationId, status) =>
  API.patch(`/applications/${applicationId}/status`, { status });

export default API;
