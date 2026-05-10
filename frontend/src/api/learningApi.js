import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/courses",
});

export const getLearningCourses = (params = {}) => API.get("/", { params });

export const getLearningCourseBySlug = (slug) =>
  API.get(`/slug/${encodeURIComponent(slug)}`);

export const getLearningCoursesByCategory = (category) =>
  API.get(`/category/${encodeURIComponent(category)}`);

export const createLearningCourse = (data) => API.post("/", data);
