const cleanMessage = (message) =>
  String(message || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const hasAnyKeyword = (text, keywords) =>
  keywords.some((keyword) => text.includes(keyword));

const localTopicResponses = [
  {
    keywords: ["html", "html5"],
    response:
      "HTML is the structure of a web page. It uses tags like headings, paragraphs, links, images, lists, and forms.\n\nStart with: tags, attributes, semantic HTML, and basic page structure. Then practice by building a simple profile page or landing page.",
  },
  {
    keywords: ["css", "styling", "design"],
    response:
      "CSS controls the look and layout of a webpage. Learn selectors, box model, flexbox, grid, spacing, and responsive design.\n\nA good next step is to style one HTML page in different layouts for mobile and desktop.",
  },
  {
    keywords: ["javascript", "js", "coding"],
    response:
      "JavaScript makes web pages interactive. Start with variables, functions, arrays, objects, loops, conditionals, DOM manipulation, and events.\n\nThen practice by making a to-do list, calculator, or form validation project.",
  },
  {
    keywords: ["react"],
    response:
      "React is a JavaScript library for building user interfaces with components. Focus on JSX, props, state, hooks, component structure, and fetching data.\n\nA beginner project could be a notes app or a small dashboard.",
  },
  {
    keywords: ["ai", "artificial intelligence", "machine learning", "ml"],
    response:
      "AI is the field of making machines perform tasks that usually need human intelligence, like understanding language, recognizing images, and making predictions.\n\nTo start, learn the basics of Python, data, algorithms, and how models are trained and evaluated. Then explore generative AI, prompt writing, and practical use cases.",
  },
  {
    keywords: ["aptitude", "quant", "reasoning", "verbal"],
    response:
      "Aptitude preparation usually covers quantitative aptitude, logical reasoning, and verbal ability.\n\nBest approach: learn formulas and shortcuts, solve topic-wise practice, and then do timed mock tests to improve speed and accuracy.",
  },
  {
    keywords: ["interview", "job", "career", "resume"],
    response:
      "For interviews and career prep, focus on resume clarity, core concepts, projects, and communication.\n\nA strong routine is: revise basics, practice common questions, explain your projects clearly, and prepare 2 to 3 stories about your work or internships.",
  },
];

const generateLocalAIResponse = (userMessage) => {
  const text = cleanMessage(userMessage);

  if (!text) {
    return "Tell me what you want to learn, and I’ll give you a simple roadmap with examples.";
  }

  const matchedTopic = localTopicResponses.find(({ keywords }) =>
    hasAnyKeyword(text, keywords)
  );

  if (matchedTopic) {
    return matchedTopic.response;
  }

  return (
    "I can help with HTML, CSS, JavaScript, React, AI, aptitude, interviews, and career prep.\n\n" +
    "If you want, ask me one topic at a time and I’ll explain it step by step with examples."
  );
};

const isOpenRouterAuthError = (error) => {
  const status = error?.status || error?.code || error?.response?.status;
  const message = [
    error?.message,
    error?.error?.message,
    error?.response?.data?.error?.message,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    status === 401 ||
    status === 403 ||
    message.includes("user not found") ||
    message.includes("unauthorized") ||
    message.includes("api key") ||
    message.includes("invalid token")
  );
};

module.exports = {
  generateLocalAIResponse,
  isOpenRouterAuthError,
};
