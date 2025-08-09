
import express from "express";
import {
  createSeries,
  addQuestionToSeries,
  // uploadSolutionVideo,
  // uploadQuestionImage,
  getAllSeries,
  getSeriesById,
  deleteSeries,
  deleteQuestionFromSeries,
  updateSeries,
  updateQuestionInSeries,
} from "../controllers/seriesController.js";

import { upload } from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createSeries);
router.put("/:id", protect, updateSeries);
router.delete("/:id", protect, deleteSeries);
router.post("/:seriesId/questions", protect, addQuestionToSeries);
router.put("/:seriesId/questions/:questionId", protect, updateQuestionInSeries);
router.delete("/:seriesId/questions/:questionId", protect, deleteQuestionFromSeries);
router.get("/", getAllSeries);
router.get("/:id", getSeriesById);

export default router;

