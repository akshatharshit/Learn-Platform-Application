import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSeriesStore } from "../../store/useSeriesStore";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Plus, Trash2, FilePlus } from "lucide-react";

const CreateSeriesPage = () => {
  const navigate = useNavigate();
  const { createSeries, addQuestion, loading, error } = useSeriesStore();

  const [seriesData, setSeriesData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    solutionVideoUrl: "",
    isYouTube: true,
    timer: "",
  });

  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], answer: "", imageUrl: "" },
  ]);

  const handleSeriesChange = (e) => {
    const { name, value } = e.target;
    setSeriesData({
      ...seriesData,
      [name]: name === "timer" ? Number(value) : value,
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === "options") {
      updated[index].options = value;
    } else {
      updated[index][field] = value;
    }
    setQuestions(updated);
  };

  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", options: ["", "", "", ""], answer: "", imageUrl: "" },
    ]);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdSeries = await createSeries(seriesData);
      if (!createdSeries?._id) return toast.error("❌ Failed to create series.");

      const seriesId = createdSeries._id;
      let allSuccess = true;

      for (const q of questions) {
        const success = await addQuestion(seriesId, q);
        if (!success) allSuccess = false;
      }

      toast.success(allSuccess ? "✅ Series created!" : "⚠️ Partial success");
      navigate("/test-series");
    } catch (err) {
      toast.error("⚠️ Something went wrong.");
    }
  };

  return (
    <motion.div
      className="min-h-screen px-4 pt-24 pb-16 bg-gradient-to-br from-base-100 via-base-200 to-base-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto space-y-10">
        <motion.h1
          className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FilePlus className="inline-block w-8 h-8 mr-2" />
          Create a New Test Series
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Series Info */}
          <div className="glass bg-base-100/70 border border-base-300 rounded-xl p-8 space-y-6 shadow-xl">
            <h2 className="text-xl font-semibold text-primary">📝 Series Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="title"
                placeholder="Series Title"
                value={seriesData.title}
                onChange={handleSeriesChange}
                className="input input-bordered w-full"
                required
              />
              <input
                name="timer"
                type="number"
                placeholder="Timer (in minutes)"
                value={seriesData.timer}
                onChange={handleSeriesChange}
                className="input input-bordered w-full"
              />
              <input
                name="imageUrl"
                placeholder="Thumbnail Image URL"
                value={seriesData.imageUrl}
                onChange={handleSeriesChange}
                className="input input-bordered w-full"
              />
              <input
                name="solutionVideoUrl"
                placeholder="Solution Video URL"
                value={seriesData.solutionVideoUrl}
                onChange={handleSeriesChange}
                className="input input-bordered w-full"
              />
            </div>
            <textarea
              name="description"
              rows={4}
              placeholder="Series Description"
              value={seriesData.description}
              onChange={handleSeriesChange}
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Questions */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-secondary">📚 Questions</h2>
            <button
              type="button"
              onClick={addNewQuestion}
              className="btn btn-outline btn-secondary"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Question
            </button>
          </div>

          <div className="space-y-8">
            {questions.map((q, index) => (
              <motion.div
                key={index}
                className="glass bg-base-200/60 border border-base-300 rounded-lg p-6 space-y-4 transition hover:shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="badge badge-lg badge-primary">Question {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="btn btn-xs btn-error"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Question Text"
                  value={q.text}
                  onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
                  className="input input-bordered w-full"
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, optIdx) => (
                    <input
                      key={optIdx}
                      type="text"
                      placeholder={`Option ${optIdx + 1}`}
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...q.options];
                        newOpts[optIdx] = e.target.value;
                        handleQuestionChange(index, "options", newOpts);
                      }}
                      className="input input-bordered"
                      required
                    />
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={q.answer}
                  onChange={(e) => handleQuestionChange(index, "answer", e.target.value)}
                  className="input input-bordered w-full"
                  required
                />

                <input
                  type="text"
                  placeholder="Image URL (optional)"
                  value={q.imageUrl}
                  onChange={(e) => handleQuestionChange(index, "imageUrl", e.target.value)}
                  className="input input-bordered w-full"
                />
              </motion.div>
            ))}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg px-10 shadow-md"
            >
              {loading ? "Creating..." : "🚀 Create Series"}
            </button>
          </div>

          {error && (
            <div className="text-error font-semibold text-center mt-4">{error}</div>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default CreateSeriesPage;
