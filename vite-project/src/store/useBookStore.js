import { create } from "zustand";
import axios from "axios";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const useBookStore = create((set, get) => ({
  books: [],
  isLoading: false,
  error: null,

  // ✅ Fetch books with support for pagination (append if startIndex > 0)
  fetchBooks: async ({ query = "", filter = "", maxResults = 24, startIndex = 0 }) => {
    set({ isLoading: true, error: null });

    try {
      const formattedQuery = filter ? `${query}+subject:${filter}` : query;

      const res = await axios.get(BASE_URL, {
        params: {
          q: formattedQuery,
          maxResults,
          startIndex,
          key: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY, // your API key from .env
        },
        withCredentials: false,
      });

      const newBooks = res.data.items || [];

      set((state) => ({
        books: startIndex === 0 ? newBooks : [...state.books, ...newBooks],
        isLoading: false,
      }));
    } catch (err) {
      set({
        error:
          err?.response?.data?.error?.message ||
          err?.message ||
          "Failed to fetch books",
        isLoading: false,
      });
    }
  },

  // Clear books (optional)
  clearBooks: () => set({ books: [] }),
}));
