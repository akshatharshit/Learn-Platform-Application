import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import {
  LogOut,
  Settings,
  User,
  FileText,
  PlusCircle,
  ChevronUpSquare,
  Book,
  NewspaperIcon,
  AlignHorizontalDistributeCenter,
} from "lucide-react";
import learningIcon from "../../assets/learning.png";
import About from "../Home Component/About";

const Navbar = () => {
  const { user, logout, isLoggingIn, isSigningUp, isLoadingProfile } = useAuthStore();
  const navigate = useNavigate();

  const isTeacher = user?.role === "teacher";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (

    <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-base-100/80 border-b border-base-300 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
          <div className="size-10 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px] shadow-md">
            <div className="bg-base-100 rounded-full flex items-center justify-center h-full w-full">
              <img src={learningIcon} alt="Learn" className="w-5 h-5" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Learn
          </h1>
        </Link>

        {/* Right Side Navigation */}
        <div className="flex items-center gap-2">

          {!isLoadingProfile && user && (
            <Link
              to="/book"
              className="btn btn-sm gap-2 text-white border-none shadow-md transition hover:scale-[1.02] bg-gradient-to-r from-primary to-secondary"
            >
              <Book className="w-4 h-4" />
              <span className="hidden sm:inline">Books</span>
            </Link>
          )}

          {/* {!isLoadingProfile && user && (
            <Link
              to="/code"
              className="btn btn-sm btn-ghost gap-2 hover:bg-base-200 transition duration-200 group"
            >
              <FileText className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline relative text-base-content">
                <span className="group-hover:border-b-[2px] group-hover:border-primary transition-all duration-25">
                  Coder Editor
                </span>
              </span>
            </Link>
          )} */}

          {!isLoadingProfile && user && (
            <Link
              to="/courses"
              className="btn btn-sm gap-2 text-white border-none shadow-md transition hover:scale-[1.02] bg-gradient-to-r from-primary to-secondary"
            >
              <ChevronUpSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Courses</span>
            </Link>
          )}

          {!isLoadingProfile && user ? (
            <>
              <Link
                to="/test-series"
                className="btn btn-sm btn-ghost gap-2 hover:bg-base-200 transition duration-200 group"
              >
                <FileText className="w-4 h-4 text-primary" />
                <span className="hidden sm:inline relative text-base-content">
                  <span className="group-hover:border-b-[2px] group-hover:border-primary transition-all duration-25">
                    Test Series
                  </span>
                </span>
              </Link>


              {/* {isTeacher && (
                <Link
                  to="/series/create"
                  className="btn btn-sm gap-2 text-white border-none shadow-md transition hover:scale-[1.02] bg-gradient-to-r from-primary to-secondary"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Series</span>
                </Link>
              )} */}

              {/* User Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-sm btn-ghost px-3 flex items-center gap-2 group hover:bg-base-200 transition duration-200 rounded-md"
                >
                  <User className="w-4 h-4 text-primary" />
                  <span className="hidden sm:inline relative text-base-content">
                    <span className="group-hover:border-b-[2px] group-hover:border-primary transition-all duration-25">
                      {isTeacher ? "Teacher" : "Student"}
                    </span>
                  </span>
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu bg-base-100 border border-base-300 rounded-box shadow-lg w-52 mt-3 p-2"
                >
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary hover:text-primary-content transition-colors duration-150"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-secondary hover:text-secondary-content transition-colors duration-150"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/nutrition"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary hover:text-primary-content transition-colors duration-150"
                    >
                      <User className="w-4 h-4" />
                      Nutrition
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/news"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-secondary hover:text-secondary-content transition-colors duration-150"
                    >
                      <NewspaperIcon className="w-4 h-4" />
                      News
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary hover:text-primary-content transition-colors duration-150"
                    >
                      <AlignHorizontalDistributeCenter className="w-4 h-4" />
                      About
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/contact"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-secondary hover:text-secondary-content transition-colors duration-150"
                    >
                      <Settings className="w-4 h-4" />
                      Contact
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 text-error hover:bg-error hover:text-error-content rounded-md transition-colors duration-150 w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>



            </>
          ) : isLoadingProfile ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline btn-sm hover:bg-base-200 transition"
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </Link>
              <Link
                to="/register"
                className="btn btn-sm text-white bg-gradient-to-r from-primary to-secondary shadow-md hover:scale-[1.02] transition"
              >
                {isSigningUp ? "Signing up..." : "Register"}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
