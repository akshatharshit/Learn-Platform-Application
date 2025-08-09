import { useNavigate } from "react-router-dom";
import { useNewsStore } from "../../store/useNewsStore";
import { Calendar, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function NewsGrid() {
  const { news, isLoading, error, fetchNews, setSelectedNews } = useNewsStore();
  const navigate = useNavigate();

  const handleCardClick = (article) => {
    window.open(article.url, "_blank"); // opens in new tab
  };



  return (
    <div className="px-4 md:px-6">
      {isLoading && <p className="text-center text-lg animate-pulse">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((article, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleCardClick(article)}
            className="bg-base-100 rounded-xl shadow-md hover:shadow-xl cursor-pointer transition duration-200 overflow-hidden"
          >
            {/* Image */}
            <div className="h-52 w-full overflow-hidden">
              <img
                src={article.image || "https://source.unsplash.com/featured/400x200/?news,world"}
                alt={article.title || "News Image"}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold line-clamp-2">
                {article.title || "Untitled News"}
              </h2>

              <p className="text-sm text-base-content/70 line-clamp-3">
                {article.description || "No description available."}
              </p>

              <div className="flex justify-between items-center text-xs text-base-content/60 pt-2">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {article.published
                    ? new Date(article.published).toLocaleDateString()
                    : "Unknown"}
                </span>
                <span className="flex items-center gap-1 text-primary font-medium">
                  <ExternalLink size={14} />
                  Read More
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {news.length > 0 && !isLoading && (
        <div className="text-center mt-10">
          <button
            className="btn btn-primary btn-wide shadow-lg hover:scale-105 transition-transform"
            onClick={() => fetchNews({ loadMore: true })}
          >
            ⬇️ Load More
          </button>
        </div>
      )}
    </div>
  );
}
