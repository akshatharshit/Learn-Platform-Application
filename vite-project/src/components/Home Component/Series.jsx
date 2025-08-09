import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import seriesAnimation from "../../assets/Studying.json";
import { useSeriesStore } from "../../store/useSeriesStore";
import { useAuthStore } from "../../store/useAuthStore";

const fallbackImg = "https://source.unsplash.com/320x140/?books,study,subject";

function SeriesCarousel({ series }) {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    useEffect(() => {
        if (!series?.length) return;
        const id = setInterval(() => setIndex((i) => (i + 1) % series.length), 3200);
        return () => clearInterval(id);
    }, [series]);

    if (!series.length) return null;

    const arranged = [
        series[index % series.length],
        series[(index + 1) % series.length],
        ...(series.length > 2 ? [series[(index + 2) % series.length]] : []),
    ];

    return (
        <div className="flex gap-8 w-full justify-center items-stretch py-6 px-3">
            {arranged.map((s) => (
                <div
                    key={s._id}
                    className="relative group cursor-pointer bg-base-100/80 dark:bg-base-200/80 border border-primary/20 rounded-2xl shadow-xl px-7 py-5 min-w-[290px] max-w-[360px] flex-1 flex flex-col backdrop-blur-sm 
        hover:shadow-2xl hover:scale-[1.048] hover:-translate-y-3 transition-all duration-300"
                    onClick={() => navigate(`/series/view/${s._id}`)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View series ${s.title}`}
                    onKeyDown={e => (e.key === "Enter" || e.key === " ") && navigate(`/series/view/${s._id}`)}
                >
                    {/* Accent bar */}
                    <div className="absolute left-0 top-6 bottom-6 w-1 rounded-xl bg-gradient-to-b from-primary via-accent to-secondary opacity-60 group-hover:opacity-90 transition-all duration-300" />

                    <div className="flex items-center gap-2 mb-2 ml-3">
                        <span className="badge badge-outline badge-primary font-semibold text-xs px-2 py-1 uppercase tracking-wider shadow-sm bg-primary/10">
                            {s.category || "Series"}
                        </span>
                        <span className="text-xs text-base-content/60">{new Date(s.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="relative overflow-hidden rounded-xl mb-4 mx-1">
                        <img
                            src={s.image || fallbackImg}
                            alt={s.title}
                            className="h-36 w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300 bg-base-200"
                        />
                        {/* Hover Arrow */}
                        <span className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-90 bg-primary text-white shadow-lg rounded-full p-2 transition-all translate-x-1 group-hover:translate-x-0 duration-300 pointer-events-none">
                            <svg width="1.5rem" height="1.5rem" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                    <h3 className="font-extrabold text-lg md:text-xl text-primary mb-1 ml-1 leading-tight">{s.title}</h3>
                    <p className="text-base-content/70 text-[15px] mb-1 ml-1 min-h-[38px]">
                        {s.description
                            ? s.description.split(" ").slice(0, 10).join(" ") +
                            (s.description.split(" ").length > 10 ? "..." : "")
                            : "No description."}
                    </p>
                    <div className="flex gap-3 mt-auto pt-2 ml-1">
                        {s.questions?.length > 0 && (
                            <span className="badge badge-success">
                                {s.questions.length} Question{s.questions.length > 1 && "s"}
                            </span>
                        )}
                        {s.level && <span className="badge badge-accent">{s.level}</span>}
                    </div>
                </div>
            ))}
        </div>
    );

}

export default function Series() {
    const navigate = useNavigate();
    const { seriesList, fetchSeries, loading } = useSeriesStore();
    const { user } = useAuthStore();
    const isTeacher = user?.role === "teacher";
    const seriesCount = seriesList?.length ?? 0;

    useEffect(() => {
        fetchSeries();
    }, [fetchSeries]);

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex flex-col items-center px-0 pt-24 pb-16 overflow-x-hidden z-0">
            {/* Blurred orbs */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-x-hidden">
                <div className="blur-[140px] opacity-25 bg-primary absolute w-[400px] h-[200px] rounded-full left-[-100px] top-[-100px]" />
                <div className="blur-2xl opacity-15 bg-secondary absolute w-96 h-40 top-60 right-[-60px] rounded-full" />
            </div>

            {/* Hero Section */}
            <section className="relative w-full max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row-reverse items-center gap-16 py-12 z-10">
                {/* Right: Lottie */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <div className="bg-base-100/90 dark:bg-base-200/80 backdrop-blur-lg border border-base-300 rounded-3xl shadow-2xl p-7 w-full max-w-sm md:max-w-md">
                        <Lottie animationData={seriesAnimation} loop autoplay className="w-full" />
                    </div>
                </div>
                {/* Left: Info Section */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left justify-center gap-6">
                    <span className="badge badge-secondary font-semibold mb-2 px-4 py-2 uppercase tracking-wide text-xs shadow-sm bg-gradient-to-r from-primary to-secondary text-white">
                        <span role="img" aria-label="series" className="mr-1">📚</span>
                        Practice Series
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black leading-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent drop-shadow">
                        Master Subjects with Practice Series
                    </h1>
                    <p className="text-lg md:text-xl text-base-content/80 mb-2 font-medium max-w-xl">
                        Solve curated series and challenges in science, maths, and computers—track your progress, deepen your knowledge, and have fun learning!
                    </p>
                    <div className="inline-block text-lg font-bold bg-base-200 py-2 px-5 rounded-full border border-base-300 shadow-inner mb-2">
                        📖 <span className="text-success font-black">{seriesCount}</span> Series
                    </div>
                    <button
                        onClick={() =>
                            navigate(isTeacher ? "/series/create" : "/test-series")
                        }
                        className={
                            "btn btn-primary btn-lg px-8 rounded-full font-extrabold shadow-lg transition-transform duration-200 " +
                            (isTeacher
                                ? "hover:scale-105 hover:bg-secondary"
                                : "hover:scale-105 hover:bg-accent")
                        }
                    >
                        <span className="mr-2">{isTeacher ? "➕" : "🧪"}</span>
                        {isTeacher ? "Create Series" : "Test Series"}
                    </button>
                </div>
            </section>

            {/* Divider */}
            <div className="w-full max-w-5xl mx-auto my-10 px-8">
                <div className="h-[2px] bg-gradient-to-r from-primary/20 via-base-300 to-accent/30 rounded-full" />
            </div>

            {/* Series Carousel */}
            <section className="w-full flex flex-col items-center px-2 md:px-0 z-10">
                <div className="max-w-6xl w-full">
                    {loading
                        ? <div className="text-center text-xl py-10 text-base-content/60">Loading series...</div>
                        : <SeriesCarousel series={seriesList.slice(0, 10)} />}
                </div>
            </section>
        </div>
    );
}
