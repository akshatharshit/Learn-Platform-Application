import { useEffect } from "react";
import { useSeriesStore } from "../../store/useSeriesStore";
import { useAuthStore } from "../../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { PlusCircle } from "lucide-react";

const SeriesList = () => {
  const navigate = useNavigate();
  const { seriesList, fetchSeries, deleteSeries } = useSeriesStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchSeries();
  }, []);

  const handleEdit = (id) => {
    navigate(`/series/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this series?")) {
      await deleteSeries(id);
      toast.success("Series deleted");
    }
  };

  const handleCardClick = (id) => {
    navigate(`/series/view/${id}`);
  };

  const isTeacher = user?.role === "teacher";
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-base-100">

      \

      <div className="flex justify-end gap-4 max-w-7xl mx-auto mb-6">
        {isTeacher && (
          <Link
            to="/series/create"
            className="btn btn-sm gap-2 text-white border-none shadow-md transition hover:scale-[1.02] bg-gradient-to-r from-primary to-secondary"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Series</span>
          </Link>
        )}
        
        {user?.role === "student" && (
          <button
            onClick={() => navigate("/results")}
            className="btn btn-sm md:btn-md bg-primary text-white hover:bg-primary-focus transition rounded-lg shadow-md"
          >
            📊 Show My Results
          </button>
        )}

        {user?.role === "teacher" && (
          <button
            onClick={() => navigate("/results/all")}
            className="btn btn-sm md:btn-md bg-secondary text-white hover:bg-secondary-focus transition rounded-lg shadow-md"
          >
            🧑‍🏫 Show All Results
          </button>
        )}
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {seriesList.map((series) => (
          <div
            key={series._id}
            onClick={() => handleCardClick(series._id)}
            className="cursor-pointer rounded-2xl border border-base-300 bg-base-200/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] group overflow-hidden"
          >
            {/* Image */}
            <div className="relative overflow-hidden h-48">
              <img
                src={series.image || "/placeholder.jpg"}
                alt="Series"
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <h2 className="text-xl font-bold line-clamp-1 text-base-content">
                {series.title}
              </h2>
              <h2 className="text-sm line-clamp-1 text-base-content">
                No. of Questions: {series.questions?.length ?? 0}
              </h2>
              <p className="text-sm text-base-content/70 leading-snug line-clamp-3">
                {series.description || "No description provided."}
              </p>
              <h5 className="text-sm font-bold line-clamp-1 text-primary">
                Timer → {series.timer} mins
              </h5>

              <div className="flex justify-between items-center pt-2">
                <p className="text-xs text-base-content/50">
                  By <span className="font-semibold">{series.creator?.name}</span>
                </p>

                {/* Prevent card click on button actions */}
                {user?._id === series.creator._id && (
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleEdit(series._id)}
                      className="btn btn-sm bg-primary/10 text-primary hover:bg-primary hover:text-white transition rounded-lg"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(series._id)}
                      className="btn btn-sm bg-error/10 text-error hover:bg-error hover:text-white transition rounded-lg"
                    >
                      🗑️ Del
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriesList;
