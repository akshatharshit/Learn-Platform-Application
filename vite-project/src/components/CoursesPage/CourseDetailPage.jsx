import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourseStore } from "../../store/useCourseStore";
import { useAuthStore } from "../../store/useAuthStore";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import CourseRoadmap from "./CourseRoadmap";

export default function CourseDetailPage() { 
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedCourse, getCourseById, isLoading, updateCourse } = useCourseStore();
  const { user } = useAuthStore();

  const [isStudent, setIsStudent] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    if (id) getCourseById(id);
  }, [id]);

  useEffect(() => {
    if (selectedCourse && user) {
      const match = selectedCourse.students?.some(
        (s) => String(s.studentId) === String(user._id)
      );
      setIsStudent(match);
    }
  }, [selectedCourse, user]);

  const handleBuy = async () => {
    if (!user || !selectedCourse) return;

    if (selectedCourse.pricing === 0) {
      // Free enrollment (unchanged)
      if (!isStudent) {
        const newStudent = {
          studentId: user._id,
          studentName: user.name,
          studentEmail: user.email,
        };

        const updatedStudents = [...(selectedCourse.students || []), newStudent];

        const result = await updateCourse(selectedCourse._id, {
          students: updatedStudents,
        });

        if (result.success) {
          toast.success("Course added to your library!");
          navigate("/my-courses");
        } else {
          toast.error("Failed to enroll. Try again.");
        }
      } else {
        toast("You're already enrolled!");
      }
    } else {
      // Paid enrollment
      toast.success("Redirecting to PayPal...");

      const res = await fetch("/api/create-paypal-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedCourse.pricing }),
      });

      const { orderId } = await res.json();

      if (!orderId) return toast.error("Failed to create PayPal order");

      // Open PayPal checkout
      const paypalWindow = window.open(`https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`, "_blank");

      const checkPayment = async () => {
        const confirm = window.confirm("Have you completed the payment?");
        if (!confirm) return;

        const verifyRes = await fetch("/api/verify-paypal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            courseId: selectedCourse._id,
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
          }),
        });

        const result = await verifyRes.json();

        if (result.success) {
          toast.success("Payment verified and enrolled!");
          navigate("/my-courses");
        } else {
          toast.error(result.message || "Payment verification failed");
        }
      };

      setTimeout(checkPayment, 5000); 
    }
  };


  if (isLoading || !selectedCourse) {
    return (
      <div className="flex justify-center items-center h-60 text-lg font-medium">
        Loading course...
      </div>
    );
  }

  const {
    title,
    subtitle,
    description,
    pricing,
    category,
    level,
    primaryLanguage,
    image,
    objectives,
    instructorName,
    curriculum,
    students,
    welcomeMessage,
    date,
  } = selectedCourse;

  const isNew = (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24) < 7;
  const isTopRated = students.length > 50;
  const progressPercent = Math.floor(Math.random() * 60 + 30);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-10 mt-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-base-100 rounded-xl shadow-xl p-6 space-y-4"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={image?.url}
            alt={title}
            className="w-full md:w-72 h-48 object-cover rounded-xl shadow-md"
          />
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-bold text-primary">{title}</h1>
            <div className="flex flex-wrap gap-2 items-center">
              {isNew && <span className="badge badge-success">🆕 New</span>}
              {isTopRated && <span className="badge badge-warning">⭐ Top Rated</span>}
            </div>
            <p className="text-md text-gray-500">{subtitle}</p>
            <p className="text-sm text-gray-600">{description}</p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
              <span className="badge badge-outline">🎓 Level: {level}</span>
              <span className="badge badge-outline">🌐 {primaryLanguage}</span>
              <span className="badge badge-outline">📅 {new Date(date).toLocaleDateString()}</span>
              <span className="badge badge-outline">👨‍🏫 {instructorName}</span>
              <span className="badge badge-outline">📂 {category}</span>
            </div>

            {!isStudent && (
              <div className="mt-4 flex items-center gap-4">
                <p className="text-xl font-semibold text-success">
                  ₹{pricing === 0 ? "Free" : pricing}
                </p>
                <button className="btn btn-success" onClick={handleBuy}>
                  Enroll
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Welcome */}
      {welcomeMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-base-200 rounded-xl p-6 text-gray-800 text-lg"
        >
          {welcomeMessage}
        </motion.div>
      )}

      <CourseRoadmap curriculum={curriculum} isStudent={isStudent} />

      {/* Progress */}
      {isStudent && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 1 }}
          className="w-full h-5 bg-gray-300 rounded-full overflow-hidden mb-6"
        >
          <div
            className="h-full bg-green-500 text-white text-xs font-bold flex items-center justify-center"
            style={{ width: `${progressPercent}%` }}
          >
            {progressPercent}% completed
          </div>
        </motion.div>
      )}

      {/* Objectives */}
      {objectives && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-2xl font-bold mb-2">📌 What you'll learn</h2>
          <p className="text-gray-700">{objectives}</p>
        </motion.div>
      )}

      {/* Lectures */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-4">📺 Lectures</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {curriculum.length > 0 ? (
            curriculum.map((lecture, i) => {
              const canAccess = isStudent || lecture.freePreview;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`card bg-base-100 shadow-md p-4 space-y-2 relative ${activeVideoIndex === i ? "border-2 border-primary" : ""
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold">
                      {i + 1}. {lecture.title}
                    </h4>
                    {canAccess && (
                      <span className="badge badge-info text-xs">🎯 Step {i + 1}</span>
                    )}
                  </div>

                  {canAccess ? (
                    <motion.video
                      ref={(el) => (videoRefs.current[i] = el)}
                      key={lecture.videoUrl}
                      src={lecture.videoUrl}
                      controls
                      className="w-full h-[200px] rounded-lg"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      onPlay={() => {
                        setActiveVideoIndex(i);
                        videoRefs.current.forEach((video, idx) => {
                          if (idx !== i && video) video.pause();
                        });
                      }}
                    />
                  ) : (
                    <div className="w-full h-[200px] bg-base-200 flex items-center justify-center text-gray-500 rounded-md">
                      🔒 Locked — Buy course to unlock
                    </div>
                  )}

                  {!isStudent && lecture.freePreview && (
                    <span className="text-xs text-green-600">✅ Free Preview</span>
                  )}
                </motion.div>
              );
            })
          ) : (
            <p className="text-gray-500">No lectures uploaded yet.</p>
          )}
        </div>
      </motion.div>

      {/* Students */}
      {isStudent && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-2">👥 Enrolled Students</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
            {students.map((s, i) => (
              <li key={i}>
                {s.studentName} ({s.studentEmail})
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
