import { create } from "zustand";
import axios from "axios";

// Make sure to define this in your .env file
const API_KEY = import.meta.env.VITE_REACT_APP_NEWS_API_KEY;

export const useNewsStore = create((set, get) => ({
  news: [],
  isLoading: false,
  error: null,
  page: 1,
  selectedNews: null,

  filters: {
    language: "en",               // Supported: ar, de, en, es, fr, etc.
    sortBy: "publishedAt",        // Also "relevancy", "popularity"
    isEducationOnly: false,
    search: "",
    from: "",                     // Format: "YYYY-MM-DD"
    to: "",
  },

  fetchNews: async ({ loadMore = false } = {}) => {
    const { filters, page } = get();

    const query = filters.isEducationOnly
      ? "education"
      : filters.search || "latest";

    const params = {
      q: query,
      language: filters.language,
      sortBy: filters.sortBy,
      from: filters.from || undefined,
      to: filters.to || undefined,
      page: loadMore ? page + 1 : 1,
      pageSize: 20,
      apiKey: API_KEY,
    };

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get("https://newsapi.org/v2/everything", {
        params,
        withCredentials: false, 
      });

      const articles = response.data.articles.map((article) => ({
        id: article.url,
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.urlToImage,
        published: article.publishedAt,
        source: article.source?.name || "Unknown",
      }));

      set((state) => ({
        news: loadMore ? [...state.news, ...articles] : articles,
        isLoading: false,
        page: loadMore ? state.page + 1 : 1,
      }));
    } catch (err) {
      console.error("❌ Error fetching news:", err.response?.data || err.message);
      set({
        error: err.response?.data?.message || "Failed to fetch news",
        isLoading: false,
      });
    }
  },

  setFilters: (updates) =>
    set((state) => ({
      filters: { ...state.filters, ...updates },
      page: 1,
    })),

  toggleEducationOnly: () =>
    set((state) => {
      const newState = !state.filters.isEducationOnly;
      return {
        filters: {
          ...state.filters,
          isEducationOnly: newState,
          search: newState ? "education" : "",
        },
        page: 1,
      };
    }),

  setSelectedNews: (article) => set({ selectedNews: article }),
}));
