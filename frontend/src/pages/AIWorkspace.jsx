import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Bot,
  Clock3,
  Menu,
  Plus,
  Send,
  Sparkles,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { getUserChats, getChat, addMessage, deleteChat, createChat } from "../api/chatApi";
import "./AIWorkspace.css";

const starterPrompts = [
  "Explain HTML basics in a simple way",
  "Give me a 7-day React learning plan",
  "How do I prepare for aptitude tests?",
  "What should I study for tech interviews?",
];

const getInitialSidebarState = () =>
  typeof window === "undefined" ? true : window.innerWidth >= 1024;

const getInitialMobileState = () =>
  typeof window === "undefined" ? false : window.innerWidth < 1024;

const formatTime = (date) => {
  const safeDate = date ? new Date(date) : new Date();

  if (Number.isNaN(safeDate.getTime())) {
    return "Now";
  }

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (safeDate.toDateString() === today.toDateString()) {
    return safeDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (safeDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  if (safeDate.getTime() > today.getTime() - 7 * 24 * 60 * 60 * 1000) {
    return safeDate.toLocaleDateString("en-US", { weekday: "short" });
  }

  return safeDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export default function AIWorkspace() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q");

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingChats, setLoadingChats] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(getInitialSidebarState);
  const [isMobile, setIsMobile] = useState(getInitialMobileState);
  const [initialProcessed, setInitialProcessed] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyHeight = body.style.height;
    const previousBodyMargin = body.style.margin;

    body.classList.add("ai-workspace-lock");
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.height = "100vh";
    body.style.margin = "0";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      body.classList.remove("ai-workspace-lock");
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.height = previousBodyHeight;
      body.style.margin = previousBodyMargin;
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getUserChats();
        if (response.data.success) {
          setChats(response.data.chats || []);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoadingChats(false);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    if (chatId && !loadingChats) {
      loadChatMessages(chatId);
    }
  }, [chatId, loadingChats]);

  useEffect(() => {
    const handleInitialQuery = async () => {
      if (!chatId && !loadingChats && initialQuery && !initialProcessed) {
        setInitialProcessed(true);

        try {
          setLoading(true);
          const createResponse = await createChat(initialQuery);

          if (createResponse.data.success) {
            const newChat = createResponse.data.chat;
            setCurrentChat(newChat);
            setMessages(newChat.messages || []);
            setChats((prev) => [newChat, ...prev]);
            navigate(`/ai-workspace/${newChat._id}`, { replace: true });
          }
        } catch (error) {
          console.error("Error creating initial chat:", error);
        } finally {
          setLoading(false);
        }
      } else if (!chatId && !loadingChats && !initialQuery) {
        setInitialProcessed(true);
      }
    };

    handleInitialQuery();
  }, [initialQuery, chatId, loadingChats, initialProcessed, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadChatMessages = async (id) => {
    try {
      setLoading(true);
      const response = await getChat(id);

      if (response.data.success) {
        setCurrentChat(response.data.chat);
        setMessages(response.data.chat.messages || []);
      }
    } catch (error) {
      console.error("Error loading chat:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setCurrentChat(null);
    setMessages([]);
    setInput("");
    navigate("/ai-workspace");

    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleSelectChat = (chat) => {
    navigate(`/ai-workspace/${chat._id}`);

    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handlePromptPick = (prompt) => {
    setInput(prompt);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    try {
      setLoading(true);

      if (!currentChat) {
        const createResponse = await createChat(input);

        if (createResponse.data.success) {
          const newChat = createResponse.data.chat;
          setCurrentChat(newChat);
          setMessages(newChat.messages || []);
          setChats((prev) => [newChat, ...prev]);
          navigate(`/ai-workspace/${newChat._id}`);
        }
      } else {
        const response = await addMessage(currentChat._id, input);

        if (response.data.success) {
          const updatedChat = response.data.chat;
          setCurrentChat(updatedChat);
          setMessages(updatedChat.messages || []);

          setChats((prev) =>
            prev.map((chat) =>
              chat._id === updatedChat._id
                ? { ...chat, updatedAt: updatedChat.updatedAt }
                : chat,
            ),
          );
        }
      }

      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const handleDeleteChat = async (id, e) => {
    e.stopPropagation();

    if (window.confirm("Delete this chat?")) {
      try {
        await deleteChat(id);
        setChats((prev) => prev.filter((chat) => chat._id !== id));

        if (currentChat?._id === id) {
          handleNewChat();
        }
      } catch (error) {
        console.error("Error deleting chat:", error);
      }
    }
  };

  return (
    <div className="ai-workspace">
      <div className="ai-workspace-orb ai-workspace-orb-left" />
      <div className="ai-workspace-orb ai-workspace-orb-right" />

      {isMobile && sidebarOpen ? (
        <button
          type="button"
          className="ai-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      ) : null}

      <div className="ai-workspace-shell">
        <aside className={`ai-sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <div className="sidebar-brand-mark">S</div>
              <div>
                <p className="sidebar-eyebrow">Study companion</p>
                <h2>Skill_up AI</h2>
              </div>
            </div>
            <p className="sidebar-copy">
              Keep every conversation in one focused workspace.
            </p>
          </div>

          <div className="sidebar-actions">
            <button onClick={handleNewChat} className="new-chat-btn">
              <Plus size={18} />
              <span>New Chat</span>
            </button>

            <div className="sidebar-mini-card">
              <span>{chats.length}</span>
              <p>Saved chats</p>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="section-header">
              <Sparkles size={16} />
              <span>Quick prompts</span>
            </div>

            <div className="prompt-grid">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="prompt-chip"
                  onClick={() => handlePromptPick(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="chat-list-header">
            <div>
              <h3>Recent chats</h3>
              <p>
                {loadingChats
                  ? "Syncing..."
                  : `${chats.length} conversation${chats.length === 1 ? "" : "s"}`}
              </p>
            </div>

            <button
              type="button"
              className="sidebar-close-btn"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={16} />
            </button>
          </div>

          <div className="chat-list">
            {loadingChats ? (
              <div className="loading-text">Loading chats...</div>
            ) : chats.length === 0 ? (
              <div className="empty-text">
                <strong>No conversations yet</strong>
                <span>Start a new thread and your chats will appear here.</span>
              </div>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat._id}
                  className={`chat-item ${currentChat?._id === chat._id ? "active" : ""}`}
                  onClick={() => handleSelectChat(chat)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleSelectChat(chat);
                    }
                  }}
                >
                  <div className="chat-item-content">
                    <div className="chat-title">{chat.title}</div>
                    <div className="chat-time">
                      <Clock3 size={12} />
                      <span>{formatTime(chat.updatedAt)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="chat-delete-btn"
                    onClick={(e) => handleDeleteChat(chat._id, e)}
                    aria-label="Delete chat"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </aside>

        <main className="ai-main">
          <header className="ai-topbar">
            <div className="topbar-left">
              <button
                className="sidebar-toggle"
                onClick={() => setSidebarOpen((value) => !value)}
                aria-label={sidebarOpen ? "Hide chats" : "Show chats"}
                type="button"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <div className="workspace-heading">
                <span className="workspace-kicker">
                  <Sparkles size={14} />
                  AI study workspace
                </span>
                <h1 className="workspace-title">
                  {currentChat ? currentChat.title : "New Chat"}
                </h1>
                <p className="workspace-subtitle">
                  Ask about HTML, coding, aptitude, learning plans, and career prep.
                </p>
              </div>
            </div>

            <button className="close-btn" onClick={() => navigate("/")} type="button">
              <X size={18} />
              <span>Close</span>
            </button>
          </header>

          <section className="messages-container">
            {messages.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-card">
                  <div className="empty-visual">
                    <Sparkles size={32} />
                  </div>
                  <h2>Start a conversation</h2>
                  <p>
                    Ask me anything about aptitude, coding, learning, or career
                    preparation.
                  </p>

                  <div className="empty-prompts">
                    {starterPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        className="empty-prompt"
                        onClick={() => handlePromptPick(prompt)}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isUser = msg.sender === "user";

                return (
                  <div
                    key={msg._id || index}
                    className={`message-row ${isUser ? "user-message" : "ai-message"}`}
                  >
                    <div className="message-avatar">
                      {isUser ? <UserRound size={18} /> : <Bot size={18} />}
                    </div>

                    <div className="message-card">
                      <div className="message-card-header">
                        <span>{isUser ? "You" : "Skill_up AI"}</span>
                        <time>{formatTime(msg.timestamp)}</time>
                      </div>
                      <p className="message-copy">{msg.content}</p>
                    </div>
                  </div>
                );
              })
            )}

            {loading ? (
              <div className="message-row ai-message loading">
                <div className="message-avatar">
                  <Bot size={18} />
                </div>
                <div className="message-card">
                  <div className="typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </section>

          <form onSubmit={handleSendMessage} className="input-form">
            <div className="composer-card">
              <div className="composer-presets">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="composer-chip"
                    onClick={() => handlePromptPick(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="input-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={loading}
                  className="message-input"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="send-btn"
                >
                  <Send size={16} />
                  <span>Send</span>
                </button>
              </div>

              <div className="input-hint-row">
                <span className="input-hint">Press Enter or click Send</span>
                <span className="input-hint">Focused on learning, coding, and career support</span>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
