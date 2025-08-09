import { create } from "zustand";
import axios from "axios";


// ✅ Safe localStorage parsing
const getStoredUser = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored && stored !== "undefined" ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const useAuthStore = create((set) => ({
  user: getStoredUser(),
  isLoggingIn: false,
  isSigningUp: false,
  isLoadingProfile: false,
  authError: null,

  // ✅ Register
  register: async (userData) => {
    set({ isSigningUp: true, authError: null });
    try {
      const res = await axios.post("/api/auth/register", userData, {
        withCredentials: true,
      });
      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, isSigningUp: false });
      return { success: true };
    } catch (err) {
      set({
        authError: err.response?.data?.message || "Register failed",
        isSigningUp: false,
      });
      return { success: false };
    }
  },

  // ✅ Login
  login: async (credentials) => {
    set({ isLoggingIn: true, authError: null });
    try {
      const res = await axios.post("/api/auth/login", credentials, {
        withCredentials: true,
      });
      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, isLoggingIn: false });
      return { success: true };
    } catch (err) {
      set({
        authError: err.response?.data?.message || "Login failed",
        isLoggingIn: false,
      });
      return { success: false };
    }
  },

  // ✅ Logout
  logout: async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("user");
    set({ user: null });
  },

  // ✅ Fetch profile on app load
  fetchProfile: async () => {
    set({ isLoadingProfile: true });
    try {
      const res = await axios.get("/api/auth/profile", {
        withCredentials: true,
      });
      const user = res.data?.user;
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, isLoadingProfile: false });
    } catch {
      localStorage.removeItem("user");
      set({ user: null, isLoadingProfile: false });
    }
  },
}));
