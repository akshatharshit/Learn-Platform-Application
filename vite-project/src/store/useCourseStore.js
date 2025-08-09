import { create } from "zustand";
import axios from "axios";

export const useCourseStore = create((set, get) => ({
  courses: [],
  selectedCourse: null,
  isLoading: false,
  courseError: null,

  // ✅ Create a new course
  createCourse: async (courseData) => {
    set({ isLoading: true, courseError: null });
    try {
      const res = await axios.post("/api/courses", courseData, {
        withCredentials: true,
      });
      const newCourse = res.data.course;
      set((state) => ({
        courses: [newCourse, ...state.courses],
        isLoading: false,
      }));
      return { success: true };
    } catch (err) {
      set({
        isLoading: false,
        courseError: err.response?.data?.message || "Course creation failed",
      });
      return { success: false };
    }
  },

  // ✅ Fetch all courses
  fetchCourses: async () => {
    set({ isLoading: true, courseError: null });
    try {
      const res = await axios.get("/api/courses", {
        withCredentials: true,
      });
      set({ courses: res.data.courses || [], isLoading: false });
    } catch (err) {
      set({
        isLoading: false,
        courseError: err.response?.data?.message || "Failed to fetch courses",
      });
    }
  },

  // ✅ Get course by ID
  getCourseById: async (id) => {
    set({ isLoading: true, courseError: null });
    try {
      const res = await axios.get(`/api/courses/${id}`, {
        withCredentials: true,
      });
      set({ selectedCourse: res.data.data, isLoading: false });
    } catch (err) {
      set({
        isLoading: false,
        courseError: err.response?.data?.message || "Course not found",
      });
    }
  },

  updateCourse: async (id, updatedData) => {
    set({ isLoading: true, courseError: null });
    try {
      const res = await axios.put(`/api/courses/${id}`, updatedData, {
        withCredentials: true,
      });

      const updatedCourse = res.data?.course;
      if (!updatedCourse || !updatedCourse._id) {
        throw new Error("Invalid course data returned from server");
      }

      set((state) => ({
        courses: state.courses.map((c) =>
          c._id === id ? updatedCourse : c
        ),
        selectedCourse:
          state.selectedCourse?._id === id ? updatedCourse : state.selectedCourse,
        isLoading: false,
      }));

      return { success: true };
    } catch (err) {
      console.error("❌ Error updating course:", err);
      set({
        isLoading: false,
        courseError: err.response?.data?.message || err.message || "Update failed",
      });
      return { success: false };
    }
  },






  // ✅ Delete course by ID
  deleteCourse: async (id) => {
    set({ isLoading: true, courseError: null });
    try {
      await axios.delete(`/api/courses/${id}`, {
        withCredentials: true,
      });
      set((state) => ({
        courses: state.courses.filter((c) => c._id !== id),
        isLoading: false,
      }));
      return { success: true };
    } catch (err) {
      set({
        isLoading: false,
        courseError: err.response?.data?.message || "Delete failed",
      });
      return { success: false };
    }
  },


}));



