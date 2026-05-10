import { useState } from "react";
import { createProject } from "../../api/projectApi";

export default function NewProjectModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    githubUrl: "",
    liveUrl: "",
  });

  const handleSubmit = async () => {
    try {
      await createProject({
        ...form,
        techStack: form.techStack.split(","),
      });

      alert("Project Created 🚀");
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-[400px] space-y-3">

        <input
          placeholder="Title"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Description"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Tech (React,Node)"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
        />

        <input
          placeholder="GitHub URL"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
        />

        <input
          placeholder="Live URL"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded"
        >
          Create Project
        </button>

        <button
          onClick={onClose}
          className="w-full border py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
