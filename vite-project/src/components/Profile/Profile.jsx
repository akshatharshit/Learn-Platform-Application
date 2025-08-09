import React, { useEffect, useMemo } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { useCourseStore } from "../../store/useCourseStore";
import { useSeriesStore } from "../../store/useSeriesStore";
import { useResultStore } from "../../store/useResultStore";
import { motion } from "framer-motion";

export default function Profile() {
  const { user, logout, fetchProfile, isLoadingProfile } = useAuthStore();
  const { courses, fetchCourses } = useCourseStore();
  const { seriesList, fetchSeries } = useSeriesStore();
  const { results, getMyResults } = useResultStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) fetchProfile();
    fetchCourses();
    fetchSeries();
    getMyResults();
    // eslint-disable-next-line
  }, []);

  // --- TEACHER STATS ---
  const myCourses = useMemo(
    () => courses.filter((c) => c.createdBy?._id === user?._id),
    [courses, user]
  );
  const mySeries = useMemo(
    () => seriesList.filter((s) => s.createdBy?._id === user?._id),
    [seriesList, user]
  );

  // --- STUDENT STATS ---
  const myEnrolledCourses = useMemo(
    () =>
      courses.filter((c) =>
        (c.students || []).some((stud) =>
          stud._id ? stud._id === user?._id : stud === user?._id
        )
      ),
    [courses, user]
  );

  // --- LOGOUT ---
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  const isTeacher = user?.role === "teacher";
  const isStudent = user?.role === "student";

  return (
    <div className="max-w-4xl mx-auto pt-12 mt-12 px-4 pb-20 relative">
      {/* Decorative Blur/Glow */}
      <div className="absolute -z-10 pointer-events-none inset-0">
        <div className="absolute w-[520px] h-[180px] top-3 left-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 blur-3xl rounded-full" />
      </div>

      {/* User Card */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-base-100/80 dark:bg-base-200/80 shadow-2xl border border-primary/10 rounded-3xl mb-10"
      >
        <div className="card-body flex flex-col md:flex-row items-center gap-9 p-8">
          {/* Avatar */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="relative rounded-full border-8 border-primary/50 shadow-xl ring ring-accent/10 w-28 h-28 flex items-center justify-center bg-white overflow-hidden">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="uppercase text-4xl font-bold text-primary">
                  {user?.name?.charAt(0) || "U"}
                </span>
              )}
            </div>
            <span className={`mt-3 px-2 py-1 text-xs rounded-lg font-bold ${isTeacher ? "bg-accent/80 text-white" : "bg-primary/80 text-white"}`}>
              {user?.role?.toUpperCase()}
            </span>
          </div>
          {/* Name/Action Section */}
          <div className="flex-1 min-w-[180px] flex flex-col gap-2">
            <h1 className="text-3xl font-black text-primary tracking-tight flex flex-wrap items-center gap-2">
              {user?.name || "User Profile"}
            </h1>
            <p className="text-sm text-base-content/70">{user?.email}</p>
            <div className="flex gap-4 mt-6 flex-wrap">
              <button onClick={handleLogout} className="btn btn-error btn-sm text-white px-6 shadow-md">
                Logout
              </button>
              <Link to="/notes" className="btn btn-warning btn-sm px-6 shadow">
                Notes Page
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dynamic Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-4"
      >
        {isTeacher && (
          <>
            <InfoStat
              color="from-primary to-accent"
              title="Courses Created"
              value={myCourses.length}
              icon="📚"
            />
            <InfoStat
              color="from-secondary to-primary"
              title="Series Created"
              value={mySeries.length}
              icon="📝"
            />
            <InfoStat
              color="from-accent to-primary"
              title="Bio/Role"
              value={"Teacher"}
              icon="👨‍🏫"
              desc={`${myCourses.length} course${myCourses.length !== 1 ? "s" : ""} and ${mySeries.length} series created.`}
            />
            <InfoStat
              color="from-success to-accent"
              title="Email Verified"
              value={user?.isVerified ? "Yes" : "No"}
              icon={user?.isVerified ? "✅" : "❌"}
            />
          </>
        )}
        {isStudent && (
          <>
            <InfoStat
              color="from-secondary to-accent"
              title="Courses Enrolled"
              value={myEnrolledCourses.length}
              icon="📖"
            />
            <InfoStat
              color="from-primary to-secondary"
              title="Test Results"
              value={results.length}
              icon="📈"
            />
            <InfoStat
              color="from-info to-primary"
              title="Bio/Role"
              value={"Student"}
              icon="👦"
              desc={`Enrolled in ${myEnrolledCourses.length} course${myEnrolledCourses.length !== 1 ? "s" : ""}, ${results.length} result${results.length !== 1 ? "s" : ""} submitted.`}
            />
            <InfoStat
              color="from-success to-accent"
              title="Email Verified"
              value={user?.isVerified ? "Yes" : "No"}
              icon={user?.isVerified ? "✅" : "❌"}
            />
          </>
        )}
      </motion.div>

      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.13 }}
        className="mt-10"
      >
        <div className="alert alert-info shadow-md rounded-xl bg-base-100/90">
          <span className="text-base">
            {isTeacher
              ? `Welcome, Instructor! You can manage your created courses and practice series from this dashboard.`
              : `Welcome back! Track your learning, enrollments and all test results.`}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// --- Info Stat Card ---
function InfoStat({ color, title, value, icon, desc }) {
  return (
    <div
      className={`py-6 px-6 rounded-2xl shadow-xl bg-gradient-to-br ${color} text-white flex flex-col justify-between relative overflow-hidden ring-2 ring-primary/10 hover:ring-accent/30 transition-all duration-200`}
      tabIndex={0}
    >
      <div className="text-4xl absolute right-3 top-4 opacity-20 select-none pointer-events-none">
        {icon}
      </div>
      <div className="text-[12px] font-bold uppercase mb-1 tracking-wide opacity-95">{title}</div>
      <div className="text-3xl font-extrabold mb-1 mt-2 drop-shadow-sm">{value}</div>
      {desc && <div className="text-xs opacity-90 mt-1">{desc}</div>}
    </div>
  );
}
