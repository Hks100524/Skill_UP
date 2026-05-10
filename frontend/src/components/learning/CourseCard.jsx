import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { learningThemes } from "../../data/learningData";

export default function CourseCard({ course, categoryTheme }) {
  const theme = learningThemes[categoryTheme] || learningThemes.purple;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[20px] p-[1px] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_48px_-30px_rgba(15,23,42,0.3)]",
        theme.cardShell,
      )}
    >
      <div
        className={cn(
          "relative flex min-h-[214px] flex-col overflow-hidden rounded-[19px] px-5 py-5 backdrop-blur-sm",
          theme.cardInner,
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_24%)]" />
        <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute right-3 top-3 h-12 w-12 rounded-full border border-white/15 bg-white/8" />

        <div className="relative z-10 flex h-full flex-col">
          <span
            className={cn(
              "inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-medium leading-none",
              theme.cardBadge,
            )}
          >
            {course.badge || "Tutorial"}
          </span>

          <h3
            className={cn(
              "mt-5 text-[1.02rem] font-semibold tracking-tight sm:text-[1.05rem]",
              theme.cardTitle,
            )}
          >
            {course.title}
          </h3>

          <p
            className={cn(
              "mt-2 max-w-[260px] text-sm leading-6",
              theme.cardDescription,
            )}
          >
            {course.description || "A structured lesson built from the learning syllabus."}
          </p>

          <div className={cn("mt-auto border-t pt-4", theme.cardDivider)}>
            <Link
              to={`/learning/${course.slug}`}
              className={cn(
                "inline-flex items-center gap-2 text-sm font-semibold transition-transform duration-200 group-hover:translate-x-0.5",
                theme.cardCta,
              )}
            >
              <span>Start Learning</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
