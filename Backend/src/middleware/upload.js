import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (![".jpg", ".jpeg", ".png", ".mp4", ".mov", ".webm"].includes(ext)) {
    return cb(new Error("Unsupported file type"), false);
  }
  cb(null, true);
};

export const upload = multer({ storage, fileFilter });
