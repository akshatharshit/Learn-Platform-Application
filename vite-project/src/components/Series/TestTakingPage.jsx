import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSeriesStore } from "../../store/useSeriesStore";
import { useResultStore } from "../../store/useResultStore";
import { toast } from "react-hot-toast";

const TestTakingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { seriesList, fetchSeries } = useSeriesStore();
  const { submitResult } = useResultStore();

  const [series, setSeries] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const timerRef = useRef(null);
  const submittedRef = useRef(false);

  useEffect(() => {
    fetchSeries();
  }, []);

  useEffect(() => {
    const found = seriesList.find((s) => s._id === id);
    if (found) {
      setSeries(found);
      setTimeLeft(found?.timer ? found.timer * 60 : 0);
    }
  }, [seriesList, id]);

  useEffect(() => {
    if (!timeLeft || submittedRef.current) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit("⏱ Time expired");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft]);

  useEffect(() => {
    const handleBlur = () => {
      if (!submittedRef.current) {
        handleAutoSubmit("⚠️ Tab/Window change detected");
      }
    };
    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, []);

  const handleChange = (qId, value) => {
    if (reviewMode) return;
    setAnswers((prev) => ({
      ...prev,
      [qId]: value,
    }));
  };

  const handleSubmitInternal = async (reason = "manual") => {
    if (submittedRef.current || !series) return;
    submittedRef.current = true;
    setSubmitting(true);
    clearInterval(timerRef.current);

    const timeTaken = series.timer * 60 - timeLeft;

    try {
      const score = series.questions.reduce((acc, q) =>
        answers[q._id] === q.answer ? acc + 1 : acc, 0);

      await submitResult({
        seriesId: series._id,
        answers,
        score,
        timeTaken,
        autoSubmitted: reason !== "manual",
        submittedAt: new Date(),
      });

      toast.success(`Test submitted (${reason})`);
      setReviewMode(true);
    } catch (err) {
      toast.error("Submission failed. Please try again.");
      submittedRef.current = false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleAutoSubmit = (reason) => {
    toast.error(reason);
    handleSubmitInternal(reason);
  };

  const handleSubmit = () => {
    handleSubmitInternal("manual");
    navigate('/results');
  };

  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  if (!series) return <div className="p-10 text-center text-xl">Loading...</div>;

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / series.questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 pt-24 px-4 pb-12">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b pb-4">
          <h1 className="text-3xl font-bold text-primary">
            📝 {series.title}
          </h1>
          <div className="text-lg font-semibold text-accent">
            ⏱ Time Left: {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <progress className="progress progress-primary w-full h-3" value={progress} max="100" />
          <div className="text-sm text-right text-gray-500 font-medium">
            Progress: {answeredCount}/{series.questions.length} answered ({progress}%)
          </div>
        </div>

        {/* Questions */}
        {series.questions.map((q, i) => (
          <div
            key={q._id}
            className="card border border-base-300 bg-base-100 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="card-body space-y-5">
              <div className="text-lg font-semibold text-gray-300">
                {i + 1}. {q.text}
              </div>

              {q.image && (
                <div className="w-full overflow-hidden rounded-md border">
                  <img
                    src={q.image}
                    alt={`Question ${i + 1}`}
                    className="w-full max-h-64 object-contain"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((opt, idx) => {
                  const isSelected = answers[q._id] === opt;
                  let optionClass = "bg-base-200 border-base-300 hover:bg-primary/10";

                  if (isSelected) {
                    optionClass =
                      "bg-primary/10 border-primary text-primary font-semibold";
                  }

                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${optionClass}`}
                    >
                      <input
                        type="radio"
                        name={`question-${q._id}`}
                        value={opt}
                        checked={isSelected}
                        onChange={() => handleChange(q._id, opt)}
                        disabled={reviewMode}
                        className="radio radio-primary"
                      />
                      <span className="text-sm">{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <div className="text-center">
          {!reviewMode ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn btn-primary mt-8 px-10 rounded-full shadow-lg"
            >
              {submitting ? "Submitting..." : "✅ Submit Test"}
            </button>
          ) : (
            <button
              onClick={() => navigate("/results")}
              className="btn btn-success mt-8 px-10 rounded-full shadow-lg"
            >
              🎉 View Result
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestTakingPage;
