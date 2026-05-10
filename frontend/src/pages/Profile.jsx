import {
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiEdit2,
  FiMail,
  FiMapPin,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";

const stats = [
  { label: "Courses", value: "12", sub: "5 in progress" },
  { label: "Certificates", value: "8", sub: "Verified" },
  { label: "Learning Hours", value: "124", sub: "This month" },
  { label: "Rank", value: "Advanced", sub: "Top 15%" },
];

const skillTags = [
  "React",
  "Node.js",
  "MongoDB",
  "JavaScript",
  "Tailwind CSS",
  "Express",
  "REST API",
  "JWT Auth",
];

const goals = [
  { title: "Complete 15 Courses", progress: 80 },
  { title: "Earn 10 Certificates", progress: 80 },
  { title: "Study 200 Hours", progress: 62 },
];

export default function Profile() {
  return (
    <section className="min-h-screen bg-[#f3f2f9] px-6 pb-14 pt-24 dark:bg-[#060812]">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/85 p-6 shadow-sm dark:border-white/10 dark:bg-[#0d1020] md:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-300/30 blur-[90px] dark:bg-violet-700/25" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6855f3] to-[#877bff] text-2xl font-semibold text-white shadow-[0_10px_30px_rgba(108,86,247,0.35)]">
                HU
              </div>

              <div>
                <h1 className="text-2xl font-bold md:text-3xl">Harshit User</h1>
                <p className="text-sm text-[#5e647d] dark:text-[#aeb5cf]">@harshit_upskill</p>

                <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#5c637b] dark:text-[#a8b0cb]">
                  <span className="inline-flex items-center gap-1.5">
                    <FiMail size={13} />
                    harshitsharma363978@gmail.com
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiMapPin size={13} />
                    India
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiCalendar size={13} />
                    Joined 2026
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg border border-black/15 bg-white px-4 py-2 text-sm font-medium text-[#1d2235] transition hover:border-[#6d5ef4] hover:text-[#6d5ef4] dark:border-white/15 dark:bg-[#11162a] dark:text-[#e5e9ff]">
                <FiUser size={14} />
                Public Profile
              </button>

              <button className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#6855f3] to-[#7d6cff] px-4 py-2 text-sm font-medium text-white shadow-[0_8px_24px_rgba(108,86,247,0.35)] transition hover:brightness-105">
                <FiEdit2 size={14} />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="rounded-xl border border-black/10 bg-white/85 p-5 text-center shadow-sm dark:border-white/10 dark:bg-[#0d1020]"
            >
              <p className="text-sm text-[#606782] dark:text-[#a3abcd]">{item.label}</p>
              <h2 className="mt-2 text-3xl font-bold text-[#6a58f5]">{item.value}</h2>
              <p className="mt-1 text-xs text-[#747b94] dark:text-[#8e97b6]">{item.sub}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <article className="rounded-2xl border border-black/10 bg-white/85 p-6 shadow-sm dark:border-white/10 dark:bg-[#0d1020]">
              <h3 className="text-xl font-semibold">About</h3>
              <p className="mt-3 leading-relaxed text-[#5c637c] dark:text-[#aab2cd]">
                Focused learner building strong full-stack development skills through practical
                projects. Currently improving backend architecture, authentication systems, and clean
                UI development with React and Tailwind.
              </p>
            </article>

            <article className="rounded-2xl border border-black/10 bg-white/85 p-6 shadow-sm dark:border-white/10 dark:bg-[#0d1020]">
              <h3 className="text-xl font-semibold">Skills</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {skillTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-[#6654f2] dark:bg-violet-500/20 dark:text-violet-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </div>

          <div className="space-y-6">
            <article className="rounded-2xl border border-black/10 bg-white/85 p-6 shadow-sm dark:border-white/10 dark:bg-[#0d1020]">
              <h3 className="text-xl font-semibold">Learning Goals</h3>
              <div className="mt-4 space-y-4">
                {goals.map((goal) => (
                  <div key={goal.title}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <p className="text-[#4a5068] dark:text-[#bec5dd]">{goal.title}</p>
                      <span className="font-semibold text-[#6a58f5]">{goal.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#e4e5ee] dark:bg-[#1f2540]">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#6855f3] to-[#857bff]"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-black/10 bg-white/85 p-6 shadow-sm dark:border-white/10 dark:bg-[#0d1020]">
              <h3 className="text-xl font-semibold">Highlights</h3>
              <div className="mt-4 space-y-3 text-sm text-[#55607d] dark:text-[#b4bdd8]">
                <div className="flex items-center gap-2">
                  <FiAward className="text-[#6a58f5]" />
                  8 Verified Certificates Earned
                </div>
                <div className="flex items-center gap-2">
                  <FiBookOpen className="text-[#6a58f5]" />
                  12 Courses Completed
                </div>
                <div className="flex items-center gap-2">
                  <FiTrendingUp className="text-[#6a58f5]" />
                  Consistent 45-day Learning Streak
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
