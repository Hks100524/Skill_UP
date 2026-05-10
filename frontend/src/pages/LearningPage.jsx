import { BookOpen, House, Sparkles, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CategorySection from "../components/learning/CategorySection";
import CategoryTabs from "../components/learning/CategoryTabs";
import { getLearningCourses } from "../api/learningApi";
import {
  buildLearningCategories,
  getLearningCourseCount,
  learningCta,
  learningHero,
} from "../data/learningData";

export default function LearningPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCourses = async () => {
      try {
        setLoading(true);
        const response = await getLearningCourses();
        const courseList = response.data?.courses || [];

        if (isMounted) {
          setCourses(courseList);
          setError("");
        }
      } catch (requestError) {
        if (isMounted) {
          setError("Unable to load course content right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  const learningCategories = useMemo(
    () => buildLearningCategories(courses),
    [courses],
  );

  const totalCourses = loading ? getLearningCourseCount() : courses.length;
  const hasCourses = learningCategories.some((category) => category.courses.length > 0);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#faf6ff_0%,#ffffff_24%,#ffffff_100%)] text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(circle_at_12%_18%,rgba(215,228,255,0.88),transparent_38%),radial-gradient(circle_at_88%_10%,rgba(226,212,255,0.9),transparent_34%),linear-gradient(180deg,rgba(245,240,255,0.95),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute left-0 top-24 h-56 w-56 -translate-x-1/3 rounded-full bg-[#d9e8ff]/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-28 h-64 w-64 translate-x-1/3 rounded-full bg-[#eadcff]/55 blur-3xl" />

      <header className="relative z-10 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
        <div className="mx-auto grid h-14 w-full max-w-[1280px] grid-cols-3 items-center px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 justify-self-start rounded-full px-2 py-1 text-sm font-medium text-[#8750f5] transition hover:bg-[#f5efff]"
          >
            <House className="h-4 w-4" strokeWidth={1.9} />
            <span>Home</span>
          </Link>

          <div className="inline-flex items-center gap-2 justify-self-center rounded-full bg-[#8b4df8] px-4 py-1.5 text-sm font-medium text-white shadow-[0_10px_20px_-16px_rgba(139,77,248,0.7)]">
            <BookOpen className="h-4 w-4" strokeWidth={2} />
            <span>Learning Hub</span>
          </div>

          <div className="inline-flex items-center gap-2 justify-self-end rounded-full bg-[#f5ebff] px-3.5 py-1.5 text-sm font-medium text-[#8d52f8]">
            <TrendingUp className="h-3.5 w-3.5" strokeWidth={2} />
            <span>{totalCourses} Courses</span>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto flex w-full max-w-[1120px] flex-col items-center px-4 pb-10 pt-14 text-center sm:px-6 sm:pb-12 sm:pt-20 lg:px-8 lg:pb-14 lg:pt-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#decfff] bg-[#f4edff] px-4 py-1.5 text-xs font-medium text-[#7f4df5] shadow-[0_10px_30px_-24px_rgba(127,77,245,0.65)]">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            <span>{learningHero.eyebrow}</span>
          </div>

          <h1 className="mt-8 max-w-[920px] text-[clamp(3.5rem,7vw,5.9rem)] font-extrabold leading-[0.92] tracking-[-0.05em] text-slate-900 sm:mt-9">
            <span>Learn, Build, </span>
            <span className="bg-gradient-to-r from-[#804df7] via-[#8a5af9] to-[#a26dff] bg-clip-text text-transparent">
              Grow
            </span>
          </h1>

          <p className="mt-6 max-w-[760px] text-[1rem] leading-8 text-slate-500 sm:text-[1.15rem]">
            {learningHero.subtitle}
          </p>
        </section>

        <CategoryTabs />

        <div className="mx-auto w-full max-w-[1120px] px-4 pb-14 pt-6 sm:px-6 lg:px-8 lg:pb-20">
          {error ? (
            <div className="rounded-[22px] border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          {loading ? (
            <div className="rounded-[22px] border border-slate-200 bg-white px-5 py-8 text-sm text-slate-500 shadow-[0_12px_28px_-22px_rgba(15,23,42,0.18)]">
              Loading structured learning courses...
            </div>
          ) : !hasCourses ? (
            <div className="rounded-[22px] border border-slate-200 bg-white px-5 py-8 text-sm text-slate-500 shadow-[0_12px_28px_-22px_rgba(15,23,42,0.18)]">
              No learning courses were found. Run the learning seed script to load the syllabus content.
            </div>
          ) : (
            learningCategories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))
          )}
        </div>

        <section
          id={learningCta.id}
          className="relative overflow-hidden bg-[linear-gradient(135deg,#8a3cf5_0%,#7b4cf4_40%,#6f79ff_100%)] px-4 py-20 text-white sm:px-6 lg:px-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_26%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.08),transparent_28%)]" />

          <div className="mx-auto flex w-full max-w-[760px] flex-col items-center text-center">
            <h2 className="text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-tight tracking-[-0.04em]">
              {learningCta.title}
            </h2>

            <p className="mt-4 max-w-[540px] text-base leading-8 text-white/78 sm:text-[1.08rem]">
              {learningCta.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {learningCta.actions.map((action) => (
                <Link
                  key={action.label}
                  to={action.href}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/14 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_16px_32px_-24px_rgba(255,255,255,0.5)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/18 hover:shadow-[0_18px_34px_-22px_rgba(255,255,255,0.62)]"
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
