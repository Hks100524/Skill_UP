import { ArrowLeft, ArrowRight, TriangleAlert } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getLearningCourseBySlug } from "../api/learningApi";
import LessonHero from "../components/learning/detail/LessonHero";
import LessonSection from "../components/learning/detail/LessonSection";
import LessonSidebar from "../components/learning/detail/LessonSidebar";
import {
  buildLearningDetailData,
  getLearningDetailSidebarItems,
  learningDetailThemeClasses,
} from "../data/learningDetailData";
import {
  getCategoryMetaById,
  getCourseTitleBySlug,
} from "../data/learningData";

export default function LearningDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCourse = async () => {
      try {
        setLoading(true);
        const response = await getLearningCourseBySlug(courseId);
        const courseData = response.data?.course || null;

        if (isMounted) {
          setCourse(courseData);
          setError("");
        }
      } catch (requestError) {
        if (isMounted) {
          setCourse(null);
          setError("Course content could not be loaded right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCourse();

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  const categoryMeta = useMemo(
    () => getCategoryMetaById(course?.category),
    [course?.category],
  );

  const detail = useMemo(
    () => buildLearningDetailData(course, categoryMeta),
    [course, categoryMeta],
  );

  const theme = learningDetailThemeClasses[categoryMeta?.theme] || learningDetailThemeClasses.purple;

  const sidebarItems = useMemo(
    () => getLearningDetailSidebarItems(detail),
    [detail],
  );

  const [activeSectionId, setActiveSectionId] = useState("");

  useEffect(() => {
    setActiveSectionId(sidebarItems[0]?.id || detail?.sections?.[0]?.id || "");
  }, [courseId, detail?.sections, sidebarItems]);

  useEffect(() => {
    const sectionNodes = sidebarItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sectionNodes.length || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -65% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sectionNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [courseId, sidebarItems]);

  const currentCourseIndex = categoryMeta?.courses?.findIndex((item) => item.slug === courseId) ?? -1;
  const nextCourseMeta =
    currentCourseIndex >= 0 && categoryMeta?.courses?.length
      ? categoryMeta.courses[(currentCourseIndex + 1) % categoryMeta.courses.length]
      : null;
  const nextCourseTitle = nextCourseMeta?.title || getCourseTitleBySlug(nextCourseMeta?.slug);
  const nextCourseHref = nextCourseMeta ? `/learning/${nextCourseMeta.slug}` : "/learning";

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#fbf8ff_0%,#ffffff_18%,#ffffff_100%)] px-4 py-12 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1240px] rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_24px_48px_-34px_rgba(15,23,42,0.18)]">
          <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            <TriangleAlert className="mr-2 h-3.5 w-3.5" />
            Loading lesson
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-[-0.04em]">
            Loading course content
          </h1>
          <p className="mt-3 text-slate-500">
            Fetching the structured syllabus from MongoDB.
          </p>
        </div>
      </div>
    );
  }

  if (error || !course || !detail) {
    return (
      <div className="min-h-screen bg-white px-4 py-12 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_24px_48px_-34px_rgba(15,23,42,0.18)]">
          <div className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
            <TriangleAlert className="mr-2 h-3.5 w-3.5" />
            Learning detail
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-[-0.04em]">
            Course not found
          </h1>
          <p className="mt-3 text-slate-500">
            {error || "The requested lesson is not available in the current Learning Hub catalog."}
          </p>
          <Link
            to="/learning"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learning Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fbf8ff_0%,#ffffff_18%,#ffffff_100%)] text-slate-900">
      <div className="mx-auto w-full max-w-[1240px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <Link
          to="/learning"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Learning Hub
        </Link>

        <div className="mt-4">
          <LessonHero theme={theme} hero={detail.hero} />
        </div>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
          <LessonSidebar
            title={detail.hero.title}
            items={sidebarItems}
            activeId={activeSectionId}
          />

          <div className="space-y-12 lg:min-w-0 lg:flex-1">
            {detail.sections.map((section) => (
              <LessonSection key={section.id} section={section} />
            ))}

            <div className="flex items-center justify-between gap-4 pt-2">
              <Link
                to={detail.footer.previous.href}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-slate-900"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {detail.footer.previous.label}
              </Link>

              <Link
                to={nextCourseHref}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-[0_12px_24px_-18px_rgba(15,23,42,0.65)] transition hover:bg-slate-800"
              >
                {nextCourseTitle ? `Next: ${nextCourseTitle}` : detail.footer.next.label}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
