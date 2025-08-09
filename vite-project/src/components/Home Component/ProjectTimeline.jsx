// ProjectTimeline.jsx
// QuotesTimeline.jsx

const quotes = [
  {
    text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
    author: "— Malcolm X"
  },
  {
    text: "To eat is a necessity, but to eat intelligently is an art.",
    author: "— La Rochefoucauld"
  },
  {
    text: "Progress is not in enhancing what is, but in advancing toward what will be.",
    author: "— Kahlil Gibran"
  },
  {
    text: "Success is not the key to happiness. Happiness is the key to success.",
    author: "— Albert Schweitzer"
  }
];

const closingQuote = {
  text: "Together we grow, together we learn. Thank you for being part of our journey!"
};

const ProjectTimeline = () => (
  <div className="max-w-6xl mx-auto px-4 py-12 mb-12">
    <div className="bg-gradient-to-r from-blue-100 via-pink-50 to-blue-200 rounded-2xl shadow-lg p-10">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10 drop-shadow">🌟 Words to Inspire</h2>
      <div className="flex flex-col gap-8">
        {quotes.map((quote, idx) => (
          <div key={idx} className="relative rounded-xl bg-white shadow-md px-6 py-5 border-l-4 border-indigo-300">
            <svg className="absolute -left-4 top-3 w-8 h-8 text-indigo-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-4V6a4 4 0 0 1 4-4H9v2h-1a2 2 0 1 0 2 2v2zm8 0h-4V6a4 4 0 0 1 4-4h1v2h-1a2 2 0 1 0 2 2v2z"/>
            </svg>
            <p className="text-lg italic text-gray-800">{quote.text}</p>
            <p className="text-right text-indigo-700 font-semibold mt-2">{quote.author}</p>
          </div>
        ))}
      </div>
      {/* Decorative closing message */}
      <div className="mt-12 flex flex-col items-center">
        <div className="alert alert-info shadow-md text-indigo-700 bg-gradient-to-r from-pink-50 to-blue-50 border-0 italic">
          {closingQuote.text}
        </div>
      </div>
    </div>
  </div>
);

export default ProjectTimeline;
