import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import bookAnimation from "../../assets/Book.json";
import CircularGallery from './CircularGallery';

export default function BookPage() {
  const navigate = useNavigate();

  const handleExploreBooks = () => {
    navigate("/book");
  };

  return (
    <div className="relative min-h-screen pt-24 pb-10 w-full bg-gradient-to-br from-base-200 via-base-100 to-secondary/10 flex flex-col items-center overflow-x-hidden z-0">
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-x-hidden">
        <div className="blur-3xl opacity-30 bg-primary absolute w-96 h-96 rounded-full -left-20 -top-24" />
        <div className="blur-[120px] opacity-20 bg-secondary absolute w-80 h-80 top-1/2 -right-24 -translate-y-1/2 rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative w-full flex flex-col md:flex-row items-center max-w-7xl mx-auto px-4 md:px-10 gap-16 py-12 z-10 overflow-x-hidden">
        {/* Lottie Animation */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start mb-10 md:mb-0">
          <div className="bg-base-100/80 dark:bg-base-200/40 backdrop-blur-lg border border-base-300 rounded-3xl shadow-2xl p-5 w-full max-w-xs md:max-w-md animate-fade-in">
            <Lottie animationData={bookAnimation} loop className="w-full" />
          </div>
        </div>
        {/* Hero Text */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start md:pl-8 overflow-x-hidden">
          <span className="badge badge-primary badge-lg font-bold mb-3 drop-shadow shadow-lg">
            <span role="img" aria-label="star">✨</span> Trending Now
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-base-content tracking-tight leading-tight mb-4">
            <span role="img" aria-label="open book">📖</span> Endless Stories Await You
          </h1>
          <p className="text-lg md:text-2xl text-base-content/80 max-w-lg mb-7">
            Discover, filter, and preview thousands of books in every genre—brought together on a platform that reimagines your reading journey.
          </p>
          <button
            onClick={handleExploreBooks}
            className="btn btn-primary btn-lg px-10 font-bold rounded-full shadow-md hover:scale-105 hover:bg-secondary focus:outline-none transition-transform duration-300"
          >
            <span role="img" aria-label="search" className="mr-2">🔍</span>
            Explore Collection
          </button>
        </div>
      </section>

      {/* Section Divider */}
      <div className="w-full max-w-5xl mx-auto my-10 px-6 overflow-x-hidden">
        <div className="h-[2px] bg-gradient-to-r from-primary/20 via-base-300 to-secondary/20 rounded-full" />
      </div>

      {/* Info Section */}
      <section className="w-full px-4 md:px-10 max-w-3xl mx-auto text-center mb-16 z-10 overflow-x-hidden">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">🌐 Discover Books Without Borders</h2>
        <p className="text-base md:text-lg text-base-content/80 leading-relaxed">
          Our platform matches you with books you'll love using curated themes and smart filters. Whether you're a student, professional, or casual reader, enjoy a seamless digital library — anytime, anywhere.
        </p>
      </section>

      {/* Circular Gallery */}
      <section className="w-full mb-12 px-4 md:px-8 relative z-10 overflow-x-hidden">
        <div
          className="bg-gradient-to-tr from-base-100 to-primary/20 border border-base-300 shadow-xl rounded-3xl overflow-hidden flex items-center justify-center hover:scale-[1.01] transition-all duration-300"
          style={{ height: "400px" }}
          onClick={() => navigate("/book")}
        >
          <CircularGallery
            bend={3}
            textColor="#fff"
            borderRadius={0.1}
            scrollEase={0.01}
            scrollSpeed={0.1}
            onClick={() => navigate("/book")}
          />
        </div>
        <div className="text-center text-base-content/70 mt-4 text-sm md:text-base max-w-3xl mx-auto">
          <span role="img" aria-label="sparkles">✨</span> Click any book to discover more. Smart recommendations, stunning new releases, and more!
        </div>
      </section>
    </div>
  );
}
