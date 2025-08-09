import { Series } from "../models/Series.js";
import cloudinary from "../utility/cloudinary.js";


export const createSeries = async (req, res) => {
  try {
    const {
      title,
      description,
      solutionVideoUrl,
      isYouTube,
      imageUrl,
      timer,
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newSeries = new Series({
      title,
      description,
      creator: req.user.id,
      image: imageUrl || undefined,
      timer: timer ?? 0, 
      solutionVideo: solutionVideoUrl
        ? {
          url: solutionVideoUrl,
          isYouTube: isYouTube ?? true,
        }
        : undefined,
    });

    await newSeries.save();
    res.status(201).json(newSeries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




export const addQuestionToSeries = async (req, res) => {
  try {
    const { seriesId } = req.params;
    const { text, options, answer, imageUrl } = req.body;

    if (!text || !options || options.length !== 4 || !answer) {
      return res.status(400).json({ error: "Each question must include text, 4 options, and an answer" });
    }

    const series = await Series.findById(seriesId);
    if (!series) return res.status(404).json({ error: "Series not found" });

    if (series.creator.toString() !== req.user.id) {
      return res.status(403).json({ error: "Only the creator can add questions" });
    }

    series.questions.push({
      text,
      options,
      answer,
      image: imageUrl || undefined,
    });

    await series.save();
    res.status(200).json(series);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getAllSeries = async (req, res) => {
  try {
    const series = await Series.find()
      .sort({ createdAt: -1 })
      .populate("creator", "name email");
    res.json(series);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getSeriesById = async (req, res) => {
  try {
    const { id } = req.params;
    const series = await Series.findById(id).populate("creator", "name email");
    if (!series) return res.status(404).json({ error: "Series not found" });
    res.json(series);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete an entire series
export const deleteSeries = async (req, res) => {
  try {
    const { id } = req.params;

    const series = await Series.findById(id);
    if (!series) return res.status(404).json({ error: "Series not found" });

    
    if (series.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await series.deleteOne();
    res.status(200).json({ message: "Series deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const deleteQuestionFromSeries = async (req, res) => {
  try {
    const { seriesId, questionId } = req.params;
    const userId = req.user._id;

    const series = await Series.findById(seriesId);
    if (!series) return res.status(404).json({ error: "Series not found" });

    
    if (series.creator.toString() !== userId.toString()) {
      return res.status(403).json({ error: "You are not authorized to modify this series" });
    }

    const questionIndex = series.questions.findIndex(q => q._id.toString() === questionId);
    if (questionIndex === -1) {
      return res.status(404).json({ error: "Question not found in this series" });
    }

    series.questions.splice(questionIndex, 1);
    await series.save();

    res.status(200).json({ message: "Question removed successfully", series });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const updateSeries = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      solutionVideoUrl,
      isYouTube,
      timer, 
    } = req.body;

    const series = await Series.findById(id);
    if (!series) return res.status(404).json({ error: "Series not found" });


    if (series.creator?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Only creator can edit this series" });
    }


    if (title) series.title = title;
    if (description !== undefined) series.description = description;
    if (solutionVideoUrl) {
      series.solutionVideo = {
        url: solutionVideoUrl,
        isYouTube: isYouTube ?? true,
      };
    }

    if (typeof timer === "number") {
      series.timer = timer;
    }

    await series.save();
    res.status(200).json({ message: "Series updated", series });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateQuestionInSeries = async (req, res) => {
  try {
    const { seriesId, questionId } = req.params;
    const { text, options, answer, imageUrl } = req.body;

    const series = await Series.findById(seriesId);
    if (!series) return res.status(404).json({ error: "Series not found" });

   
    if (series.creator?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Only creator can update questions in this series" });
    }

    const question = series.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    if (text) question.text = text;
    if (Array.isArray(options) && options.length === 4) {
      question.options = options;
    }
    if (answer) question.answer = answer;
    if (imageUrl !== undefined) {
      question.image = imageUrl;
    }

    await series.save();
    res.status(200).json({ message: "Question updated", question });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


