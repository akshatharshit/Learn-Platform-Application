import { useEffect } from "react";
import { useResultStore } from "../../store/useResultStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const ResultListPage = () => {
  const { user } = useAuthStore();
  const { results, getMyResults } = useResultStore();
  const navigate = useNavigate();

  useEffect(() => {
    getMyResults();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-base-100">
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-base-content mb-2">
          📊 My Test Results
        </h1>
        <p className="text-base-content/70">
          All tests attempted by <span className="font-semibold">{user?.name}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {results.length === 0 ? (
          <p className="text-base-content/60">No results found.</p>
        ) : (
          results.map((result) => (
            <div
              key={result._id}
              onClick={() =>{
                console.log(result._id); 
                navigate(`/results/${result._id}`)
              }
              }
              className="cursor-pointer bg-base-200 border border-base-300 rounded-xl shadow-md p-5 hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              <h2 className="text-xl font-semibold text-base-content mb-1">
                📘 {result.series?.title || "Untitled Series"}
              </h2>
              <p className="text-sm text-base-content/70 mb-1">
                Submitted {formatDistanceToNow(new Date(result.createdAt))} ago
              </p>
              <p className="text-sm text-base-content">
                ✅ Correct: <span className="font-semibold">{result.correctCount}</span>{" "}
                | ❌ Wrong: <span className="font-semibold">{result.wrongCount}</span>
              </p>
              <p className="text-sm text-primary font-bold mt-1">
                🎯 Score: {result.percentage.toFixed(2)}%
              </p>
              <p className="text-xs text-base-content/50 mt-1">
                ⏱️ Time Taken: {result.timeTaken || "N/A"} mins
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResultListPage;
