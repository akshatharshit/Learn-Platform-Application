import { useEffect } from "react";
import { useResultStore } from "../../store/useResultStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";

const AllResultListPage = () => {
  const { user } = useAuthStore();
  const { results, getAllResults, deleteResultById } = useResultStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "teacher") {
      getAllResults();
    }
  }, [user]);

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // prevent navigate
    const confirmed = window.confirm("Are you sure you want to delete this result?");
    if (!confirmed) return;

    const { success } = await deleteResultById(id);
    if (success) {
      toast.success("Result deleted");
    } else {
      toast.error("Failed to delete result");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-base-100">
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-base-content mb-2">
          📚 All Student Results
        </h1>
        <p className="text-base-content/70">
          Viewing results submitted by all users in your test series
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {results.length === 0 ? (
          <p className="text-base-content/60">No results available.</p>
        ) : (
          results.map((result) => (
            <div
              key={result._id}
              onClick={() => navigate(`/results/${result._id}`)}
              className="relative cursor-pointer bg-base-200 border border-base-300 rounded-xl shadow-md p-5 hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              <h2 className="text-xl font-semibold text-base-content mb-1">
                📘 {result.series?.title || "Untitled Series"}
              </h2>
              <p className="text-sm text-base-content/70 mb-1">
                👤 {result.user?.name} • {result.user?.email}
              </p>
              <p className="text-sm text-base-content/70">
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

              {/* ❌ Delete button if current teacher is the series creator */}
              {console.log(result.series.creator?._id)};
              {user?.id === result.series?.creator._id
                && (
                  <button
                    onClick={(e) => handleDelete(e, result._id)}
                    className="absolute top-3 right-3 text-error bg-error/10 px-2 py-1 rounded text-xs hover:bg-error hover:text-white transition"
                  >
                    Delete
                  </button>
                )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllResultListPage;
