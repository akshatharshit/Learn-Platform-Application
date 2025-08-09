import { motion } from "framer-motion";
import NewsSidebar from "./NewsSidebar";
import NewsGrid from "./NewsGrid";
import { useState, useEffect } from "react";

export default function NewsPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-base-100 min-h-screen mt-16 relative">
      {/* 🧭 Sidebar - Hidden on mobile */}
      {!isMobile && (
        <motion.aside
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full md:w-80 px-5 py-7 border-b md:border-b-0 md:border-r border-base-300 sticky top-0 md:h-screen shadow-sm z-20 bg-base-300 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold mb-6 text-primary flex items-center gap-2">
            🗂️ <span>Filters</span>
          </h2>
          <NewsSidebar />
        </motion.aside>
      )}

      {/* 📰 Main Content */}
      <motion.main
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="flex-1 px-5 md:px-10 py-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* 📢 Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold text-primary mb-3">📰 Latest News</h1>
            <p className="text-base md:text-lg text-base-content/70">
              Stay informed with breaking headlines tailored to your preferences.
            </p>
          </div>

          {/* 🧱 News Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <NewsGrid />
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}
