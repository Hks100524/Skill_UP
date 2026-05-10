import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/dashboard",
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getDashboard = () => API.get("/");

export const getAptitudeStats = () => API.get("/aptitude");

export const getJobApplications = () => API.get("/jobs");

export const getProjects = () => API.get("/projects");
