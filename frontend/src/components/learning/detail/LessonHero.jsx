import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";

const FLOW_STEPS = [
  {
    title: "Read",
    subtitle: "Understand the idea",
    progress: "68%",
  },
  {
    title: "Practice",
    subtitle: "Try a small example",
    progress: "78%",
  },
  {
    title: "Build",
    subtitle: "Apply it in a mini task",
    progress: "88%",
  },
];

export default function LessonHero({ hero }) {
  return (
    <section className="relative isolate overflow-hidden rounded-[32px] border border-white/[0.18] bg-[linear-gradient(135deg,#c18dff_0%,#9c63f7_42%,#6d74ff_100%)] shadow-[0_24px_70px_-46px_rgba(109,116,255,0.42)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(255,255,255,0.34),transparent_24%),radial-gradient(circle_at_86%_18%,rgba(255,255,255,0.15),transparent_26%),radial-gradient(circle_at_80%_90%,rgba(125,211,252,0.18),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_42%,rgba(91,33,182,0.12)_100%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:62px_62px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-white/20 blur-[100px]" />
      <div className="absolute right-[-2%] top-8 h-52 w-52 rounded-full bg-sky-200/20 blur-[110px]" />
      <div className="absolute bottom-[-12%] left-[38%] h-36 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-[100px]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_18%,rgba(255,255,255,0.10)_50%,transparent_82%)] opacity-35" />

      <div className="relative z-10 grid min-h-[420px] gap-8 px-6 py-7 sm:min-h-[470px] sm:px-8 sm:py-8 lg:min-h-[520px] lg:grid-cols-[minmax(0,1.28fr)_minmax(330px,372px)] lg:items-center lg:px-10 lg:py-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.10] px-4 py-1.5 text-xs font-semibold text-white shadow-[0_12px_28px_-22px_rgba(255,255,255,0.35)] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            <span>{hero.badge}</span>
          </div>

          <h1 className="mt-5 max-w-[11ch] text-[clamp(2.8rem,5.8vw,5.15rem)] font-black leading-[0.9] tracking-[-0.08em] text-white drop-shadow-[0_20px_34px_rgba(15,23,42,0.24)] sm:mt-6">
            {hero.title}
          </h1>

          <p className="mt-4 max-w-[46rem] text-[0.98rem] leading-7 text-slate-950/85 sm:text-[1.05rem]">
            {hero.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {hero.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-white/[0.16] bg-white/[0.10] px-3.5 py-1.5 text-[12px] font-medium text-white/[0.92] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-white/[0.24] hover:bg-white/[0.14] hover:text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {hero.ctas.map((cta, index) => {
              const isPrimary = index === 0;

              return (
                <Link
                  key={cta.label}
                  to={cta.href}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition duration-300 ease-out",
                    isPrimary
                      ? "border-white/[0.18] bg-white text-[#7c3aed] shadow-[0_18px_40px_-24px_rgba(255,255,255,0.8),0_12px_30px_-20px_rgba(124,58,237,0.45)] hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-28px_rgba(255,255,255,0.85),0_14px_34px_-22px_rgba(124,58,237,0.5)]"
                      : "border-white/[0.24] bg-white/[0.08] text-white backdrop-blur-md hover:-translate-y-0.5 hover:border-white/[0.32] hover:bg-white/[0.14] hover:text-white",
                  )}
                >
                  <span>{cta.label}</span>
                  {isPrimary ? null : <ArrowRight className="ml-2 h-4 w-4" />}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="lg:justify-self-end">
          <div className="relative overflow-hidden rounded-[30px] border border-white/[0.18] bg-[linear-gradient(180deg,rgba(128,122,255,0.24)_0%,rgba(109,116,255,0.18)_100%)] p-5 shadow-[0_24px_64px_-34px_rgba(79,70,229,0.42)] backdrop-blur-2xl transition duration-300 hover:-translate-y-0.5 hover:border-white/[0.26] hover:bg-[linear-gradient(180deg,rgba(128,122,255,0.28)_0%,rgba(109,116,255,0.22)_100%)] sm:p-6">
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/[0.20] blur-3xl" />
            <div className="pointer-events-none absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-violet-300/20 blur-2xl" />
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] opacity-80" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.16] bg-white/[0.10] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-950 shadow-[0_12px_24px_-18px_rgba(255,255,255,0.35)]">
                  <BookOpen className="h-3.5 w-3.5 text-slate-950" strokeWidth={2} />
                  <span>Learning Flow</span>
                </div>
                <p className="mt-3 max-w-[15rem] text-[0.82rem] leading-5 text-slate-100/80">
                  Read the concept, practice the idea, then build something small.
                </p>
              </div>

              <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.18] bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_14px_30px_-20px_rgba(255,255,255,0.45)]">
                <div className="absolute inset-1 rounded-full border border-white/[0.30] animate-[spin_10s_linear_infinite]" />
                <Sparkles className="relative h-4 w-4 text-white" strokeWidth={2} />
              </div>
            </div>

            <div className="relative mt-5 space-y-3">
              {FLOW_STEPS.map((step, index) => (
                <div
                  key={step.title}
                  className="group flex items-center gap-3 rounded-[20px] border border-white/[0.16] bg-white/[0.10] px-4 py-3.5 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.3)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-white/[0.26] hover:bg-white/[0.14]"
                >
                  <div className="flex h-3 w-3 shrink-0 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.55)]" />

                  <div className="min-w-0 flex-1">
                    <p className="text-[1rem] font-semibold tracking-[-0.03em] text-white">
                      {step.title}
                    </p>
                    <p className="mt-1 text-[0.78rem] leading-5 text-white/[0.72]">
                      {step.subtitle}
                    </p>
                  </div>

                  <div className="flex w-[5.5rem] flex-col items-end gap-2">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.14]">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.54)_100%)] shadow-[0_0_16px_rgba(255,255,255,0.38)] transition-all duration-500 group-hover:shadow-[0_0_22px_rgba(255,255,255,0.48)]"
                        style={{ width: step.progress }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
