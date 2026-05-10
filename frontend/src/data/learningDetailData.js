const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const humanizeLevel = (level) => {
  if (!level) {
    return "Beginner-friendly";
  }

  return String(level)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

export const learningDetailThemeClasses = {
  purple: {
    shell: "bg-[linear-gradient(135deg,#a24ff8_0%,#8c4df8_42%,#6f78ff_100%)]",
    shellGlow:
      "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_30%)] before:content-['']",
    badge:
      "border-white/20 bg-white/14 text-white shadow-[0_10px_24px_-20px_rgba(255,255,255,0.55)]",
    chip: "border-white/18 bg-white/12 text-white/90",
    primary:
      "bg-white text-[#7f4df6] shadow-[0_18px_34px_-24px_rgba(255,255,255,0.8)] hover:bg-white/95",
    secondary: "border-white/22 bg-white/10 text-white hover:bg-white/16",
  },
  cyan: {
    shell: "bg-[linear-gradient(135deg,#16a6cc_0%,#19b5db_44%,#28cbe0_100%)]",
    shellGlow:
      "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_30%)] before:content-['']",
    badge:
      "border-white/20 bg-white/14 text-white shadow-[0_10px_24px_-20px_rgba(255,255,255,0.55)]",
    chip: "border-white/18 bg-white/12 text-white/90",
    primary:
      "bg-white text-[#1499bf] shadow-[0_18px_34px_-24px_rgba(255,255,255,0.8)] hover:bg-white/95",
    secondary: "border-white/22 bg-white/10 text-white hover:bg-white/16",
  },
  green: {
    shell: "bg-[linear-gradient(135deg,#17b085_0%,#1ec39a_44%,#28d0a5_100%)]",
    shellGlow:
      "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_30%)] before:content-['']",
    badge:
      "border-white/20 bg-white/14 text-white shadow-[0_10px_24px_-20px_rgba(255,255,255,0.55)]",
    chip: "border-white/18 bg-white/12 text-white/90",
    primary:
      "bg-white text-[#129c73] shadow-[0_18px_34px_-24px_rgba(255,255,255,0.8)] hover:bg-white/95",
    secondary: "border-white/22 bg-white/10 text-white hover:bg-white/16",
  },
  red: {
    shell: "bg-[linear-gradient(135deg,#ef4444_0%,#f35a54_44%,#f76a63_100%)]",
    shellGlow:
      "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_30%)] before:content-['']",
    badge:
      "border-white/20 bg-white/14 text-white shadow-[0_10px_24px_-20px_rgba(255,255,255,0.55)]",
    chip: "border-white/18 bg-white/12 text-white/90",
    primary:
      "bg-white text-[#ea4444] shadow-[0_18px_34px_-24px_rgba(255,255,255,0.8)] hover:bg-white/95",
    secondary: "border-white/22 bg-white/10 text-white hover:bg-white/16",
  },
  orange: {
    shell: "bg-[linear-gradient(135deg,#ed8d00_0%,#f29e0f_42%,#f6ae2b_100%)]",
    shellGlow:
      "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_30%)] before:content-['']",
    badge:
      "border-white/20 bg-white/14 text-white shadow-[0_10px_24px_-20px_rgba(255,255,255,0.55)]",
    chip: "border-white/18 bg-white/12 text-white/90",
    primary:
      "bg-white text-[#ea8c00] shadow-[0_18px_34px_-24px_rgba(255,255,255,0.8)] hover:bg-white/95",
    secondary: "border-white/22 bg-white/10 text-white hover:bg-white/16",
  },
  blue: {
    shell: "bg-[linear-gradient(135deg,#3b6ff0_0%,#4a7df6_44%,#5d90ff_100%)]",
    shellGlow:
      "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_30%)] before:content-['']",
    badge:
      "border-white/20 bg-white/14 text-white shadow-[0_10px_24px_-20px_rgba(255,255,255,0.55)]",
    chip: "border-white/18 bg-white/12 text-white/90",
    primary:
      "bg-white text-[#396ef0] shadow-[0_18px_34px_-24px_rgba(255,255,255,0.8)] hover:bg-white/95",
    secondary: "border-white/22 bg-white/10 text-white hover:bg-white/16",
  },
};

const normalizeCodeExample = (codeExample) => {
  if (!codeExample) {
    return null;
  }

  if (typeof codeExample === "string") {
    return {
      caption: "",
      language: "text",
      code: codeExample,
    };
  }

  return {
    caption: codeExample.caption || "",
    language: codeExample.language || "text",
    code: codeExample.code || "",
  };
};

const normalizeSection = (section, index) => ({
  id: section.id || slugify(section.sidebarLabel || section.title || `section-${index + 1}`),
  sidebarLabel: section.sidebarLabel || section.title || "",
  title: section.title || section.sidebarLabel || `Section ${index + 1}`,
  content: Array.isArray(section.content)
    ? section.content.filter(Boolean)
    : section.content
      ? [section.content]
      : [],
  bulletPoints: Array.isArray(section.bulletPoints) ? section.bulletPoints.filter(Boolean) : [],
  codeExample: normalizeCodeExample(section.codeExample),
  notes: Array.isArray(section.notes) ? section.notes.filter(Boolean) : [],
});

export function buildLearningDetailData(course, categoryMeta) {
  if (!course) {
    return null;
  }

  const sections = (course.sections || []).map((section, index) => normalizeSection(section, index));
  const sectionCount = sections.length;

  return {
    hero: {
      badge: course.badge || categoryMeta?.title || "Learning",
      title: course.title,
      description: course.description,
      tags: [
        humanizeLevel(course.level),
        `${sectionCount} sections`,
        categoryMeta?.title || "Structured syllabus",
      ],
      infoTitle: categoryMeta?.title || "Learning",
      infoSubtitle: categoryMeta?.subtitle || "Guided lesson path",
      infoRows: [
        { label: "Category", value: categoryMeta?.title || course.category },
        { label: "Focus", value: humanizeLevel(course.level) },
        { label: "Sections", value: `${sectionCount} lessons` },
      ],
      ctas: [
        { label: "Start Learning", href: `#${sections[0]?.id || "overview"}` },
        { label: "Browse more courses", href: "/learning" },
      ],
    },
    sections,
    footer: {
      previous: { label: "Back to learning", href: "/learning" },
      next: { label: "Browse more courses", href: "/learning" },
    },
  };
}

export function getLearningDetailSidebarItems(detail) {
  if (!detail?.sections?.length) {
    return [];
  }

  return detail.sections.map((section) => ({
    id: section.id,
    label: section.sidebarLabel || section.title,
  }));
}
