export default function LessonCodeBlock({ code, caption, language }) {
  return (
    <div className="overflow-hidden rounded-[18px] bg-[#eef1f5] p-3 sm:p-4">
      {caption || language ? (
        <div className="mb-3 flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
          <span>{caption || ""}</span>
          {language ? (
            <span className="rounded-full bg-slate-200 px-2 py-1 text-[9px] tracking-[0.18em] text-slate-500">
              {language}
            </span>
          ) : null}
        </div>
      ) : null}

      <pre className="overflow-x-auto rounded-[14px] bg-[#1f2937] px-4 py-4 font-mono text-[11px] leading-6 text-[#dbe4ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}
