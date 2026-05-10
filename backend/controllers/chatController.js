const ChatHistory = require("../models/ChatHistory");
const {
  getOpenRouterClient,
  getOpenRouterModel,
} = require("../utils/openRouterClient");
const {
  generateLocalAIResponse,
  isOpenRouterAuthError,
} = require("../utils/aiFallback");

/**
 * Create a new chat
 * POST /api/chat
 */
const createChat = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { initialMessage } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Generate title from first message
    const title =
      initialMessage?.slice(0, 50) + (initialMessage?.length > 50 ? "..." : "") ||
      "New Chat";

    const newChat = new ChatHistory({
      userId,
      title,
      messages: [
        {
          sender: "user",
          content: initialMessage || "",
        },
      ],
    });

    // Get AI response to the initial message
    try {
      const aiResponse = await getAIResponse(initialMessage);

      // Add AI response message
      newChat.messages.push({
        sender: "ai",
        content: aiResponse,
      });
    } catch (aiError) {
      console.error("Error getting AI response:", aiError);
      // Still save user message even if AI fails
      newChat.messages.push({
        sender: "ai",
        content: "Sorry, I encountered an error. Please try again.",
      });
    }

    await newChat.save();

    res.status(201).json({
      success: true,
      chat: newChat,
    });
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create chat",
    });
  }
};

/**
 * Get all chats for user
 * GET /api/chat
 */
const getUserChats = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const chats = await ChatHistory.find({ userId })
      .select("_id title updatedAt")
      .sort({ updatedAt: -1 })
      .lean();

    res.json({
      success: true,
      chats,
    });
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chats",
    });
  }
};

/**
 * Get single chat by ID
 * GET /api/chat/:chatId
 */
const getChat = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { chatId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const chat = await ChatHistory.findOne({
      _id: chatId,
      userId,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    res.json({
      success: true,
      chat,
    });
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chat",
    });
  }
};

/**
 * Add message to chat
 * POST /api/chat/:chatId/message
 */
const addMessage = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { chatId } = req.params;
    const { content } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Message content is required",
      });
    }

    const chat = await ChatHistory.findOne({
      _id: chatId,
      userId,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // Add user message
    chat.messages.push({
      sender: "user",
      content,
    });

    // Get AI response using existing askAI logic
    try {
      const aiResponse = await getAIResponse(content);

      // Add AI message
      chat.messages.push({
        sender: "ai",
        content: aiResponse,
      });
    } catch (aiError) {
      console.error("Error getting AI response:", aiError);
      // Still save user message even if AI fails
      chat.messages.push({
        sender: "ai",
        content:
          "Sorry, I encountered an error. Please try again.",
      });
    }

    // Update title if it's still "Untitled Chat"
    if (chat.title === "Untitled Chat" && chat.messages.length > 0) {
      const firstUserMessage = chat.messages.find(
        (m) => m.sender === "user"
      );
      if (firstUserMessage) {
        chat.title =
          firstUserMessage.content.slice(0, 50) +
          (firstUserMessage.content.length > 50 ? "..." : "");
      }
    }

    await chat.save();

    res.json({
      success: true,
      chat,
    });
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add message",
    });
  }
};

/**
 * Delete chat
 * DELETE /api/chat/:chatId
 */
const deleteChat = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { chatId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const result = await ChatHistory.deleteOne({
      _id: chatId,
      userId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    res.json({
      success: true,
      message: "Chat deleted",
    });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete chat",
    });
  }
};

/**
 * Get AI response using OpenRouter/OpenAI
 * Helper function
 */
const getAIResponse = async (userMessage) => {
  try {
    const openRouter = getOpenRouterClient();

    const response = await openRouter.chat.completions.create({
      model: getOpenRouterModel(),
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant for Skill_UP, a learning platform. Help users with aptitude preparation, coding problems, learning resources, and career guidance. Be concise and practical.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || "No response from AI";
  } catch (error) {
    if (isOpenRouterAuthError(error)) {
      console.warn("OpenRouter auth failed. Using local fallback response.");
      return generateLocalAIResponse(userMessage);
    }

    console.error("AI API error:", {
      message: error.message,
      status: error.status || error.response?.status,
      code: error.code,
      error: error.error || error.response?.data,
    });

    return generateLocalAIResponse(userMessage);
  }
};

module.exports = {
  createChat,
  getUserChats,
  getChat,
  addMessage,
  deleteChat,
};
