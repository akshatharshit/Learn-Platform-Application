import { create } from "zustand";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_REACT_APP_BACKEND_URL || "http://localhost:5001";

const api = axios.create({
  baseURL: API_BASE_URL + "/api",
  withCredentials: true,
});

export const useNewsStore = create((set, get) => ({
  news: [],
  isLoading: false,
  error: null,
  page: 1,
  selectedNews: null,

  filters: {
    language: "en",
    sortBy: "publishedAt",
    isEducationOnly: false,
    search: "",
    from: "",
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
    };

    set({ isLoading: true, error: null });

    try {
      const response = await api.get("/news", { params }); // backend call

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
