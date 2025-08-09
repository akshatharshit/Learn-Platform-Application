import React from "react";
import {
  LayoutDashboard, TestTubes, Calculator, Newspaper, BookMarked, FileCode,
  Palette, NotebookPen, User, Info, Phone
} from "lucide-react";

const aboutSections = [
  {
    icon: LayoutDashboard,
    title: "Courses by Instructors",
    description: "Instructors can upload robust, multimedia-rich courses—both paid and free—for a diverse learning experience."
  },
  {
    icon: TestTubes,
    title: "Test Series",
    description: "Teachers design targeted test series; students benefit from instant results, detailed feedback, and performance tracking."
  },
  {
    icon: Calculator,
    title: "Nutrition Calculator & AI Insights",
    description: "Monitor nutrition, calories, and macros. AI guides your diet with interactive charts and progress bars."
  },
  {
    icon: Newspaper,
    title: "News & Articles",
    description: "Personalize your feed with powerful topic filters and stay updated with the latest news and articles."
  },
  {
    icon: BookMarked,
    title: "Personalized Book Collection",
    description: "Smart recommendations and custom virtual libraries based on your past interests and goals."
  },
  {
    icon: FileCode,
    title: "Code Editor & Collaboration",
    description: "Write, run, and debug code in your browser. Perfect for fast learning and real-time sharing."
  },
  {
    icon: Palette,
    title: "Multi-Theme UI",
    description: "Easily toggle light/dark themes and focus-enhancing color modes for comfortable study."
  },
  {
    icon: NotebookPen,
    title: "Notes Upload & Organization",
    description: "Upload, write, and organize notes. Stay efficient with easy search and smart tags."
  },
  {
    icon: User,
    title: "Profile & Dashboard",
    description: "Track learning progress, view enrolled courses, and access a unified dashboard tailored to you."
  },
  {
    icon: Info,
    title: "Settings & Account Management",
    description: "Full control over privacy, notifications, login/logout, registration, and customization."
  },
  {
    icon: Phone,
    title: "Support & Contact",
    description: "We're always here! Get help, share feedback, or collaborate with our team."
  }
];

const About = () => (
  <section className="relative min-h-screen w-full bg-base-100 px-2 py-16 sm:px-8 md:px-16 overflow-x-hidden">
    <div className="max-w-6xl mx-auto relative z-10">
      <h1 className="text-5xl font-black text-center mb-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight drop-shadow-lg">
        About Our Application
      </h1>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-8">
        {aboutSections.map(({icon: Icon, title, description}, idx) => (
          <div
            key={title}
            className="group relative bg-base-100 dark:bg-base-200 border border-base-300 rounded-2xl shadow-lg hover:shadow-2xl p-7 transition-all hover:-translate-y-2 flex flex-col duration-300"
          >
            <span className="mb-4 w-12 h-12 rounded-full flex items-center justify-center
              bg-primary/10 text-primary text-2xl shadow group-hover:bg-primary group-hover:text-primary-content transition-all duration-300">
              <Icon className="w-7 h-7" />
            </span>
            <h3 className="font-bold text-xl mb-1 text-base-content group-hover:text-primary transition-colors duration-200">{title}</h3>
            <p className="text-base-content/70 text-base">{description}</p>
          </div>
        ))}
      </div>
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow">
          Everything in One Place
        </h2>
        <p className="text-base-content/80 text-lg max-w-2xl mx-auto font-medium">
          Courses, tests, nutrition, news, books, code, notes, and more. All features in one modern, friendly platform.
        </p>
      </div>
    </div>
  </section>
);

export default About;
