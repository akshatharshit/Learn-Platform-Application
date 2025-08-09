import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSeriesStore } from "../../store/useSeriesStore";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const EditSeriesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getSeriesById,
    selectedSeries,
    updateSeries,
    updateQuestion,
    deleteQuestion,
    addQuestion,
    loading,
  } = useSeriesStore();
  const { user } = useAuthStore();

  const [seriesData, setSeriesData] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getSeriesById(id);
  }, [id]);

  useEffect(() => {
    if (selectedSeries) {
      setSeriesData({
        title: selectedSeries.title,
        description: selectedSeries.description,
        imageUrl: selectedSeries.image || "",
        solutionVideoUrl: selectedSeries.solutionVideo?.url || "",
        isYouTube: selectedSeries.solutionVideo?.isYouTube ?? true,
        timer: selectedSeries.timer || 0,
      });
      setQuestions(selectedSeries.questions || []);
    }
  }, [selectedSeries]);

  const handleSeriesChange = (e) => {
    const { name, value } = e.target;
    setSeriesData({
      ...seriesData,
      [name]: name === "timer" ? parseInt(value || "0", 10) : value,
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

  const handleSave = async () => {
    if (!user || user._id !== selectedSeries?.creator._id) {
      toast.error("Unauthorized");
      return;
    }

    try {
      const updated = {
        ...seriesData,
        image: seriesData.imageUrl,
        solutionVideoUrl: seriesData.solutionVideoUrl,
        isYouTube: seriesData.isYouTube,
      };
      await updateSeries(id, updated);

      for (const q of questions) {
        if (q._id) {
          await updateQuestion(id, q._id, q);
        } else {
          const added = await addQuestion(id, q);
          if (!added) toast.error("Some question failed to add");
        }
      }

      toast.success("Series updated successfully");
      navigate("/test-series");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update series");
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (confirm("Delete this question?")) {
      await deleteQuestion(id, questionId);
      toast.success("Question deleted");
      await getSeriesById(id);
    }
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { text: "", options: ["", "", "", ""], answer: "", imageUrl: "" },
    ]);
  };

  if (!seriesData) return <div className="text-center mt-20">Loading...</div>;

  return (
    <motion.div
      className="min-h-screen px-4 pt-24 pb-16 bg-base-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-primary">✏️ Edit Series</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={seriesData.title}
            onChange={handleSeriesChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="number"
            name="timer"
            placeholder="Timer (in minutes)"
            value={seriesData.timer}
            onChange={handleSeriesChange}
            className="input input-bordered w-full"
            min={0}
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={seriesData.imageUrl}
            onChange={handleSeriesChange}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="solutionVideoUrl"
            placeholder="Solution Video URL"
            value={seriesData.solutionVideoUrl}
            onChange={handleSeriesChange}
            className="input input-bordered w-full"
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={seriesData.description}
          onChange={handleSeriesChange}
          className="textarea textarea-bordered w-full"
          rows={4}
        />

        <div className="divider">📋 Questions</div>

        {questions.map((q, index) => (
          <motion.div
            key={q._id || index}
            className="card bg-base-200 shadow p-4 space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <input
              type="text"
              placeholder="Question Text"
              value={q.text}
              onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
              className="input input-bordered w-full"
              required
            />
            {q.options.map((opt, optIdx) => (
              <input
                key={optIdx}
                type="text"
                placeholder={`Option ${optIdx + 1}`}
                value={opt}
                onChange={(e) => {
                  const newOptions = [...q.options];
                  newOptions[optIdx] = e.target.value;
                  handleQuestionChange(index, "options", newOptions);
                }}
                className="input input-bordered w-full"
                required
              />
            ))}
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

            {q._id && (
              <div className="flex justify-end">
                <button
                  onClick={() => handleDeleteQuestion(q._id)}
                  className="btn btn-sm btn-error mt-2"
                >
                  🗑️ Delete Question
                </button>
              </div>
            )}
          </motion.div>
        ))}

        <div className="flex justify-start">
          <button
            type="button"
            onClick={handleAddQuestion}
            className="btn btn-secondary"
          >
            ➕ Add Question
          </button>
        </div>

        <div className="flex justify-end">
          <button
            disabled={loading}
            onClick={handleSave}
            className="btn btn-primary mt-6 px-8"
          >
            {loading ? "Saving..." : "💾 Save Changes"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EditSeriesPage;
