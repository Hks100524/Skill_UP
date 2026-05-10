const group = (title, items) => ({ title, items });
const item = (name, slug) => ({ name, slug });

const categoryLabels = {
  quantitative: "Quantitative Aptitude",
  logical: "Logical Reasoning",
  verbal: "Verbal Ability",
  technical: "Technical",
};

export const aptitudeSyllabus = {
  quantitative: {
    title: "Quantitative Aptitude",
    subtitle: "Master numerical ability, arithmetic, algebra, and data interpretation.",
    groups: [
      group("Arithmetic", [
        item("Percentage", "percentage"),
        item("Profit & Loss", "profitLoss"),
        item("Simple Interest", "simple-interest"),
        item("Compound Interest", "compound-interest"),
        item("Ratio & Proportion", "ratio-proportion"),
        item("Average", "average"),
        item("Partnership", "partnership"),
        item("Mixture & Allegation", "mixture-allegation"),
        item("Pipes & Cisterns", "pipes-cisterns"),
        item("Problems on Ages", "problems-on-ages"),
      ]),
      group("Time Based", [
        item("Time & Work", "timeWork"),
        item("Time, Speed & Distance", "timeSpeed"),
        item("Trains", "trains"),
        item("Boats & Streams", "boats-streams"),
      ]),
      group("Algebra + Number", [
        item("Number System", "numberSystem"),
        item("HCF & LCM", "hcf-lcm"),
        item("Surds & Indices", "surds-indices"),
        item("Quadratic Equations", "quadratic"),
        item("Simplification", "simplification"),
      ]),
      group("Data Interpretation (DI)", [
        item("Bar Graph", "barGraph"),
        item("Pie Chart", "pieChart"),
        item("Line Graph", "line-graph"),
        item("Tables", "tables"),
        item("Caselet DI", "caselet-di"),
      ]),
    ],
  },

  logical: {
    title: "Logical Reasoning",
    subtitle: "Sharpen your analytical thinking.",
    groups: [
      group("Verbal Reasoning", [
        item("Syllogism", "syllogism"),
        item("Statement & Conclusion", "statementConclusion"),
        item("Statement & Assumption", "statement-assumption"),
        item("Cause & Effect", "cause-effect"),
        item("Assertion & Reason", "assertion-reason"),
      ]),
      group("Non-Verbal", [
        item("Series", "series"),
        item("Mirror Image", "mirror-image"),
        item("Water Image", "water-image"),
        item("Paper Folding", "paper-folding"),
        item("Embedded Figures", "embedded-figures"),
      ]),
      group("Analytical", [
        item("Seating Arrangement", "seating-arrangement"),
        item("Blood Relations", "blood-relations"),
        item("Direction Sense", "direction-sense"),
        item("Calendar", "calendar"),
        item("Clock Problems", "clock-problems"),
        item("Puzzle Tests", "puzzle-tests"),
      ]),
      group("Coding Logic", [
        item("Number Series", "number-series"),
        item("Alphabet Series", "alphabet-series"),
        item("Pattern Logic", "pattern-logic"),
        item("Flowchart Questions", "flowchart-questions"),
        item("Coding-Decoding", "coding-decoding"),
      ]),
    ],
  },

  verbal: {
    title: "Verbal Ability",
    subtitle: "Improve grammar, vocabulary, and reading accuracy.",
    groups: [
      group("Grammar", [
        item("Tenses", "tenses"),
        item("Articles", "articles"),
        item("Prepositions", "prepositions"),
        item("Error Detection", "error-detection"),
        item("Active Passive Voice", "active-passive-voice"),
        item("Direct Indirect Speech", "direct-indirect-speech"),
      ]),
      group("Vocabulary", [
        item("Synonyms", "synonyms"),
        item("Antonyms", "antonyms"),
        item("One Word Substitution", "one-word-substitution"),
        item("Idioms & Phrases", "idioms-phrases"),
      ]),
      group("Reading", [
        item("Reading Comprehension", "reading-comprehension"),
        item("Para Jumbles", "para-jumbles"),
        item("Cloze Test", "cloze-test"),
      ]),
      group("Communication", [
        item("Sentence Improvement", "sentence-improvement"),
        item("Fill in the Blanks", "fill-in-the-blanks"),
      ]),
    ],
  },

  technical: {
    title: "Technical",
    subtitle: "Prepare for CS subjects, coding, and debugging.",
    groups: [
      group("Core Subjects", [
        item("Data Structures", "ds"),
        item("Operating System", "os"),
        item("DBMS", "dbms"),
        item("Computer Networks", "computer-networks"),
        item("OOPS", "oops"),
        item("Software Engineering", "software-engineering"),
      ]),
      group("Programming MCQs", [
        item("C", "c"),
        item("C++", "cpp"),
        item("Java", "java"),
        item("Python", "python"),
        item("JavaScript", "javascript"),
      ]),
      group("Debugging", [
        item("Find Errors", "find-errors"),
        item("Predict Output", "predict-output"),
        item("Debug Scenarios", "debug-scenarios"),
      ]),
    ],
  },
};

const baseQuestionsByCategory = {
  quantitative: 220,
  logical: 180,
  verbal: 160,
  technical: 200,
};

const levelByIndex = (topicIndex) => {
  if (topicIndex < 2) {
    return "Beginner";
  }

  if (topicIndex < 4) {
    return "Intermediate";
  }

  return "Advanced";
};

const buildTopicDetail = (categoryKey, groupTitle, topicName, groupIndex, topicIndex) => ({
  title: topicName,
  description: `Practice ${topicName} from the ${groupTitle} section of ${categoryLabels[categoryKey]}.`,
  questions: baseQuestionsByCategory[categoryKey] + groupIndex * 18 + topicIndex * 6,
  tests: 4 + groupIndex,
  level: levelByIndex(topicIndex),
  concepts: [
    `${topicName} basics`,
    `Key rules in ${groupTitle}`,
    `Placement question patterns`,
    `Short tricks and revision`,
  ],
});

const buildTopicsData = () =>
  Object.fromEntries(
    Object.entries(aptitudeSyllabus).map(([categoryKey, category]) => [
      categoryKey,
      Object.fromEntries(
        category.groups.flatMap((groupItem, groupIndex) =>
          groupItem.items.map((topicItem, topicIndex) => [
            topicItem.slug,
            buildTopicDetail(
              categoryKey,
              groupItem.title,
              topicItem.name,
              groupIndex,
              topicIndex,
            ),
          ]),
        ),
      ),
    ]),
  );

export const topicsData = buildTopicsData();

export const getCategoryStats = (categoryKey) => {
  const groups = aptitudeSyllabus[categoryKey]?.groups ?? [];

  return {
    groupCount: groups.length,
    topicCount: groups.reduce((count, groupItem) => count + groupItem.items.length, 0),
  };
};
