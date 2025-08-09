import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourseStore } from "../../store/useCourseStore";
import { toast } from "react-hot-toast";

const EditCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    selectedCourse,
    getCourseById,
    updateCourse,
    isLoading,
    courseError,
  } = useCourseStore();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "",
    pricing: "",
    primaryLanguage: "",
    welcomeMessage: "",
    objectives: "",
    curriculum: [],
  });

  useEffect(() => {
    if (id) getCourseById(id);
  }, [id, getCourseById]);

  useEffect(() => {
    if (selectedCourse) {
      setFormData({
        title: selectedCourse.title || "",
        subtitle: selectedCourse.subtitle || "",
        description: selectedCourse.description || "",
        category: selectedCourse.category || "",
        level: selectedCourse.level || "",
        pricing: selectedCourse.pricing || "",
        primaryLanguage: selectedCourse.primaryLanguage || "",
        welcomeMessage: selectedCourse.welcomeMessage || "",
        objectives: selectedCourse.objectives || "",
        curriculum: selectedCourse.curriculum || [],
      });
    }
  }, [selectedCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLectureChange = (index, field, value) => {
    const updated = [...formData.curriculum];
    updated[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      curriculum: updated,
    }));
  };

  const handleLectureVideoChange = (index, file) => {
    const updated = [...formData.curriculum];
    updated[index].newVideoFile = file;
    setFormData((prev) => ({
      ...prev,
      curriculum: updated,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "curriculum") {
        data.append(key, value);
      }
    });

    formData.curriculum.forEach((lecture, i) => {
      data.append(`curriculum[${i}][title]`, lecture.title);
      data.append(`curriculum[${i}][freePreview]`, lecture.freePreview || false);
      data.append(`curriculum[${i}][public_id]`, lecture.public_id || "");
      if (lecture.newVideoFile) {
        data.append(`curriculum[${i}][video]`, lecture.newVideoFile);
      }
    });

    const toastId = toast.loading("Updating course...");

    const result = await updateCourse(id, data);

    toast.dismiss(toastId);

    if (result.success) {
      toast.success("✅ Course updated successfully!");
      navigate("/courses/create");
    } else {
      toast.error(`❌ ${result.message || "Failed to update course"}`);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-base-100 rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold border-b pb-4 mb-4">Edit Course</h2>

        {courseError && (
          <div className="text-error font-semibold mb-4">{courseError}</div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {[
            "title", "subtitle", "description", "category", "level",
            "pricing", "primaryLanguage", "welcomeMessage", "objectives"
          ].map((field) =>
            ["description", "welcomeMessage", "objectives"].includes(field) ? (
              <textarea
                key={field}
                name={field}
                placeholder={field}
                className="textarea textarea-bordered w-full"
                value={formData[field]}
                onChange={handleChange}
              />
            ) : (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field}
                className="input input-bordered w-full"
                value={formData[field]}
                onChange={handleChange}
              />
            )
          )}

          {/* Curriculum (Lectures) */}
          <div>
            <h3 className="text-lg font-semibold mt-4 mb-2">Lectures</h3>
            {formData.curriculum.map((lecture, index) => (
              <div
                key={index}
                className="p-4 mb-4 border rounded-lg bg-base-200 space-y-2"
              >
                <input
                  type="text"
                  value={lecture.title}
                  onChange={(e) =>
                    handleLectureChange(index, "title", e.target.value)
                  }
                  className="input input-bordered w-full"
                  placeholder="Lecture Title"
                />

                <label className="block mt-1 text-sm text-gray-500">
                  {lecture.videoUrl ? (
                    <span className="text-xs text-gray-500">
                      Current Video: {lecture.videoUrl.split("/").pop()}
                    </span>
                  ) : (
                    "No video"
                  )}
                </label>

                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) =>
                    handleLectureVideoChange(index, e.target.files[0])
                  }
                  className="file-input file-input-bordered w-full"
                />

                <label className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={lecture.freePreview}
                    onChange={(e) =>
                      handleLectureChange(index, "freePreview", e.target.checked)
                    }
                  />
                  Free Preview
                </label>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCoursePage;
