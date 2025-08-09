import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { motion } from "framer-motion";

export default function BookDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;
  const info = book?.volumeInfo;
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!book) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-error">⚠️ Book not found.</p>
        <button onClick={() => navigate(-1)} className="btn btn-outline mt-4">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12 mt-8">
        <title>{info.title} | Book Detail</title>
        

      <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm mb-4">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back
      </button>

      {/* Book Detail Card */}
      <motion.div
        className="card card-side bg-base-200 shadow-2xl p-6 flex-col md:flex-row gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <figure className="flex justify-center items-start w-full md:w-1/3">
          <img
            loading="lazy"
            src={info.imageLinks?.thumbnail || "/placeholder-book.png"}
            alt={info.title}
            className="w-56 h-auto object-contain rounded-xl shadow"
          />
        </figure>

        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-primary">{info.title}</h2>

          {info.authors && (
            <p className="text-sm">
              <span className="font-semibold">👤 Author(s): </span>
              {info.authors.join(", ")}
            </p>
          )}
          {info.publisher && (
            <p className="text-sm">
              <span className="font-semibold">🏢 Publisher: </span>
              {info.publisher}
            </p>
          )}
          {info.publishedDate && (
            <p className="text-sm">
              <span className="font-semibold">📅 Published: </span>
              {info.publishedDate}
            </p>
          )}

          {info.categories?.length > 0 && (
            <div className="text-sm">
              <span className="font-semibold">📚 Categories: </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {info.categories.map((cat) => (
                  <span key={cat} className="badge badge-outline badge-info">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {info.description && (
            <div className="text-sm mt-2">
              <p className="font-semibold mb-1">📝 Description:</p>
              <div
                className={`text-justify whitespace-pre-line leading-relaxed ${
                  showFullDescription ? "max-h-full" : "max-h-48 overflow-hidden"
                }`}
              >
                {info.description}
              </div>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 link link-primary text-sm"
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </button>
            </div>
          )}

          <div className="card-actions mt-4 flex flex-wrap gap-3">
            {info.previewLink && (
              <a
                href={info.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm btn-accent"
              >
                📖 Preview
              </a>
            )}
            {info.infoLink && (
              <a
                href={info.infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-primary"
              >
                🛒 View on Google Books
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Reviews Section */}
      <motion.div
        className="bg-base-100 shadow-md p-6 rounded-xl"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-4">📢 User Reviews</h3>
        <div className="space-y-3 text-sm">
          <p>
            🌟🌟🌟🌟🌟 — <em>“Absolutely loved it! A must-read.”</em> —{" "}
            <strong>Reader123</strong>
          </p>
          <p>
            🌟🌟🌟🌟 — <em>“Informative and well written.”</em> —{" "}
            <strong>BookLover42</strong>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
