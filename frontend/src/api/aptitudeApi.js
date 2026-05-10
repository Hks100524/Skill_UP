import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/aptitude",
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getQuestionsByTopic = (topic, params = {}) =>
  API.get(`/questions/${encodeURIComponent(topic)}`, { params });

export const getAllQuestions = (params = {}) => API.get("/questions", { params });

export const saveAttempt = (data) => API.post("/save-attempt", data);
