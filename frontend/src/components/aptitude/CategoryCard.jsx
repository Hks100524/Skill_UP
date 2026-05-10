import { useNavigate } from "react-router-dom";

export default function CategoryCard({ title, items, category }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-xl border">
      <h3 className="font-semibold mb-3">{title}</h3>

      {items.map((item, i) => (
        <div
          key={item.slug ?? item.name ?? i}
          onClick={() =>
            navigate(`/aptitude/${category}/${item.slug}`)
          }
          className="flex items-center gap-3 py-2 border-b last:border-none cursor-pointer hover:bg-gray-50"
        >
          <span className="text-sm bg-gray-200 px-2 py-1 rounded">
            {i + 1}
          </span>
          <p className="text-sm">{item.name}</p>
        </div>
      ))}
    </div>
  );
}



