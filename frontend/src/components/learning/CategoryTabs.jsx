import { Link } from "react-router-dom";
import {
  Briefcase,
  Code2,
  Cloud,
  Database,
  GraduationCap,
  Globe,
  Server,
  Smartphone,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { learningTabs, learningThemes } from "../../data/learningData";

const ICONS = {
  briefcase: Briefcase,
  code: Code2,
  cloud: Cloud,
  database: Database,
  "graduation-cap": GraduationCap,
  globe: Globe,
  server: Server,
  smartphone: Smartphone,
};

export default function CategoryTabs() {
  const visibleTabs = learningTabs.filter(
    (tab) => tab.label !== "Aptitude" && tab.label !== "Career",
  );

  return (
    <nav aria-label="Learning categories" className="border-y border-slate-200/70 bg-white/90">
      <div className="mx-auto w-full max-w-[1120px] overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-max items-center justify-center gap-2 sm:gap-3">
          {visibleTabs.map((tab) => {
            const Icon = ICONS[tab.icon] || GraduationCap;
            const className = cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium leading-none shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:shadow-[0_10px_24px_-20px_rgba(15,23,42,0.22)] sm:text-xs",
              tab.active ? learningThemes.tabsActive : learningThemes.tabsBase,
            );

            if (tab.href.startsWith("/")) {
              return (
                <Link key={tab.label} to={tab.href} className={className}>
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  <span>{tab.label}</span>
                </Link>
              );
            }

            return (
              <a key={tab.label} href={tab.href} className={className}>
                <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                <span>{tab.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
