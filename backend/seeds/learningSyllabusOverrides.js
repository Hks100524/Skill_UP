const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const detailedTopicsBySlug = {
  "html-tutorial": [
    "Introduction to HTML",
    "HTML Editors & Setup",
    "HTML Document Structure",
    "HTML Elements",
    "HTML Attributes",
    "HTML Headings",
    "HTML Paragraphs",
    "HTML Text Formatting",
    "HTML Quotations",
    "HTML Comments",
    "HTML Colors",
    "HTML CSS Integration",
    "HTML Links",
    "HTML Images",
    "HTML Favicon",
    "HTML Page Title",
    "HTML Tables",
    "HTML Lists",
    "HTML Block vs Inline Elements",
    "HTML Div & Span",
    "HTML Classes & IDs",
    "HTML Iframes",
    "HTML Semantic Elements",
    "HTML Forms",
    "HTML Form Attributes",
    "HTML Input Types",
    "HTML Input Attributes",
    "HTML Audio",
    "HTML Video",
    "HTML Canvas",
    "HTML SVG",
    "HTML Drag & Drop",
    "HTML Local Storage",
    "HTML Geolocation API",
    "HTML Best Practices",
    "HTML Accessibility Basics",
  ],
  "css-tutorial": [
    "Introduction to CSS",
    "CSS Syntax",
    "CSS Selectors",
    "CSS Colors",
    "CSS Backgrounds",
    "CSS Borders",
    "CSS Margins",
    "CSS Padding",
    "CSS Height & Width",
    "CSS Box Model",
    "CSS Text Styling",
    "CSS Fonts",
    "CSS Icons",
    "CSS Links",
    "CSS Lists",
    "CSS Tables",
    "CSS Display Property",
    "CSS Positioning",
    "CSS Float & Clear",
    "CSS Flexbox",
    "CSS Grid",
    "CSS Overflow",
    "CSS Z-index",
    "CSS Pseudo Classes",
    "CSS Pseudo Elements",
    "CSS Transitions",
    "CSS Animations",
    "CSS Transformations",
    "CSS Media Queries",
    "Responsive Design",
    "CSS Variables",
    "CSS Best Practices",
  ],
  "javascript-tutorial": [
    "Introduction to JavaScript",
    "JS Setup & Console",
    "Variables",
    "Data Types",
    "Operators",
    "Conditional Statements",
    "Loops",
    "Functions",
    "Scope",
    "Arrays",
    "Objects",
    "String Methods",
    "Array Methods",
    "DOM Manipulation",
    "Events",
    "Form Validation",
    "ES6 Features",
    "Arrow Functions",
    "Destructuring",
    "Spread & Rest Operators",
    "Callbacks",
    "Promises",
    "Async/Await",
    "Fetch API",
    "Error Handling",
    "Local Storage",
    "JSON",
    "OOP in JavaScript",
    "Modules",
    "Closures",
    "Debouncing & Throttling",
    "Event Loop",
    "JavaScript Best Practices",
  ],
  "react-tutorial": [
    "Introduction to React",
    "React Setup",
    "JSX",
    "Components",
    "Props",
    "State",
    "Event Handling",
    "Conditional Rendering",
    "Lists & Keys",
    "Forms in React",
    "useState Hook",
    "useEffect Hook",
    "useRef Hook",
    "useContext Hook",
    "Custom Hooks",
    "React Router",
    "API Fetching",
    "Component Lifecycle",
    "State Management Basics",
    "Context API",
    "Performance Optimization",
    "Lazy Loading",
    "Error Boundaries",
    "React Best Practices",
    "Project Structure",
  ],
  "typescript-tutorial": [
    "Introduction to TypeScript",
    "TypeScript Setup",
    "Basic Types",
    "Type Inference",
    "Functions in TypeScript",
    "Objects & Interfaces",
    "Arrays & Tuples",
    "Enums",
    "Type Aliases",
    "Union Types",
    "Generics",
    "Classes",
    "Access Modifiers",
    "Modules",
    "Type Assertions",
    "Decorators",
    "TypeScript with React",
    "Error Handling",
    "Best Practices",
  ],
  "tailwind-css": [
    "Introduction to Tailwind",
    "Installation & Setup",
    "Utility Classes",
    "Typography Utilities",
    "Spacing Utilities",
    "Flexbox Utilities",
    "Grid Utilities",
    "Colors & Backgrounds",
    "Borders & Shadows",
    "Responsive Design",
    "Hover & Focus States",
    "Dark Mode",
    "Custom Themes",
    "Tailwind Config",
    "Reusable Components",
    "Tailwind Best Practices",
  ],
  "python-tutorial": [
    "Python Introduction",
    "Installation & Setup",
    "Variables & Data Types",
    "Input & Output",
    "Operators",
    "Conditional Statements",
    "Loops",
    "Functions",
    "Lists",
    "Tuples",
    "Dictionaries",
    "Sets",
    "String Handling",
    "File Handling",
    "Exception Handling",
    "OOP in Python",
    "Modules & Packages",
    "Virtual Environments",
    "Python Libraries",
    "API Handling",
    "Web Scraping Basics",
    "Automation Scripts",
    "Best Practices",
  ],
  "java-tutorial": [
    "Introduction to Java",
    "JVM, JDK, JRE",
    "Variables & Data Types",
    "Operators",
    "Conditionals",
    "Loops",
    "Arrays",
    "Methods",
    "OOP Concepts",
    "Constructors",
    "Inheritance",
    "Polymorphism",
    "Abstraction",
    "Encapsulation",
    "Exception Handling",
    "Collections Framework",
    "Multithreading",
    "File Handling",
    "JDBC Basics",
    "Java Best Practices",
  ],
  "cpp-tutorial": [
    "Introduction to C++",
    "Variables & Data Types",
    "Operators",
    "Loops",
    "Functions",
    "Arrays",
    "Pointers",
    "References",
    "OOP Concepts",
    "Constructors & Destructors",
    "Inheritance",
    "Polymorphism",
    "STL",
    "File Handling",
    "Memory Management",
    "Templates",
    "Exception Handling",
    "Best Practices",
  ],
  "machine-learning": [
    "Introduction to ML",
    "Types of Machine Learning",
    "Data Preprocessing",
    "Feature Engineering",
    "Regression Algorithms",
    "Classification Algorithms",
    "Clustering",
    "Model Evaluation",
    "Overfitting & Underfitting",
    "Train/Test Split",
    "Cross Validation",
    "Scikit-learn Basics",
    "Model Deployment Basics",
  ],
  "deep-learning": [
    "Introduction to Deep Learning",
    "Neural Networks",
    "Perceptrons",
    "Activation Functions",
    "Forward & Backpropagation",
    "TensorFlow Basics",
    "Keras Basics",
    "CNN Basics",
    "RNN Basics",
    "LSTM",
    "Transfer Learning",
    "Model Evaluation",
  ],
  "nodejs-tutorial": [
    "Introduction to Node.js",
    "Node Architecture",
    "npm Basics",
    "Modules",
    "File System",
    "Event Loop",
    "HTTP Module",
    "Express.js Basics",
    "Routing",
    "Middleware",
    "REST APIs",
    "MongoDB Integration",
    "Authentication",
    "JWT",
    "Error Handling",
    "Environment Variables",
    "Deployment Basics",
  ],
  "mongodb-tutorial": [
    "Introduction to MongoDB",
    "NoSQL Basics",
    "Installation & Setup",
    "Collections & Documents",
    "CRUD Operations",
    "Query Operators",
    "Indexing",
    "Aggregation Pipeline",
    "Relationships",
    "Mongoose Basics",
    "Schema Design",
    "Validation",
    "MongoDB Atlas",
    "Best Practices",
  ],
  "rest-api-design": [
    "Introduction to APIs",
    "REST Principles",
    "HTTP Methods",
    "Status Codes",
    "Route Design",
    "Authentication",
    "Pagination",
    "Filtering & Sorting",
    "API Security",
    "Rate Limiting",
    "API Documentation",
    "Versioning",
    "Error Handling",
  ],
  "react-native": [
    "Introduction to React Native",
    "Setup Environment",
    "Components",
    "Styling",
    "Navigation",
    "State Management",
    "API Integration",
    "Forms",
    "Async Storage",
    "Device Features",
    "App Deployment",
  ],
  "docker-tutorial": [
    "Introduction to Docker",
    "Docker Installation",
    "Images & Containers",
    "Docker Commands",
    "Dockerfile",
    "Docker Compose",
    "Volumes",
    "Networking",
    "Dockerizing Applications",
    "Best Practices",
  ],
  "git-tutorial": [
    "Introduction to Git",
    "Git Installation",
    "Git Init",
    "Git Add & Commit",
    "Branching",
    "Merging",
    "Pull Requests",
    "GitHub Workflow",
    "Conflict Resolution",
    "Git Best Practices",
  ],
};

const codeBanks = {
  html: [
    {
      caption: "index.html",
      language: "html",
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTML Tutorial</title>
</head>
<body>
  <h1>Learning HTML</h1>
</body>
</html>`,
    },
    {
      caption: "head.html",
      language: "html",
      code: `<head>
  <link rel="stylesheet" href="styles.css" />
  <link rel="icon" href="/favicon.ico" />
</head>`,
    },
    {
      caption: "links-images.html",
      language: "html",
      code: `<a href="/about">About</a>
<img src="photo.jpg" alt="Profile photo" />`,
    },
    {
      caption: "table.html",
      language: "html",
      code: `<table>
  <tr><th>Name</th><th>Score</th></tr>
  <tr><td>Asha</td><td>91</td></tr>
</table>`,
    },
    {
      caption: "form.html",
      language: "html",
      code: `<form action="/submit" method="post">
  <input type="text" placeholder="Your name" />
  <button type="submit">Send</button>
</form>`,
    },
    {
      caption: "semantic.html",
      language: "html",
      code: `<header>
  <nav>Navigation</nav>
</header>
<main>
  <article>Readable page structure</article>
</main>`,
    },
  ],
  css: [
    {
      caption: "styles.css",
      language: "css",
      code: `h1 {
  color: #7c3aed;
  font-size: 2rem;
}`,
    },
    {
      caption: "box-model.css",
      language: "css",
      code: `.card {
  padding: 1rem;
  margin: 1rem;
  border: 1px solid #e5e7eb;
}`,
    },
    {
      caption: "flexbox.css",
      language: "css",
      code: `.row {
  display: flex;
  gap: 1rem;
  align-items: center;
}`,
    },
    {
      caption: "grid.css",
      language: "css",
      code: `.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}`,
    },
    {
      caption: "responsive.css",
      language: "css",
      code: `@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}`,
    },
    {
      caption: "theme.css",
      language: "css",
      code: `:root {
  --brand: #7c3aed;
}

.button:hover {
  background: var(--brand);
}`,
    },
  ],
  js: [
    {
      caption: "app.js",
      language: "js",
      code: `const name = "Learner";
function greet(value) {
  console.log("Hello", value);
}
greet(name);`,
    },
    {
      caption: "arrays.js",
      language: "js",
      code: `const numbers = [1, 2, 3];
const doubled = numbers.map((value) => value * 2);`,
    },
    {
      caption: "dom.js",
      language: "js",
      code: `const button = document.querySelector("#save");
button.addEventListener("click", () => {
  console.log("Saved");
});`,
    },
    {
      caption: "async.js",
      language: "js",
      code: `async function loadData() {
  const response = await fetch("/api/courses");
  return response.json();
}`,
    },
    {
      caption: "modules.js",
      language: "js",
      code: `export function sum(a, b) {
  return a + b;
}`,
    },
    {
      caption: "storage.js",
      language: "js",
      code: `localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");`,
    },
  ],
  react: [
    {
      caption: "App.jsx",
      language: "jsx",
      code: `function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}`,
    },
    {
      caption: "Counter.jsx",
      language: "jsx",
      code: `import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`,
    },
    {
      caption: "List.jsx",
      language: "jsx",
      code: `const items = ["HTML", "CSS", "JavaScript"];
return <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>;`,
    },
    {
      caption: "Hooks.jsx",
      language: "jsx",
      code: `import { useEffect } from "react";
useEffect(() => {
  console.log("Mounted");
}, []);`,
    },
    {
      caption: "Router.jsx",
      language: "jsx",
      code: `import { Link } from "react-router-dom";
return <Link to="/learning">Learning Hub</Link>;`,
    },
    {
      caption: "Fetch.jsx",
      language: "jsx",
      code: `fetch("/api/courses")
  .then((response) => response.json())
  .then((data) => console.log(data));`,
    },
  ],
  ts: [
    {
      caption: "types.ts",
      language: "ts",
      code: `type User = {
  id: number;
  name: string;
};`,
    },
    {
      caption: "union.ts",
      language: "ts",
      code: `function status(value: "idle" | "loading" | "done") {
  return value;
}`,
    },
    {
      caption: "generic.ts",
      language: "ts",
      code: `function wrap<T>(value: T): T[] {
  return [value];
}`,
    },
    {
      caption: "class.ts",
      language: "ts",
      code: `class Course {
  constructor(public title: string) {}
}`,
    },
    {
      caption: "react.tsx",
      language: "tsx",
      code: `type Props = { title: string };
function Card({ title }: Props) {
  return <h2>{title}</h2>;
}`,
    },
  ],
  tailwind: [
    {
      caption: "card.html",
      language: "html",
      code: `<div class="rounded-2xl bg-white p-5 shadow-lg">
  <h3 class="text-lg font-semibold">Course Card</h3>
</div>`,
    },
    {
      caption: "layout.html",
      language: "html",
      code: `<section class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  <article class="rounded-xl bg-white p-4 shadow">Item</article>
</section>`,
    },
    {
      caption: "interactive.html",
      language: "html",
      code: `<button class="rounded-full bg-violet-600 px-4 py-2 text-white hover:bg-violet-700">
  Start Learning
</button>`,
    },
    {
      caption: "dark-mode.html",
      language: "html",
      code: `<div class="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
  Theme aware content
</div>`,
    },
    {
      caption: "theme.js",
      language: "js",
      code: `module.exports = {
  theme: {
    extend: {}
  }
};`,
    },
  ],
  python: [
    {
      caption: "hello.py",
      language: "python",
      code: `message = "Hello, Python"
print(message)`,
    },
    {
      caption: "collections.py",
      language: "python",
      code: `scores = [85, 91, 78]
average = sum(scores) / len(scores)
print(average)`,
    },
    {
      caption: "files.py",
      language: "python",
      code: `with open("data.txt", "r") as file:
    contents = file.read()`,
    },
    {
      caption: "errors.py",
      language: "python",
      code: `try:
    value = int("42")
except ValueError:
    print("Invalid number")`,
    },
    {
      caption: "api.py",
      language: "python",
      code: `import requests
response = requests.get("https://example.com/api")
print(response.status_code)`,
    },
  ],
  java: [
    {
      caption: "Main.java",
      language: "java",
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java");
    }
}`,
    },
    {
      caption: "methods.java",
      language: "java",
      code: `static int add(int a, int b) {
    return a + b;
}`,
    },
    {
      caption: "oop.java",
      language: "java",
      code: `class Person {
    String name;
    Person(String name) {
        this.name = name;
    }
}`,
    },
    {
      caption: "collections.java",
      language: "java",
      code: `List<String> names = new ArrayList<>();
names.add("Asha");`,
    },
    {
      caption: "jdbc.java",
      language: "java",
      code: `Connection connection = DriverManager.getConnection(url, user, password);`,
    },
  ],
  cpp: [
    {
      caption: "main.cpp",
      language: "cpp",
      code: `#include <iostream>
int main() {
    std::cout << "Hello, C++" << std::endl;
}`,
    },
    {
      caption: "functions.cpp",
      language: "cpp",
      code: `int add(int a, int b) {
    return a + b;
}`,
    },
    {
      caption: "pointers.cpp",
      language: "cpp",
      code: `int value = 10;
int* ptr = &value;`,
    },
    {
      caption: "class.cpp",
      language: "cpp",
      code: `class Student {
public:
    std::string name;
};`,
    },
    {
      caption: "stl.cpp",
      language: "cpp",
      code: `std::vector<int> values = {1, 2, 3};`,
    },
  ],
  ml: [
    {
      caption: "split.py",
      language: "python",
      code: `from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y)`,
    },
    {
      caption: "preprocess.py",
      language: "python",
      code: `from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()`,
    },
    {
      caption: "model.py",
      language: "python",
      code: `from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train, y_train)`,
    },
    {
      caption: "evaluate.py",
      language: "python",
      code: `from sklearn.metrics import accuracy_score
score = accuracy_score(y_test, predictions)`,
    },
    {
      caption: "cluster.py",
      language: "python",
      code: `from sklearn.cluster import KMeans
model = KMeans(n_clusters=3)`,
    },
  ],
  dl: [
    {
      caption: "nn.py",
      language: "python",
      code: `import tensorflow as tf
model = tf.keras.Sequential([
    tf.keras.layers.Dense(16, activation="relu"),
    tf.keras.layers.Dense(1)
])`,
    },
    {
      caption: "activation.py",
      language: "python",
      code: `def relu(x):
    return max(0, x)`,
    },
    {
      caption: "train.py",
      language: "python",
      code: `model.compile(optimizer="adam", loss="mse")
model.fit(x_train, y_train, epochs=10)`,
    },
    {
      caption: "cnn.py",
      language: "python",
      code: `tf.keras.layers.Conv2D(32, (3, 3), activation="relu")`,
    },
    {
      caption: "transfer.py",
      language: "python",
      code: `base_model = tf.keras.applications.MobileNetV2(weights="imagenet", include_top=False)`,
    },
  ],
  node: [
    {
      caption: "server.js",
      language: "js",
      code: `const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("Hello from Node.js"));`,
    },
    {
      caption: "routes.js",
      language: "js",
      code: `app.post("/courses", (req, res) => {
  res.status(201).json({ success: true });
});`,
    },
    {
      caption: "middleware.js",
      language: "js",
      code: `app.use((req, res, next) => {
  next();
});`,
    },
    {
      caption: "auth.js",
      language: "js",
      code: `const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET);`,
    },
    {
      caption: "env.js",
      language: "js",
      code: `require("dotenv").config();`,
    },
  ],
  mongo: [
    {
      caption: "insert.js",
      language: "js",
      code: `db.users.insertOne({ name: "Asha", role: "learner" });`,
    },
    {
      caption: "crud.js",
      language: "js",
      code: `db.users.updateOne({ name: "Asha" }, { $set: { active: true } });`,
    },
    {
      caption: "query.js",
      language: "js",
      code: `db.users.find({ active: true });`,
    },
    {
      caption: "aggregate.js",
      language: "js",
      code: `db.progress.aggregate([
  { $group: { _id: "$category", total: { $sum: 1 } } }
]);`,
    },
    {
      caption: "mongoose.js",
      language: "js",
      code: `const user = new User({ name: "Asha" });
await user.save();`,
    },
  ],
  rest: [
    {
      caption: "get.js",
      language: "js",
      code: `app.get("/api/courses", (req, res) => {
  res.json({ data: [] });
});`,
    },
    {
      caption: "post.js",
      language: "js",
      code: `app.post("/api/courses", (req, res) => {
  res.status(201).json({ created: true });
});`,
    },
    {
      caption: "pagination.js",
      language: "js",
      code: `const page = Number(req.query.page || 1);`,
    },
    {
      caption: "security.js",
      language: "js",
      code: `if (!req.user) {
  return res.status(401).json({ message: "Unauthorized" });
}`,
    },
    {
      caption: "versioning.js",
      language: "js",
      code: `app.use("/api/v1", router);`,
    },
  ],
  rn: [
    {
      caption: "App.js",
      language: "jsx",
      code: `import { Text, View } from "react-native";

export default function App() {
  return (
    <View>
      <Text>Hello, React Native</Text>
    </View>
  );
}`,
    },
    {
      caption: "styles.js",
      language: "js",
      code: `const styles = {
  container: { flex: 1, padding: 16 },
};`,
    },
    {
      caption: "list.jsx",
      language: "jsx",
      code: `items.map((item) => <Text key={item.id}>{item.title}</Text>);`,
    },
    {
      caption: "navigation.jsx",
      language: "jsx",
      code: `navigation.navigate("Details");`,
    },
    {
      caption: "storage.js",
      language: "js",
      code: `AsyncStorage.setItem("theme", "dark");`,
    },
  ],
  docker: [
    {
      caption: "Dockerfile",
      language: "dockerfile",
      code: `FROM node:20
WORKDIR /app
COPY . .
CMD ["node", "server.js"]`,
    },
    {
      caption: "build.sh",
      language: "bash",
      code: `docker build -t skill-up .`,
    },
    {
      caption: "run.sh",
      language: "bash",
      code: `docker run -p 3000:3000 skill-up`,
    },
    {
      caption: "compose.yml",
      language: "yaml",
      code: `services:
  app:
    image: skill-up`,
    },
    {
      caption: "multi-stage.dockerfile",
      language: "dockerfile",
      code: `FROM node:20 AS build
FROM nginx:alpine`,
    },
  ],
  git: [
    {
      caption: "git.sh",
      language: "bash",
      code: `git init
git add .
git commit -m "Start project"`,
    },
    {
      caption: "branch.sh",
      language: "bash",
      code: `git checkout -b feature/navbar`,
    },
    {
      caption: "merge.sh",
      language: "bash",
      code: `git merge feature/navbar`,
    },
    {
      caption: "remote.sh",
      language: "bash",
      code: `git push origin main`,
    },
    {
      caption: "stash.sh",
      language: "bash",
      code: `git stash`,
    },
  ],
};

const bankKeyBySlug = {
  "html-tutorial": "html",
  "css-tutorial": "css",
  "javascript-tutorial": "js",
  "react-tutorial": "react",
  "typescript-tutorial": "ts",
  "tailwind-css": "tailwind",
  "python-tutorial": "python",
  "java-tutorial": "java",
  "cpp-tutorial": "cpp",
  "machine-learning": "ml",
  "deep-learning": "dl",
  "nodejs-tutorial": "node",
  "mongodb-tutorial": "mongo",
  "rest-api-design": "rest",
  "react-native": "rn",
  "docker-tutorial": "docker",
  "git-tutorial": "git",
};

const topicGuidance = (topic, courseTitle) => {
  const lower = topic.toLowerCase();

  if (/(introduction|overview)/.test(lower)) {
    return `Start with the big picture: what ${topic} is, why it exists, and where it shows up inside ${courseTitle}.`;
  }

  if (/(setup|installation|environment|basics)/.test(lower)) {
    return `Set up a small working example first so the rest of the ${courseTitle} lesson stays easy to follow.`;
  }

  if (/(form|input|validation|authentication|jwt|error handling)/.test(lower)) {
    return `Pay attention to the data entering and leaving the system, because ${topic} is often where reliability matters most.`;
  }

  if (/(layout|grid|flexbox|responsive|display|positioning|spacing|border|margin|padding)/.test(lower)) {
    return `Focus on how ${topic} affects structure, spacing, and the way the user experiences the page or screen.`;
  }

  if (/(api|fetch|promise|async|await|routing|middleware|rest|graphql)/.test(lower)) {
    return `This section connects ${topic} to real data flow between components, services, and responses.`;
  }

  if (/(class|object|oop|inheritance|polymorphism|encapsulation|abstraction)/.test(lower)) {
    return `Use ${topic} to organize related behavior into clear, reusable building blocks.`;
  }

  if (/(testing|evaluation|deployment|best practices|security|performance)/.test(lower)) {
    return `Treat ${topic} as the part that turns knowledge into a stable, maintainable habit.`;
  }

  return `Use this section to understand how ${topic} fits into real projects and why developers rely on it.`;
};

const topicBullets = (topic, courseTitle) => {
  const topicLower = topic.toLowerCase();
  return [
    `See how ${topicLower} supports the bigger ${courseTitle.toLowerCase()} workflow.`,
    `Try one small change so you can observe how ${topicLower} affects the result.`,
    `Keep the example readable and focused on a single idea at a time.`,
  ];
};

const topicNotes = (topic) => [
  `Practice ${topic} in a tiny example before combining it with the next topic.`,
  "Review the section again after a short build so the pattern sticks more naturally.",
];

const makeSection = (course, topic, index) => {
  const bankKey = bankKeyBySlug[course.slug];
  const bank = codeBanks[bankKey] || [];
  const codeExample = bank.length ? bank[index % bank.length] : null;

  return {
    id: slugify(`${course.slug}-${topic}`),
    sidebarLabel: topic,
    title: topic,
    content: [
      `${topic} is an important part of ${course.title}. This section explains the concept in a beginner-friendly way and shows how it appears in real projects.`,
      topicGuidance(topic, course.title),
    ],
    bulletPoints: topicBullets(topic, course.title),
    codeExample,
    notes: topicNotes(topic),
  };
};

function buildDetailedSyllabus(course) {
  const topics = detailedTopicsBySlug[course.slug];

  if (!topics) {
    return course;
  }

  return {
    ...course,
    sections: topics.map((topic, index) => makeSection(course, topic, index)),
  };
}

function enhanceLearningCourses(courses) {
  return courses.map((course) => buildDetailedSyllabus(course));
}

module.exports = {
  enhanceLearningCourses,
  detailedTopicsBySlug,
};
