import Result from "../models/Result.js";
import { Series } from "../models/Series.js";
import mongoose from "mongoose";

export const createResult = async (req, res) => {
  try {
    const { seriesId, answers, timeTaken, feedback } = req.body;
    const userId = req.user.id;

    const series = await Series.findById(seriesId);
    if (!series) return res.status(404).json({ message: "Series not found" });

    let correctCount = 0;
    const attemptedQuestions = [];

    series.questions.forEach((q) => {
      const userAnswer = answers[q._id];
      const isCorrect = userAnswer === q.answer;

      if (isCorrect) correctCount++;

      attemptedQuestions.push({
        questionText: q.text || "Untitled Question", 
        selectedOption: userAnswer || "",
        correctOption: q.answer || "",
        isCorrect: Boolean(isCorrect),
      });
    });

    const totalMarks = correctCount;
    const percentage = (correctCount / series.questions.length) * 100;
    const wrongCount = series.questions.length - correctCount;

    const result = new Result({
      user: userId,
      series: seriesId,
      totalMarks,
      correctCount,
      wrongCount,
      percentage,
      timeTaken,
      feedback: feedback || "",
      attemptedQuestions,
    });

    await result.save();
    res.status(201).json(result);
  } catch (err) {
    console.error("❌ createResult error:", err);
    res.status(500).json({ message: "Server error while saving result" });
  }
};





//  GET /api/results/my
export const getMyResults = async (req, res) => {
  try {
    const userId = req.user.id;
    const results = await Result.find({ user: userId })
      .populate("series", "title description creator")
      .sort({ createdAt: -1 });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching results" });
  }
};



export const getResultById = async (req, res) => {
  const resultId = req.params.id;


  if (!mongoose.Types.ObjectId.isValid(resultId)) {
    return res.status(400).json({ message: "Invalid result ID" });
  }

  try {
    
    const result = await Result.findById(resultId)
      .populate("series", "title description creator")
      .populate("user", "name email");

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user info" });
    }

    const isOwner = result.user?._id?.equals(userId);
    const isSeriesCreator = result.series?.creator?.equals(userId);

    if (!isOwner && !isSeriesCreator) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    
    res.status(200).json({ result });
  } catch (err) {
    console.error("Error fetching result by ID:", err);
    res.status(500).json({ message: "Server error while fetching result" });
  }
};






export const deleteResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id).populate("series", "creator");

    if (!result) return res.status(404).json({ message: "Result not found" });

    const isOwner = req.user.id === result.user.toString();
    const isSeriesCreator = req.user.id === result.series?.creator?.toString();

    if (!isOwner && !isSeriesCreator) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await result.deleteOne();
    res.status(200).json({ message: "Result deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error while deleting result" });
  }
};

// @desc   Get all results (only those from series created by current teacher)
// @route  GET /api/results/all
// @access Teacher only
export const getAllResults = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const results = await Result.find({})
      .populate({
        path: "series",
        match: { creator: teacherId },
        select: "title creator",
      })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    // Filter out results where series is null (i.e., not created by current teacher)
    const filteredResults = results.filter((r) => r.series !== null);
    res.json(filteredResults);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all results" });
  }
};
