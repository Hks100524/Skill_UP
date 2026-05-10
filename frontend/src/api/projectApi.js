import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/projects",
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ================= BASIC FEATURES =================

//  CREATE PROJECT
export const createProject = (data) => API.post("/", data);

//  GET ALL PROJECTS
export const getProjects = () => API.get("/");

//  GET SINGLE PROJECT
export const getProjectById = (id) => API.get(`/${id}`);

// DELETE PROJECT
export const deleteProject = (id) => API.delete(`/${id}`);

// UPDATE PROJECT
export const updateProject = (id, data) => API.put(`/${id}`, data);

// ================= NEW FEATURE =================

//  IMPORT FROM GITHUB (NEW ADD)
export const importGithubProject = (repo) =>
  API.post("/import", { repo });
