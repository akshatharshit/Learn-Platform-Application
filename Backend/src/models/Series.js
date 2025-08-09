import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    validate: {
      validator: (arr) => arr.length === 4,
      message: "Each question must have exactly 4 options.",
    },
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Optional Cloudinary URL
  },
});

const seriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: {
      type: String, 
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    solutionVideo: {
      url: String,
      isYouTube: {
        type: Boolean,
        default: true,
      },
    },
    timer: {
      type: Number, 
      default: 0,   
    },
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);



export const Series = mongoose.model("Series", seriesSchema);
