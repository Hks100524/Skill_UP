import { useNavigate } from "react-router-dom";

export default function Topbar({ subtitle }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl border mb-6">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="bg-gray-200 p-2 rounded-full">
          🧠
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            Aptitude Preparation
          </h2>
          <p className="text-sm text-gray-500">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right */}
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
      >
        ← Back
      </button>
    </div>
  );
}
