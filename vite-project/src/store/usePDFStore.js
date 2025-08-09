import { create } from "zustand";
import axios from "axios";

const API_BASE = "/api/pdf";

export const usePDFStore = create((set) => ({
  pdfs: [],
  isUploading: false,
  isFetching: false,
  isDeleting: false,
  pdfError: null,

  // ✅ Upload a PDF
  uploadPDF: async (file, title = "") => {
    set({ isUploading: true, pdfError: null });
    try {
      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("title", title);

      const res = await axios.post(`${API_BASE}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const uploadedPDF = res.data.data;

      set((state) => ({
        pdfs: [uploadedPDF, ...state.pdfs],
        isUploading: false,
      }));

      return { success: true };
    } catch (err) {
      console.error("Upload error:", err);
      set({
        pdfError: err.response?.data?.message || "Upload failed",
        isUploading: false,
      });
      return { success: false };
    }
  },

  // ✅ Fetch all PDFs
  fetchPDFs: async () => {
    set({ isFetching: true, pdfError: null });
    try {
      const res = await axios.get(`${API_BASE}`, {
        withCredentials: true,
      });

      set({ pdfs: res.data.pdfs, isFetching: false });
      return { success: true };
    } catch (err) {
      console.error("Fetch error:", err);
      set({
        pdfError: err.response?.data?.message || "Failed to fetch PDFs",
        isFetching: false,
      });
      return { success: false };
    }
  },

  // ✅ Delete a PDF
  deletePDF: async (id) => {
    set({ isDeleting: true, pdfError: null });
    try {
      await axios.delete(`${API_BASE}/${id}`, {
        withCredentials: true,
      });

      set((state) => ({
        pdfs: state.pdfs.filter((pdf) => pdf._id !== id),
        isDeleting: false,
      }));

      return { success: true };
    } catch (err) {
      console.error("Delete error:", err);
      set({
        pdfError: err.response?.data?.message || "Delete failed",
        isDeleting: false,
      });
      return { success: false };
    }
  },
}));
