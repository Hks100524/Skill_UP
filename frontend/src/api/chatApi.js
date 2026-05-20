import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/chat`,
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Create a new chat
 * @param {string} initialMessage - The first message to start the chat
 * @returns {Promise}
 */
export const createChat = (initialMessage) =>
  API.post("/", { initialMessage });

/**
 * Get all user chats
 * @returns {Promise}
 */
export const getUserChats = () => API.get("/");

/**
 * Get a single chat by ID
 * @param {string} chatId - The chat ID
 * @returns {Promise}
 */
export const getChat = (chatId) => API.get(`/${chatId}`);

/**
 * Add a message to a chat and get AI response
 * @param {string} chatId - The chat ID
 * @param {string} content - The message content
 * @returns {Promise}
 */
export const addMessage = (chatId, content) =>
  API.post(`/${chatId}/message`, { content });

/**
 * Delete a chat
 * @param {string} chatId - The chat ID
 * @returns {Promise}
 */
export const deleteChat = (chatId) => API.delete(`/${chatId}`);
