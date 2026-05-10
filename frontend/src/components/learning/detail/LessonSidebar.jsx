import { cn } from "../../../lib/utils";

export default function LessonSidebar({ title, items, activeId }) {
  return (
    <aside className="w-full lg:sticky lg:top-28 lg:w-[220px] lg:shrink-0 lg:self-start">
      <div className="w-full rounded-[20px] border border-slate-200 bg-white p-3 shadow-[0_14px_30px_-24px_rgba(15,23,42,0.18)]">
        <div className="mb-3 inline-flex rounded-full bg-slate-900 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-white">
          {title}
        </div>

        <nav className="max-h-[calc(100vh-11rem)] space-y-1 overflow-y-auto pr-1">
          {items.map((item) => {
            const isActive = item.id === activeId;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "block rounded-xl px-3 py-2 text-[13px] leading-5 transition-colors",
                  isActive
                    ? "bg-slate-900 text-white shadow-[0_10px_20px_-18px_rgba(15,23,42,0.6)]"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
                )}
                aria-current={isActive ? "true" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
