import { ArrowRight, Search, Send, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { cn } from "../lib/utils";
import HeroBackground from "./HeroBackground";
import { buttonVariants } from "./ui/button";

export default function Hero() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = (query || "").trim();
    if (!q) return;

    if (!token && !localStorage.getItem("token")) {
      // require login to use AI workspace
      navigate("/login");
      return;
    }

    navigate(`/ai-workspace?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="relative flex min-h-[calc(100svh-5rem)] items-start justify-center overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-[1680px] items-start px-6 pb-16 pt-12 sm:px-10 sm:pt-14 md:pb-20 md:pt-16 xl:px-16">
        <div className="mx-auto w-full max-w-[860px] text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2.5 text-foreground/65 shadow-[0_20px_40px_-28px_rgba(89,64,145,0.45)] backdrop-blur-xl animate-pulse-glow dark:border-white/10 dark:bg-white/10 dark:text-white/75">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Transform Your Career Today</span>
          </div>

          <h1 className="mx-auto max-w-[840px] text-[3rem] font-black leading-[0.92] tracking-[-0.07em] text-foreground sm:text-[3.8rem] lg:text-[4.7rem]">
            <span className="block">
              Master New{" "}
              <span className="bg-gradient-to-r from-[#4f4a5b] via-[#8e88a8] to-[#d7d2e8] bg-clip-text text-transparent dark:from-white dark:via-[#c1b5ef] dark:to-[#7b6ab9]">
                Skills,
              </span>
            </span>
            <span className="block">Unlock Your Potential</span>
          </h1>

          <p className="mx-auto mt-8 max-w-[700px] text-[1.08rem] leading-[1.5] text-[#6f6a76] sm:text-[1.22rem] dark:text-white/65">
            Join thousands of professionals who are upskilling with Skill_up. Learn at your own
            pace, track your progress, and achieve your career goals.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "group h-12 rounded-[1.05rem] bg-[#111111] px-8 text-base font-semibold text-white shadow-[0_22px_45px_-25px_rgba(17,17,17,0.95)] hover:bg-[#1a1a1a]",
              )}
            >
              Start Learning Free
              <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <a
              href="#features"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 rounded-[1.05rem] border-black/10 bg-white/88 px-8 text-base font-semibold text-foreground shadow-[0_18px_40px_-28px_rgba(17,17,17,0.7)] backdrop-blur-sm hover:bg-white dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15",
              )}
            >
              Explore Features
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-sm font-medium text-foreground/55 dark:text-white/55">
            <Sparkles className="h-4 w-4" />
            <span>Powered by AI - Ask me anything about learning, aptitude, or careers</span>
          </div>

          <div className="hero-search-scene mx-auto mt-5 w-full max-w-[800px]">
            <div className="hero-search-ambient hero-search-ambient-left" />
            <div className="hero-search-ambient hero-search-ambient-right" />
            <form
              className={cn(
                "hero-search-panel flex flex-col gap-2.5 p-2.5 sm:flex-row sm:items-center",
                isSearchFocused && "hero-search-panel-active"
              )}
              onSubmit={handleSubmit}
            >
              <div className="hero-search-field flex min-w-0 flex-1 items-center gap-3 rounded-full px-3 py-1.5 text-left">
                <div className="hero-search-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                  <Search className="h-4 w-4" />
                </div>

                <div className="flex min-w-0 flex-1 items-center">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    aria-label="Ask AI anything"
                    placeholder="Ask anything... e.g. 'How to prepare for aptitude tests?'"
                    className="h-9 w-full min-w-0 border-0 bg-transparent pr-2 text-[0.96rem] text-foreground outline-none placeholder:text-[#7f7a88] dark:placeholder:text-white/40"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="hero-search-submit inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-white"
              >
                <Send className="h-4 w-4" />
                Ask AI
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
