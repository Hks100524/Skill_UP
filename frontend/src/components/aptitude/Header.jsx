export default function Header({ title, subtitle, groupCount = 0, topicCount = 0 }) {
  return (
    <div className="bg-white p-6 rounded-2xl border mb-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-gray-500 text-sm mt-1">{subtitle}</p>

      <div className="flex gap-3 mt-3 text-xs text-gray-500">
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          {groupCount} {groupCount === 1 ? "sub-group" : "sub-groups"}
        </span>
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          {topicCount} {topicCount === 1 ? "topic" : "topics"}
        </span>
      </div>
    </div>
  );
}
