import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

import NavBar from "./components/Layout/Navbar";
import Home from "./components/Home";
import RegisterPage from "./components/Auth/RegisterPage";
import LoginPage from "./components/Auth/LoginPage";
import SettingsPage from "./components/UI/SettingsPage";
import PublicRoute from "./components/UI/PublicRoute";
import SeriesList from "./components/Series/SeriesList";
import CreateSeriesPage from "./components/Series/CreateSeriesPage";
import EditSeriesPage from "./components/Series/EditSeriesPage";
import SeriesViewPage from "./components/Series/SeriesViewPage";
import ResultListPage from "./components/Result/ResultListPage";
import AllResultListPage from "./components/Result/AllResultListPage";
import TestTakingPage from "./components/Series/TestTakingPage";
import ResultDetailPage from "./components/Series/ResultDetailPage";
import Profile from "./components/Profile/Profile";
import NotesPage from "./components/Profile/NotesPage";
import CoursesPage from "./components/CoursesPage/CoursesPage";
import InstructorCoursesPage from "./components/CoursesPage/InstructorCoursesPage";
import CoureseForm from "./components/CoursesPage/CourseForm";
import EditCoursePage from "./components/CoursesPage/EditCoursePage";
import CourseDetailPage from "./components/CoursesPage/CourseDetailPage";
import MyCourses from "./components/CoursesPage/MyCourses";
import MultiLangCodeEditor from "./components/Code Editor/MultiLangCodeEditor";
import ChatbotWidget from "./components/Code Editor/ChatbotWidget";
import CalorieCalculator from "./components/Nutrition/CalorieCalculator";
import BookSearch from "./components/Book/BookSearch";
import BookDetail from "./components/Book/BookDetail";
import NewsPage from "./components/News/NewsPage";
import About from "./components/Home Component/About";
import Footer from "./components/Layout/Footer";
import ContactForm from "./components/Home Component/ContactForm";
import NotFound from "./components/Home Component/NotFound";

export default function App() {
  const { fetchProfile, user } = useAuthStore();
  const { theme } = useThemeStore();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const isTestTakingPage = location.pathname.startsWith("/series/start/");
  const isHomePage = location.pathname === "/";

  return (
    <>
      <NavBar />

      {/* ✅ Only apply container for non-home routes */}
      {isHomePage ? (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <div className="p-4 max-w-6xl mx-auto">
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/test-series" element={<SeriesList />} />
            <Route path="/series/create" element={<CreateSeriesPage />} />
            <Route path="/series/edit/:id" element={<EditSeriesPage />} />
            <Route path="/series/view/:id" element={<SeriesViewPage />} />
            <Route path="/results" element={<ResultListPage />} />
            <Route path="/results/all" element={<AllResultListPage />} />
            <Route path="/series/start/:id" element={<TestTakingPage />} />
            <Route path="/results/:id" element={<ResultDetailPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/create" element={<InstructorCoursesPage />} />
            <Route path="/instructor/create-new-course" element={<CoureseForm />} />
            <Route path="/instructor/edit-course/:id" element={<EditCoursePage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/code" element={<MultiLangCodeEditor />} />
            <Route path="/nutrition" element={<CalorieCalculator />} />
            <Route path="/book" element={<BookSearch />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      )}

      <Toaster position="top-right" reverseOrder={false} />

      {user && !isTestTakingPage && <ChatbotWidget />}
      <Footer/>
    </>
  );
}
