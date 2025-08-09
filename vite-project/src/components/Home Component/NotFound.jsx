import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import notFoundAnimation from "../../assets/PageNotFound404.json"; // Replace with your own Lottie animation

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-base-300 px-4 py-12 relative">
      {/* Decorative Blur/Orb */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-1/3 h-1/4 bg-primary/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/4 bg-accent/10 blur-2xl rounded-full" />
      </div>
      
      <div className="max-w-lg w-full bg-base-100/90 dark:bg-base-200/80 rounded-3xl shadow-2xl py-9 px-6 md:px-10 flex flex-col items-center border border-base-200 backdrop-blur-xl">
        <div className="w-64 h-64 mb-4 mx-auto">
          <Lottie animationData={notFoundAnimation} loop autoplay className="w-full h-full" />
        </div>
        <h1 className="text-5xl font-black text-primary drop-shadow mb-2 tracking-tighter text-center">404</h1>
        <h2 className="text-2xl font-bold mb-2 text-base-content text-center">Page Not Found</h2>
        <p className="text-base md:text-lg text-base-content/80 mb-6 text-center">
          Sorry, the page you’re looking for doesn’t exist or has been moved.<br />
          Let’s get you back on track!
        </p>
        <button
          className="btn btn-primary px-8 py-3 rounded-full text-lg font-bold shadow hover:scale-105 transition-transform"
          onClick={() => navigate("/")}
        >
          ⬅️ Go Home
        </button>
      </div>
    </section>
  );
}
