import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/news", async (req, res) => {
  try {
    const { q, language, sortBy, from, to, page, pageSize } = req.query;

    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q,
        language,
        sortBy,
        from,
        to,
        page,
        pageSize,
        apiKey: process.env.NEWS_API_KEY, 
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error("❌ Backend News Error:", err.message);
    res.status(500).json({ message: "Failed to fetch news" });
  }
});

export default router;
