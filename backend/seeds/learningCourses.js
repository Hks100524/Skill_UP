const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const sectionTitles = {
  web: ["Introduction", "Starter Example", "Core Concepts", "Good Patterns", "Mini Project", "Next Steps"],
  language: ["Introduction", "Starter Example", "Core Concepts", "Good Patterns", "Mini Project", "Next Steps"],
  data: ["Introduction", "Starter Example", "Core Concepts", "Good Patterns", "Mini Project", "Next Steps"],
  backend: ["Introduction", "Starter Example", "Core Concepts", "Good Patterns", "Mini Project", "Next Steps"],
  mobile: ["Introduction", "Starter Example", "Core Concepts", "Good Patterns", "Mini Project", "Next Steps"],
  devops: ["Introduction", "Starter Example", "Core Concepts", "Good Patterns", "Mini Project", "Next Steps"],
};

const makeCodeExample = (codeExample) => {
  if (!codeExample) {
    return null;
  }

  return {
    caption: codeExample.caption || "",
    language: codeExample.language || "text",
    code: codeExample.code || "",
  };
};

const makeSection = (courseSlug, title, data) => ({
  id: slugify(`${courseSlug}-${title}`),
  sidebarLabel: title,
  title,
  content: Array.isArray(data.content) ? data.content : [data.content].filter(Boolean),
  bulletPoints: Array.isArray(data.bulletPoints) ? data.bulletPoints : [],
  codeExample: makeCodeExample(data.codeExample),
  notes: Array.isArray(data.notes) ? data.notes : [],
});

const buildCourse = (config) => {
  const titles = sectionTitles[config.kind];

  return {
    title: config.title,
    slug: config.slug,
    category: config.category,
    description: config.description,
    badge: config.badge,
    level: config.level,
    order: config.order,
    sections: [
      makeSection(config.slug, titles[0], {
        content: [
          config.summary,
          `The goal of this path is to help you understand how ${config.title} fits into real projects, not just memorized syntax.`,
        ],
        bulletPoints: config.focusPoints,
        notes: [
          `Start small, read each example carefully, and change one thing at a time while practicing ${config.title}.`,
        ],
      }),
      makeSection(config.slug, titles[1], {
        content: [
          `This starter example shows the smallest useful version of ${config.title}.`,
          "Use it to understand the syntax, then extend the same pattern in your own editor.",
        ],
        codeExample: config.starterCode,
        notes: [
          "Re-type the example by hand once so the structure becomes familiar.",
        ],
      }),
      makeSection(config.slug, titles[2], {
        content: [
          `The core concepts section is where the lesson starts to feel practical.`,
          `These are the ideas you will reuse most often when working with ${config.title} in real apps, scripts, or systems.`,
        ],
        bulletPoints: config.practicePoints,
        codeExample: config.practiceCode,
      }),
      makeSection(config.slug, titles[3], {
        content: [
          `Good patterns help you write code that is easier to read, easier to debug, and easier to hand over to another developer.`,
        ],
        bulletPoints: config.bestPractices,
        notes: [
          "Keep the examples focused on one concept at a time.",
          "Prefer clear names and small steps over clever shortcuts.",
        ],
      }),
      makeSection(config.slug, titles[4], {
        content: [
          "The mini project combines the earlier lessons into one realistic task you can finish on your own.",
        ],
        bulletPoints: config.projectPoints,
        codeExample: config.projectCode,
        notes: [
          "The project does not need to be large. The goal is to connect the concepts.",
        ],
      }),
      makeSection(config.slug, titles[5], {
        content: [
          `Use this closing section to review the lesson, tidy up your notes, and move on to the next topic in the learning path.`,
        ],
        bulletPoints: config.nextSteps,
        notes: [
          "Revisit the earlier sections after building something small. Practice improves retention.",
        ],
      }),
    ],
  };
};

const courseList = [
  {
    kind: "web",
    title: "HTML Tutorial",
    slug: "html-tutorial",
    category: "web-development",
    badge: "Tutorial",
    level: "beginner",
    order: 1,
    description: "Learn HTML - the language for building web pages.",
    summary:
      "HTML is the foundation of every webpage. You use it to describe headings, paragraphs, links, images, lists, tables, and forms.",
    focusPoints: [
      "Understand how elements and tags define structure.",
      "Learn how attributes add useful metadata to elements.",
      "Practice semantic HTML so your pages are readable by people and browsers.",
    ],
    starterCode: {
      caption: "index.html",
      language: "html",
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTML Starter</title>
</head>
<body>
  <h1>Hello, HTML</h1>
  <p>This page is built with semantic structure.</p>
</body>
</html>`,
    },
    practicePoints: [
      "Nest elements correctly so the document stays valid.",
      "Use headings in order to create a clear outline.",
      "Add links, images, and lists to make content interactive and structured.",
    ],
    practiceCode: {
      caption: "semantic-page.html",
      language: "html",
      code: `<header>
  <nav>
    <a href="/">Home</a>
    <a href="/blog">Blog</a>
  </nav>
</header>

<main>
  <article>
    <h2>Learning HTML</h2>
    <p>Semantic tags make content easier to understand.</p>
  </article>
</main>`,
    },
    bestPractices: [
      "Prefer semantic tags like header, main, article, section, and footer.",
      "Always include alt text for meaningful images.",
      "Keep markup clean, indented, and easy to scan.",
    ],
    projectPoints: [
      "Create a profile page with a heading, biography, image, and contact link.",
      "Add a short list of skills or interests.",
      "Use at least one semantic container for the main content area.",
    ],
    projectCode: {
      caption: "profile-page.html",
      language: "html",
      code: `<main>
  <section>
    <h1>Jane Developer</h1>
    <p>Frontend learner and aspiring UI engineer.</p>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </section>
</main>`,
    },
    nextSteps: [
      "Move on to CSS to learn how presentation and layout work.",
      "Practice tables and forms before starting a bigger page.",
      "Review semantic tags whenever you start a new project.",
    ],
  },
  {
    kind: "web",
    title: "CSS Tutorial",
    slug: "css-tutorial",
    category: "web-development",
    badge: "Tutorial",
    level: "beginner",
    order: 2,
    description: "Learn CSS - style and design your web pages.",
    summary:
      "CSS controls the visual presentation of HTML. It lets you define colors, spacing, typography, layout, animations, and responsive behavior.",
    focusPoints: [
      "Learn selectors, the cascade, and specificity.",
      "Understand the box model, spacing, and sizing.",
      "Use Flexbox and Grid to build modern responsive layouts.",
    ],
    starterCode: {
      caption: "styles.css",
      language: "css",
      code: `body {
  font-family: system-ui, sans-serif;
  margin: 0;
  color: #1f2937;
  background: #f9fafb;
}

h1 {
  color: #7c3aed;
}`,
    },
    practicePoints: [
      "Choose selectors that target the right element without becoming too specific.",
      "Use consistent spacing values to make layouts feel intentional.",
      "Split layout work into small components instead of styling everything at once.",
    ],
    practiceCode: {
      caption: "card-layout.css",
      language: "css",
      code: `.card {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 1rem;
  background: white;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
}

.card__content {
  flex: 1;
}`,
    },
    bestPractices: [
      "Keep styles modular and reuse utility classes or variables where possible.",
      "Use responsive units when the layout must scale across devices.",
      "Always test your design on a smaller screen after the first pass.",
    ],
    projectPoints: [
      "Style a profile card, a blog article, or a pricing section.",
      "Add hover states and responsive spacing.",
      "Use Flexbox for one section and Grid for another section.",
    ],
    projectCode: {
      caption: "responsive-section.css",
      language: "css",
      code: `.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}`,
    },
    nextSteps: [
      "Practice layout utilities with a couple of real sections.",
      "Learn how transitions and animations improve interaction.",
      "Move on to JavaScript once the layout basics feel comfortable.",
    ],
  },
  {
    kind: "web",
    title: "JavaScript Tutorial",
    slug: "javascript-tutorial",
    category: "web-development",
    badge: "Popular",
    level: "beginner",
    order: 3,
    description: "Learn JavaScript - the programming language of the web.",
    summary:
      "JavaScript adds behavior to webpages. It is used for interactivity, data handling, DOM updates, APIs, forms, and modern application logic.",
    focusPoints: [
      "Work with variables, data types, and expressions.",
      "Use functions and control flow to organize behavior.",
      "Learn how the DOM connects JavaScript to the page.",
    ],
    starterCode: {
      caption: "app.js",
      language: "js",
      code: `const greeting = "Hello, JavaScript";
console.log(greeting);

function add(a, b) {
  return a + b;
}

console.log(add(2, 3));`,
    },
    practicePoints: [
      "Understand the difference between let, const, and var.",
      "Use arrays and objects to store structured data.",
      "Practice loops, conditionals, and reusable functions together.",
    ],
    practiceCode: {
      caption: "dom-example.js",
      language: "js",
      code: `const button = document.querySelector("#save");

button.addEventListener("click", () => {
  const output = document.querySelector("#status");
  output.textContent = "Saved successfully!";
});`,
    },
    bestPractices: [
      "Prefer clear function names and small, focused blocks of logic.",
      "Use strict comparisons and handle missing values early.",
      "Keep DOM reads and writes organized so the code stays easy to follow.",
    ],
    projectPoints: [
      "Build a to-do list or a small calculator.",
      "Update the interface from user input.",
      "Store the data in an array before rendering it to the page.",
    ],
    projectCode: {
      caption: "todo-example.js",
      language: "js",
      code: `const tasks = ["Learn JavaScript", "Build a project"];

function renderTasks(items) {
  return items.map((task) => "<li>" + task + "</li>").join("");
}`,
    },
    nextSteps: [
      "Learn async JavaScript and work with fetch requests.",
      "Practice small projects with DOM events and forms.",
      "Move on to React when you want to build components instead of raw DOM code.",
    ],
  },
  {
    kind: "web",
    title: "React Tutorial",
    slug: "react-tutorial",
    category: "web-development",
    badge: "Popular",
    level: "intermediate",
    order: 4,
    description: "Learn React - build modern user interfaces.",
    summary:
      "React helps you build reusable interfaces with components, props, state, and effects. It is ideal for interactive web applications.",
    focusPoints: [
      "Understand component-driven UI design.",
      "Learn how props move data between components.",
      "Use state and effects to manage UI behavior.",
    ],
    starterCode: {
      caption: "App.jsx",
      language: "jsx",
      code: `function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default function App() {
  return <Greeting name="React" />;
}`,
    },
    practicePoints: [
      "Keep components small and focused on a single responsibility.",
      "Use props for inputs and state for local UI changes.",
      "Map over arrays to render lists instead of hardcoding repeated JSX.",
    ],
    practiceCode: {
      caption: "counter.jsx",
      language: "jsx",
      code: `import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`,
    },
    bestPractices: [
      "Derive UI from state instead of manually duplicating values.",
      "Use keys when rendering lists.",
      "Keep side effects inside useEffect and keep render logic pure.",
    ],
    projectPoints: [
      "Build a small card list or task manager.",
      "Use state to add and remove items.",
      "Split the page into multiple components with clear props.",
    ],
    projectCode: {
      caption: "task-list.jsx",
      language: "jsx",
      code: `const tasks = ["Design UI", "Write components"];

function TaskList() {
  return (
    <ul>
      {tasks.map((task) => <li key={task}>{task}</li>)}
    </ul>
  );
}`,
    },
    nextSteps: [
      "Learn routing, forms, and data fetching patterns.",
      "Practice lifting state when multiple components share data.",
      "Explore TypeScript once you are comfortable with component patterns.",
    ],
  },
  {
    kind: "web",
    title: "TypeScript Tutorial",
    slug: "typescript-tutorial",
    category: "web-development",
    badge: "New",
    level: "intermediate",
    order: 5,
    description: "Learn TypeScript - JavaScript with types.",
    summary:
      "TypeScript adds static typing to JavaScript so you can catch more mistakes earlier and build larger applications with confidence.",
    focusPoints: [
      "Understand primitive types, unions, and type inference.",
      "Use interfaces and type aliases to describe data clearly.",
      "Learn how TypeScript improves editor support and refactoring.",
    ],
    starterCode: {
      caption: "index.ts",
      language: "ts",
      code: `function greet(name: string): string {
  return \`Hello, \${name}\`;
}

const message = greet("TypeScript");`,
    },
    practicePoints: [
      "Annotate functions and object shapes where the type is not obvious.",
      "Use union types when a value can accept more than one shape.",
      "Prefer interfaces for reusable data contracts.",
    ],
    practiceCode: {
      caption: "types.ts",
      language: "ts",
      code: `interface User {
  id: number;
  name: string;
}

const user: User = { id: 1, name: "Asha" };`,
    },
    bestPractices: [
      "Let inference work where the type is obvious.",
      "Use explicit return types for public functions.",
      "Keep type definitions close to the data they describe.",
    ],
    projectPoints: [
      "Add types to a small React component or API helper.",
      "Use interfaces for props and response data.",
      "Refactor a JavaScript utility into TypeScript.",
    ],
    projectCode: {
      caption: "api-client.ts",
      language: "ts",
      code: `type Course = { title: string; slug: string };

async function loadCourses(): Promise<Course[]> {
  return [];
}`,
    },
    nextSteps: [
      "Practice generics and utility types on a small codebase.",
      "Combine TypeScript with React for safer UI development.",
      "Move on to Tailwind CSS if you want to style your React apps quickly.",
    ],
  },
  {
    kind: "web",
    title: "Tailwind CSS",
    slug: "tailwind-css",
    category: "web-development",
    badge: "Tutorial",
    level: "beginner",
    order: 6,
    description: "Learn Tailwind - utility-first CSS framework.",
    summary:
      "Tailwind CSS lets you build designs directly in your markup with utility classes. It is popular for fast iteration and consistent UI systems.",
    focusPoints: [
      "Understand utility classes for spacing, color, and typography.",
      "Compose layouts with Flexbox, Grid, and responsive modifiers.",
      "Use component patterns to keep repeated UI readable.",
    ],
    starterCode: {
      caption: "button.html",
      language: "html",
      code: `<button class="rounded-full bg-violet-600 px-4 py-2 text-white shadow">
  Start Learning
</button>`,
    },
    practicePoints: [
      "Learn how responsive prefixes change styles at different breakpoints.",
      "Use hover, focus, and active states for interactive elements.",
      "Apply shadow, border, and spacing utilities to create depth.",
    ],
    practiceCode: {
      caption: "card.html",
      language: "html",
      code: `<div class="rounded-2xl bg-white p-5 shadow-lg">
  <h3 class="text-lg font-semibold">Course Card</h3>
  <p class="mt-2 text-sm text-slate-600">Built with utility classes.</p>
</div>`,
    },
    bestPractices: [
      "Use component extraction when class strings become hard to read.",
      "Keep color and spacing scales consistent across screens.",
      "Prefer a small set of repeatable patterns instead of random class combinations.",
    ],
    projectPoints: [
      "Build a course card grid or a marketing hero section.",
      "Add responsive behavior with sm, md, and lg prefixes.",
      "Use utility classes to match a polished production layout.",
    ],
    projectCode: {
      caption: "responsive-grid.html",
      language: "html",
      code: `<section class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  <article class="rounded-xl bg-white p-4 shadow">Card 1</article>
  <article class="rounded-xl bg-white p-4 shadow">Card 2</article>
  <article class="rounded-xl bg-white p-4 shadow">Card 3</article>
</section>`,
    },
    nextSteps: [
      "Combine Tailwind with React for rapid UI development.",
      "Review the spacing and color scales before building a larger app.",
      "Try a small landing page to practice composition and responsiveness.",
    ],
  },
  {
    kind: "language",
    title: "Python Tutorial",
    slug: "python-tutorial",
    category: "programming-languages",
    badge: "Popular",
    level: "beginner",
    order: 1,
    description: "Learn Python - versatile and beginner-friendly.",
    summary:
      "Python is known for readable syntax and a large ecosystem. It is used for scripting, automation, web backends, and data work.",
    focusPoints: [
      "Learn indentation-based syntax and readable control flow.",
      "Use lists, dictionaries, and functions to organize programs.",
      "Understand how modules and packages structure larger Python codebases.",
    ],
    starterCode: {
      caption: "hello.py",
      language: "python",
      code: `message = "Hello, Python"
print(message)

def add(a, b):
    return a + b

print(add(2, 3))`,
    },
    practicePoints: [
      "Use list comprehensions for compact transformations.",
      "Write small functions with clear names and docstrings.",
      "Handle common errors with try and except when user input is involved.",
    ],
    practiceCode: {
      caption: "collections.py",
      language: "python",
      code: `scores = [85, 91, 78]
average = sum(scores) / len(scores)
print(f"Average: {average:.1f}")`,
    },
    bestPractices: [
      "Prefer small functions that each do one thing well.",
      "Use virtual environments for project dependencies.",
      "Follow PEP 8 naming and formatting conventions.",
    ],
    projectPoints: [
      "Build a small CLI calculator or file organizer.",
      "Read user input, process it, and print a useful result.",
      "Store repeated logic in reusable functions.",
    ],
    projectCode: {
      caption: "cli.py",
      language: "python",
      code: `def greet(name):
    return f"Hello, {name}!"

print(greet("Learner"))`,
    },
    nextSteps: [
      "Practice importing modules and working with files.",
      "Explore popular libraries like requests, pandas, and Flask.",
      "Build a small automation script to strengthen your workflow.",
    ],
  },
  {
    kind: "language",
    title: "Java Tutorial",
    slug: "java-tutorial",
    category: "programming-languages",
    badge: "Tutorial",
    level: "beginner",
    order: 2,
    description: "Learn Java - enterprise application development.",
    summary:
      "Java is a strongly typed, object-oriented language used in backend systems, Android apps, and enterprise software.",
    focusPoints: [
      "Understand classes, objects, methods, and packages.",
      "Learn how the JVM runs Java applications across platforms.",
      "Practice collection handling, loops, and exception management.",
    ],
    starterCode: {
      caption: "Main.java",
      language: "java",
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java");
    }
}`,
    },
    practicePoints: [
      "Use methods to keep repeated logic reusable.",
      "Prefer descriptive variable names and explicit types.",
      "Handle exceptions so the application fails gracefully.",
    ],
    practiceCode: {
      caption: "Greet.java",
      language: "java",
      code: `public class Greet {
    static int add(int a, int b) {
        return a + b;
    }
}`,
    },
    bestPractices: [
      "Keep classes focused on one responsibility.",
      "Use interfaces for clear contracts when behavior varies.",
      "Organize code with packages as the project grows.",
    ],
    projectPoints: [
      "Build a simple student grading or inventory program.",
      "Use arrays or collections to store the records.",
      "Print a summary and handle invalid input cleanly.",
    ],
    projectCode: {
      caption: "Grades.java",
      language: "java",
      code: `int[] grades = {85, 90, 78};
int total = 0;
for (int grade : grades) {
    total += grade;
}`,
    },
    nextSteps: [
      "Move from syntax basics into object-oriented design.",
      "Practice working with collections and generics.",
      "Explore Spring or Android after the fundamentals are clear.",
    ],
  },
  {
    kind: "language",
    title: "C++ Tutorial",
    slug: "cpp-tutorial",
    category: "programming-languages",
    badge: "Tutorial",
    level: "intermediate",
    order: 3,
    description: "Learn C++ - powerful system programming.",
    summary:
      "C++ is used for performance-sensitive software, games, embedded systems, and high-performance libraries.",
    focusPoints: [
      "Learn how compilation, headers, and source files work together.",
      "Use references, pointers, and value semantics carefully.",
      "Practice classes, templates, and the Standard Template Library.",
    ],
    starterCode: {
      caption: "main.cpp",
      language: "cpp",
      code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++" << endl;
    return 0;
}`,
    },
    practicePoints: [
      "Pay attention to memory ownership and object lifetimes.",
      "Use const when values should not change.",
      "Prefer the STL over hand-written containers when possible.",
    ],
    practiceCode: {
      caption: "vector.cpp",
      language: "cpp",
      code: `#include <vector>
vector<int> numbers = {1, 2, 3};
numbers.push_back(4);`,
    },
    bestPractices: [
      "Avoid raw pointers unless you understand the ownership model.",
      "Keep functions small and use headers to separate interfaces from implementations.",
      "Use RAII to manage resources safely.",
    ],
    projectPoints: [
      "Build a grade tracker or a small menu-driven program.",
      "Use classes and vectors to organize the data.",
      "Print a summary after processing the input.",
    ],
    projectCode: {
      caption: "tracker.cpp",
      language: "cpp",
      code: `class Student {
public:
    string name;
    int score;
};`,
    },
    nextSteps: [
      "Practice classes, constructors, and templates.",
      "Learn how pointers and references differ in real programs.",
      "Explore algorithms and iterators in the STL.",
    ],
  },
  {
    kind: "language",
    title: "C# Tutorial",
    slug: "csharp-tutorial",
    category: "programming-languages",
    badge: "Tutorial",
    level: "beginner",
    order: 4,
    description: "Learn C# - modern .NET development.",
    summary:
      "C# is used for web apps, desktop software, services, and games. The language combines strong typing with modern productivity features.",
    focusPoints: [
      "Learn classes, properties, and object-oriented design.",
      "Understand how the .NET runtime supports modern apps.",
      "Practice collections, LINQ, and async code when you are ready.",
    ],
    starterCode: {
      caption: "Program.cs",
      language: "csharp",
      code: `using System;

Console.WriteLine("Hello, C#");`,
    },
    practicePoints: [
      "Use properties to protect class state and keep APIs clean.",
      "Prefer meaningful method names and clear return types.",
      "Use exceptions and null checks to keep programs stable.",
    ],
    practiceCode: {
      caption: "person.cs",
      language: "csharp",
      code: `public class Person {
    public string Name { get; set; }
    public int Age { get; set; }
}`,
    },
    bestPractices: [
      "Keep domain objects small and expressive.",
      "Use asynchronous APIs when you need I/O-heavy operations.",
      "Leverage LINQ for readable data queries.",
    ],
    projectPoints: [
      "Build a student record or expense tracker.",
      "Store records in a collection and print a summary.",
      "Use classes and methods to separate responsibilities.",
    ],
    projectCode: {
      caption: "tracker.cs",
      language: "csharp",
      code: `var names = new List<string> { "Asha", "Dev" };
foreach (var name in names)
{
    Console.WriteLine(name);
}`,
    },
    nextSteps: [
      "Explore ASP.NET Core for backend development.",
      "Practice LINQ, generics, and async/await in small exercises.",
      "Build a command-line utility before moving to larger frameworks.",
    ],
  },
  {
    kind: "language",
    title: "Go Tutorial",
    slug: "go-tutorial",
    category: "programming-languages",
    badge: "New",
    level: "beginner",
    order: 5,
    description: "Learn Go - fast and efficient backend development.",
    summary:
      "Go is built for simple, readable code and strong concurrency support. It is popular for APIs, tooling, and cloud services.",
    focusPoints: [
      "Learn packages, functions, and basic data types.",
      "Understand structs, interfaces, and methods.",
      "Practice goroutines and channels for concurrency.",
    ],
    starterCode: {
      caption: "main.go",
      language: "go",
      code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, Go")
}`,
    },
    practicePoints: [
      "Use short, readable functions and simple interfaces.",
      "Handle errors explicitly instead of hiding them.",
      "Organize code into packages as the program grows.",
    ],
    practiceCode: {
      caption: "person.go",
      language: "go",
      code: `type Person struct {
    Name string
    Age  int
}`,
    },
    bestPractices: [
      "Return errors early and keep control flow obvious.",
      "Use channels for coordination, not as a dumping ground for data.",
      "Prefer composition and small interfaces over deep inheritance trees.",
    ],
    projectPoints: [
      "Build a small API or worker program.",
      "Use structs to model the data you handle.",
      "Print results and handle failures cleanly.",
    ],
    projectCode: {
      caption: "server.go",
      language: "go",
      code: `func add(a int, b int) int {
    return a + b
}`,
    },
    nextSteps: [
      "Explore the standard library for HTTP, JSON, and testing.",
      "Practice concurrency with goroutines and channels.",
      "Build a small service to understand Go's project layout.",
    ],
  },
  {
    kind: "language",
    title: "Rust Tutorial",
    slug: "rust-tutorial",
    category: "programming-languages",
    badge: "New",
    level: "intermediate",
    order: 6,
    description: "Learn Rust - safe and concurrent programming.",
    summary:
      "Rust focuses on memory safety, performance, and fearless concurrency. It is popular for systems programming and modern tooling.",
    focusPoints: [
      "Learn ownership, borrowing, and lifetimes.",
      "Use enums and pattern matching to model rich data.",
      "Practice error handling with Result and Option.",
    ],
    starterCode: {
      caption: "main.rs",
      language: "rust",
      code: `fn main() {
    println!("Hello, Rust");
}`,
    },
    practicePoints: [
      "Understand why ownership rules protect memory safety.",
      "Use references when you only need to read data.",
      "Prefer pattern matching to long chains of conditionals.",
    ],
    practiceCode: {
      caption: "shapes.rs",
      language: "rust",
      code: `enum Shape {
    Circle(f64),
    Rectangle(f64, f64),
}`,
    },
    bestPractices: [
      "Keep ownership clear and avoid unnecessary cloning.",
      "Use structs and enums to make data explicit.",
      "Lean on the compiler to guide safe refactoring.",
    ],
    projectPoints: [
      "Build a small calculator or command-line utility.",
      "Use enums to describe operations and outcomes.",
      "Return Result values when failure is possible.",
    ],
    projectCode: {
      caption: "calc.rs",
      language: "rust",
      code: `fn add(a: i32, b: i32) -> i32 {
    a + b
}`,
    },
    nextSteps: [
      "Practice ownership and lifetimes with small examples.",
      "Build a project that uses modules and error handling.",
      "Explore crates for tasks like web services or CLI tooling.",
    ],
  },
  {
    kind: "data",
    title: "Data Analysis",
    slug: "data-analysis",
    category: "data-science-ai",
    badge: "Tutorial",
    level: "beginner",
    order: 1,
    description: "Learn to analyze and visualize data.",
    summary:
      "Data analysis turns raw information into useful insight. You learn how to clean datasets, summarize patterns, and communicate results clearly.",
    focusPoints: [
      "Understand the end-to-end workflow from raw data to insight.",
      "Learn cleaning, grouping, aggregation, and visual exploration.",
      "Practice telling a simple story with charts and summaries.",
    ],
    starterCode: {
      caption: "analysis.py",
      language: "python",
      code: `import pandas as pd

df = pd.DataFrame({"score": [82, 91, 77]})
print(df.describe())`,
    },
    practicePoints: [
      "Check missing values before starting any analysis.",
      "Use groupby and aggregation to summarize categories.",
      "Create a chart early so you can spot trends quickly.",
    ],
    practiceCode: {
      caption: "summary.py",
      language: "python",
      code: `sales = [120, 140, 90]
average = sum(sales) / len(sales)
print(average)`,
    },
    bestPractices: [
      "Document each step so the analysis can be repeated.",
      "Keep the question you are answering visible at every stage.",
      "Prefer simple charts when they explain the pattern clearly.",
    ],
    projectPoints: [
      "Analyze a small CSV file and summarize the findings.",
      "Create one chart that highlights the key trend.",
      "Write a short conclusion that explains the result in plain language.",
    ],
    projectCode: {
      caption: "report.py",
      language: "python",
      code: `import pandas as pd
df = pd.read_csv("sales.csv")
print(df.head())`,
    },
    nextSteps: [
      "Practice data cleaning on messy CSV files.",
      "Learn basic statistics so you can interpret results correctly.",
      "Move into machine learning when you want to predict outcomes.",
    ],
  },
  {
    kind: "data",
    title: "Machine Learning",
    slug: "machine-learning",
    category: "data-science-ai",
    badge: "Popular",
    level: "intermediate",
    order: 2,
    description: "Build intelligent systems with ML.",
    summary:
      "Machine learning lets systems learn patterns from data. You will study preprocessing, model training, evaluation, and common algorithm families.",
    focusPoints: [
      "Understand supervised and unsupervised learning.",
      "Learn feature engineering and train/test splits.",
      "Measure model quality with metrics that match the task.",
    ],
    starterCode: {
      caption: "train.py",
      language: "python",
      code: `from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit([[1], [2], [3]], [2, 4, 6])`,
    },
    practicePoints: [
      "Start with a baseline model before trying advanced techniques.",
      "Scale and encode data when the algorithm needs it.",
      "Check for overfitting by comparing training and validation performance.",
    ],
    practiceCode: {
      caption: "evaluate.py",
      language: "python",
      code: `from sklearn.metrics import accuracy_score
print(accuracy_score([1, 0, 1], [1, 0, 0]))`,
    },
    bestPractices: [
      "Use cross-validation when the dataset is small.",
      "Keep preprocessing steps consistent between training and inference.",
      "Document the metric that matters to the business goal.",
    ],
    projectPoints: [
      "Train a simple classifier on a public dataset.",
      "Compare at least two models and note the difference.",
      "Explain the trade-off between accuracy and interpretability.",
    ],
    projectCode: {
      caption: "pipeline.py",
      language: "python",
      code: `from sklearn.pipeline import Pipeline
pipeline = Pipeline([])`,
    },
    nextSteps: [
      "Learn feature selection, tuning, and model interpretation.",
      "Practice building small end-to-end ML projects.",
      "Move into deep learning when you need neural networks.",
    ],
  },
  {
    kind: "data",
    title: "Deep Learning",
    slug: "deep-learning",
    category: "data-science-ai",
    badge: "Tutorial",
    level: "intermediate",
    order: 3,
    description: "Neural networks and advanced AI.",
    summary:
      "Deep learning uses layered neural networks to solve tasks like image recognition, language processing, and sequence modeling.",
    focusPoints: [
      "Learn how neurons, activations, and loss functions work together.",
      "Understand forward pass, backpropagation, and optimization.",
      "Practice regularization to reduce overfitting.",
    ],
    starterCode: {
      caption: "model.py",
      language: "python",
      code: `import tensorflow as tf
model = tf.keras.Sequential([
    tf.keras.layers.Dense(16, activation="relu"),
    tf.keras.layers.Dense(1)
])`,
    },
    practicePoints: [
      "Use a clear input pipeline so training stays consistent.",
      "Monitor validation loss instead of training loss alone.",
      "Try a simple network before moving to deeper architectures.",
    ],
    practiceCode: {
      caption: "train.py",
      language: "python",
      code: `model.compile(optimizer="adam", loss="mse")
model.fit(x_train, y_train, epochs=10)`,
    },
    bestPractices: [
      "Tune learning rate and batch size carefully.",
      "Use callbacks to stop training when validation stops improving.",
      "Start with a baseline architecture and improve incrementally.",
    ],
    projectPoints: [
      "Build a small image or text classifier.",
      "Compare a shallow network and a deeper network.",
      "Record the training curve and interpret the results.",
    ],
    projectCode: {
      caption: "callbacks.py",
      language: "python",
      code: `callbacks = [tf.keras.callbacks.EarlyStopping(patience=3)]`,
    },
    nextSteps: [
      "Study CNNs for image tasks and sequence models for text.",
      "Practice reading training curves and spotting overfitting.",
      "Build a small dataset pipeline around one real task.",
    ],
  },
  {
    kind: "data",
    title: "Pandas Tutorial",
    slug: "pandas-tutorial",
    category: "data-science-ai",
    badge: "Reference",
    level: "beginner",
    order: 4,
    description: "Data manipulation with Python Pandas.",
    summary:
      "Pandas is the go-to Python library for tabular data. It makes it easy to read, clean, transform, and analyze datasets.",
    focusPoints: [
      "Work with Series and DataFrame objects.",
      "Filter, sort, group, and merge data efficiently.",
      "Load data from CSV, Excel, and databases.",
    ],
    starterCode: {
      caption: "frame.py",
      language: "python",
      code: `import pandas as pd

df = pd.DataFrame({"name": ["A", "B"], "score": [90, 84]})
print(df.head())`,
    },
    practicePoints: [
      "Use loc and iloc to select rows and columns.",
      "Handle missing values before reporting your results.",
      "Use groupby when you need summary statistics by category.",
    ],
    practiceCode: {
      caption: "groupby.py",
      language: "python",
      code: `df.groupby("name")["score"].mean()`,
    },
    bestPractices: [
      "Use method chaining when it keeps the transformation readable.",
      "Rename columns early so later steps are easier to follow.",
      "Keep a clean copy of the raw data for reference.",
    ],
    projectPoints: [
      "Load a CSV file and produce a summary table.",
      "Clean missing values and rename columns.",
      "Create one grouped report and one chart-ready dataset.",
    ],
    projectCode: {
      caption: "cleaning.py",
      language: "python",
      code: `df = df.dropna().reset_index(drop=True)`,
    },
    nextSteps: [
      "Practice joins and merges with two related tables.",
      "Learn time-series helpers if you work with dates.",
      "Use Pandas together with visualization libraries.",
    ],
  },
  {
    kind: "data",
    title: "NumPy Tutorial",
    slug: "numpy-tutorial",
    category: "data-science-ai",
    badge: "Reference",
    level: "beginner",
    order: 5,
    description: "Numerical computing with NumPy.",
    summary:
      "NumPy is the foundation for numerical computing in Python. It provides fast arrays, broadcasting, and useful math operations.",
    focusPoints: [
      "Understand arrays, shapes, and vectorized operations.",
      "Learn slicing, indexing, and broadcasting patterns.",
      "Use NumPy as the base for scientific and ML workflows.",
    ],
    starterCode: {
      caption: "arrays.py",
      language: "python",
      code: `import numpy as np

arr = np.array([1, 2, 3])
print(arr * 2)`,
    },
    practicePoints: [
      "Prefer vectorized operations over Python loops when possible.",
      "Check array shapes before combining values.",
      "Use random helpers for experiments and simulations.",
    ],
    practiceCode: {
      caption: "broadcasting.py",
      language: "python",
      code: `matrix = np.array([[1, 2], [3, 4]])
print(matrix + 10)`,
    },
    bestPractices: [
      "Keep arrays homogeneous when you want performance and reliability.",
      "Choose descriptive variable names for dimensions and vectors.",
      "Validate shapes before passing arrays into models.",
    ],
    projectPoints: [
      "Generate a small numeric dataset and summarize it.",
      "Use slicing and aggregation to inspect the values.",
      "Compute a simple transformation and print the result.",
    ],
    projectCode: {
      caption: "stats.py",
      language: "python",
      code: `np.mean(np.array([2, 4, 6, 8]))`,
    },
    nextSteps: [
      "Use NumPy together with Pandas for data analysis.",
      "Practice linear algebra helpers and random simulations.",
      "Move into TensorFlow when you need neural networks.",
    ],
  },
  {
    kind: "data",
    title: "TensorFlow",
    slug: "tensorflow",
    category: "data-science-ai",
    badge: "Tutorial",
    level: "intermediate",
    order: 6,
    description: "Build ML models with TensorFlow.",
    summary:
      "TensorFlow is a production-ready machine learning framework. It helps you create, train, and deploy deep learning models.",
    focusPoints: [
      "Work with tensors, datasets, and the Keras API.",
      "Learn how to define, compile, and train models.",
      "Understand callbacks, saving, and deployment basics.",
    ],
    starterCode: {
      caption: "keras.py",
      language: "python",
      code: `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Dense(32, activation="relu"),
    tf.keras.layers.Dense(1)
])`,
    },
    practicePoints: [
      "Use tf.data pipelines when your dataset grows.",
      "Track validation metrics while training.",
      "Save and load models so you can reuse them later.",
    ],
    practiceCode: {
      caption: "fit.py",
      language: "python",
      code: `model.compile(optimizer="adam", loss="mse")
model.fit(x_train, y_train, epochs=5)`,
    },
    bestPractices: [
      "Start with a small model and baseline metrics.",
      "Use callbacks to control training and checkpoints.",
      "Keep preprocessing steps aligned between training and inference.",
    ],
    projectPoints: [
      "Train a small classifier or regressor with TensorFlow.",
      "Save the model and reload it in a new script.",
      "Write down the metric that best describes success.",
    ],
    projectCode: {
      caption: "save.py",
      language: "python",
      code: `model.save("model.keras")`,
    },
    nextSteps: [
      "Explore CNNs, RNNs, and transfer learning.",
      "Practice deployment workflows for saved models.",
      "Combine TensorFlow with a data pipeline from Pandas or NumPy.",
    ],
  },
  {
    kind: "backend",
    title: "Node.js Tutorial",
    slug: "nodejs-tutorial",
    category: "backend-development",
    badge: "Popular",
    level: "beginner",
    order: 1,
    description: "Server-side JavaScript with Node.js.",
    summary:
      "Node.js lets you run JavaScript on the server. It is widely used for APIs, tooling, and real-time applications.",
    focusPoints: [
      "Learn the runtime, modules, and npm workflow.",
      "Understand asynchronous programming and event-driven behavior.",
      "Build HTTP services with Express and middleware.",
    ],
    starterCode: {
      caption: "server.js",
      language: "js",
      code: `const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Node.js");
});`,
    },
    practicePoints: [
      "Use middleware for parsing, validation, and logging.",
      "Keep route handlers small and focused.",
      "Handle async errors with care so the server stays stable.",
    ],
    practiceCode: {
      caption: "route.js",
      language: "js",
      code: `app.get("/courses", async (req, res) => {
  res.json([]);
});`,
    },
    bestPractices: [
      "Separate configuration, routes, controllers, and models.",
      "Use environment variables for secrets and deployment settings.",
      "Log errors clearly so debugging stays manageable.",
    ],
    projectPoints: [
      "Build a small REST API with one resource.",
      "Validate input before writing data.",
      "Return clear success and error responses.",
    ],
    projectCode: {
      caption: "api.js",
      language: "js",
      code: `app.post("/tasks", (req, res) => {
  res.status(201).json({ success: true });
});`,
    },
    nextSteps: [
      "Add persistence with a database.",
      "Practice middleware and authentication patterns.",
      "Move from simple routes to a full backend structure.",
    ],
  },
  {
    kind: "backend",
    title: "SQL Tutorial",
    slug: "sql-tutorial",
    category: "backend-development",
    badge: "Tutorial",
    level: "beginner",
    order: 2,
    description: "Database queries and management.",
    summary:
      "SQL is the language of relational databases. It is used to create tables, insert records, query data, and manage relationships.",
    focusPoints: [
      "Learn SELECT, WHERE, ORDER BY, and filtering basics.",
      "Use JOINs and grouping to combine and summarize data.",
      "Understand constraints and transactions for reliable data work.",
    ],
    starterCode: {
      caption: "select.sql",
      language: "sql",
      code: `SELECT id, name
FROM students
WHERE active = true
ORDER BY name ASC;`,
    },
    practicePoints: [
      "Start with simple queries and add filters step by step.",
      "Use aggregate functions to summarize data accurately.",
      "Test joins carefully so the result set contains the expected rows.",
    ],
    practiceCode: {
      caption: "join.sql",
      language: "sql",
      code: `SELECT orders.id, customers.name
FROM orders
JOIN customers ON customers.id = orders.customer_id;`,
    },
    bestPractices: [
      "Index the columns you filter and join on frequently.",
      "Use explicit column lists instead of SELECT * in production queries.",
      "Keep transactions short and meaningful.",
    ],
    projectPoints: [
      "Create tables for users, orders, or blog posts.",
      "Write queries that read, update, and summarize the data.",
      "Use JOIN and GROUP BY to produce a useful report.",
    ],
    projectCode: {
      caption: "schema.sql",
      language: "sql",
      code: `CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);`,
    },
    nextSteps: [
      "Practice subqueries and common table expressions.",
      "Learn how indexes affect performance.",
      "Move to PostgreSQL for advanced relational features.",
    ],
  },
  {
    kind: "backend",
    title: "MongoDB Tutorial",
    slug: "mongodb-tutorial",
    category: "backend-development",
    badge: "Tutorial",
    level: "beginner",
    order: 3,
    description: "NoSQL database for modern apps.",
    summary:
      "MongoDB stores JSON-like documents and gives you flexible schema design for many modern application workflows.",
    focusPoints: [
      "Understand collections, documents, and BSON values.",
      "Learn CRUD operations and filter syntax.",
      "Use indexes and aggregation for better performance and analysis.",
    ],
    starterCode: {
      caption: "insert.js",
      language: "js",
      code: `db.users.insertOne({
  name: "Asha",
  role: "learner"
});`,
    },
    practicePoints: [
      "Design documents to match the queries you run most often.",
      "Use embedded data where it keeps the model simple.",
      "Add indexes on fields that appear in filters or sorts.",
    ],
    practiceCode: {
      caption: "find.js",
      language: "js",
      code: `db.users.find({ role: "learner" }).sort({ name: 1 });`,
    },
    bestPractices: [
      "Think about access patterns before you create collections.",
      "Keep documents focused and avoid unnecessary nesting.",
      "Use aggregation pipelines for grouped reporting tasks.",
    ],
    projectPoints: [
      "Store course progress in a collection.",
      "Query records by category and progress state.",
      "Summarize the data with a small aggregation pipeline.",
    ],
    projectCode: {
      caption: "aggregate.js",
      language: "js",
      code: `db.progress.aggregate([
  { $group: { _id: "$category", total: { $sum: 1 } } }
]);`,
    },
    nextSteps: [
      "Practice schema design for nested and related data.",
      "Learn indexes, aggregation, and transactions.",
      "Connect MongoDB to a Node.js backend project.",
    ],
  },
  {
    kind: "backend",
    title: "PostgreSQL",
    slug: "postgresql",
    category: "backend-development",
    badge: "Reference",
    level: "beginner",
    order: 4,
    description: "Advanced relational database.",
    summary:
      "PostgreSQL is a powerful relational database that supports advanced SQL, strong consistency, and features like JSON and window functions.",
    focusPoints: [
      "Work with tables, constraints, and transactions.",
      "Learn how PostgreSQL extends SQL with powerful features.",
      "Understand indexing, functions, and JSON support.",
    ],
    starterCode: {
      caption: "create-table.sql",
      language: "sql",
      code: `CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL
);`,
    },
    practicePoints: [
      "Use transactions when multiple operations must stay in sync.",
      "Add constraints to protect the shape of your data.",
      "Consider indexes for the most common queries first.",
    ],
    practiceCode: {
      caption: "query.sql",
      language: "sql",
      code: `SELECT title
FROM courses
WHERE title ILIKE '%tutorial%';`,
    },
    bestPractices: [
      "Design normalized tables for data that changes independently.",
      "Use EXPLAIN when you need to inspect query plans.",
      "Keep database logic readable and consistent across tables.",
    ],
    projectPoints: [
      "Create a small schema for users and learning progress.",
      "Write a few joins and filtered queries.",
      "Use a transaction for one multi-step operation.",
    ],
    projectCode: {
      caption: "transaction.sql",
      language: "sql",
      code: `BEGIN;
UPDATE accounts SET balance = balance - 50;
COMMIT;`,
    },
    nextSteps: [
      "Practice window functions and JSON operators.",
      "Move a small app from query basics to real schema design.",
      "Pair PostgreSQL with an API backend for the full flow.",
    ],
  },
  {
    kind: "backend",
    title: "REST API Design",
    slug: "rest-api-design",
    category: "backend-development",
    badge: "Tutorial",
    level: "intermediate",
    order: 5,
    description: "Build RESTful web services.",
    summary:
      "REST API design teaches you how to model resources, choose HTTP methods, and return responses that are predictable and easy to consume.",
    focusPoints: [
      "Model resources with clear nouns and stable URLs.",
      "Use HTTP methods and status codes consistently.",
      "Plan for validation, pagination, filtering, and errors.",
    ],
    starterCode: {
      caption: "route.js",
      language: "js",
      code: `app.get("/api/courses", (req, res) => {
  res.json({ data: [] });
});`,
    },
    practicePoints: [
      "Keep request and response payloads predictable.",
      "Use versioning when the contract will evolve.",
      "Return useful error messages and status codes.",
    ],
    practiceCode: {
      caption: "post-route.js",
      language: "js",
      code: `app.post("/api/courses", (req, res) => {
  res.status(201).json({ created: true });
});`,
    },
    bestPractices: [
      "Document the API so consumers understand the contract.",
      "Keep response envelopes consistent across routes.",
      "Validate input before touching the database.",
    ],
    projectPoints: [
      "Design an API for a small course catalog.",
      "Add create, read, update, and delete endpoints.",
      "Write a response shape that stays consistent across the service.",
    ],
    projectCode: {
      caption: "response.json",
      language: "json",
      code: `{
  "success": true,
  "data": { "id": 1 }
}`,
    },
    nextSteps: [
      "Add authentication and authorization rules.",
      "Practice pagination and filtering on list endpoints.",
      "Learn how to version an API without breaking clients.",
    ],
  },
  {
    kind: "backend",
    title: "GraphQL",
    slug: "graphql",
    category: "backend-development",
    badge: "New",
    level: "intermediate",
    order: 6,
    description: "Modern API query language.",
    summary:
      "GraphQL lets clients ask for exactly the data they need. It uses schemas, types, queries, mutations, and resolvers.",
    focusPoints: [
      "Understand the schema-first approach.",
      "Learn how queries and mutations map to resolvers.",
      "Use variables, fragments, and input types to keep requests reusable.",
    ],
    starterCode: {
      caption: "schema.graphql",
      language: "graphql",
      code: `type Query {
  courses: [Course!]!
}`,
    },
    practicePoints: [
      "Keep the schema explicit and descriptive.",
      "Return only the data the client needs.",
      "Handle nested data carefully to avoid slow resolvers.",
    ],
    practiceCode: {
      caption: "query.graphql",
      language: "graphql",
      code: `query GetCourses {
  courses {
    title
    slug
  }
}`,
    },
    bestPractices: [
      "Use meaningful type names and field names.",
      "Protect expensive operations with batching or caching.",
      "Keep mutations focused on one change at a time.",
    ],
    projectPoints: [
      "Create a schema for courses and lessons.",
      "Write a query that fetches only the required fields.",
      "Add one mutation that changes a course record.",
    ],
    projectCode: {
      caption: "resolver.js",
      language: "js",
      code: `const resolvers = {
  Query: { courses: () => [] }
};`,
    },
    nextSteps: [
      "Practice resolver composition and type design.",
      "Try GraphQL with a real database-backed project.",
      "Study caching and pagination patterns for larger schemas.",
    ],
  },
  {
    kind: "mobile",
    title: "React Native",
    slug: "react-native",
    category: "mobile-development",
    badge: "Popular",
    level: "beginner",
    order: 1,
    description: "Cross-platform mobile apps with React.",
    summary:
      "React Native lets you build native mobile apps with JavaScript and React patterns. It is useful when you want one codebase for iOS and Android.",
    focusPoints: [
      "Learn how React concepts map to mobile components.",
      "Use layout, lists, and navigation to build screens.",
      "Understand device APIs and platform differences.",
    ],
    starterCode: {
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
    practicePoints: [
      "Use Flexbox layout to arrange mobile screens.",
      "Keep components small and reusable.",
      "Test touch targets, scrolling, and spacing on a device.",
    ],
    practiceCode: {
      caption: "screen.jsx",
      language: "jsx",
      code: `<View style={{ flex: 1, padding: 16 }}>
  <Text>Course cards</Text>
</View>`,
    },
    bestPractices: [
      "Use platform-aware components when behavior differs between devices.",
      "Keep navigation simple and consistent.",
      "Optimize images and lists for smooth scrolling.",
    ],
    projectPoints: [
      "Build a course list or a notes app.",
      "Add navigation between list and detail screens.",
      "Use state to store a small set of user actions.",
    ],
    projectCode: {
      caption: "list.jsx",
      language: "jsx",
      code: `{items.map((item) => (
  <Text key={item.id}>{item.title}</Text>
))}`,
    },
    nextSteps: [
      "Practice navigation, forms, and device permissions.",
      "Try a small offline-first app.",
      "Learn how to prepare an app for store deployment.",
    ],
  },
  {
    kind: "mobile",
    title: "Flutter Tutorial",
    slug: "flutter-tutorial",
    category: "mobile-development",
    badge: "Popular",
    level: "beginner",
    order: 2,
    description: "Beautiful native apps with Flutter.",
    summary:
      "Flutter uses widgets to build natively compiled apps for mobile, web, and desktop. Its layout model makes UI composition very explicit.",
    focusPoints: [
      "Learn widgets, layout, and the build method.",
      "Use stateful widgets when the interface needs to change.",
      "Understand navigation and theming early.",
    ],
    starterCode: {
      caption: "main.dart",
      language: "dart",
      code: `import 'package:flutter/material.dart';

void main() => runApp(const MyApp());`,
    },
    practicePoints: [
      "Compose UI with small widgets instead of one large screen.",
      "Use padding, rows, columns, and lists intentionally.",
      "Keep state close to the widgets that need it.",
    ],
    practiceCode: {
      caption: "card.dart",
      language: "dart",
      code: `Widget build(BuildContext context) {
  return const Text("Hello Flutter");
}`,
    },
    bestPractices: [
      "Use clear widget names and organize them into files.",
      "Keep build methods readable by breaking large UI blocks apart.",
      "Apply themes so your app stays visually consistent.",
    ],
    projectPoints: [
      "Build a course card or profile page.",
      "Add navigation between two screens.",
      "Use a list and a detail view to practice composition.",
    ],
    projectCode: {
      caption: "home.dart",
      language: "dart",
      code: `Column(
  children: const [
    Text("Learn Flutter"),
  ],
)`,
    },
    nextSteps: [
      "Practice forms, async loading, and theming.",
      "Try a small app that fetches data from an API.",
      "Explore reusable widgets and clean folder structure.",
    ],
  },
  {
    kind: "mobile",
    title: "Swift Tutorial",
    slug: "swift-tutorial",
    category: "mobile-development",
    badge: "Tutorial",
    level: "beginner",
    order: 3,
    description: "iOS app development with Swift.",
    summary:
      "Swift is the language behind modern iOS development. It focuses on safety, clarity, and strong integration with Apple frameworks.",
    focusPoints: [
      "Learn variables, optionals, functions, and structs.",
      "Use SwiftUI or UIKit to build screen layouts.",
      "Understand how state drives UI updates.",
    ],
    starterCode: {
      caption: "main.swift",
      language: "swift",
      code: `let message = "Hello, Swift"
print(message)`,
    },
    practicePoints: [
      "Use optionals carefully and unwrap them safely.",
      "Model simple data with structs when possible.",
      "Keep UI code and data logic separated.",
    ],
    practiceCode: {
      caption: "model.swift",
      language: "swift",
      code: `struct Course {
    let title: String
    let slug: String
}`,
    },
    bestPractices: [
      "Prefer value types for small data models.",
      "Keep function signatures expressive and small.",
      "Use SwiftUI state patterns consistently once you choose them.",
    ],
    projectPoints: [
      "Create a small learning app screen.",
      "Display a list of courses and a simple detail view.",
      "Use SwiftUI state to update the interface.",
    ],
    projectCode: {
      caption: "view.swift",
      language: "swift",
      code: `Text("Swift Tutorial")
    .font(.title)`,
    },
    nextSteps: [
      "Practice optionals, collections, and state-driven UI.",
      "Build a small SwiftUI project before moving to larger screens.",
      "Explore networking and navigation in iOS apps.",
    ],
  },
  {
    kind: "mobile",
    title: "Kotlin Tutorial",
    slug: "kotlin-tutorial",
    category: "mobile-development",
    badge: "Tutorial",
    level: "beginner",
    order: 4,
    description: "Modern Android development.",
    summary:
      "Kotlin is the modern language for Android and a strong general-purpose language for concise, readable code.",
    focusPoints: [
      "Learn classes, functions, and null safety.",
      "Use collections and lambdas to write compact logic.",
      "Understand how Kotlin supports Android UI patterns.",
    ],
    starterCode: {
      caption: "Main.kt",
      language: "kotlin",
      code: `fun main() {
    println("Hello, Kotlin")
}`,
    },
    practicePoints: [
      "Use data classes for structured data.",
      "Keep nullability explicit with ? and safe calls.",
      "Write functions that read naturally in your app code.",
    ],
    practiceCode: {
      caption: "user.kt",
      language: "kotlin",
      code: `data class User(val name: String, val age: Int)`,
    },
    bestPractices: [
      "Keep Android screens small and composable.",
      "Use immutable data where possible.",
      "Apply clear naming so your app code stays easy to maintain.",
    ],
    projectPoints: [
      "Create a profile or course list screen.",
      "Use a simple data class to power the UI.",
      "Add one interaction such as a button or list click.",
    ],
    projectCode: {
      caption: "screen.kt",
      language: "kotlin",
      code: `val courses = listOf("Kotlin", "Android")
courses.forEach { println(it) }`,
    },
    nextSteps: [
      "Practice Android layouts, navigation, and state handling.",
      "Build a small app before moving to more advanced patterns.",
      "Explore coroutines and network requests once the basics are clear.",
    ],
  },
  {
    kind: "devops",
    title: "Docker Tutorial",
    slug: "docker-tutorial",
    category: "devops-cloud",
    badge: "Popular",
    level: "beginner",
    order: 1,
    description: "Containerization with Docker.",
    summary:
      "Docker packages applications and dependencies into portable containers. It is a core tool for development, testing, and deployment workflows.",
    focusPoints: [
      "Learn images, containers, and layers.",
      "Understand Dockerfiles and build instructions.",
      "Use volumes and networking for realistic local development.",
    ],
    starterCode: {
      caption: "Dockerfile",
      language: "dockerfile",
      code: `FROM node:20
WORKDIR /app
COPY . .
CMD ["node", "server.js"]`,
    },
    practicePoints: [
      "Build a container from a minimal base image.",
      "Expose the right port and mount files when needed.",
      "Keep each image small and focused on one job.",
    ],
    practiceCode: {
      caption: "run.sh",
      language: "bash",
      code: `docker build -t skill-up .
docker run -p 3000:3000 skill-up`,
    },
    bestPractices: [
      "Use multi-stage builds when the final image needs to stay small.",
      "Pin versions when reproducibility matters.",
      "Keep secrets out of images and use environment variables instead.",
    ],
    projectPoints: [
      "Containerize a small Node or Python app.",
      "Map ports and persist data with a volume.",
      "Document how to build and run the image.",
    ],
    projectCode: {
      caption: "compose.yml",
      language: "yaml",
      code: `services:
  app:
    image: skill-up`,
    },
    nextSteps: [
      "Practice docker-compose for multi-service apps.",
      "Learn how to debug container startup issues.",
      "Use Docker in your local development workflow.",
    ],
  },
  {
    kind: "devops",
    title: "Kubernetes",
    slug: "kubernetes",
    category: "devops-cloud",
    badge: "Tutorial",
    level: "intermediate",
    order: 2,
    description: "Container orchestration.",
    summary:
      "Kubernetes manages containerized applications across a cluster. It handles scheduling, scaling, health checks, and service discovery.",
    focusPoints: [
      "Understand pods, deployments, and services.",
      "Learn how configuration and secrets are injected.",
      "Use health checks and scaling for production readiness.",
    ],
    starterCode: {
      caption: "deployment.yaml",
      language: "yaml",
      code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: app`,
    },
    practicePoints: [
      "Separate app configuration from container images.",
      "Use labels and selectors consistently.",
      "Check readiness and liveness probes carefully.",
    ],
    practiceCode: {
      caption: "service.yaml",
      language: "yaml",
      code: `kind: Service
metadata:
  name: app-service`,
    },
    bestPractices: [
      "Keep deployments small and easy to roll back.",
      "Use namespaces and labels to organize workloads.",
      "Store secrets securely instead of hardcoding values.",
    ],
    projectPoints: [
      "Deploy a containerized app to a local cluster.",
      "Expose it with a service and verify the rollout.",
      "Scale the deployment and observe the effect.",
    ],
    projectCode: {
      caption: "scale.sh",
      language: "bash",
      code: `kubectl scale deployment/app --replicas=3`,
    },
    nextSteps: [
      "Practice config maps, secrets, and ingress rules.",
      "Learn rollout strategies and cluster troubleshooting.",
      "Move from single-container apps to multi-service workloads.",
    ],
  },
  {
    kind: "devops",
    title: "AWS Tutorial",
    slug: "aws-tutorial",
    category: "devops-cloud",
    badge: "Popular",
    level: "beginner",
    order: 3,
    description: "Amazon Web Services cloud platform.",
    summary:
      "AWS provides cloud services for storage, compute, networking, databases, and serverless workloads. It is widely used for production systems.",
    focusPoints: [
      "Learn the basics of IAM, S3, and EC2.",
      "Understand how regions, availability zones, and services fit together.",
      "Use managed services when they simplify the architecture.",
    ],
    starterCode: {
      caption: "aws-cli.sh",
      language: "bash",
      code: `aws s3 ls
aws ec2 describe-instances`,
    },
    practicePoints: [
      "Set up least-privilege access with IAM.",
      "Store assets in S3 and serve them efficiently.",
      "Choose the simplest compute option that meets your need.",
    ],
    practiceCode: {
      caption: "bucket.sh",
      language: "bash",
      code: `aws s3 cp index.html s3://my-bucket/`,
    },
    bestPractices: [
      "Tag resources so billing and cleanup stay manageable.",
      "Use monitoring and logs from the beginning.",
      "Separate development and production environments clearly.",
    ],
    projectPoints: [
      "Upload a static asset to S3.",
      "Launch a small compute service or serverless function.",
      "Document the workflow from deployment to verification.",
    ],
    projectCode: {
      caption: "lambda.js",
      language: "js",
      code: `exports.handler = async () => ({ statusCode: 200 });`,
    },
    nextSteps: [
      "Practice IAM policies and service permissions.",
      "Explore storage, compute, and monitoring in a real sandbox.",
      "Combine AWS services into a small deployment flow.",
    ],
  },
  {
    kind: "devops",
    title: "Git Tutorial",
    slug: "git-tutorial",
    category: "devops-cloud",
    badge: "Tutorial",
    level: "beginner",
    order: 4,
    description: "Version control with Git.",
    summary:
      "Git tracks changes over time and makes collaboration safer. It is essential for branching, merging, review, and release workflows.",
    focusPoints: [
      "Learn commits, branches, merges, and remotes.",
      "Understand how to inspect history and compare changes.",
      "Practice handling conflicts and working with teammates.",
    ],
    starterCode: {
      caption: "git.sh",
      language: "bash",
      code: `git init
git status
git add .
git commit -m "Start project"`,
    },
    practicePoints: [
      "Make small commits that are easy to review.",
      "Use branches for features and fixes.",
      "Fetch and pull regularly to stay in sync.",
    ],
    practiceCode: {
      caption: "branch.sh",
      language: "bash",
      code: `git checkout -b feature/navbar`,
    },
    bestPractices: [
      "Write commit messages that describe the change clearly.",
      "Keep the working tree clean before switching branches.",
      "Review diffs before merging them.",
    ],
    projectPoints: [
      "Create a repository and make a small feature branch.",
      "Commit a change and merge it back into main.",
      "Resolve one simple conflict to practice the workflow.",
    ],
    projectCode: {
      caption: "merge.sh",
      language: "bash",
      code: `git merge feature/navbar`,
    },
    nextSteps: [
      "Practice rebasing, stashing, and tagging.",
      "Use Git for every learning project you build.",
      "Learn how remote branches and pull requests fit together.",
    ],
  },
  {
    kind: "devops",
    title: "CI/CD Pipeline",
    slug: "cicd-pipeline",
    category: "devops-cloud",
    badge: "Tutorial",
    level: "intermediate",
    order: 5,
    description: "Continuous integration and deployment.",
    summary:
      "CI/CD connects source control, testing, build steps, and deployment so code can move from commit to release with more confidence.",
    focusPoints: [
      "Understand the stages of a basic delivery pipeline.",
      "Automate build and test steps to catch regressions early.",
      "Plan deployment, rollback, and environment configuration carefully.",
    ],
    starterCode: {
      caption: "pipeline.yml",
      language: "yaml",
      code: `name: CI
on: [push]`,
    },
    practicePoints: [
      "Add one build job and one test job.",
      "Store secrets safely in the CI provider.",
      "Make the pipeline readable for other contributors.",
    ],
    practiceCode: {
      caption: "job.yml",
      language: "yaml",
      code: `jobs:
  build:
    runs-on: ubuntu-latest`,
    },
    bestPractices: [
      "Keep each stage short and focused on one responsibility.",
      "Run tests before deployment so failures appear early.",
      "Use environment-specific settings for safe releases.",
    ],
    projectPoints: [
      "Create a simple pipeline for a small app.",
      "Trigger it on push and verify the outputs.",
      "Add a deployment step or a deploy placeholder.",
    ],
    projectCode: {
      caption: "deploy.yml",
      language: "yaml",
      code: `- name: Deploy
  run: npm run deploy`,
    },
    nextSteps: [
      "Practice multi-stage workflows and caching.",
      "Add notifications or deployment checks.",
      "Connect the pipeline to a real repository and branch strategy.",
    ],
  },
];

module.exports = courseList.map(buildCourse);
