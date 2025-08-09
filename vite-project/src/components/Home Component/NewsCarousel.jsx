import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stylesByIndex = [
  { x: -480, scale: 0.85, rotateY: 15, zIndex: 4 },
  { x: -320, scale: 0.9, rotateY: 10, zIndex: 6 },
  { x: -160, scale: 0.95, rotateY: 5, zIndex: 8 },
  { x: 0, scale: 1, rotateY: 0, zIndex: 20 },
  { x: 160, scale: 0.95, rotateY: -5, zIndex: 8 },
  { x: 320, scale: 0.9, rotateY: -10, zIndex: 6 },
  { x: 480, scale: 0.85, rotateY: -15, zIndex: 4 },
];

// Truncate and prettify text
function truncate(text, length = 120) {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "..." : text;
}

export default function NewsCarousel({ articles = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getVisibleCards = () => {
    if (!articles.length) return [];
    const visible = [];
    for (let i = -3; i <= 3; i++) {
      const index = (currentIndex + i + articles.length) % articles.length;
      visible.push({ ...articles[index], key: index });
    }
    return visible;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 3400);
    return () => clearInterval(interval);
  }, [articles]);

  const visibleCards = getVisibleCards();

  return (
    <div className="relative w-full max-w-7xl mx-auto pt-8 pb-20">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 badge badge-accent badge-lg px-5 py-3 rounded-full font-semibold border-0 shadow">
          <span role="img" aria-label="news">📰</span> Trending News Carousel
        </div>
        <h2 className="text-3xl font-black text-primary mt-3 drop-shadow">Latest Headlines From Around The World</h2>
      </div>

      <div className="relative w-full min-h-[470px] flex items-center justify-center overflow-visible md:perspective-[1600px]">
        <AnimatePresence initial={false}>
          {visibleCards.map((article, i) => {
            const style = stylesByIndex[i];
            return (
              <motion.a
                key={article.key}
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className={`
                  absolute w-80 h-[410px] max-w-full
                  bg-base-100/90 dark:bg-base-200/80 border border-base-300
                  rounded-2xl py-5 px-4 flex flex-col justify-between shadow-xl
                  group cursor-pointer hover:scale-[1.04] hover:z-[50] hover:shadow-2xl transition
                  ring-primary/10 focus:ring-[3px] focus:outline-none
                  backdrop-blur`}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  x: style.x,
                  scale: style.scale,
                  rotateY: style.rotateY,
                  zIndex: style.zIndex
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                tabIndex={0}
                aria-label={article.title}
              >
                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3 shadow group-hover:shadow-lg transition">
                  <img
                    src={article.image || `https://picsum.photos/300/200?random=${i}`}
                    alt={article.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:opacity-80 transition-all duration-500 pointer-events-none" />
                  {/* Optional: source badge */}
                  {article.source && (
                    <div className="absolute top-2 right-2 bg-primary px-2 py-1 text-xs rounded-lg text-primary-content font-bold shadow">
                      {article.source}
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-base-content mb-1 line-clamp-2 leading-snug">
                    {truncate(article.title, 80)}
                  </h3>
                  {article.author &&
                    <div className="text-xs text-base-content/50 mb-1">
                      By {article.author}
                    </div>
                  }
                  <div className="text-[15px] text-base-content/80 line-clamp-4">
                    {truncate(article.description, 140) || "No description available."}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
