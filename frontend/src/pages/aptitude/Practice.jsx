import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionsByTopic, saveAttempt } from "../../api/aptitudeApi";
import { normalizeCategory } from "../../utils/categoryMapping";

export default function Practice() {
  const navigate = useNavigate();
  const { category, topic } = useParams();
  const backRoute = `/aptitude/${category || "quantitative"}`;

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadQuestions = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getQuestionsByTopic(
          topic,
          category ? { category } : {},
        );

        if (!isActive) {
          return;
        }

        setQuestions(response.data.questions || []);
        setCurrent(0);
        setSelected({});
        setSubmitted(false);
      } catch (err) {
        if (!isActive) {
          return;
        }

        setQuestions([]);
        setCurrent(0);
        setSelected({});
        setSubmitted(false);
        setError(
          err?.response?.data?.message ||
            "Unable to load questions for this topic.",
        );
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    if (topic) {
      loadQuestions();
    }

    return () => {
      isActive = false;
    };
  }, [category, topic]);

  const handleSelect = (option) => {
    setSelected({ ...selected, [current]: option });
  };

  const calculateScore = () => {
    let score = 0;

    questions.forEach((q, index) => {
      if (selected[index] === q.correctAnswer) {
        score++;
      }
    });

    return score;
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    const correctAnswers = score;
    const accuracy = Math.round((correctAnswers / questions.length) * 100);

    try {
      // Save attempt to dashboard tracking
      await saveAttempt({
        category: normalizeCategory(category),
        topic: topic || null,
        score,
        totalQuestions: questions.length,
        correctAnswers,
        accuracy,
        timeTaken: 0, // Optional: can track time if needed
      });
    } catch (error) {
      console.error("Failed to save attempt:", error);
      // Continue anyway - don't block the user from seeing results
    }

    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white border p-6 rounded-xl">
          <p className="text-sm text-gray-500">Loading questions...</p>
          <div className="mt-4 h-2 w-full rounded-full bg-gray-100">
            <div className="h-2 w-1/3 rounded-full bg-black animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Practice</h2>

        <div className="bg-white border p-6 rounded-xl text-center">
          <p className="text-lg mb-2">Could not load questions.</p>
          <p className="text-gray-500 mb-4">{error}</p>

          <button
            onClick={() => navigate(backRoute)}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Back to Topics
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Practice</h2>

        <div className="bg-white border p-6 rounded-xl text-center">
          <p className="text-lg mb-2">No questions available yet.</p>
          <p className="text-gray-500 mb-4">
            This topic does not have seeded questions right now.
          </p>

          <button
            onClick={() => navigate(backRoute)}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Back to Topics
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    const score = calculateScore();

    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Result</h2>

        <div className="bg-white border p-6 rounded-xl text-center">
          <p className="text-lg mb-2">
            Score: <span className="font-bold">{score}</span> / {questions.length}
          </p>

          <p className="text-gray-500 mb-4">
            Attempted: {Object.keys(selected).length}
          </p>

          <button
            onClick={() => navigate(backRoute)}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Back to Topics
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between mb-6">
        <button onClick={() => navigate(-1)}>← Back</button>
        <p>
          {Object.keys(selected).length} / {questions.length} answered
        </p>
      </div>

      <p className="mb-2">
        Question {current + 1} of {questions.length}
      </p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 flex items-center justify-center rounded-full border cursor-pointer ${
              current === index ? "bg-black text-white" : "bg-white"
            }`}
            onClick={() => setCurrent(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <div className="bg-white border p-6 rounded-xl">
        <h3 className="font-semibold mb-4">{questions[current].question}</h3>

        {questions[current].options.map((opt, index) => (
          <div
            key={index}
            onClick={() => handleSelect(opt)}
            className={`p-3 border rounded-lg mb-3 cursor-pointer ${
              selected[current] === opt
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {opt}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          disabled={current === 0}
          onClick={() => setCurrent(current - 1)}
          className="px-4 py-2 border rounded-lg"
        >
          Previous
        </button>

        {current === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => setCurrent(current + 1)}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
