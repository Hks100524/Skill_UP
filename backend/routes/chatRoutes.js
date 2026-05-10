const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createChat,
  getUserChats,
  getChat,
  addMessage,
  deleteChat,
} = require("../controllers/chatController");

const router = express.Router();

// All chat routes require authentication
router.use(authMiddleware.protect);

/**
 * POST /api/chat
 * Create a new chat
 */
router.post("/", createChat);

/**
 * GET /api/chat
 * Get all chats for user
 */
router.get("/", getUserChats);

/**
 * GET /api/chat/:chatId
 * Get single chat
 */
router.get("/:chatId", getChat);

/**
 * POST /api/chat/:chatId/message
 * Add message to chat
 */
router.post("/:chatId/message", addMessage);

/**
 * DELETE /api/chat/:chatId
 * Delete chat
 */
router.delete("/:chatId", deleteChat);

module.exports = router;
