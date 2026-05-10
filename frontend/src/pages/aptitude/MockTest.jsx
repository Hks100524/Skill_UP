import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllQuestions } from "../../api/aptitudeApi";
import Sidebar from "../../components/aptitude/Sidebar";
import Topbar from "../../components/aptitude/Topbar";

export default function MockTest() {
  const navigate = useNavigate();
  const [questionCount, setQuestionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadQuestions = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getAllQuestions({
          category: "mock-test",
          limit: 50,
          random: true,
        });

        if (!isActive) {
          return;
        }

        setQuestionCount(response.data.count ?? response.data.questions?.length ?? 0);
      } catch {
        if (isActive) {
          setError("Unable to load mock test questions.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadQuestions();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      <Sidebar />

      <div className="flex-1 p-6 overflow-y-auto">
        <Topbar subtitle="Mock Test" />

        <div className="bg-white p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-2">Full Mock Test</h2>

          <p className="text-gray-500 mb-2">
            Comprehensive MCQ-based test covering all subjects.
          </p>

          {error ? (
            <p className="mb-6 text-sm text-red-500">{error}</p>
          ) : (
            <p className="mb-6 text-sm text-gray-400">
              {loading ? "Loading question count..." : `Loaded from MongoDB: ${questionCount} questions`}
            </p>
          )}

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="border rounded-lg p-4 text-center">
              <p className="font-semibold">60 min</p>
              <p className="text-sm text-gray-500">Duration</p>
            </div>

            <div className="border rounded-lg p-4 text-center">
              <p className="font-semibold">{loading ? "..." : `${questionCount} MCQs`}</p>
              <p className="text-sm text-gray-500">Questions</p>
            </div>

            <div className="border rounded-lg p-4 text-center">
              <p className="font-semibold">All Subjects</p>
              <p className="text-sm text-gray-500">Topics</p>
            </div>

            <div className="border rounded-lg p-4 text-center">
              <p className="font-semibold">Single Choice</p>
              <p className="text-sm text-gray-500">Format</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/aptitude/mock/full")}
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Start Mock Test
          </button>
        </div>
      </div>
    </div>
  );
}
