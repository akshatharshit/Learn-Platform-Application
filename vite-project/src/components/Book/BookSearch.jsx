import React, { useEffect, useState } from "react";
import { useBookStore } from "../../store/useBookStore";
import { Loader2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const GENRES = ["Fiction", "Science", "History", "Biography", "Technology", "Fantasy", "Mystery"];
const MOODS = ["Happy", "Curious", "Adventurous", "Reflective", "Chill"];
const RECENT_SEARCH_KEY = "recentSearches";

export default function BookSearch() {
  const { books, isLoading, error, fetchBooks } = useBookStore();
  const [query, setQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [mood, setMood] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  const buildSearchQuery = () => {
    const genrePart = selectedGenres.map((g) => `subject:${g}`).join("+");
    const moodPart = mood ? `+${mood}` : "";
    return `${query}+${genrePart}${moodPart}`;
  };

  const saveRecentSearch = (query) => {
    const timestamp = Date.now();
    const newEntry = { query, timestamp };
    let stored = JSON.parse(localStorage.getItem(RECENT_SEARCH_KEY)) || [];

    const oneHourAgo = timestamp - 60 * 60 * 1000;
    stored = stored.filter((item) => item.timestamp > oneHourAgo);
    stored = stored.filter((item) => item.query !== query);

    stored.unshift(newEntry);
    const updated = stored.slice(0, 5);
    localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updated));
    setRecentSearches(updated);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      const searchQuery = buildSearchQuery();
      fetchBooks({
        query: searchQuery,
        maxResults: 12,
        startIndex,
      });

      if (startIndex === 0 && query.trim()) {
        saveRecentSearch(searchQuery);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [query, selectedGenres, mood, startIndex]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(RECENT_SEARCH_KEY)) || [];
    const valid = stored.filter((item) => item.timestamp > Date.now() - 60 * 60 * 1000);
    setRecentSearches(valid);
  }, []);

  const toggleGenre = (genre) => {
    setStartIndex(0);
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleMoodSelect = (m) => {
    setStartIndex(0);
    setMood(m === mood ? "" : m);
  };

  const clearFilters = () => {
    setStartIndex(0);
    setSelectedGenres([]);
    setMood("");
  };

  const removeGenre = (g) => {
    setSelectedGenres((prev) => prev.filter((genre) => genre !== g));
  };

  const loadMore = () => {
    setStartIndex((prev) => prev + 12);
  };

  const handleViewDetails = (book) => {
    navigate(`/book/${book.id}`, { state: { book } });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto mt-10">
      {/* 🌐 Improved Search Input */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <div className="relative w-full md:w-3/4">
          <input
            type="text"
            placeholder="🔍 Search for books, authors, or categories..."
            className="input input-bordered input-primary w-full pl-12 focus:outline-none focus:ring-2 focus:ring-primary shadow-md"
            value={query}
            onChange={(e) => {
              setStartIndex(0);
              setQuery(e.target.value);
            }}
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            🔎
          </span>
        </div>
      </div>


      {/* Genre Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={clsx(
              "btn btn-sm",
              selectedGenres.includes(genre) ? "btn-primary" : "btn-outline"
            )}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Mood Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {MOODS.map((m) => (
          <button
            key={m}
            onClick={() => handleMoodSelect(m)}
            className={clsx(
              "btn btn-xs",
              mood === m ? "btn-accent" : "btn-outline btn-accent"
            )}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Active Filters */}
      {(selectedGenres.length > 0 || mood) && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium">🎯 Active Filters:</p>
          {selectedGenres.map((g) => (
            <span
              key={g}
              className="badge badge-primary gap-1 cursor-pointer"
              onClick={() => removeGenre(g)}
            >
              {g} <X className="w-3 h-3" />
            </span>
          ))}
          {mood && (
            <span className="badge badge-accent gap-1 cursor-pointer" onClick={() => setMood("")}>
              {mood} <X className="w-3 h-3" />
            </span>
          )}
          <button onClick={clearFilters} className="btn btn-xs btn-outline ml-2">
            ❌ Clear All
          </button>
        </div>
      )}

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-semibold mb-2">🕘 Recent Searches</p>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(item.query);
                  setStartIndex(0);
                }}
                className="badge badge-outline cursor-pointer"
              >
                {item.query}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Books Grid */}
      {isLoading && (
        <div className="text-center my-6 flex justify-center">
          <Loader2 className="animate-spin w-6 h-6 text-primary" />
        </div>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!isLoading && !books.length && <p className="text-center">No books found.</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => {
          const info = book.volumeInfo;

          return (
            <div
              key={book.id}
              className="bg-base-200 p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center cursor-pointer"
              onClick={() => handleViewDetails(book)}
            >
              <img
                src={info.imageLinks?.thumbnail || "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093"}
                alt={info.title}
                className="h-40 object-contain mb-3"
              />
              <h3 className="text-sm font-bold text-center">{info.title}</h3>
              <p className="text-xs text-center text-gray-500 mb-2">
                {info.authors?.join(", ") || "Unknown Author"}
              </p>
              <button className="btn btn-sm btn-outline btn-primary mt-auto">
                View Details
              </button>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      {books.length > 0 && !isLoading && (
        <div className="text-center mt-8">
          <button onClick={loadMore} className="btn btn-secondary">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
