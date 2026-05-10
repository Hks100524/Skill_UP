import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjectById } from "../api/projectApi";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);

  useEffect(() => {
    if (id) fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await getProjectById(id);
      setProject(res.data.project);
    } catch (err) {
      console.log(err);
    }
  };

  if (!project) return <div className="p-10">Loading...</div>;

  const tech = Array.isArray(project?.techStack)
    ? project.techStack
    : [];

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-20 py-10">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/DevHub")}
        className="mb-6 px-3 py-1 text-sm bg-transparent border border-gray-400 rounded hover:bg-gray-100"
      >
        ← cd ../devhub
      </button>

      {/* CODE BOX */}
      <div className="bg-[#020617] rounded-2xl p-8 mb-10 shadow-lg">

        <pre className="text-green-400 text-sm font-mono">
{`const project = {
  name: "${project?.title}",
  tech: [${tech.map((t) => `"${t}"`).join(", ")}]
}`}
        </pre>

        <h1 className="text-white text-3xl mt-6 font-semibold">
          {project?.title}
        </h1>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="md:col-span-2">

          <h2 className="text-lg font-semibold mb-2">// About</h2>
          <p className="text-gray-600 mb-6">
            {project?.description}
          </p>

          <h2 className="text-lg font-semibold mb-2">// Tech Stack</h2>

          <div className="flex gap-2 flex-wrap">
            {tech.map((t, i) => (
              <span
                key={i}
                className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded"
              >
                [{t}]
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white rounded-xl border p-5 shadow-sm">

          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-xs text-gray-400 ml-2">
              project.info
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            owner: <span className="font-medium">demo_user</span>
          </p>

          <button className="w-full border rounded py-2 mb-3">
            ⎘ git clone
          </button>

          {/* ✅ SAFE LINK */}
          {project?.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="block text-center w-full bg-black text-white py-2 rounded"
            >
              🌐 Open Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}