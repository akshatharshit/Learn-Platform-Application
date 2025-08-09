import React, { useEffect, useState } from "react";
import { useCourseStore } from "../../store/useCourseStore";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const InstructorCoursesPage = () => {
  const { courses, fetchCourses, isLoading, courseError, deleteCourse } = useCourseStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (user) fetchCourses();
  }, [user]);

  const myCourses = courses.filter(course => course.instructorId === user?._id);
  const totalRevenue = myCourses.reduce(
    (acc, course) => acc + (course.students?.length || 0) * course.pricing,
    0
  );

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      toast.success("Course deleted successfully");
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 mt-16">
      {/* Sidebar */}
      <aside className="md:w-64 h-[500px] bg-base-100 border border-base-300 shadow-lg rounded-xl p-4 flex md:flex-col justify-around md:justify-start gap-4 md:gap-2 overflow-y-auto">
        <h2 className="hidden md:block text-xl font-semibold text-secondary mb-2">📂 Menu</h2>

        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 w-full justify-center md:justify-start ${
            activeTab === "dashboard"
              ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
              : "hover:bg-base-200  text-secondary"
          }`}
        >
          📊 Dashboard
        </button>

        <button
          onClick={() => setActiveTab("courses")}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 w-full justify-center md:justify-start ${
            activeTab === "courses"
              ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
              : "hover:bg-base-200 text-secondary"
          }`}
        >
          🎓 My Courses
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 w-full">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-primary">📊 Instructor Dashboard</h1>
            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 shadow-md w-full">
                <div className="text-lg font-medium">👤 Instructor</div>
                <p className="text-xl font-semibold mt-2">{user?.name}</p>
                <p className="text-sm">{user?.email}</p>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-green-400 to-green-600 text-white p-6 shadow-md w-full">
                <div className="text-lg font-medium">📚 Total Courses</div>
                <p className="text-3xl font-bold mt-2">{myCourses.length}</p>
              </div>

              <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-6 shadow-md w-full">
                <div className="text-lg font-medium">💰 Total Revenue</div>
                <p className="text-3xl font-bold mt-2">₹{totalRevenue}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h1 className="text-3xl font-bold text-primary">🎓 My Courses</h1>
              <button
                onClick={() => navigate("/instructor/create-new-course")}
                className="btn btn-primary"
              >
                ➕ Create New Course
              </button>
            </div>

            {isLoading ? (
              <div className="text-center text-gray-500">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : courseError ? (
              <div className="alert alert-error shadow-lg">
                <span>{courseError}</span>
              </div>
            ) : myCourses.length === 0 ? (
              <div className="text-center text-gray-500">No courses created yet.</div>
            ) : (
              <div className="space-y-4">
                {myCourses.map((course) => (
                  <div
                    key={course._id}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between bg-base-100 p-4 rounded-xl shadow-md border border-base-300"
                  >
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-secondary">{course.title}</h2>
                      <p className="text-sm text-neutral-content">{course.subtitle}</p>
                      <div className="text-sm text-gray-400 mt-1">
                        {course.category} | {course.level}
                      </div>
                      <div className="mt-2 text-sm text-gray-500 space-y-1">
                        <p>👥 Students: {course.students?.length || 0}</p>
                        <p>💰 Revenue: ₹{(course.students?.length || 0) * course.pricing}</p>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 flex gap-2">
                      <button
                        onClick={() => navigate(`/instructor/edit-course/${course._id}`)}
                        className="btn btn-sm btn-outline btn-info"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="btn btn-sm btn-outline btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorCoursesPage;
