import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react"; // Optional: icon for duration/hint

export default function CourseRoadmap({ curriculum = [], isStudent = false }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-extrabold text-primary flex items-center gap-2">
        🗺️ Course Roadmap
      </h2>

      <div className="relative border-l-4 border-primary/20 pl-6 ml-2">
        {curriculum.map((lecture, index) => {
          const canAccess = isStudent || lecture.freePreview;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="relative mb-10 group"
            >
              {/* Timeline dot */}
              <span className="absolute -left-[1.25rem] top-2 w-4 h-4 bg-primary rounded-full shadow-md border-2 border-white z-10 transition-transform group-hover:scale-125"></span>

              {/* Line connector dot to dot (optional) */}
              <span className="absolute left-[-1px] top-6 h-full w-0.5 bg-primary/10"></span>

              {/* Lecture block */}
              <div
                className={`p-5 rounded-2xl transition-all duration-200 border-l-[6px] shadow-lg ${
                  canAccess
                    ? "bg-white border-primary/80"
                    : "bg-gray-100 text-gray-400 border-gray-300"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg tracking-tight text-black/90">
                    {index + 1}. {lecture.title}
                  </h3>

                  <div className="flex gap-2 items-center">
                    {!canAccess && (
                      <span className="text-xs badge badge-neutral text-white">
                        🔒 Locked
                      </span>
                    )}
                    {lecture.freePreview && (
                      <span className="text-xs badge badge-success badge-outline">
                        🎁 Free Preview
                      </span>
                    )}
                  </div>
                </div>

                {/* Optional metadata line */}
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Estimated: 8–10 min
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
