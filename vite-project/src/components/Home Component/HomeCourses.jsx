import React, { useEffect, useRef } from "react";
import { useCourseStore } from "../../store/useCourseStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import heroAnimation from "../../assets/course.json";
const fallbackCourseImg = "https://source.unsplash.com/340x200/?education,course";

export default function HomeCourses() {
  const navigate = useNavigate();
  const { courses, fetchCourses, isLoading } = useCourseStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const isTeacher = user?.role === "teacher";
  const isStudent = user?.role === "student";
  const mainBtnText = isTeacher
    ? "Instructor"
    : isStudent
    ? "My Courses"
    : "Sign In";
  const mainBtnRoute = isTeacher
    ? "/courses/create"
    : isStudent
    ? "/my-courses"
    : "/login";

  // ---- Infinite Carousel ----
  function InfiniteCarousel({ courses }) {
    const trackRef = useRef(null);

    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;
      let requestId;
      let x = 0;
      const cardWidth = 410;
      const width = cardWidth * courses.length;

      function tick() {
        x -= 0.8;
        if (-x >= width) x = 0;
        track.style.transform = `translateX(${x}px)`;
        requestId = requestAnimationFrame(tick);
      }
      tick();
      return () => cancelAnimationFrame(requestId);
    }, [courses]);

    // Double up for wrap effect
    const cards = [...courses, ...courses];
    return (
      <div className="relative w-full max-w-8xl mx-auto overflow-hidden py-8 rounded-3xl bg-base-100/80 shadow-2xl backdrop-blur-md border border-primary/10">
        <div
          ref={trackRef}
          className="flex gap-10 select-none"
          style={{ willChange: "transform", minHeight: 310 }}
        >
          {cards.map((course, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/courses/${course._id}`)}
              className="cursor-pointer min-w-[370px] max-w-[420px] bg-gradient-to-br from-base-200 to-base-100 border border-base-300 rounded-[1.5rem] shadow-xl p-0 flex flex-col hover:-translate-y-3 transition-transform duration-300 group"
              style={{ flex: "0 0 410px" }}
              tabIndex={0}
              role="button"
              onKeyDown={e => (e.key === "Enter" || e.key === " ") && navigate(`/courses/${course._id}`)}
            >
              {/* Course Cover Image */}
              <div className="w-full h-[180px] overflow-hidden flex items-center justify-center rounded-t-[1.5rem] relative">
                <img
                  src={course.image?.url || fallbackCourseImg}
                  alt={course.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                {course.price === 0 && (
                  <span className="absolute top-2 left-2 badge badge-success z-10 shadow-lg">
                    FREE
                  </span>
                )}
              </div>
              {/* Card content */}
              <div className="flex flex-col gap-2 p-6 h-[170px]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="badge badge-primary">{course.category || "Course"}</span>
                  {course.createdAt && (
                    <div className="text-xs text-base-content/60">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-xl text-primary ">{course.title}</h3>
                <p className="text-base-content/80 text-[15px]">
                  {course.description
                    ? course.description.split(" ").slice(0, 6).join(" ") +
                      (course.description.split(" ").length > 10 ? "..." : "")
                    : "No description"}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto pt-1">
                  {course.level && <span className="badge badge-accent">{course.level}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Gradient fades */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-base-100/95 to-transparent z-10" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-base-100/95 to-transparent z-10" />
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-base-200 to-base-300 overflow-x-hidden flex flex-col">
      {/* BG orb accent */}
      <div className="absolute left-1/2 -top-40 -translate-x-1/2 w-[1000px] h-[320px] bg-gradient-to-tr from-primary/25 via-secondary/10 to-base-300/60 blur-3xl rounded-full opacity-30 z-0 pointer-events-none" />

      {/* HERO ROW: Lottie + Info */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-14 pt-28 pb-14 md:pt-36 md:pb-24">
        {/* Left: Lottie */}
        <div className="flex-1 w-full flex justify-center md:justify-end">
          <div className="w-[400px] md:w-[400px] h-[260px] md:h-[330px] bg-white/80 dark:bg-base-200/80 rounded-3xl shadow-2xl border border-primary/15 p-3 flex items-center justify-center backdrop-blur-2xl">
            <Lottie animationData={heroAnimation} loop autoplay className="w-full h-full object-contain" />
          </div>
        </div>
        {/* Right: Info/Actions */}
        <div className="flex-1 w-full flex flex-col items-center md:items-start text-center md:text-left gap-7 md:gap-8">
          <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight drop-shadow tracking-tight mb-1">
            Boost Your Learning <br className="hidden md:block" />
            with Our Courses!
          </h2>
          <p className="text-base-content/80 text-lg md:text-xl font-medium max-w-xl md:max-w-2xl mb-2">
            Access curated content, real-world skills, interactive practice, and expert-led instruction. New free and advanced courses added regularly.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-1 mb-2">
            <button
              className={
                "btn px-8 py-3 rounded-full font-bold shadow-lg text-lg transition-all " +
                (isTeacher
                  ? "btn-success"
                  : isStudent
                  ? "btn-primary"
                  : "btn-outline btn-ghost")
              }
              onClick={() => navigate(mainBtnRoute)}
            >
              {mainBtnText}
            </button>
            <button
              className="btn btn-secondary px-8 py-3 rounded-full font-bold shadow text-lg hover:scale-105 transition-all"
              onClick={() => navigate("/courses")}
            >
              Courses
            </button>
            <button
              className="btn btn-info px-8 py-3 rounded-full font-bold shadow text-lg hover:scale-105 transition-all"
              onClick={() => navigate("/courses/free")}
            >
              Free Courses
            </button>
          </div>
          <div className="text-base-content/60 text-sm pt-2">
            {isLoading ? "Loading courses..." : `${courses.length} Courses Available`}
          </div>
        </div>
      </div>

      {/* Carousel below the hero */}
      <div className="w-full px-1 md:px-8 pb-8 md:pb-14 mt-2">
        <InfiniteCarousel courses={courses} />
      </div>
    </section>
  );
}
