import express from "express";
import multer from "multer";
import {
  addNewCourse,
  getAllCourses,
  getCourseDetailsByID,
  updateCourseByID,
  deleteCourseByID,
} from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkTeacherRole } from "../middleware/checkTeacher.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});

router.post(
  "/add-course",
  protect,
  checkTeacherRole,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "videos", maxCount: 20 },
  ]),
  addNewCourse
);

router.get("/", protect,  getAllCourses);
router.get("/:id", protect,  getCourseDetailsByID);
router.put("/:id", upload.array("videos", 20), updateCourseByID);
router.delete("/:id", protect, checkTeacherRole, deleteCourseByID);

export default router;
