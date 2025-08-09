import mongoose from "mongoose";

const attemptedQuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  selectedOption: {
    type: String,
    required: true,
  },
  correctOption: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const resultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    series: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series",
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    correctCount: {
      type: Number,
      required: true,
    },
    wrongCount: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    timeTaken: {
      type: Number, 
      required: true,
    },
    feedback: {
      type: String, 
      default: "",
    },
    attemptedQuestions: [attemptedQuestionSchema],
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", resultSchema);
export default Result;
