import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllQuestions, saveAttempt } from "../../api/aptitudeApi";

export default function MockTestFull() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(60 * 60);
  const [submitted, setSubmitted] = useState(false);
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

        setQuestions(response.data.questions || []);
        setCurrent(0);
        setAnswers({});
        setSubmitted(false);
      } catch {
        if (isActive) {
          setQuestions([]);
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

  useEffect(() => {
    if (loading || submitted) {
      return;
    }

    if (time <= 0) {
      // Auto-submit when time runs out
      handleSubmitTest();
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, submitted, loading]);

  const formatTime = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleSelect = (option) => {
    setAnswers({ ...answers, [current]: option });
  };

  const score = questions.reduce(
    (acc, question, index) => (answers[index] === question.correctAnswer ? acc + 1 : acc),
    0,
  );

  const handleSubmitTest = async () => {
    try {
      // Save mock test attempt to dashboard tracking
      await saveAttempt({
        category: "Mock Tests",
        score,
        totalQuestions: questions.length,
        correctAnswers: score,
        accuracy: Math.round((score / questions.length) * 100),
        timeTaken: 60 * 60 - time, // Time elapsed
      });
    } catch (error) {
      console.error("Failed to save mock test attempt:", error);
      // Continue anyway - don't block the user from seeing results
    }

    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500">Loading mock test questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Test Result</h2>

        <div className="bg-white border p-6 rounded-xl text-center">
          <p className="text-lg mb-2">Could not load the mock test.</p>
          <p className="text-gray-500 mb-4">{error}</p>

          <button
            onClick={() => navigate("/aptitude/mock")}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Test Result</h2>

        <div className="bg-white border p-6 rounded-xl text-center">
          <p className="text-lg mb-2">No mock test questions available yet.</p>
          <p className="text-gray-500 mb-4">Seed the mock test question bank first to start the test.</p>

          <button
            onClick={() => navigate("/aptitude/mock")}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Test Result</h2>

        <div className="bg-white border p-6 rounded-xl text-center">
          <p className="text-xl font-semibold mb-2">
            Score: {score} / {questions.length}
          </p>

          <p className="text-gray-500 mb-4">
            Attempted: {Object.keys(answers).length}
          </p>

          <button
            onClick={() => navigate("/aptitude/mock")}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <p className="font-medium">⏱ {formatTime()}</p>

        <div className="flex items-center gap-4">
          <p>
            {Object.keys(answers).length}/{questions.length}
          </p>

          <button
            onClick={handleSubmitTest}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6">
        <div className="flex justify-between mb-4">
          <p className="text-sm bg-gray-100 px-3 py-1 rounded">
            Question {current + 1}
          </p>

          <p className="text-sm">
            {current + 1} / {questions.length}
          </p>
        </div>

        <h3 className="font-medium mb-5">{questions[current].question}</h3>

        {questions[current].options.map((opt, index) => (
          <div
            key={index}
            onClick={() => handleSelect(opt)}
            className={`p-3 border rounded-lg mb-3 cursor-pointer ${
              answers[current] === opt
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {opt}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        {questions.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer text-sm ${
              current === index
                ? "bg-black text-white"
                : answers[index]
                  ? "bg-green-200"
                  : "bg-gray-200"
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          disabled={current === 0}
          onClick={() => setCurrent(current - 1)}
          className="px-4 py-2 border rounded-lg"
        >
          Prev
        </button>

        <button
          onClick={() => setCurrent(current + 1)}
          disabled={current === questions.length - 1}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
