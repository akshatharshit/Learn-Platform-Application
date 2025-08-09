import { create } from "zustand";
import axios from "axios";

export const useResultStore = create((set) => ({
  results: [],
  currentResult: null,
  isSubmitting: false,
  isFetching: false,
  error: null,

  // ✅ Submit a new result
  submitResult: async (data) => {
    set({ isSubmitting: true, error: null });
    try {
      const res = await axios.post("/api/results", data, {
        withCredentials: true,
      });
      set((state) => ({
        results: [res.data, ...state.results],
        isSubmitting: false,
      }));
      return { success: true };
    } catch (err) {
      set({
        error: err.response?.data?.message || "Submit failed",
        isSubmitting: false,
      });
      return { success: false };
    }
  },

  // ✅ Get all results (for teacher/admin)
getAllResults: async () => {
  set({ isFetching: true, error: null });
  try {
    const res = await axios.get("/api/results/all", {
      withCredentials: true,
    });
    set({ results: res.data, isFetching: false });
  } catch (err) {
    set({
      error: err.response?.data?.message || "Fetch failed",
      isFetching: false,
    });
  }
},

  // ✅ Get all results for logged-in user
  getMyResults: async () => {
    set({ isFetching: true, error: null });
    try {
      const res = await axios.get("/api/results/my", {
        withCredentials: true,
      });
      set({ results: res.data, isFetching: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Fetch failed",
        isFetching: false,
      });
    }
  },

  // ✅ Get a specific result by ID
  getResultById: async (id) => {
    set({ isFetching: true, error: null });
    try {
      const res = await axios.get(`/api/results/${id}`, {
        withCredentials: true,
      });
      set({ currentResult: res.data, isFetching: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Fetch failed",
        isFetching: false,
      });
    }
  },

  // ✅ Delete a result by ID
  deleteResultById: async (id) => {
    set({ error: null });
    try {
      await axios.delete(`/api/results/${id}`, {
        withCredentials: true,
      });
      set((state) => ({
        results: state.results.filter((r) => r._id !== id),
      }));
      return { success: true };
    } catch (err) {
      set({
        error: err.response?.data?.message || "Delete failed",
      });
      return { success: false };
    }
  },

  // ✅ Clear current result (e.g., on navigation)
  clearCurrentResult: () => set({ currentResult: null, error: null }),
}));
