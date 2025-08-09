import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";
import axios from "axios";
import { Loader2, Search } from "lucide-react";
import { motion } from "framer-motion";

const CoursesPage = () => {
  const { user } = useAuthStore();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: "", level: "", language: "", price: "" });
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/courses");
        const sorted = sortCourses(res.data?.courses || [], "newest");
        setCourses(sorted);
        setFilteredCourses(sorted);
      } catch (error) {
        console.error("Error fetching courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFiltersAndSort(courses, newFilters, sortBy, searchTerm);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    applyFiltersAndSort(courses, filters, value, searchTerm);
  };

  const handleSearchChange = (e) => setSearchInput(e.target.value);

  const handleSearchSubmit = () => {
    const value = searchInput.toLowerCase();
    setSearchTerm(value);
    applyFiltersAndSort(courses, filters, sortBy, value);
  };

  const applyFiltersAndSort = (courseList, filtersObj, sortOption, searchValue) => {
    const filtered = courseList.filter((course) => {
      const matchSearch = course.title.toLowerCase().includes(searchValue);
      const matchFilters =
        (!filtersObj.category || course.category === filtersObj.category) &&
        (!filtersObj.level || course.level === filtersObj.level) &&
        (!filtersObj.language || course.primaryLanguage === filtersObj.language) &&
        (!filtersObj.price || (filtersObj.price === "Free" ? course.pricing === 0 : course.pricing > 0));
      return matchSearch && matchFilters;
    });
    const sorted = sortCourses(filtered, sortOption);
    setFilteredCourses(sorted);
  };

  const sortCourses = (list, type) => {
    const sorted = [...list];
    switch (type) {
      case "newest":
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "oldest":
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "title-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold text-primary">Explore Courses</h1>
        <div>
          {user?.role === "teacher" ? (
            <Link to="/courses/create" className="btn btn-primary">+ Instructor</Link>
          ) : (
            <Link to="/my-courses" className="btn btn-accent">🎓 My Courses</Link>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <label className="input input-bordered flex items-center gap-2 w-full">
          <Search className="text-base-content/70" size={20} />
          <input
            type="text"
            placeholder="Search by title..."
            value={searchInput}
            onChange={handleSearchChange}
            className="grow"
          />
        </label>
        <button onClick={handleSearchSubmit} className="btn btn-primary">Search</button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <select name="category" value={filters.category} onChange={handleFilterChange} className="select select-bordered">
          <option value="">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="Design">Design</option>
          <option value="Math">Math</option>
        </select>

        <select name="level" value={filters.level} onChange={handleFilterChange} className="select select-bordered">
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <select name="language" value={filters.language} onChange={handleFilterChange} className="select select-bordered">
          <option value="">All Languages</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Spanish">Spanish</option>
        </select>

        <select name="price" value={filters.price} onChange={handleFilterChange} className="select select-bordered">
          <option value="">All Prices</option>
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>
      </div>

      {/* Sort */}
      <div className="flex justify-end mb-6">
        <select value={sortBy} onChange={handleSortChange} className="select select-bordered">
          <option value="newest">📅 Newest First</option>
          <option value="oldest">🕰️ Oldest First</option>
          <option value="title-asc">A-Z Title</option>
          <option value="title-desc">Z-A Title</option>
        </select>
      </div>

      {/* Courses */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : filteredCourses.length === 0 ? (
        <p className="text-center text-base-content/60">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, i) => {
            const categoryColor = {
              Development: "badge-accent",
              Design: "badge-primary",
              Marketing: "badge-secondary",
              Programming: "badge-info",
              Math: "badge-success",
            }[course.category] || "badge-neutral";

            const levelColor = {
              Beginner: "badge-success",
              Intermediate: "badge-warning",
              Advanced: "badge-error",
            }[course.level] || "badge-neutral";

            return (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="card bg-base-200 border border-base-300 shadow-md hover:shadow-xl rounded-xl transition-all duration-300"
              >
                <Link
                  to={user.role === "student" ? `/courses/${course._id}` : "/courses"}
                  className="rounded-t-xl overflow-hidden"
                >
                  <figure className="h-48 w-full">
                    <img
                      src={course.image?.url}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </figure>
                </Link>

                <div className="card-body p-5 flex flex-col gap-3">
                  <h2 className="card-title text-lg font-bold text-base-content">
                    {course.title}
                  </h2>

                  <p className="text-sm text-base-content/70 line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2 text-xs">
                    <span className={`badge ${categoryColor} px-3`}>📂 {course.category || "N/A"}</span>
                    <span className={`badge ${levelColor} px-3`}>🎯 {course.level || "N/A"}</span>
                    <span className="badge badge-outline text-base-content/60 px-3">🌐 {course.primaryLanguage || "N/A"}</span>
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-3 border-t border-base-300 text-sm text-base-content/60">
                    <span>💰 {course.pricing === 0 ? "Free" : `₹${course.pricing}`}</span>
                    <span>👤 {course.instructorName || "Unknown"}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
