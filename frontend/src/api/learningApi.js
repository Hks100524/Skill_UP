import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/courses`,
});

export const getLearningCourses = (params = {}) => API.get("/", { params });

export const getLearningCourseBySlug = (slug) =>
  API.get(`/slug/${encodeURIComponent(slug)}`);

export const getLearningCoursesByCategory = (category) =>
  API.get(`/category/${encodeURIComponent(category)}`);

export const createLearningCourse = (data) => API.post("/", data);
