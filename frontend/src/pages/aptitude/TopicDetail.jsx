import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestionsByTopic } from "../../api/aptitudeApi";
import { topicsData } from "../../data/topicsData";

export default function TopicDetail() {
  const { category, topic } = useParams();
  const navigate = useNavigate();
  const backRoute = `/aptitude/${category || "quantitative"}`;

  const data = topicsData?.[category]?.[topic];
  const [questionCount, setQuestionCount] = useState(data?.questions ?? 0);

  useEffect(() => {
    let isActive = true;

    const loadQuestionCount = async () => {
      try {
        const response = await getQuestionsByTopic(
          topic,
          category ? { category } : {},
        );

        if (!isActive) {
          return;
        }

        setQuestionCount(response.data.count ?? response.data.questions?.length ?? 0);
      } catch {
        if (isActive && data) {
          setQuestionCount(data.questions ?? 0);
        }
      }
    };

    if (topic) {
      loadQuestionCount();
    }

    return () => {
      isActive = false;
    };
  }, [category, data, topic]);

  if (!data) {
    return <div className="p-6">Topic not found</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* ðŸ”™ BACK */}
      <button
        onClick={() => navigate(backRoute)}
        className="mb-4 text-sm text-gray-500"
      >
        ← Back to Topics
      </button>

      {/* ðŸ”¥ TITLE */}
      <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
      <p className="text-gray-600 mb-6">{data.description}</p>

      {/* ðŸ”¥ STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border p-4 rounded-lg">
          <p className="text-xl font-bold">{questionCount}</p>
          <p className="text-sm text-gray-500">Practice Questions</p>
        </div>

        <div className="bg-white border p-4 rounded-lg">
          <p className="text-xl font-bold">{data.tests}</p>
          <p className="text-sm text-gray-500">Mock Tests</p>
        </div>

        <div className="bg-white border p-4 rounded-lg">
          <p className="text-xl font-bold">{data.level}</p>
          <p className="text-sm text-gray-500">Difficulty</p>
        </div>
      </div>

      {/* ðŸ”¥ BUTTON (CONNECTED âœ…) */}
      <button
        onClick={() =>
          navigate(`/aptitude/${category || "quantitative"}/${topic}/practice`)
        }
        className="bg-black text-white px-6 py-3 rounded-lg mb-6"
      >
        ▶ Start Practice Session
      </button>

      {/* ðŸ”¥ CONCEPTS */}
      <div className="bg-white border p-5 rounded-lg">
        <h3 className="font-semibold mb-3">Key Concepts Covered</h3>

        <div className="grid grid-cols-2 gap-3">
          {data.concepts.map((item, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg text-sm">
              {index + 1}. {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
