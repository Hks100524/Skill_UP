import LessonCodeBlock from "./LessonCodeBlock";

const normalizeArray = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  return [value];
};

function renderLegacyBlock(block, index) {
  if (block.type === "callout") {
    return (
      <div
        key={`${block.type}-${index}`}
        className="rounded-[18px] bg-[#f2f3f5] px-5 py-4 text-sm leading-7 text-slate-600"
      >
        {block.text}
      </div>
    );
  }

  if (block.type === "bullets") {
    return (
      <ul
        key={`${block.type}-${index}`}
        className="space-y-2.5 rounded-[18px] bg-white px-1 text-sm leading-7 text-slate-600"
      >
        {block.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "paragraphs") {
    return (
      <div key={`${block.type}-${index}`} className="space-y-3 text-sm leading-7 text-slate-600">
        {block.items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    );
  }

  if (block.type === "panel") {
    return (
      <div
        key={`${block.type}-${index}`}
        className="rounded-[18px] bg-[#f2f3f5] px-5 py-5 text-sm leading-7 text-slate-600"
      >
        {block.title ? (
          <h3 className="mb-3 text-[0.95rem] font-semibold text-slate-700">
            {block.title}
          </h3>
        ) : null}
        <ul className="space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (block.type === "preview") {
    return (
      <div
        key={`${block.type}-${index}`}
        className="rounded-[18px] bg-[#f2f3f5] px-5 py-5 text-slate-700"
      >
        <div className="space-y-1">
          {block.items.map((item, itemIndex) => {
            const levelClass =
              itemIndex === 0
                ? "text-2xl font-extrabold"
                : itemIndex === 1
                  ? "text-xl font-bold"
                  : itemIndex === 2
                    ? "text-lg font-semibold"
                    : itemIndex === 3
                      ? "text-base font-semibold"
                      : itemIndex === 4
                        ? "text-sm font-medium"
                        : "text-xs font-medium";

            return (
              <div key={item} className={`${levelClass} leading-tight`}>
                {item}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (block.type === "placeholder") {
    return (
      <div
        key={`${block.type}-${index}`}
        className="rounded-[18px] bg-[#f2f3f5] px-5 py-4 text-sm leading-7 text-slate-400"
      >
        {block.text}
      </div>
    );
  }

  if (block.type === "code") {
    return <LessonCodeBlock key={`${block.type}-${index}`} code={block.code} caption={block.caption} />;
  }

  return null;
}

function renderTextContent(content) {
  const items = normalizeArray(content);

  if (!items.length) {
    return null;
  }

  return (
    <div className="space-y-3 text-sm leading-7 text-slate-600">
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}

function renderBullets(points) {
  const items = normalizeArray(points);

  if (!items.length) {
    return null;
  }

  return (
    <ul className="space-y-2.5 text-sm leading-7 text-slate-600">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function renderNotes(notes) {
  const items = normalizeArray(notes);

  if (!items.length) {
    return null;
  }

  return (
    <div className="rounded-[18px] bg-[#f2f3f5] px-5 py-4 text-sm leading-7 text-slate-500">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
        Notes
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function renderCode(codeExample) {
  if (!codeExample) {
    return null;
  }

  if (typeof codeExample === "string") {
    return <LessonCodeBlock code={codeExample} />;
  }

  return (
    <LessonCodeBlock
      code={codeExample.code}
      caption={codeExample.caption || ""}
      language={codeExample.language}
    />
  );
}

export default function LessonSection({ section }) {
  const hasLegacyBlocks = Array.isArray(section.blocks) && section.blocks.length > 0;

  return (
    <section id={section.id} className="scroll-mt-28">
      <div className="mb-4">
        <h2 className="text-[1.45rem] font-extrabold tracking-[-0.04em] text-slate-900 sm:text-[1.7rem]">
          {section.title}
        </h2>
        {section.lead ? (
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-500 sm:text-[0.95rem]">
            {section.lead}
          </p>
        ) : null}
      </div>

      {hasLegacyBlocks ? (
        <div className="space-y-4">
          {section.blocks.map((block, index) => renderLegacyBlock(block, index))}
        </div>
      ) : (
        <div className="space-y-5">
          {renderTextContent(section.content)}
          {renderBullets(section.bulletPoints)}
          {renderCode(section.codeExample)}
          {renderNotes(section.notes)}
        </div>
      )}
    </section>
  );
}
