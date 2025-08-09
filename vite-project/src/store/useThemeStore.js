import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "coffee", // default fallback
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chat-theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
    set({ theme });
  },
}));

// Restore saved theme on load
if (typeof window !== "undefined") {
  const savedTheme = localStorage.getItem("chat-theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    useThemeStore.setState({ theme: savedTheme });
  }
}
