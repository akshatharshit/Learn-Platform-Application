import React, { useCallback } from "react";
import Lottie from "lottie-react";
import { TypeAnimation } from "react-type-animation";
import heroAnimation from "../../assets/hero.json";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function HomePage() {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const handleGetStarted = () => {
        navigate(user ? "/courses" : "/login");
    };

   const particlesInit = async (engine) => {
  try {
    const { loadFull } = await import("tsparticles");
    if (typeof loadFull === "function") {
      await loadFull(engine);
    }
  } catch (error) {
    console.warn("Particle engine init error suppressed:", error);
  }
};


    const theme = document.documentElement.getAttribute("data-theme");
    const isDark = theme === "dark";

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 overflow-hidden flex items-center justify-center px-6 md:px-12 py-16">

            {/* Glowing Blob Behind Left Section */}
            <div className="absolute top-[25%] left-[10%] w-96 h-96 bg-gradient-to-tr from-primary to-secondary opacity-20 blur-3xl rounded-full animate-pulse z-0 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-16">

                {/* Left Section */}
                <div className="relative z-10 text-center md:text-left max-w-xl space-y-6 md:space-y-10">

                    {/* Particles Behind Heading ONLY */}
                    {/* Particles Behind Heading ONLY */}
                    <div className="relative h-[120px] md:h-[140px] mb-4">
                        <Particles
                            id="headingParticles"
                            init={particlesInit}
                            className="absolute inset-0 -top-6 md:-top-10 z-0"
                            options={{
                                fullScreen: { enable: false },
                                background: { color: "transparent" },
                                fpsLimit: 60,
                                interactivity: {
                                    events: { onHover: { enable: true, mode: "repulse" }, resize: true },
                                    modes: { repulse: { distance: 100, duration: 0.4 } }
                                },
                                particles: {
                                    color: { value: isDark ? "#a5b4fc" : "#6366f1" },
                                    links: {
                                        enable: true,
                                        color: isDark ? "#a5b4fc" : "#6366f1",
                                        distance: 100,
                                        opacity: 0.3,
                                    },
                                    move: { enable: true, speed: 1 },
                                    number: { value: 25 },
                                    opacity: { value: 0.3 },
                                    shape: { type: "circle" },
                                    size: { value: 4 }
                                }
                            }}
                        />
                        <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-base-content">
                            Welcome to <span className="text-primary">Learnify</span>
                        </h1>
                    </div>


                    <TypeAnimation
                        sequence={[
                            "📘 Comprehensive Courses",
                            2000,
                            "🧪 Extensive Test Series",
                            2000,
                            "💻 Advanced Code Editor",
                            2000,
                            "📚 Vast Book Library",
                            2000,
                            "🥗 Personalized Nutrition Tracker",
                            2000,
                            "🎮 Interactive Learning",
                            2000,
                            "🌐 Multi-Language Support",
                            2000,
                            "👨‍🏫 Expert-Led Tutorials",
                            2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        className="block text-2xl md:text-3xl font-semibold tracking-wide text-secondary hover:text-primary transition-all duration-300 cursor-pointer"
                    />

                    <p className="text-base md:text-lg text-base-content/70 leading-relaxed tracking-wide mt-2">
                        Join thousands of students learning smarter with{" "}
                        <span className="font-semibold text-primary">Learnify</span>. Track progress, explore top-tier content,
                        and elevate your knowledge — all in one place.
                    </p>

                    <button
                        onClick={handleGetStarted}
                        className="btn btn-primary rounded-full px-10 py-3 text-lg font-medium shadow-xl hover:scale-105 transition-transform duration-300"
                    >
                        🚀 Get Started
                    </button>
                </div>

                {/* Right Side Lottie */}
                <div className="w-full md:w-1/2 h-96 md:h-[28rem] rounded-2xl shadow-2xl bg-white/10 backdrop-blur-lg p-4 flex items-center justify-center">
                    <Lottie
                        animationData={heroAnimation}
                        loop={true}
                        className="w-full h-full object-contain pointer-events-none"
                    />
                </div>
            </div>
        </div>
    );
}
