import express from "express";
import multer from "multer";
import {
  uploadPDF,
  getAllPDFs,
  deletePDF,
} from "../controllers/pdfController.js";
import {protect} from "../middleware/authMiddleware.js"
const router = express.Router();

// ✅ 1. Use memory storage for direct buffer upload to Cloudinary
const storage = multer.memoryStorage();

// ✅ 2. Accept only PDF files with file size limit
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    }
    cb(null, true);
  },
});

// ✅ 3. Routes
router.post("/upload",protect, upload.single("pdf"), uploadPDF);  // POST /api/pdf/upload
router.get("/", getAllPDFs);                              // GET  /api/pdf
router.delete("/:id", deletePDF);                         // DELETE /api/pdf/:id

export default router;
