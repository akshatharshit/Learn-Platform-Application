import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Untitled PDF"
  },
  url: {
    type: String,
    required: true
  },
  public_id: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const PDF = mongoose.model("PDF", pdfSchema);

export default PDF;
