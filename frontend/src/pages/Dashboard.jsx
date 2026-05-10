import {
  ArrowRight,
  BriefcaseBusiness,
  Calculator,
  CheckSquare2,
  Code2,
  Github,
  Home,
  ListTodo,
  Plus,
  RefreshCw,
  Star,
  Target,
  Trophy,
  Brain,
  BookOpen,
  ClipboardList,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDashboard } from "../api/dashboardApi";

// Category icons mapping
const categoryIcons = {
  Quantitative: { icon: Calculator, tone: "bg-[#8e4dff]" },
  "Logical Reasoning": { icon: Brain, tone: "bg-[#2f8ce5]" },
  "Verbal Ability": { icon: BookOpen, tone: "bg-[#1cae82]" },
  Technical: { icon: Code2, tone: "bg-[#ef7d12]" },
  "Mock Tests": { icon: ClipboardList, tone: "bg-[#eb4b87]" },
};

// Status color mapping
const statusColors = {
  Interview: { border: "border-[#ffd79f]", bg: "bg-[#fff4e3]", text: "text-[#d88900]" },
  Applied: { border: "border-[#9fe1ce]", bg: "bg-[#eefaf5]", text: "text-[#0ca37e]" },
  Saved: { border: "border-[#a7c3ff]", bg: "bg-[#eef3ff]", text: "text-[#4475ff]" },
  Rejected: { border: "border-[#ffb7b7]", bg: "bg-[#fff1f1]", text: "text-[#ef5454]" },
  Offered: { border: "border-[#b8cbff]", bg: "bg-[#eef3ff]", text: "text-[#4475ff]" },
};

function StatRow({ label, percent, icon: Icon, tone }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full ${tone} text-white shadow-[0_8px_18px_-12px_rgba(0,0,0,0.45)]`}
          >
            <Icon className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <span className="text-[0.94rem] font-medium tracking-[-0.01em] text-[#151515]">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-[0.82rem] font-semibold text-[#212121]">{percent}%</span>
        </div>
      </div>
      <div className="h-[6px] rounded-full bg-[#cfcfcf]">
        <div
          className="h-full rounded-full bg-[#111111]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function PanelHeader({ icon: Icon, title, subtitle, right }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#e3e3e3] text-[#474747] shadow-[0_10px_24px_-18px_rgba(0,0,0,0.45)]">
          <Icon className="h-5 w-5" strokeWidth={2.1} />
        </div>
        <div>
          <h3 className="text-[1.03rem] font-semibold tracking-[-0.02em] text-[#111111]">
            {title}
          </h3>
          <p className="text-[0.8rem] text-[#8a8a8a]">{subtitle}</p>
        </div>
      </div>
      {right}
    </div>
  );
}

function SectionCard({ className = "", children }) {
  return (
    <section
      className={[
        "flex h-full min-h-[470px] flex-col rounded-[1.25rem] border border-[#dddddd] bg-white p-5 shadow-[0_18px_55px_-44px_rgba(0,0,0,0.35)] sm:p-6",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    aptitude: {
      totalAttempts: 0,
      overallAvgAccuracy: 0,
      categoryBreakdown: {},
    },
    jobs: {
      totalApplications: 0,
      stats: { applied: 0, interviews: 0, saved: 0, rejected: 0, offered: 0 },
      recentApplications: [],
    },
    projects: {
      totalProjects: 0,
      githubProjects: 0,
      recentProjects: [],
    },
  });

  const fetchDashboardData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const response = await getDashboard();
      // Debug: verify response shape (Dashboard expects response.data.data)
      console.log("Dashboard response:", response.data);
      if (response.data && response.data.success) {
        setDashboardData(response.data.data || response.data);
      } else {
        console.error("Dashboard API returned unsuccessful:", response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Build aptitude items from real data
  const aptitudeItems = Object.entries(dashboardData.aptitude.categoryBreakdown).map(
    ([category, data]) => ({
      label: category,
      percent: data.avgAccuracy || 0,
      icon: categoryIcons[category]?.icon || Calculator,
      tone: categoryIcons[category]?.tone || "bg-[#8e4dff]",
    })
  );

  // Build project items from real data
  const projectItems = dashboardData.projects.recentProjects.map((project) => ({
    title: project.title,
    tags: (project.techStack || []).map((tech) => {
      const colors = [
        { label: tech, tone: "bg-[#d4f4ff] text-[#2a8fb3]" },
        { label: tech, tone: "bg-[#ffecc7] text-[#cb8500]" },
        { label: tech, tone: "bg-[#ead9ff] text-[#8c47ff]" },
        { label: tech, tone: "bg-[#f3f3f3] text-[#202020]" },
        { label: tech, tone: "bg-[#dde0ff] text-[#4d5cff]" },
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }),
    url: project.githubUrl,
  }));

  // Build job items from real data
  const jobItems = dashboardData.jobs.recentApplications.map((job) => {
    const statusColor = statusColors[job.status] || statusColors.Applied;
    return {
      company: job.company,
      role: job.role,
      status: job.status,
      statusClass: `border-[${statusColor.border.match(/\[([^\]]+)\]/)?.[1]}] ${statusColor.bg} ${statusColor.text}`,
    };
  });

  const getTodayDate = () => {
    const today = new Date();
    const options = { weekday: "long", month: "numeric", day: "numeric", year: "numeric" };
    return today.toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f7]">
        <p className="text-[#111111]">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#111111]">
      <header className="h-[66px] border-b border-[#d9d9d9] bg-[#fbfbfb] shadow-[0_1px_0_0_rgba(0,0,0,0.03)]">
        <div className="mx-auto flex h-full w-full max-w-[1228px] items-center justify-between px-6 sm:px-8 lg:px-0">
          <div className="flex items-start gap-3">
            <Link
              to="/"
              className="mt-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-[#6f6f6f] transition-colors duration-200 hover:text-[#111111]"
              aria-label="Go to home"
            >
              <Home className="h-5 w-5" strokeWidth={2} />
            </Link>
            <div>
              <h1 className="text-[1.04rem] font-semibold leading-none tracking-[-0.02em] text-[#111111]">
                Dashboard
              </h1>
              <p className="mt-1 text-[0.76rem] text-[#787878]">{getTodayDate()}</p>
            </div>
          </div>

<div className="flex items-center gap-4">
            <button
              type="button"
              className="rounded-full p-1.5 text-[#676767] transition-colors duration-200 hover:text-[#111111]"
              aria-label="Refresh dashboard"
              onClick={() => fetchDashboardData(false)}
            >
              <RefreshCw className="h-4 w-4" strokeWidth={2} />
            </button>
            <Link
              to="/profile"
              className="rounded-full border border-[#dbdbdb] bg-white px-4 py-2 text-[0.8rem] font-medium text-[#111111] shadow-[0_8px_18px_-14px_rgba(0,0,0,0.32)] transition-colors duration-200 hover:bg-[#f7f7f7]"
            >
              View Profile
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1228px] px-6 pb-16 pt-10 sm:px-8 lg:px-0">
        <section className="flex items-start gap-4 sm:gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] bg-gradient-to-br from-[#6f6f6f] to-[#8f8f8f] text-white shadow-[0_18px_30px_-18px_rgba(0,0,0,0.5)]">
            <Trophy className="h-6 w-6" strokeWidth={2.1} />
          </div>
          <div className="pt-0.5">
            <h2 className="text-[1.75rem] font-semibold leading-none tracking-[-0.04em] text-[#111111] sm:text-[2rem]">
              Welcome back!
            </h2>
            <p className="mt-2 text-[0.96rem] text-[#7a7a7a] sm:text-[1rem]">
              Here&apos;s a summary of your progress across all modules.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <SectionCard>
            <PanelHeader
              icon={Target}
              title="Aptitude Stats"
              subtitle="Practice progress"
              right={
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#bebebe] bg-[#efefef] px-3.5 py-2 text-[0.82rem] font-semibold text-[#252525] shadow-[0_1px_0_0_rgba(255,255,255,0.8)_inset]">
                  <Star className="h-3.5 w-3.5" strokeWidth={2.1} />
                  {dashboardData.aptitude.overallAvgAccuracy}% avg
                </div>
              }
            />

            <div className="mt-5 grid gap-5">
              {aptitudeItems.length > 0 ? (
                aptitudeItems.map((item) => (
                  <StatRow key={item.label} {...item} />
                ))
              ) : (
                <p className="text-[0.9rem] text-[#7a7a7a]">No aptitude attempts yet. Start practicing!</p>
              )}
            </div>

            <Link
              to="/aptitude"
              className="mt-auto h-[42px] w-full rounded-[0.95rem] border border-[#bebebe] bg-gradient-to-b from-[#efefef] to-[#e1e1e1] text-[0.92rem] font-medium text-[#111111] shadow-[0_1px_0_0_rgba(255,255,255,0.78)_inset] transition-colors duration-200 hover:from-[#eaeaea] hover:to-[#dbdbdb] inline-flex items-center justify-center gap-1.5"
            >
              Continue Practice
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </Link>
          </SectionCard>

          <SectionCard>
            <PanelHeader
              icon={Github}
              title="DevHub"
              subtitle="Your projects"
              right={
                <div className="flex items-center gap-4 text-[0.8rem] text-[#7d7d7d]">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#22b573]" />
                    {dashboardData.projects.totalProjects} Projects
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Github className="h-3.5 w-3.5" strokeWidth={2.1} />
                    {dashboardData.projects.githubProjects} GitHub
                  </span>
                </div>
              }
            />

            <div className="mt-5 grid gap-3">
              {projectItems.length > 0 ? (
                projectItems.map((project) => (
                  <div
                    key={project.title}
                    className="flex items-center justify-between gap-4 rounded-[1.15rem] bg-gradient-to-r from-[#fdfdfd] to-[#f6f6f6] px-4 py-4 shadow-[0_1px_0_0_rgba(0,0,0,0.02)_inset]"
                  >
                    <div className="min-w-0">
                      <h4 className="text-[0.96rem] font-semibold tracking-[-0.01em] text-[#111111]">
                        {project.title}
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag.label}
                            className={`rounded-full px-2.5 py-1 text-[0.72rem] font-medium ${tag.tone}`}
                          >
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d9d9d9] bg-[#fafafa] text-[#777777] transition-colors duration-200 hover:bg-[#f0f0f0]"
                        aria-label={`Open ${project.title}`}
                      >
                        <Github className="h-4 w-4" strokeWidth={2.1} />
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-[0.9rem] text-[#7a7a7a]">No projects yet. Start creating!</p>
              )}
            </div>

            <Link
              to="/DevHub"
              className="mt-auto h-[42px] w-full rounded-[0.95rem] border border-[#bebebe] bg-gradient-to-b from-[#efefef] to-[#e1e1e1] text-[0.92rem] font-medium text-[#111111] shadow-[0_1px_0_0_rgba(255,255,255,0.78)_inset] transition-colors duration-200 hover:from-[#eaeaea] hover:to-[#dbdbdb] inline-flex items-center justify-center gap-1.5"
            >
              Open DevHub
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </Link>
          </SectionCard>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <SectionCard>
            <PanelHeader
              icon={BriefcaseBusiness}
              title="Job Tracker"
              subtitle="Application status"
              right={null}
            />

            <div className="mt-5 flex flex-wrap gap-2.5">
              <span className="rounded-full border border-[#9fe2ce] bg-[#eefaf5] px-3 py-1.5 text-[0.82rem] font-semibold text-[#0ca37e]">
                Applied: {dashboardData.jobs.stats.applied}
              </span>
              <span className="rounded-full border border-[#ffd79f] bg-[#fff4e3] px-3 py-1.5 text-[0.82rem] font-semibold text-[#d88900]">
                Interviews: {dashboardData.jobs.stats.interviews}
              </span>
              <span className="rounded-full border border-[#b8cbff] bg-[#eef3ff] px-3 py-1.5 text-[0.82rem] font-semibold text-[#4475ff]">
                Saved: {dashboardData.jobs.stats.saved}
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {jobItems.length > 0 ? (
                jobItems.map((job) => {
                  const statusColor = statusColors[job.status] || statusColors.Applied;
                  return (
                    <div
                      key={`${job.company}-${job.role}`}
                      className="flex items-center justify-between gap-4 rounded-[1.05rem] bg-gradient-to-r from-[#fdfdfd] to-[#f6f6f6] px-4 py-4 shadow-[0_1px_0_0_rgba(0,0,0,0.02)_inset]"
                    >
                      <div>
                        <h4 className="text-[0.95rem] font-semibold tracking-[-0.01em] text-[#111111]">
                          {job.company}
                        </h4>
                        <p className="mt-1 text-[0.8rem] text-[#7a7a7a]">{job.role}</p>
                      </div>
                      <span
                        className={`rounded-full border px-3 py-1.5 text-[0.78rem] font-semibold ${statusColor.bg} ${statusColor.text}`}
                      >
                        {job.status}
                      </span>
                    </div>
                  );
                })
              ) : (
                <p className="text-[0.9rem] text-[#7a7a7a]">No applications yet. Start applying!</p>
              )}
            </div>

            <Link
              to="/jobs"
              className="mt-auto h-[42px] w-full rounded-[0.95rem] border border-[#bebebe] bg-gradient-to-b from-[#efefef] to-[#e1e1e1] text-[0.92rem] font-medium text-[#111111] shadow-[0_1px_0_0_rgba(255,255,255,0.78)_inset] transition-colors duration-200 hover:from-[#eaeaea] hover:to-[#dbdbdb] inline-flex items-center justify-center gap-1.5"
            >
              View Jobs
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </Link>
          </SectionCard>

          <SectionCard>
            <PanelHeader
              icon={ListTodo}
              title="To-Do List"
              subtitle="Stay on top of your goals"
              right={null}
            />

            <div className="mt-5 flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a task... (Enter to save)"
                className="h-[40px] flex-1 rounded-[0.95rem] border border-[#dddddd] bg-[#fafafa] px-4 text-[0.9rem] text-[#111111] outline-none placeholder:text-[#b0b0b0]"
                aria-label="Add a task"
              />
              <button
                type="button"
                className="inline-flex h-[38px] items-center gap-1.5 rounded-[0.85rem] bg-[#8c8c8c] px-4 text-[0.9rem] font-medium text-white transition-colors duration-200 hover:bg-[#7a7a7a]"
              >
                <Plus className="h-4 w-4" strokeWidth={2.3} />
                Add
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center pb-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[#efefef] text-[#b6b6b6] shadow-[0_8px_18px_-14px_rgba(0,0,0,0.35)]">
                <CheckSquare2 className="h-6 w-6" strokeWidth={2} />
              </div>
              <p className="mt-4 text-[0.98rem] font-medium text-[#6e6e6e]">
                No tasks yet. Add one above!
              </p>
              <p className="mt-1 text-[0.82rem] text-[#b0b0b0]">Your tasks are saved locally.</p>
            </div>
          </SectionCard>
        </section>
      </main>
    </div>
  );
}
