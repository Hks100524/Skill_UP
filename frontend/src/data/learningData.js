export const learningHero = {
  eyebrow: "Start learning. Build real skills.",
  title: "Learn, Build, Grow",
  subtitle:
    "Master in-demand skills with structured paths, real projects, and hands-on practice - all in one place.",
};

export const learningTabs = [
  { label: "Web Dev", icon: "globe", href: "#web-development" },
  { label: "Programming", icon: "code", href: "#programming-languages" },
  { label: "Data Science", icon: "database", href: "#data-science-ai" },
  { label: "Backend", icon: "server", href: "#backend-development" },
  { label: "Mobile", icon: "smartphone", href: "#mobile-development" },
  { label: "DevOps", icon: "cloud", href: "#devops-cloud" },
  { label: "Aptitude", icon: "graduation-cap", href: "/aptitude" },
  { label: "Career", icon: "briefcase", href: "#career", active: true },
];

export const learningThemes = {
  tabsBase:
    "border-slate-200 bg-white/80 text-slate-500 shadow-[0_1px_0_rgba(15,23,42,0.02)] hover:border-slate-300 hover:text-slate-700",
  tabsActive:
    "border-[#7ee6d4] bg-[#effefa] text-[#118d7d] shadow-[0_0_0_1px_rgba(126,230,212,0.28)]",
  purple: {
    sectionIconWrap: "bg-[#f2ebff] text-[#884df8]",
    sectionCount: "bg-[#f5edff] text-[#8b4df8]",
    cardShell:
      "bg-gradient-to-br from-[#8d3cf5] via-[#9d52f7] to-[#b46eff] shadow-[0_20px_44px_-26px_rgba(123,62,229,0.56)]",
    cardInner: "bg-white/7",
    cardBadge: "border-white/20 bg-white/14 text-white/90",
    cardTitle: "text-white",
    cardDescription: "text-white/80",
    cardDivider: "border-white/14",
    cardCta: "text-white",
  },
  cyan: {
    sectionIconWrap: "bg-[#eaf7fb] text-[#13a2c9]",
    sectionCount: "bg-[#eaf8fc] text-[#17a0c8]",
    cardShell:
      "bg-gradient-to-br from-[#0fa2ca] via-[#1eb0d5] to-[#2ac6de] shadow-[0_20px_44px_-26px_rgba(18,141,181,0.52)]",
    cardInner: "bg-white/7",
    cardBadge: "border-white/20 bg-white/14 text-white/90",
    cardTitle: "text-white",
    cardDescription: "text-white/82",
    cardDivider: "border-white/14",
    cardCta: "text-white",
  },
  green: {
    sectionIconWrap: "bg-[#e9fbf5] text-[#19ad78]",
    sectionCount: "bg-[#eafbf5] text-[#1ba977]",
    cardShell:
      "bg-gradient-to-br from-[#18b080] via-[#20bc87] to-[#25c995] shadow-[0_20px_44px_-26px_rgba(22,160,116,0.52)]",
    cardInner: "bg-white/7",
    cardBadge: "border-white/20 bg-white/14 text-white/90",
    cardTitle: "text-white",
    cardDescription: "text-white/82",
    cardDivider: "border-white/14",
    cardCta: "text-white",
  },
  red: {
    sectionIconWrap: "bg-[#fff0ef] text-[#ef4444]",
    sectionCount: "bg-[#fff0ef] text-[#ef4b4b]",
    cardShell:
      "bg-gradient-to-br from-[#ef4343] via-[#f14d4a] to-[#f35d5a] shadow-[0_20px_44px_-26px_rgba(230,72,72,0.55)]",
    cardInner: "bg-white/7",
    cardBadge: "border-white/20 bg-white/14 text-white/90",
    cardTitle: "text-white",
    cardDescription: "text-white/82",
    cardDivider: "border-white/14",
    cardCta: "text-white",
  },
  orange: {
    sectionIconWrap: "bg-[#fff5e8] text-[#ea8d09]",
    sectionCount: "bg-[#fff3e1] text-[#ef8b00]",
    cardShell:
      "bg-gradient-to-br from-[#e98a00] via-[#f39a0d] to-[#f7ac24] shadow-[0_20px_44px_-26px_rgba(235,143,8,0.52)]",
    cardInner: "bg-white/7",
    cardBadge: "border-white/20 bg-white/14 text-white/90",
    cardTitle: "text-white",
    cardDescription: "text-white/82",
    cardDivider: "border-white/14",
    cardCta: "text-white",
  },
  blue: {
    sectionIconWrap: "bg-[#ecf2ff] text-[#2f64ea]",
    sectionCount: "bg-[#edf3ff] text-[#3a6df0]",
    cardShell:
      "bg-gradient-to-br from-[#356ae8] via-[#4c7ef6] to-[#5e8eff] shadow-[0_20px_44px_-26px_rgba(66,112,236,0.54)]",
    cardInner: "bg-white/7",
    cardBadge: "border-white/20 bg-white/14 text-white/90",
    cardTitle: "text-white",
    cardDescription: "text-white/82",
    cardDivider: "border-white/14",
    cardCta: "text-white",
  },
};

export const learningCategoryMeta = [
  {
    id: "web-development",
    title: "Web Development",
    subtitle: "HTML, CSS, JavaScript, React, TypeScript - the full frontend stack",
    icon: "globe",
    theme: "purple",
    courses: [
      { slug: "html-tutorial", title: "HTML Tutorial" },
      { slug: "css-tutorial", title: "CSS Tutorial" },
      { slug: "javascript-tutorial", title: "JavaScript Tutorial" },
      { slug: "react-tutorial", title: "React Tutorial" },
      { slug: "typescript-tutorial", title: "TypeScript Tutorial" },
      { slug: "tailwind-css", title: "Tailwind CSS" },
    ],
  },
  {
    id: "programming-languages",
    title: "Programming Languages",
    subtitle: "Python, Java, Go, Rust - master the languages that power software",
    icon: "code",
    theme: "cyan",
    courses: [
      { slug: "python-tutorial", title: "Python Tutorial" },
      { slug: "java-tutorial", title: "Java Tutorial" },
      { slug: "cpp-tutorial", title: "C++ Tutorial" },
      { slug: "csharp-tutorial", title: "C# Tutorial" },
      { slug: "go-tutorial", title: "Go Tutorial" },
      { slug: "rust-tutorial", title: "Rust Tutorial" },
    ],
  },
  {
    id: "data-science-ai",
    title: "Data Science & AI",
    subtitle: "ML, deep learning, data analysis - unlock the power of data",
    icon: "database",
    theme: "green",
    courses: [
      { slug: "data-analysis", title: "Data Analysis" },
      { slug: "machine-learning", title: "Machine Learning" },
      { slug: "deep-learning", title: "Deep Learning" },
      { slug: "pandas-tutorial", title: "Pandas Tutorial" },
      { slug: "numpy-tutorial", title: "NumPy Tutorial" },
      { slug: "tensorflow", title: "TensorFlow" },
    ],
  },
  {
    id: "backend-development",
    title: "Backend Development",
    subtitle: "Node.js, SQL, APIs - build the engines that run the web",
    icon: "server",
    theme: "red",
    courses: [
      { slug: "nodejs-tutorial", title: "Node.js Tutorial" },
      { slug: "sql-tutorial", title: "SQL Tutorial" },
      { slug: "mongodb-tutorial", title: "MongoDB Tutorial" },
      { slug: "postgresql", title: "PostgreSQL" },
      { slug: "rest-api-design", title: "REST API Design" },
      { slug: "graphql", title: "GraphQL" },
    ],
  },
  {
    id: "mobile-development",
    title: "Mobile Development",
    subtitle: "React Native, Flutter, Swift - build for every pocket",
    icon: "smartphone",
    theme: "orange",
    courses: [
      { slug: "react-native", title: "React Native" },
      { slug: "flutter-tutorial", title: "Flutter Tutorial" },
      { slug: "swift-tutorial", title: "Swift Tutorial" },
      { slug: "kotlin-tutorial", title: "Kotlin Tutorial" },
    ],
  },
  {
    id: "devops-cloud",
    title: "DevOps & Cloud",
    subtitle: "Docker, Kubernetes, AWS, CI/CD - ship and scale with confidence",
    icon: "cloud",
    theme: "blue",
    courses: [
      { slug: "docker-tutorial", title: "Docker Tutorial" },
      { slug: "kubernetes", title: "Kubernetes" },
      { slug: "aws-tutorial", title: "AWS Tutorial" },
      { slug: "git-tutorial", title: "Git Tutorial" },
      { slug: "cicd-pipeline", title: "CI/CD Pipeline" },
    ],
  },
];

export const learningCta = {
  id: "career",
  title: "Your journey starts with one click",
  subtitle: "Pick any track, start any tutorial - it's 100% free, forever.",
  actions: [
    { label: "Start HTML", href: "/learning/html-tutorial" },
    { label: "Try Python", href: "/learning/python-tutorial" },
    { label: "Learn React", href: "/learning/react-tutorial" },
  ],
};

export function getLearningCourseCount() {
  return learningCategoryMeta.reduce((total, category) => total + category.courses.length, 0);
}

export function getCategoryMetaById(categoryId) {
  return learningCategoryMeta.find((category) => category.id === categoryId) || null;
}

export function getCourseTitleBySlug(slug) {
  for (const category of learningCategoryMeta) {
    const course = category.courses.find((item) => item.slug === slug);
    if (course) {
      return course.title;
    }
  }

  return null;
}

export function buildLearningCategories(courses = []) {
  const courseMap = new Map(courses.map((course) => [course.slug, course]));

  return learningCategoryMeta.map((category) => ({
    ...category,
    courses: category.courses
      .map((courseMeta) => {
        const course = courseMap.get(courseMeta.slug);

        if (!course) {
          return null;
        }

        return {
          ...course,
          title: course.title || courseMeta.title,
          badge: course.badge || "Tutorial",
        };
      })
      .filter(Boolean),
  }));
}
