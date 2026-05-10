import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById, updateProject } from "../api/projectApi";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    githubUrl: "",
    liveUrl: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // FETCH DATA
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getProjectById(id);

        const p = res.data.project;

        setForm({
          title: p.title || "",
          description: p.description || "",
          techStack: p.techStack?.join(", ") || "",
          githubUrl: p.githubUrl || "",
          liveUrl: p.liveUrl || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const updatedData = {
        ...form,
        techStack: form.techStack.split(",").map((t) => t.trim()),
      };

      await updateProject(id, updatedData);

      navigate("/DevHub");

    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

        <h1 className="text-3xl font-bold mb-6 text-purple-400">
          ✏️ Edit Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* TITLE */}
          <div>
            <label className="text-sm text-gray-400">Project Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-black/70 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm text-gray-400">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full mt-1 p-3 rounded-lg bg-black/70 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* TECH STACK */}
          <div>
            <label className="text-sm text-gray-400">Tech Stack</label>
            <input
              name="techStack"
              value={form.techStack}
              onChange={handleChange}
              placeholder="React, Node, MongoDB"
              className="w-full mt-1 p-3 rounded-lg bg-black/70 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* GITHUB */}
          <div>
            <label className="text-sm text-gray-400">GitHub URL</label>
            <input
              name="githubUrl"
              value={form.githubUrl}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-black/70 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* LIVE */}
          <div>
            <label className="text-sm text-gray-400">Live URL</label>
            <input
              name="liveUrl"
              value={form.liveUrl}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-black/70 border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 pt-3">

            <button
              type="button"
              onClick={() => navigate("/DevHub")}
              className="flex-1 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition transform"
            >
              {saving ? "Updating..." : "🚀 Update Project"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}