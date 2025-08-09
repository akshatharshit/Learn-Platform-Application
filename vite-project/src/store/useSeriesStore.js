import { create } from "zustand";
import axios from "axios";

export const useSeriesStore = create((set, get) => ({
  seriesList: [],
  selectedSeries: null,
  loading: false,
  error: null,

  // 🔄 Fetch all series
  fetchSeries: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("/api/series");
      set({ seriesList: res.data, error: null });
    } catch (err) {
      set({ error: err.response?.data?.error || "Failed to fetch series" });
    } finally {
      set({ loading: false });
    }
  },

  // 📄 Get series by ID
  getSeriesById: async (id) => {
    try {
      set({ loading: true });
      const res = await axios.get(`/api/series/${id}`);
      set({ selectedSeries: res.data, error: null });
    } catch (err) {
      set({ error: err.response?.data?.error || "Series not found" });
    } finally {
      set({ loading: false });
    }
  },

  // ✅ ➕ Create a new series (returns the created series)
  createSeries: async (data) => {
    try {
      set({ loading: true });
      const res = await axios.post("/api/series", data);
      set((state) => ({
        seriesList: [res.data, ...state.seriesList],
        error: null,
      }));
      return res.data; // ✅ crucial fix
    } catch (err) {
      set({ error: err.response?.data?.error || "Failed to create series" });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  // 📝 Edit series
  updateSeries: async (id, updatedData) => {
    try {
      set({ loading: true });
      const res = await axios.put(`/api/series/${id}`, updatedData);
      set((state) => ({
        seriesList: state.seriesList.map((s) =>
          s._id === id ? res.data.series : s
        ),
        selectedSeries: res.data.series,
        error: null,
      }));
    } catch (err) {
      set({ error: err.response?.data?.error || "Failed to update series" });
    } finally {
      set({ loading: false });
    }
  },

  // ❌ Delete series
  deleteSeries: async (id) => {
    try {
      set({ loading: true });
      await axios.delete(`/api/series/${id}`);
      set((state) => ({
        seriesList: state.seriesList.filter((s) => s._id !== id),
        selectedSeries: null,
        error: null,
      }));
    } catch (err) {
      set({ error: err.response?.data?.error || "Failed to delete series" });
    } finally {
      set({ loading: false });
    }
  },

  // ➕ Add question to series
  addQuestion: async (seriesId, questionData) => {
    try {
      set({ loading: true });
      const res = await axios.post(
        `/api/series/${seriesId}/questions`,
        questionData
      );
      set((state) => ({
        selectedSeries:
          state.selectedSeries && state.selectedSeries._id === seriesId
            ? res.data
            : state.selectedSeries,
        error: null,
      }));
    } catch (err) {
      set({ error: err.response?.data?.error || "Failed to add question" });
    } finally {
      set({ loading: false });
    }
  },

  // ✏️ Edit a question in a series
  updateQuestion: async (seriesId, questionId, updatedData) => {
    try {
      set({ loading: true });
      const res = await axios.put(
        `/api/series/${seriesId}/questions/${questionId}`,
        updatedData
      );
      set((state) => ({
        selectedSeries:
          state.selectedSeries && state.selectedSeries._id === seriesId
            ? {
                ...state.selectedSeries,
                questions: state.selectedSeries.questions.map((q) =>
                  q._id === questionId ? res.data.question : q
                ),
              }
            : state.selectedSeries,
        error: null,
      }));
    } catch (err) {
      set({ error: err.response?.data?.error || "Failed to update question" });
    } finally {
      set({ loading: false });
    }
  },

  // 🗑️ Delete question from a series
  deleteQuestion: async (seriesId, questionId) => {
    try {
      set({ loading: true });
      const res = await axios.delete(
        `/api/series/${seriesId}/questions/${questionId}`
      );
      set((state) => ({
        selectedSeries: res.data.series,
        error: null,
      }));
    } catch (err) {
      set({ error: err.response?.data?.error || "Failed to delete question" });
    } finally {
      set({ loading: false });
    }
  },

  // ⬆️ Upload series thumbnail image (Cloudinary)
  uploadSeriesImage: async (file) => {
    try {
      set({ loading: true });
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post("/api/series/upload/image", formData);
      return res.data.url;
    } catch (err) {
      set({ error: err.response?.data?.error || "Failed to upload image" });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  // ⬆️ Upload solution video (Cloudinary)
  uploadSolutionVideo: async (seriesId, file) => {
    try {
      set({ loading: true });
      const formData = new FormData();
      formData.append("video", file);
      const res = await axios.post(
        `/api/series/upload/video/${seriesId}`,
        formData
      );
      return res.data.url;
    } catch (err) {
      set({ error: err.response?.data?.error || "Failed to upload video" });
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));
