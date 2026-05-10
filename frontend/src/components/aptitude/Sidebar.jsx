import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Quantitative Aptitude", path: "/aptitude/quantitative" },
    { name: "Logical Reasoning", path: "/aptitude/logical" },
    { name: "Verbal Ability", path: "/aptitude/verbal" },
    { name: "Technical", path: "/aptitude/technical" },
    { name: "Mock Test", path: "/aptitude/mock" },
  ];

  return (
    <div className="w-64 bg-white border-r p-5">
      <h2 className="text-xs font-semibold text-gray-400 mb-4 tracking-wide">
        SYLLABUS
      </h2>

      {menu.map((item) => {
        const active = location.pathname === item.path;

        return (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer mb-2 transition ${
              active
                ? "bg-blue-50 text-blue-600 font-medium"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {item.name}
            <span>›</span>
          </div>
        );
      })}

      <div className="mt-6 text-gray-400 text-sm">
        Notes PDF
      </div>
    </div>
  );
}