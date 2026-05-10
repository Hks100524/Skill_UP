const aptitudeQuestions = require("./aptitudeQuestions");

const categories = ["quantitative", "logical", "verbal", "technical"];

const topicsByCategory = categories.reduce((acc, category) => {
  acc[category] = [...new Set(
    aptitudeQuestions
      .filter((question) => question.category === category)
      .map((question) => question.topic),
  )];
  return acc;
}, {});

const selectedTopics = [];
const maxTopicCount = Math.max(...categories.map((category) => topicsByCategory[category].length));

for (let index = 0; index < maxTopicCount && selectedTopics.length < 50; index += 1) {
  for (const category of categories) {
    const topic = topicsByCategory[category][index];
    if (!topic) {
      continue;
    }

    selectedTopics.push({ category, topic });

    if (selectedTopics.length === 50) {
      break;
    }
  }
}

const mockTestQuestions = selectedTopics.map(({ category, topic }, index) => {
  const topicQuestions = aptitudeQuestions.filter(
    (question) => question.category === category && question.topic === topic,
  );

  const sourceQuestion = topicQuestions[(index * 3) % topicQuestions.length];

  return {
    category: "mock-test",
    group: "Mock Test",
    topic: "full-mock",
    question: sourceQuestion.question,
    options: [...sourceQuestion.options],
    correctAnswer: sourceQuestion.correctAnswer,
    explanation: sourceQuestion.explanation,
    difficulty: sourceQuestion.difficulty,
  };
});

module.exports = mockTestQuestions;
