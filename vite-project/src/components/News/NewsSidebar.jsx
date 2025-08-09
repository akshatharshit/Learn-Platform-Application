import { useEffect, useState } from "react";
import { useNewsStore } from "../../store/useNewsStore";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "hi", name: "Hindi" },
];

export default function NewsSidebar() {
  const { filters, setFilters, toggleEducationOnly, fetchNews } = useNewsStore();
  const [searchTerm, setSearchTerm] = useState(filters.search || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters({ search: searchTerm });
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm, setFilters]);

  useEffect(() => {
    fetchNews();
  }, [filters]);

  return (
    <div className="space-y-6 h-full overflow-y-auto p-1">
      {/* 🔍 Search */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-sm font-medium text-base-content/80">
            🔍 Search Headlines
          </span>
        </label>
        <input
          type="text"
          placeholder="Type keywords..."
          className="input input-sm input-bordered w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🌐 Language Selection */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-sm font-medium text-base-content/80">
            🌐 Language
          </span>
        </label>
        <select
          className="select select-sm select-bordered w-full"
          value={filters.language}
          onChange={(e) => setFilters({ language: e.target.value })}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* 🎓 Education Only Toggle */}
      <div className="form-control">
        <label className="label cursor-pointer justify-between">
          <span className="label-text text-sm font-medium text-base-content/80">
            🎓 Education Only
          </span>
          <input
            type="checkbox"
            className="toggle toggle-sm toggle-primary"
            checked={filters.isEducationOnly}
            onChange={toggleEducationOnly}
          />
        </label>
      </div>

      {/* 🔁 Actions */}
      <div className="space-y-2 pt-2">
        <button
          className="btn btn-primary btn-sm btn-block shadow hover:shadow-md transition-all"
          onClick={() => fetchNews()}
        >
          🔄 Refresh News
        </button>
        <button
          className="btn btn-outline btn-error btn-sm btn-block shadow hover:shadow-md transition-all"
          onClick={() =>
            setFilters({ search: "", language: "en", isEducationOnly: false })
          }
        >
          ❌ Reset Filters
        </button>
      </div>
    </div>
  );
}
