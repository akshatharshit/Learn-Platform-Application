import express from "express";
import {
  createResult,
  getMyResults,
  getResultById,
  deleteResultById,
  getAllResults
} from "../controllers/resultController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createResult);
router.get("/my", getMyResults);
router.get("/all", getAllResults);
router.get("/:id", getResultById);
router.delete("/:id", deleteResultById);

export default router;
