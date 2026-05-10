const OpenAI = require("openai");

const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

const openRouterClient = apiKey
  ? new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey,
      defaultHeaders: {
        "HTTP-Referer": process.env.APP_URL || "http://localhost:5173",
        "X-Title": "Skill_UP",
      },
    })
  : null;

const getOpenRouterClient = () => {
  if (!openRouterClient) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  return openRouterClient;
};

const getOpenRouterModel = () =>
  process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

module.exports = {
  getOpenRouterClient,
  getOpenRouterModel,
};
