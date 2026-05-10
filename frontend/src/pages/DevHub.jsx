import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import ProjectCard from "../components/devhub/ProjectCard";
import NewProjectModal from "../components/devhub/NewProjectModal";
import { getProjects, deleteProject } from "../api/projectApi";

export default function DevHub() {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [projects, setProjects] = useState([]);

  // ✅ GITHUB STATES
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [repoError, setRepoError] = useState("");

  // ✅ FETCH PROJECTS
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await getProjects();
      // Debug: verify response shape (DevHub expects res.data.projects)
      console.log("DevHub getProjects response:", res.data);
      const list =
        res?.data?.projects ||
        res?.data?.data?.projects ||
        res?.data?.project ||
        [];
      setProjects(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("DevHub fetchProjects error:", err?.response?.status, err?.response?.data || err.message);
      alert(
        `DevHub API error: ${err?.response?.status || "Network"}\n${JSON.stringify(
          err?.response?.data || { message: err.message },
          null,
          2
        )}`
      );
      setProjects([]);
    }
  };

  // 🔥 DELETE FUNCTION (BACKEND CONNECTED)
  const handleDelete = async (id) => {
    try {
      await deleteProject(id);

      // ✅ UI UPDATE
      setProjects((prev) => prev.filter((p) => p._id !== id));

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ✅ FETCH GITHUB REPOS
  const fetchGithubRepos = async () => {
    if (!username) return;

    try {
      setLoadingRepos(true);
      setRepoError("");

      const res = await fetch(
        `https://api.github.com/users/${username}/repos`
      );

      const data = await res.json();

      if (res.status !== 200) {
        setRepoError("User not found");
        setRepos([]);
      } else {
        setRepos(data);
      }

    } catch (err) {
      setRepoError("Something went wrong");
    } finally {
      setLoadingRepos(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-black via-[#020617] to-black text-white px-10 py-8 flex justify-between items-center">
        
        <div>
          <button
            onClick={() => navigate("/")}
            className="mb-4 text-xs bg-[#111] px-3 py-1 rounded border border-gray-700 hover:bg-[#222]"
          >
            ⬅ ~/home
          </button>

          <h1 className="text-5xl font-bold text-purple-400">DevHub</h1>

          <p className="text-green-400 text-sm mt-2">
            // Where developers build, ship, and grow together.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          + new project
        </button>
      </div>

      {/* PROJECT GRID */}
      <div className="px-10 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((p) => (
            <ProjectCard 
              key={p._id} 
              project={p} 
              onDelete={handleDelete}   // 🔥 IMPORTANT
            />
          ))
        ) : (
          <p className="text-gray-500">No projects found</p>
        )}
      </div>

      {/* ================= GITHUB SECTION ================= */}

      <div className="px-10 pb-16 border-t">

        <p className="text-sm text-gray-500 mt-10 mb-2">
          $ github --fetch-repos
        </p>

        <p className="text-xs text-gray-400 mb-4">
          // Enter a GitHub username to explore public repositories
        </p>

        {/* INPUT */}
        <div className="flex gap-3 mb-6">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username..."
            className="flex-1 border px-4 py-2 rounded"
          />

          <button
            onClick={fetchGithubRepos}
            className="border px-4 py-2 rounded bg-white hover:bg-gray-100"
          >
            $ fetch
          </button>
        </div>

        {/* LOADING */}
        {loadingRepos && (
          <p className="text-gray-500">Loading repos...</p>
        )}

        {/* ERROR */}
        {repoError && (
          <p className="text-red-500">{repoError}</p>
        )}

        {/* REPOS GRID */}
        {repos.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4">
            {repos.slice(0, 6).map((repo) => (
              <div
                key={repo.id}
                className="bg-white p-4 rounded-lg border shadow-sm"
              >
                <h3 className="font-semibold">{repo.name}</h3>

                <p className="text-sm text-gray-500 mb-2">
                  ⭐ {repo.stargazers_count}
                </p>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 text-sm"
                >
                  View Repo →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      <NewProjectModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          fetchProjects();
        }}
      />
    </div>
  );
}


