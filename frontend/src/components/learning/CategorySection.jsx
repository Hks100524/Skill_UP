import {
  Code2,
  Cloud,
  Database,
  Globe,
  Server,
  Smartphone,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { learningThemes } from "../../data/learningData";
import CourseCard from "./CourseCard";

const ICONS = {
  code: Code2,
  cloud: Cloud,
  database: Database,
  globe: Globe,
  server: Server,
  smartphone: Smartphone,
};

export default function CategorySection({ category }) {
  const theme = learningThemes[category.theme] || learningThemes.purple;
  const SectionIcon = ICONS[category.icon] || Globe;

  return (
    <section id={category.id} className="scroll-mt-28 py-14 sm:py-16">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200/70 pb-5">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl shadow-[0_8px_18px_-16px_rgba(15,23,42,0.25)]",
              theme.sectionIconWrap,
            )}
          >
            <SectionIcon className="h-5 w-5" strokeWidth={2} />
          </div>

          <div>
            <h2 className="text-[1.18rem] font-bold tracking-tight text-slate-900 sm:text-[1.35rem]">
              {category.title}
            </h2>
            <p className="mt-0.5 max-w-2xl text-[11px] leading-5 text-slate-400 sm:text-sm">
              {category.subtitle}
            </p>
          </div>
        </div>

        <span
          className={cn(
            "inline-flex h-8 items-center rounded-full px-3 text-[11px] font-medium sm:text-xs",
            theme.sectionCount,
          )}
        >
          {category.courses.length} courses
        </span>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {category.courses.map((course) => (
          <CourseCard
            key={course.slug}
            course={course}
            categoryTheme={category.theme}
          />
        ))}
      </div>
    </section>
  );
}
