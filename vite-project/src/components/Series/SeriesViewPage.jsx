import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSeriesStore } from "../../store/useSeriesStore";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";

const SeriesViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { seriesList, fetchSeries } = useSeriesStore();
  const { user } = useAuthStore();

  const [series, setSeries] = useState(null);
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    fetchSeries();
  }, []);

  useEffect(() => {
    const found = seriesList.find((s) => s._id === id);
    setSeries(found);
  }, [seriesList, id]);

  const handleStart = () => {
    navigate(`/series/start/${series._id}`);
  };

  if (!series) return <div className="p-10 text-center text-xl">Loading...</div>;

  const createdAt = dayjs(series.createdAt).format("DD MMM YYYY");

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-base-100">
      <div className="max-w-4xl mx-auto bg-base-200 p-8 rounded-3xl shadow-2xl space-y-8 border border-base-300">

        {/* Banner */}
        <div className="rounded-xl overflow-hidden h-56 border border-base-300 shadow">
          <img
            src={series.image || "/placeholder.jpg"}
            alt="Series Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title & Creator */}
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-base-content">{series.title}</h1>
          <p className="text-sm text-base-content/70">
            Created by <span className="font-semibold">{series.creator?.name}</span> • {createdAt}
          </p>
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
            <p className="font-medium text-base-content/70">📝 Questions</p>
            <p className="text-xl font-bold text-primary">{series.questions?.length ?? 0}</p>
          </div>
          <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
            <p className="font-medium text-base-content/70">⏱️ Timer</p>
            <p className="text-xl font-bold text-primary">{series.timer} mins</p>
          </div>
          <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm">
            <p className="font-medium text-base-content/70">📊 Difficulty</p>
            <p className="text-xl font-bold text-primary capitalize">{series.difficulty || "Medium"}</p>
          </div>
        </div>

        {/* Description */}
        {series.description && (
          <div>
            <h2 className="text-xl font-semibold text-primary mb-2">📝 Description</h2>
            <p className="text-base text-base-content/80 whitespace-pre-line leading-relaxed">
              {series.description}
            </p>
          </div>
        )}

        {/* Guidelines */}
        <div>
          <h2 className="text-xl font-semibold text-primary mb-3">📌 Exam Guidelines</h2>

          <div className="space-y-6 bg-base-100 border border-base-300 p-6 rounded-2xl text-sm text-base-content shadow-inner leading-relaxed">
            <div>
              <p className="font-semibold text-base-content/90 mb-1">🖥️ System Requirements:</p>
              <ul className="list-disc list-inside ml-3 space-y-1">
                <li>Use the latest version of Chrome or Firefox.</li>
                <li>Stable internet with good bandwidth.</li>
                <li>Desktop/Laptop with working webcam & mic.</li>
                <li>Ensure power backup (battery/UPS).</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-base-content/90 mb-1">📷 Exam Environment:</p>
              <ul className="list-disc list-inside ml-3 space-y-1">
                <li>Quiet, distraction-free, well-lit room.</li>
                <li>Webcam must clearly see your face.</li>
                <li>Desk should be clean — no notes/devices.</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-base-content/90 mb-1">🧠 During the Exam:</p>
              <ul className="list-disc list-inside ml-3 space-y-1">
                <li>No tab-switching or communication.</li>
                <li>Monitoring via webcam/mic may occur.</li>
                <li>Save and submit before deadline.</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-base-content/90 mb-1">📋 Additional Tips:</p>
              <ul className="list-disc list-inside ml-3 space-y-1">
                <li>Follow all test instructions carefully.</li>
                <li>Manage your time efficiently.</li>
                <li>Have a plan for any tech issues.</li>
                <li>Ask your instructor if confused.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Acknowledge + Start */}
        {user?.role !== "teacher" && (
          <div className="bg-base-100 p-4 border border-base-300 rounded-xl shadow flex flex-col items-center gap-4">
            <label className="flex items-center gap-2 text-base-content/80 text-sm">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={acknowledged}
                onChange={() => setAcknowledged(!acknowledged)}
              />
              I acknowledge and agree to the guidelines.
            </label>


            <button
              onClick={handleStart}
              disabled={!acknowledged}
              className="btn btn-sm btn-primary px-6 rounded-full disabled:opacity-50 transition-all"
            >
              🚀 Start Test
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeriesViewPage;
