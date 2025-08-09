import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import newsAnimation from "../../assets/news.json";
import { useNewsStore } from "../../store/useNewsStore";
import NewsCarousel from "./NewsCarousel";

export default function News() {
  const navigate = useNavigate();
  const { news, fetchNews } = useNewsStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!news || news.length === 0) fetchNews();
  }, [fetchNews, news]);

  const articleCount = news?.length || 0;

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex flex-col items-center px-0 pt-24 pb-20 overflow-x-hidden z-0">
      {/* Decorative blurred orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-x-hidden">
        <div className="blur-[120px] opacity-25 bg-primary absolute w-[400px] h-[200px] rounded-full left-[-80px] top-[-80px]" />
        <div className="blur-2xl opacity-15 bg-secondary absolute w-80 h-40 top-60 right-[-60px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center gap-16 py-14 z-10">
        {/* Left: Animation */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <div className="bg-base-100/90 dark:bg-base-200/75 backdrop-blur-lg border border-base-300 rounded-3xl shadow-2xl p-7 w-full max-w-sm md:max-w-md">
            <Lottie animationData={newsAnimation} loop autoplay className="w-full" />
          </div>
        </div>
        {/* Right: Info Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left justify-center space-y-5">
          <span className="badge badge-primary font-semibold mb-2 px-3 py-2 uppercase tracking-wide text-xs">
            <span role="img" aria-label="news">📰</span> Our Headlines
          </span>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-1 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent drop-shadow">
            Explore the World Through Breaking News
          </h1>
          <p className="text-lg md:text-xl text-base-content/80 mb-2 font-medium max-w-xl">
            Bringing you the freshest updates across health, science, technology, and more — powered by trusted global news sources.
          </p>
          <div className="inline-block text-lg font-bold bg-base-200 py-2 px-5 rounded-full border border-base-300 shadow-inner mb-2">
            📑 <span className="text-success font-black">{articleCount}</span> Articles
          </div>
          <button
            onClick={() => navigate("/news")}
            className="btn btn-primary btn-lg px-8 rounded-full font-extrabold shadow-lg hover:scale-105 hover:bg-secondary focus:outline-none transition-transform duration-200"
          >
            <span role="img" aria-label="lightning" className="mr-2">⚡</span>
            Explore Articles
          </button>
        </div>
      </section>

      {/* Section Divider */}
      <div className="w-full max-w-5xl mx-auto my-10 px-8">
        <div className="h-[2px] bg-gradient-to-r from-primary/20 via-base-300 to-secondary/20 rounded-full" />
      </div>

      {/* News Carousel */}
      <section className="w-full flex flex-col items-center px-2 md:px-0 z-10">
        <div className="max-w-6xl w-full">
          <NewsCarousel articles={news.slice(0, 10)} />
        </div>
      </section>
    </div>
  );
}
