import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import seriesRoutes from "./routes/series.js";
import resultRoutes from "./routes/resultRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import newsRoutes from "./routes/newsRoutes.js"

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: `${process.env.FRONTEND_URL}`, 
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/series", seriesRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api", paymentRoutes);
app.use("/api", newsRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => {
  console.log("✅ MongoDB connected");
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
