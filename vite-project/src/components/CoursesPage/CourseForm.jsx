import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const CreateCourseForm = () => {
    const [courseData, setCourseData] = useState({
        title: "",
        subtitle: "",
        description: "",
        pricing: "",
        category: "",
        level: "",
        primaryLanguage: "", // ✅ NEW
        welcomeMessage: "",   // ✅ NEW
        objectives: "",       // ✅ NEW
        isPublished: false,   // ✅ NEW
        image: null,
    });

    const [lectures, setLectures] = useState([
        { title: "", video: null, freePreview: false },
    ]);

    const [isSubmitting, setIsSubmitting] = useState(false); // ✅ for submit control

    const handleCourseChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCourseData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleLectureChange = (index, field, value) => {
        const updatedLectures = [...lectures];
        updatedLectures[index][field] = value;
        setLectures(updatedLectures);
    };

    const addLecture = () => {
        setLectures((prev) => [
            ...prev,
            { title: "", video: null, freePreview: false },
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        const form = new FormData();

        Object.entries(courseData).forEach(([key, val]) => {
            if (key === "image" && val) {
                form.append("image", val);
            } else {
                form.append(key, val);
            }
        });

        const lecturesMeta = lectures.map(({ title, freePreview }) => ({
            title,
            freePreview,
        }));
        form.append("lectures", JSON.stringify(lecturesMeta));

        lectures.forEach((lec) => {
            if (lec.video) {
                form.append("videos", lec.video);
            }
        });

        try {
            const res = await axios.post("/api/courses/add-course", form, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("✅ Course created successfully!");
            setTimeout(() => {
                window.location.href = "/courses/create";
            }, 1500);
        } catch (err) {
            console.error("Error creating course:", err?.response?.data || err);
            toast.error("❌ Failed to create course");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <Toaster position="top-right" reverseOrder={false} />

            <form
                onSubmit={handleSubmit}
                className="bg-base-100 shadow-2xl rounded-2xl p-8 space-y-8 border border-base-300"
                encType="multipart/form-data"
            >
                <h2 className="text-4xl font-bold text-center text-primary">
                    📘 Create a New Course
                </h2>

                {/* Course Info */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-pretty">Course Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="label ">Course Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. Full Stack Web Development"
                                className="input input-bordered w-full"
                                value={courseData.title}
                                onChange={handleCourseChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="label">Subtitle</label>
                            <input
                                type="text"
                                name="subtitle"
                                placeholder="e.g. Learn by building real projects"
                                className="input input-bordered w-full"
                                value={courseData.subtitle}
                                onChange={handleCourseChange}
                            />
                        </div>
                        <div>
                            <label className="label">Category</label>
                            <select
                                name="category"
                                className="select select-bordered w-full"
                                value={courseData.category}
                                onChange={handleCourseChange}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Development">Development</option>
                                <option value="Design">Design</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">Level</label>
                            <select
                                name="level"
                                className="select select-bordered w-full"
                                value={courseData.level}
                                onChange={handleCourseChange}
                                required
                            >
                                <option value="">Select Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">Primary Language</label>
                            <input
                                type="text"
                                name="primaryLanguage"
                                placeholder="e.g. English"
                                className="input input-bordered w-full"
                                value={courseData.primaryLanguage}
                                onChange={handleCourseChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="label">Pricing (₹)</label>
                            <input
                                type="number"
                                name="pricing"
                                placeholder="e.g. 999"
                                className="input input-bordered w-full"
                                value={courseData.pricing}
                                onChange={handleCourseChange}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="label">Course Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setCourseData((prev) => ({ ...prev, image: e.target.files[0] }))
                                }
                                className="file-input file-input-bordered w-full"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-4">
                    <div>
                        <label className="label">Course Description</label>
                        <textarea
                            name="description"
                            placeholder="Write a detailed description..."
                            className="textarea textarea-bordered w-full"
                            rows="4"
                            value={courseData.description}
                            onChange={handleCourseChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="label">Welcome Message</label>
                        <textarea
                            name="welcomeMessage"
                            placeholder="e.g. Welcome to the course!"
                            className="textarea textarea-bordered w-full"
                            rows="2"
                            value={courseData.welcomeMessage}
                            onChange={handleCourseChange}
                        />
                    </div>
                    <div>
                        <label className="label">Objectives</label>
                        <textarea
                            name="objectives"
                            placeholder="What will students learn?"
                            className="textarea textarea-bordered w-full"
                            rows="2"
                            value={courseData.objectives}
                            onChange={handleCourseChange}
                        />
                    </div>
                </div>

                {/* Publish Toggle */}
                <div className="form-control">
                    <label className="cursor-pointer flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="isPublished"
                            checked={courseData.isPublished}
                            onChange={handleCourseChange}
                            className="checkbox checkbox-primary"
                        />
                        <span className="label-text text-lg">Publish Course Immediately</span>
                    </label>
                </div>

                {/* Lectures Section */}
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold  text-secondary">🎬 Course Lectures</h3>
                    {lectures.map((lec, i) => (
                        <div
                            key={i}
                            className="border border-base-300 bg-base-100 p-4 rounded-lg space-y-4"
                        >
                            <div>
                                <label className="label">Lecture Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Introduction to JavaScript"
                                    className="input input-bordered w-full"
                                    value={lec.title}
                                    onChange={(e) =>
                                        handleLectureChange(i, "title", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label className="label">Video File</label>
                                <input
                                    type="file"
                                    accept="video/*"
                                    className="file-input file-input-bordered w-full"
                                    onChange={(e) =>
                                        handleLectureChange(i, "video", e.target.files[0])
                                    }
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer gap-2">
                                    <input
                                        type="checkbox"
                                        checked={lec.freePreview}
                                        onChange={(e) =>
                                            handleLectureChange(i, "freePreview", e.target.checked)
                                        }
                                        className="checkbox"
                                    />
                                    <span className="label-text">Enable Free Preview</span>
                                </label>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addLecture}
                        className="btn btn-outline btn-primary"
                    >
                        ➕ Add Another Lecture
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className={`btn btn-primary w-full ${isSubmitting ? "loading" : ""}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "⏳ Submitting..." : "🚀 Submit Course"}
                </button>
            </form>
        </div>
    );


};

export default CreateCourseForm;
