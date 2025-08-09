import React, { useEffect } from "react";
import { useCourseStore } from "../../store/useCourseStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Languages,
  User,
  Layers,
  Tag,
  BadgeIndianRupee,
} from "lucide-react";

export default function MyCourses() {
  const { fetchCourses, courses, isLoading, courseError } = useCourseStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "student") {
      fetchCourses();
    }
  }, [user]);

  if (!user || user.role !== "student") {
    return <div className="text-center mt-10 text-error">Only students can view this page.</div>;
  }

  if (isLoading) return <div className="text-center mt-10">Loading your courses...</div>;
  if (courseError) return <div className="text-center mt-10 text-error">{courseError}</div>;

  const enrolledCourses = courses.filter(course =>
    Array.isArray(course.students) &&
    course.students.some(student => student?.studentId === user._id)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-12">
      <h1 className="text-4xl font-bold mb-8">🎓 My Enrolled Courses</h1>

      {enrolledCourses.length === 0 ? (
        <div className="text-gray-600">You haven't enrolled in any courses yet.</div>
      ) : (
        <div className="space-y-6">
          {enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="card lg:card-side bg-base-100 shadow-xl hover:shadow-2xl transition cursor-pointer"
              onClick={() => navigate(`/courses/${course._id}`)}
            >
              <figure className="w-full lg:w-64 h-48 lg:h-auto">
                <img
                  src={course.image?.url}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </figure>

              <div className="card-body">
                <div className="flex justify-between items-start flex-wrap">
                  <h2 className="card-title text-2xl">{course.title}</h2>

                  <div>
                    {course.pricing === 0 ? (
                      <div className="badge badge-success text-white text-sm px-3 py-1">
                        FREE
                      </div>
                    ) : (
                      <div className="badge badge-primary text-white text-sm px-3 py-1 flex items-center gap-1">
                        <BadgeIndianRupee className="w-4 h-4" />
                        {course.pricing}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-gray-600">{course.subtitle || course.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>By {course.instructorName || "Unknown"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>{course.level || "N/A"} Level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>{course.curriculum?.length || 0} Lectures</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.category || "General"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4" />
                    <span>{course.primaryLanguage || "English"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>
                      Joined on{" "}
                      {new Date(course.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
