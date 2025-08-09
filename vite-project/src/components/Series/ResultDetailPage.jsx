import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResultDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const { data } = await axios.get(`/api/results/${id}`);
        setResult(data.result);
      } catch (err) {
        console.error(err);
        navigate("/results");
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [id, navigate]);

  if (loading) return <div className="p-10 text-center text-xl">Loading...</div>;
  if (!result) return <div className="p-10 text-center text-red-500">Result not found.</div>;

  const {
    series,
    correctCount,
    wrongCount,
    totalMarks,
    percentage,
    timeTaken,
    attemptedQuestions,
  } = result;

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 bg-gradient-to-br from-base-100 to-base-200">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="border-b pb-4">
          <h1 className="text-3xl font-bold text-primary">{series.title}</h1>
          <p className="text-sm text-gray-600 mt-1">Result ID: {id}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-sm text-gray-500">Correct</div>
            <div className="text-xl font-semibold text-green-600">{correctCount}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-sm text-gray-500">Wrong</div>
            <div className="text-xl font-semibold text-red-600">{wrongCount}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-sm text-gray-500">Score</div>
            <div className="text-xl font-semibold">{totalMarks}</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="text-sm text-gray-500">Time Taken</div>
            <div className="text-xl font-semibold">{timeTaken}s</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <progress className="progress progress-primary w-full" value={percentage} max="100" />
          <p className="text-right text-sm text-gray-500">Percentage: {percentage}%</p>
        </div>

        {/* Questions Review */}
        <div className="space-y-6">
          {attemptedQuestions?.length > 0 ? (
            attemptedQuestions.map((q, i) => {
              const isCorrect = q.isCorrect;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border shadow-lg p-5 transition-all duration-300 ${
                    isCorrect
                      ? "border-green-500 bg-gradient-to-br from-green-50 to-green-100"
                      : "border-red-400 bg-gradient-to-br from-red-50 to-red-100"
                  }`}
                >
                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    {i + 1}. {q.questionText}
                  </p>

                  <div className="text-sm flex items-center space-x-2">
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">Your Answer:</span>
                    <span
                      className={`font-medium ${
                        q.selectedOption === q.correctOption ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {q.selectedOption}
                    </span>
                  </div>

                  {!isCorrect && (
                    <div className="text-sm flex items-center space-x-2 mt-1">
                      <span className="px-2 py-1 bg-gray-100 border text-gray-600 rounded-full text-xs">
                        Correct Answer:
                      </span>
                      <span className="text-green-700 font-semibold">{q.correctOption}</span>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No questions attempted.</p>
          )}
        </div>

        {/* Back button */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/results")}
            className="btn btn-outline btn-primary rounded-full px-6 py-2"
          >
            🔙 Back to Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultDetailPage;
