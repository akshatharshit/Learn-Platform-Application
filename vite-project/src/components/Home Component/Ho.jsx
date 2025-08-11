import React, { useState } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { FaBolt, FaChalkboardTeacher, FaBook, FaRegSmile, FaStar, FaClock, FaUserGraduate, FaUserFriends, FaQuestion } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Dummy Data
const testimonials = [
  {
    name: "Ava Reed",
    role: "Student",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    quote: "Learnify is fun and super effective! My grades improved, and so did my confidence!",
  },
  {
    name: "James Kim",
    role: "Instructor",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg",
    quote: "The course tools and student analytics help me teach more personally than ever.",
  },
  {
    name: "Sophia Tran",
    role: "Student",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "With the code editor and quizzes, I learn faster and retain more.",
  },
];
const faqs = [
  { question: "Is Learnify really free to try?", answer: "Yes, all essentials are free, forever. You only pay for expert masterclasses." },
  { question: "Can I use Learnify on my phone?", answer: "Absolutely! Learnify works perfectly on any device, anytime." },
  { question: "Do you support multiple languages?", answer: "Yes, the UI and many course materials are available in several major languages." },
  { question: "Do you support multiple languages?", answer: "Yes, the UI and many course materials are available in several major languages." },
  { question: "Can I use Learnify on my phone?", answer: "Absolutely! Learnify works perfectly on any device, anytime." },
  { question: "Is Learnify really free to try?", answer: "Yes, all essentials are free, forever. You only pay for expert masterclasses." },
];

export default function Ho() {
  return (
    <main className="w-full bg-gradient-to-br from-base-200 via-base-100 to-base-300 min-h-screen font-sans">
      {/* ---- HERO SECTION ---- */}
      <section className="relative w-full pb-16 pt-24 px-2 md:px-0 bg-gradient-to-br from-primary/10 via-base-100/50 to-secondary/15 overflow-x-clip">
        {/* Particle BG */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Particles
            id="hero"
            options={{
              fullScreen: { enable: false },
              particles: {
                color: { value: ["#a21caf", "#06b6d4", "#fbbf24", "#3b82f6"] },
                links: { enable: true, color: "#818cf8", distance: 180, opacity: 0.14 },
                move: { enable: true, speed: 0.8 },
                number: { value: 45 }, opacity: { value: 0.21 }, size: { value: 3 }
              }, background: { color: "transparent" },
              interactivity: { events: { onHover: { enable: true, mode: "repulse" } }, modes: { repulse: { distance: 70 } } }
            }}
          />
        </div>
        {/* Glass Hero Inner */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20 px-4">
          {/* Left: Main Info */}
          <div className="flex-1 flex flex-col gap-8 items-center md:items-start text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.13 }}
              className="text-5xl md:text-6xl font-black bg-gradient-to-br from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-xl"
            >
              Master Modern Learning <br className="hidden md:block" />
              With <span className="inline-block text-primary">Learnify</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.32 }}
              className="text-lg md:text-xl text-base-content/80 max-w-lg tracking-wide"
            >
              Courses, quizzes, analytics, and mentors — your education, upgraded. <br />
              <span className="bg-primary/10 ml-0 mt-1 px-2 py-1 rounded inline-block">
                Over <b className="text-primary">10,000 learners</b> trust us!
              </span>
            </motion.div>
            {/* Call to Action */}
            <div className="flex flex-wrap gap-4 mt-1 mb-1 items-center">
              <button className="btn btn-secondary btn-lg rounded-full font-bold px-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform">
                Explore Courses
              </button>
            </div>
            {/* User Stats Parade */}
            <div className="flex gap-6 mt-4 text-base-content/70">
              <StatBadge icon={<FaUserGraduate />} label="Active Learners" value="10+" />
              <StatBadge icon={<FaBook />} label="Courses" value="24+" />
              <StatBadge icon={<FaUserFriends />} label="Community" value="21+" />
              <StatBadge icon={<FaClock />} label="Avg. Response" value="2 min" />
            </div>
          </div>
          {/* Right: Big Mascot Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="flex-1 flex flex-col items-center"
          >
            <div className="rounded-[2.5rem] border-2 border-primary/15 shadow-2xl bg-base-100/75 h-[345px] md:h-[370px] w-[300px] md:w-[380px] flex flex-col justify-center items-center relative">
              <div className="absolute w-16 h-16 bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/15 blur-2xl rounded-full left-3 top-3 z-0" />
              <FaBook className="text-[4.5rem] text-primary drop-shadow mb-2 z-10" />
              <div className="text-xl mt-1 mb-2 font-extrabold text-secondary text-center">The Knowledge Library</div>
              <div className="px-4 text-base-content/70 text-center text-sm font-semibold z-10">
                Fully AI-powered. <span className="bg-accent/10 px-2 rounded ml-1">Live practice</span> <br />
                <span className="text-secondary font-bold">No credit card</span> required.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- WHY Learnify Ribbon --- */}
      <div className="max-w-6xl mx-auto -mt-8 mb-12 px-2">
        <div className="bg-gradient-to-r from-accent/90 to-primary/80 shadow-xl flex flex-wrap items-center rounded-2xl px-8 py-4 border border-accent/30 animate-pulse-slow">
          <FaStar className="text-2xl text-yellow-400 mr-3" />
          <span className="font-bold text-xl text-white">
            Why Learnify? </span>
          <span className="text-white ml-2">
            Fast growth. Authenticated instructors. Flexible study. Peer-reviewed learning.
          </span>
          <span className="badge badge-success ml-4 font-bold">100% Verified</span>
        </div>
      </div>

      {/* ---- FEATURES ---- */}
      <section className="w-full max-w-6xl mx-auto mt-6 mb-20">
        <div className="flex flex-wrap justify-center gap-8 md:gap-14">
          <FeatureCard
            color="primary"
            icon={<FaBolt size={28} />}
            title="Speed & AI"
            text="Answers, scoring, and coding—instantly powered by smart AI."
          />
          <FeatureCard
            color="secondary"
            icon={<FaBook size={28} />}
            title="Courses Library"
            text="Interactive marketplace for every subject, updated monthly."
          />
          <FeatureCard
            color="accent"
            icon={<FaChalkboardTeacher size={28} />}
            title="Expert-Led"
            text="All teachers are verified. Ask doubts—get real answers."
          />
          <FeatureCard
            color="success"
            icon={<FaRegSmile size={28} />}
            title="Personalized"
            text="Nutrition, planner, and goal setting—uniquely for you."
          />
        </div>
      </section>

      {/* ---- TESTIMONIALS ---- */}
      <section className="w-full py-12 bg-base-100/95">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">Student & Teacher Voices</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3300, disableOnInteraction: false }}
          className="w-full max-w-2xl mx-auto"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white dark:bg-base-200/95 border-2 border-primary/20 shadow-xl p-9 flex flex-col items-center text-center gap-5"
              >
                <div className="ring-4 ring-primary/20 rounded-full mb-2">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover shadow-lg"
                  />
                </div>
                <blockquote className="text-xl font-bold text-base-content/80 mb-2 font-serif">"{t.quote}"</blockquote>
                <span className="text-xs text-accent/90 uppercase tracking-wide">{t.name}, {t.role}</span>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ---- PRICING ---- */}
      {/* <section className="w-full max-w-6xl mx-auto my-16 flex flex-col lg:flex-row gap-10 justify-center items-stretch">
        <PricingCard
          color="primary"
          title="Free Starter"
          price="0"
          features={[
            "Unlimited basic courses",
            "Quizzes & code editor",
            "Track & save progress",
            "Mobile access"
          ]}
        />
        <PricingCard
          color="secondary"
          title="Pro Learner"
          price="9"
          features={[
            "All Free features",
            "Expert masterclasses",
            "Personal planner & nutrition",
            "Priority support"
          ]}
          highlight
        />
        <PricingCard
          color="accent"
          title="Teams & Teachers"
          price="29"
          features={[
            "All Pro features",
            "Course publishing tools",
            "Analytics dashboard",
            "Group & assignment support"
          ]}
        />
      </section> */}

      {/* ---- FAQ ---- */}
      <section className="w-full max-w-3xl mx-auto mb-20 px-2">
        <h2 className="text-2xl md:text-3xl font-bold text-base-content text-center mb-8 flex items-center justify-center gap-2">
          <FaQuestion className="text-accent" /> Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => <FaqItem question={faq.question} answer={faq.answer} key={idx} />)}
        </div>
      </section>

      {/* ---- FOOTER ---- */}
      {/* <footer className="w-full text-center pb-6 pt-8 border-t border-base-300 text-base-content/60 bg-base-100/95 text-xs font-medium">
        <span>
          &copy; {new Date().getFullYear()} <b className="text-primary font-bold">Learnify</b> &mdash; 
          Powered by community, code, and coffee ☕
        </span>
      </footer> */}
    </main>
  );
}

// ---- Single Stat Badge ----
function StatBadge({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-base-100/80 border border-base-300 shadow px-3 py-2 flex flex-col items-center min-w-[84px]">
      <div className="text-primary text-lg mb-1">{icon}</div>
      <span className="font-bold text-accent">{value}</span>
      <span className="text-xs text-base-content/70">{label}</span>
    </div>
  );
}

// ---- FeatureCard Subcomponent ----
function FeatureCard({ color, icon, title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
      className={`flex flex-col items-center bg-base-100/90 border-2 border-${color}/40 rounded-2xl shadow-md px-8 py-8 gap-4 w-80 min-w-[260px] hover:shadow-xl hover:-translate-y-2 transition`}
    >
      <span className={`bg-gradient-to-br from-${color} to-accent w-14 h-14 flex items-center justify-center rounded-full shadow-lg mb-3 text-white text-2xl`}>
        {icon}
      </span>
      <h3 className="text-xl font-extrabold text-primary mb-1 tracking-tight">{title}</h3>
      <p className="text-base text-base-content/70 text-center">{text}</p>
    </motion.div>
  );
}

// ---- PricingCard Subcomponent ----
function PricingCard({ color, title, price, features, highlight }) {
  return (
    <motion.div
      whileHover={{ scale: 1.051 }}
      className={`
        flex-1 flex flex-col items-center rounded-2xl border-[2.6px]
        ${highlight
          ? `border-${color} shadow-2xl bg-gradient-to-br from-${color}/10 to-base-100`
          : `border-base-300 shadow-lg bg-base-100/90`
        }
        p-8 mx-auto min-w-[270px] max-w-sm`}
      style={{ zIndex: highlight ? 2 : 1 }}
    >
      <span className={`badge badge-${color} uppercase font-semibold mb-3 tracking-wide`}>{title}</span>
      <div className="text-4xl font-extrabold text-base-content mb-3 flex items-center gap-1">
        ${price}
        <span className="text-base font-normal text-base-content/50 align-top">/mo</span>
        {highlight && <span className="badge badge-info ml-2 animate-bounce">Best Value</span>}
      </div>
      <ul className="mb-6 flex flex-col gap-2 w-full">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-base-content/80">
            <span className="text-primary">✔</span> {f}
          </li>
        ))}
      </ul>
      <button className={`btn btn-${color} btn-wide font-bold rounded-full shadow-sm`}>Start Now</button>
    </motion.div>
  );
}
// ---- Pure React FAQ Accordion ----
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-base-100/95 rounded-xl border-2 border-accent/20 shadow transition overflow-hidden">
      <button
        className="w-full flex justify-between items-center py-4 px-6 text-lg font-semibold text-secondary focus:outline-none focus:ring-2 focus:ring-primary rounded-t-xl select-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="flex gap-2 items-center font-bold text-accent"><FaQuestion /> {question}</span>
        <span className="ml-4">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="py-4 px-6 text-base-content/80 border-t border-base-200"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
}
