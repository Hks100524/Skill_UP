import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaEdit, FaTrash } from "react-icons/fa";

export default function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate();

  const tech = Array.isArray(project?.techStack)
    ? project.techStack
    : [];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition">

      {/* CODE HEADER */}
      <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white p-3 relative">

        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>

        <p className="text-xs opacity-70 mb-2">
          {project?.file || "project.js"}
        </p>

        <pre className="text-xs font-mono text-green-400">
{`import React from 'react'

const id = "${project?._id || "0"}"

return render()

// ${tech.length ? tech.join(" + ") : "No Tech"}
export default App`}
        </pre>

        <span className="absolute top-3 right-3 text-xs text-blue-400">
          {project?.label || "Project"}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4">

        <div className="flex gap-2 mb-2 flex-wrap">
          {tech.map((t, i) => (
            <span
              key={i}
              className="text-xs bg-gray-200 px-2 py-1 rounded"
            >
              {t}
            </span>
          ))}
        </div>

        <h3 className="font-semibold text-lg">
          {project?.title || "Untitled"}
        </h3>

        <p className="text-sm text-gray-500 mb-3">
          {project?.description || "No description"}
        </p>

        {/*  BUTTON GROUP */}
        <div className="flex gap-2">

          {/* VIEW */}
          <button
            onClick={() => {
              if (project?._id) {
                navigate(`/project/${project._id}`);
              }
            }}
            className="flex-1 bg-black text-white py-2 rounded-md"
          >
            View
          </button>

          {/* GITHUB */}
          <button
            onClick={() => {
              if (project?.githubUrl) {
                window.open(project.githubUrl, "_blank");
              }
            }}
            className="p-2 border rounded-md hover:bg-gray-100"
          >
            <FaGithub />
          </button>

          {/* EDIT */}
          <button
            onClick={() => {
              if (project?._id) {
                navigate(`/edit-project/${project._id}`);
              }
            }}
            className="p-2 border rounded-md hover:bg-blue-100 text-blue-600"
          >
            <FaEdit />
          </button>

          {/* DELETE */}
          <button
            onClick={() => {
              if (onDelete && project?._id) {
                onDelete(project._id);
              }
            }}
            className="p-2 border rounded-md hover:bg-red-100 text-red-600"
          >
            <FaTrash />
          </button>

        </div>
      </div>
    </div>
  );
}