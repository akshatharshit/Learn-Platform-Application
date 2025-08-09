import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen, Brain, Calculator, Palette, User, Info, Phone,
  FileCode, NotebookPen, LayoutDashboard, TestTubes, BookMarked, Newspaper
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { title: "Courses", icon: LayoutDashboard, route: "/courses", description: "Explore subjects across all levels from beginner to advanced with up-to-date resources." },
  { title: "AI Assistant", icon: Brain, route: "/ai", description: "Ask questions and get intelligent study help instantly from our smart assistant." },
  { title: "Nutrition", icon: Calculator, route: "/nutrition", description: "Track meals, calories, macros, and stay on top of your goals with tailored insights." },
  { title: "Themes", icon: Palette, route: "/themes", description: "Easy light/dark/more mode switching to improve study focus and comfort." },
  { title: "Profile", icon: User, route: "/profile", description: "Update your settings, privacy, and personal learning stats." },
  { title: "About", icon: Info, route: "/about", description: "Find out who we are, what we value, and our team's mission." },
  { title: "Contact", icon: Phone, route: "/contact", description: "Need help? Get in touch with our friendly team easily." },
  { title: "Tests", icon: TestTubes, route: "/tests", description: "Practice by topics, difficulty, or subject—track progress and improve scores." },
  { title: "Books", icon: BookMarked, route: "/books", description: "Access a curated digital library for all your reference needs." },
  { title: "Code Editor", icon: FileCode, route: "/code-editor", description: "Write, run, and debug coding assignments—all in the browser." },
  { title: "Notes", icon: NotebookPen, route: "/notes", description: "Capture, edit, and organize quick notes on the fly." },
  { title: "News", icon: Newspaper, route: "/news", description: "Stay current with latest articles and breaking educational news." }
];

const FeatureCards = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-4 sm:px-8 bg-gradient-to-b from-base-200/80 via-base-100/80 to-base-200 w-full overflow-hidden">
      {/* Blurred background accents */}
      <div className="absolute -top-40 -left-60 w-[30rem] h-[24rem] bg-primary/30 blur-[120px] opacity-20 rounded-full pointer-events-none" />
      <div className="absolute bottom-[-130px] right-[-100px] w-[29rem] h-[19rem] bg-secondary/30 blur-[110px] opacity-20 rounded-full pointer-events-none" />

      {/* Section heading */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-2 bg-clip-text bg-gradient-to-r from-primary to-secondary text-transparent tracking-tight drop-shadow-lg">
        ✨ Discover Our Features
      </h2>
      <div className="w-full flex justify-center mb-14">
        <div className="h-[3px] w-32 bg-gradient-to-r from-primary via-base-300 to-secondary rounded-full opacity-60"></div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto w-full z-10">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.button
              type="button"
              key={feature.title}
              tabIndex={0}
              aria-label={feature.title}
              onClick={() => navigate(feature.route)}
              className="group flex items-stretch w-full h-full rounded-2xl border border-base-300 bg-base-100/60 dark:bg-base-200/60 glass shadow-xl hover:shadow-2xl focus:ring-4 focus:ring-primary/20 transition-all duration-200 overflow-hidden"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.32, delay: idx * 0.04 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Vertical accent bar + icon */}
              <div className="flex flex-col items-center justify-center px-5 py-7 bg-gradient-to-b from-primary/10 to-transparent border-r border-base-300">
                <span className="bg-primary/20 group-hover:bg-primary group-hover:text-primary-content transition-all duration-200 rounded-xl p-3 shadow-lg">
                  <Icon className="w-8 h-8 text-primary group-hover:text-white" />
                </span>
              </div>

              {/* Title and description */}
              <div className="flex-1 flex flex-col justify-center px-6 py-6 text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-base-content group-hover:text-primary mb-2 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-base-content/70 text-md leading-relaxed">{feature.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};

export default FeatureCards;
