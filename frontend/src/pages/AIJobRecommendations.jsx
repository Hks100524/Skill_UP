import { useRef, useState } from "react";
import { CloudUpload, ExternalLink, MapPin, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import { cn } from "../lib/utils";
import { analyzeResume, applyToJob } from "../api/jobsApi";

const analysisSections = [
  {
    label: "Detected Role",
    value: "Frontend Developer",
    variant: "role",
  },
  {
    label: "Experience Level",
    value: "Mid Level (2-4 years)",
    variant: "experience",
  },
];

const extractedSkills = [
  "React",
  "TypeScript",
  "JavaScript",
  "HTML/CSS",
  "Node.js",
  "Git",
  "REST APIs",
  "Redux",
];

const matchingTechnologies = ["Next.js", "GraphQL", "Tailwind CSS", "Vite"];

const recommendedJobs = [
  {
    company: "Google India",
    role: "Senior Frontend Engineer",
    location: "Bangalore, India",
    type: "Hybrid",
    salary: "20-35 LPA",
    match: 94,
    avatar: "G",
    avatarClass: "from-[#ece8f6] via-[#d8d0ea] to-[#bda7df]",
    skills: ["React", "TypeScript", "GraphQL", "Design Systems"],
  },
  {
    company: "Microsoft India",
    role: "Full Stack Developer",
    location: "Hyderabad, India",
    type: "Remote",
    salary: "18-30 LPA",
    match: 91,
    avatar: "M",
    avatarClass: "from-[#edf0f8] via-[#d7ddee] to-[#c2cce0]",
    skills: ["React", "Node.js", "Azure", "REST APIs"],
  },
  {
    company: "Razorpay",
    role: "React Developer",
    location: "Pune, India",
    type: "Hybrid",
    salary: "12-22 LPA",
    match: 88,
    avatar: "R",
    avatarClass: "from-[#f0ebfb] via-[#ddd4f2] to-[#c4b2e6]",
    skills: ["React", "Redux", "REST APIs", "Testing"],
  },
  {
    company: "Swiggy",
    role: "SDE-2 Frontend",
    location: "Bangalore, India",
    type: "Hybrid",
    salary: "18-28 LPA",
    match: 85,
    avatar: "S",
    avatarClass: "from-[#f3effb] via-[#ded7ee] to-[#c6badf]",
    skills: ["React", "TypeScript", "Webpack", "Performance"],
  },
  {
    company: "Atlassian",
    role: "Full Stack Engineer",
    location: "Remote, India",
    type: "Remote",
    salary: "25-45 LPA",
    match: 82,
    avatar: "A",
    avatarClass: "from-[#ede8ff] via-[#d6c8f6] to-[#b9a2e4]",
    skills: ["React", "Python", "AWS", "System Design"],
  },
  {
    company: "Freshworks",
    role: "Frontend Engineer",
    location: "Chennai, India",
    type: "Hybrid",
    salary: "10-18 LPA",
    match: 79,
    avatar: "F",
    avatarClass: "from-[#f2f4f8] via-[#e1e4ef] to-[#c6ccdb]",
    skills: ["React", "Vue.js", "Figma", "Accessibility"],
  },
  {
    company: "Flipkart",
    role: "UI Engineer",
    location: "Bangalore, India",
    type: "On-site",
    salary: "15-25 LPA",
    match: 76,
    avatar: "F",
    avatarClass: "from-[#efeaf8] via-[#ddd5ef] to-[#c9bbe2]",
    skills: ["React", "Redux", "Performance", "UI Systems"],
  },
  {
    company: "Zoho",
    role: "Frontend Developer",
    location: "Chennai, India",
    type: "On-site",
    salary: "12-20 LPA",
    match: 72,
    avatar: "Z",
    avatarClass: "from-[#ece6fb] via-[#d8cef0] to-[#b7a4de]",
    skills: ["React", "TypeScript", "Node.js", "Testing"],
  },
];

const typeStyles = {
  Remote:
    "border-[#d8d0ea] bg-[#f4f0ff] text-[#5d4a84] dark:border-white/10 dark:bg-white/5 dark:text-white/80",
  Hybrid:
    "border-[#d8d8e3] bg-[#f5f6fa] text-[#4f5566] dark:border-white/10 dark:bg-white/5 dark:text-white/78",
  "On-site":
    "border-[#dad7e4] bg-[#f4f4f8] text-[#545965] dark:border-white/10 dark:bg-white/5 dark:text-white/76",
};

function SectionLabel({ children }) {
  return (
    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#6f6a76] dark:text-white/55">
      {children}
    </p>
  );
}

function GlassPill({ children, className = "" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-semibold tracking-[-0.01em] shadow-[0_1px_0_0_rgba(255,255,255,0.78)_inset] transition-colors duration-300",
        className,
      )}
    >
      {children}
    </span>
  );
}

function SkillChip({ children, variant = "skill" }) {
  const base =
    variant === "skill"
      ? "border-[#d8d0ea] bg-[#f0ebfb] text-[#5d4a84] shadow-[0_12px_24px_-22px_rgba(110,84,209,0.35)] dark:border-white/10 dark:bg-white/5 dark:text-white/80"
      : "border-[#dadbe4] bg-[#f7f7fb] text-[#5c6170] dark:border-white/10 dark:bg-white/5 dark:text-white/70";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold tracking-[-0.01em] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bca7f0] hover:bg-[#f4f0ff] dark:hover:bg-white/10",
        base,
      )}
    >
      {children}
    </span>
  );
}

function JobCard({ job, onApply }) {
  return (
    <article className="group relative overflow-hidden rounded-[1.5rem] border border-[#dddddd] bg-white/80 p-4 shadow-[0_18px_55px_-44px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#bca7f0]/60 hover:shadow-glow-sm dark:border-white/10 dark:bg-white/5 dark:hover:border-[#bca7f0]/40 dark:hover:shadow-[0_24px_60px_-36px_rgba(139,92,246,0.35)] sm:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(185,161,248,0.12),transparent_52%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-[radial-gradient(circle_at_top_right,rgba(159,130,246,0.18),transparent_52%)]" />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d8d8e3] bg-gradient-to-br text-sm font-semibold text-[#181225] shadow-[0_12px_30px_-18px_rgba(0,0,0,0.22)] dark:border-white/10 dark:text-white",
                job.avatarClass,
              )}
            >
              {job.avatar}
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-[1rem] font-semibold tracking-[-0.03em] text-foreground sm:text-[1.05rem]">
                {job.company}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{job.role}</p>
            </div>
          </div>

          <span className="shrink-0 rounded-full border border-[#d8d0ea] bg-[#f4f0ff] px-3 py-1.5 text-xs font-semibold text-[#5d4a84] shadow-[0_12px_24px_-20px_rgba(110,84,209,0.35)] dark:border-white/10 dark:bg-white/5 dark:text-white/80">
            {job.match}% Match
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2.5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-[#8e5cff]" strokeWidth={2} />
            {job.location}
          </span>
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-semibold tracking-[-0.01em] shadow-[0_1px_0_0_rgba(255,255,255,0.78)_inset]",
              typeStyles[job.type],
            )}
          >
            {job.type}
          </span>
          <span className="text-sm font-semibold text-foreground">
            {job.salary}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <SkillChip key={skill}>{skill}</SkillChip>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onApply(job)}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-black/5 bg-gradient-to-b from-[#111111] to-[#2a2a2a] px-5 text-sm font-semibold text-white shadow-[0_18px_35px_-22px_rgba(17,17,17,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bca7f0]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:from-[#8e5cff] dark:to-[#6f54d1] dark:text-white dark:hover:shadow-[0_18px_35px_-22px_rgba(139,92,246,0.65)]"
        >
          Apply Now
          <ExternalLink className="h-4 w-4" strokeWidth={2.2} />
        </button>
      </div>
    </article>
  );
}

function AnalysisGroup({ label, children }) {
  return (
    <div className="space-y-3">
      <SectionLabel>{label}</SectionLabel>
      {children}
    </div>
  );
}

export default function AIJobRecommendations() {
  const [screen, setScreen] = useState("upload");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const fileInputRef = useRef(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleApplyJob = async (job) => {
    try {
      // Track job application
      await applyToJob({
        company: job.company,
        role: job.role,
        matchPercentage: job.match,
        applyLink: job.applyLink,
      });
    } catch (error) {
      console.error("Failed to save job application:", error);
      // Continue anyway - don't block the redirect
    }

    // Open the apply link
    if (job.applyLink) {
      window.open(job.applyLink, "_blank");
    }
  };

  const handleFileAnalysis = async (file) => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await analyzeResume(file);

      if (response.data.success) {
        setAnalysisData(response.data.data);
        setScreen("results");
      } else {
        setError(response.data.message || "Failed to analyze resume");
      }
    } catch (err) {
      console.error("Error analyzing resume:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to analyze resume. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileAnalysis(file);
    }
    event.currentTarget.value = "";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileAnalysis(file);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(235,226,255,0.78),transparent_36%),linear-gradient(180deg,#ffffff_0%,#fcfbff_100%)] text-foreground dark:bg-[radial-gradient(circle_at_top,rgba(117,93,194,0.28),transparent_34%),linear-gradient(180deg,#0d0c13_0%,#12101b_100%)] dark:text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-6rem] top-20 h-72 w-72 rounded-full bg-[#eadfff]/75 blur-3xl animate-float dark:bg-[#6d4fd0]/25" />
        <div
          className="absolute right-[-7rem] top-44 h-80 w-80 rounded-full bg-[#ece2ff]/70 blur-3xl animate-float dark:bg-[#8b5cf6]/20"
          style={{ animationDelay: "1.6s" }}
        />
        <div
          className="absolute bottom-[-8rem] left-1/2 h-[26rem] w-[44rem] -translate-x-1/2 rounded-full bg-[#e9ddff]/70 blur-3xl animate-float dark:bg-[#5b47a6]/20"
          style={{ animationDelay: "3.1s" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(17,17,17,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,17,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25 [mask-image:radial-gradient(circle_at_center,black,transparent_78%)] dark:bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] dark:opacity-20" />
      </div>

      <Navbar />

      <main className="relative mx-auto w-full max-w-[1360px] px-4 pb-12 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
        {screen === "upload" ? (
          <section className="flex min-h-[calc(100svh-8rem)] items-center justify-center py-10">
            <div className="w-full max-w-[900px] text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d7d0e7] bg-[#f1edf8] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#5e566b] shadow-[0_18px_60px_-36px_rgba(90,64,155,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-white/75">
                <Sparkles className="h-4 w-4 text-[#8e5cff] animate-pulse-glow dark:text-[#c1b5ef]" />
                PERSONALIZED JOB MATCHING
              </span>

              <h2 className="mx-auto mt-8 max-w-none whitespace-nowrap text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-foreground dark:text-white">
                Resume-Based Job{" "}
                <span className="bg-gradient-to-r from-[#4f4a5b] via-[#8e88a8] to-[#d7d2e8] bg-clip-text text-transparent dark:from-white dark:via-[#c1b5ef] dark:to-[#7b6ab9]">
                  Recommendations
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-[44rem] text-base leading-7 text-muted-foreground sm:text-lg dark:text-white/65">
                Upload your resume and we&apos;ll find the best tech jobs for
                your skills and experience
              </p>

              <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-border/70 bg-card/80 p-4 shadow-[0_18px_55px_-44px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-6 dark:border-white/10 dark:bg-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(185,161,248,0.12),transparent_54%)] opacity-80 dark:bg-[radial-gradient(circle_at_top,rgba(159,130,246,0.18),transparent_54%)]" />
                <div
                  className={cn(
                    "relative rounded-[1.5rem] border border-dashed px-5 py-14 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition-all duration-300 sm:px-10 sm:py-16 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
                    isDragging
                      ? "border-[#bca7f0]/60 bg-[#f4f0ff] shadow-[0_0_0_1px_rgba(185,161,248,0.18),0_0_40px_rgba(159,130,246,0.12)] dark:border-[#8e5cff]/40 dark:bg-white/5"
                      : "border-[#d7d7df] bg-[#fafafa]/90 dark:border-white/10 dark:bg-white/5",
                  )}
                  onDragEnter={handleDragOver}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#d6d2e0] bg-[#efeff3] text-[#6d6a76] shadow-[0_10px_24px_-18px_rgba(0,0,0,0.18)] animate-float dark:border-white/10 dark:bg-white/5 dark:text-white/75">
                    <CloudUpload className="h-10 w-10" strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl dark:text-white">
                    Drag & drop your resume here
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground sm:text-base dark:text-white/65">
                    Supports PDF and DOCX files
                  </p>

                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={openFilePicker}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground shadow-[0_12px_24px_-18px_rgba(0,0,0,0.22)] transition-all duration-300 hover:border-[#bca7f0] hover:bg-[#f4f0ff] hover:text-foreground hover:shadow-glow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bca7f0]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-white/5 dark:text-white/85 dark:hover:bg-white/10"
                    >
                      Browse Files
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={openFilePicker}
                disabled={isLoading}
                className="mx-auto mt-8 inline-flex h-14 w-full max-w-[280px] items-center justify-center gap-2 rounded-full border border-black/5 bg-gradient-to-b from-[#111111] to-[#2a2a2a] px-8 text-sm font-semibold text-white shadow-[0_22px_45px_-25px_rgba(17,17,17,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bca7f0]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed dark:border-white/10 dark:from-[#8e5cff] dark:to-[#6f54d1] dark:text-white dark:hover:shadow-[0_22px_45px_-25px_rgba(139,92,246,0.55)]"
              >
                <Sparkles className="h-4 w-4" />
                {isLoading ? "Analyzing..." : "Analyze Resume"}
              </button>

              {error && (
                <div className="mx-auto mt-4 max-w-[280px] rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                  {error}
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-24">
              <div className="rounded-[1.7rem] border border-border/70 bg-card/80 p-5 shadow-[0_18px_55px_-44px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-6 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#8e5cff] dark:text-[#c1b5ef]" />
                  <h2 className="text-lg font-semibold tracking-[-0.03em] text-foreground dark:text-white">
                    Resume Analysis
                  </h2>
                </div>

                <div className="mt-6 space-y-5">
                  {analysisData && (
                    <>
                      <AnalysisGroup label="Detected Role">
                        <GlassPill className="border-[#d8d0ea] bg-[#f4f0ff] text-[#5d4a84] dark:border-white/10 dark:bg-white/5 dark:text-white/85">
                          {analysisData.detectedRole}
                        </GlassPill>
                      </AnalysisGroup>

                      <AnalysisGroup label="Experience Level">
                        <GlassPill className="border-[#d9d9e4] bg-[#f7f7fb] text-[#4f5566] dark:border-white/10 dark:bg-white/5 dark:text-white/80">
                          {analysisData.experienceLevel}
                        </GlassPill>
                      </AnalysisGroup>

                      <AnalysisGroup label="Extracted Skills">
                        <div className="flex flex-wrap gap-2">
                          {(analysisData.extractedSkills || []).map((skill) => (
                            <SkillChip key={skill}>{skill}</SkillChip>
                          ))}
                        </div>
                      </AnalysisGroup>

                      <AnalysisGroup label="Matching Technologies">
                        <div className="flex flex-wrap gap-2">
                          {(analysisData.matchingTechnologies || []).map(
                            (technology) => (
                              <SkillChip key={technology} variant="technology">
                                {technology}
                              </SkillChip>
                            ),
                          )}
                        </div>
                      </AnalysisGroup>
                    </>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setScreen("upload")}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-2xl border border-border bg-background px-5 text-sm font-semibold text-foreground shadow-[0_12px_24px_-18px_rgba(0,0,0,0.22)] transition-all duration-300 hover:border-[#bca7f0] hover:bg-[#f4f0ff] hover:text-foreground hover:shadow-glow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bca7f0]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-white/5 dark:text-white/85 dark:hover:bg-white/10"
                >
                  Upload Different Resume
                </button>
              </div>
            </aside>

            <section className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl dark:text-white">
                  Recommended for You
                </h2>
                <span className="rounded-full border border-[#d8d0ea] bg-[#f4f0ff] px-3 py-1.5 text-xs font-semibold text-[#5d4a84] shadow-[0_12px_24px_-20px_rgba(110,84,209,0.35)] dark:border-white/10 dark:bg-white/5 dark:text-white/80">
                  {analysisData?.recommendedJobs?.length || 0} matches found
                </span>
              </div>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base dark:text-white/65">
                Jobs matched to your skills and experience level
              </p>

              <div className="mt-6 space-y-4">
                {analysisData?.recommendedJobs?.map((job) => (
                  <JobCard key={`${job.company}-${job.role}`} job={job} onApply={handleApplyJob} />
                ))}
              </div>
            </section>
          </section>
        )}
      </main>
    </div>
  );
}
