import cloudinary from "../utility/cloudinary.js";
import PDF from "../models/pdfModel.js";
import streamifier from "streamifier"; 

// === 1. Upload and Save PDF ===
export const uploadPDF = async (req, res) => {
  try {
    const file = req.file;
    const { title } = req.body;
    const userId=req.user.id;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "pdfs",
        resource_type: "raw", // ✅ Needed for PDF
        public_id: Date.now().toString(),
        flags: "attachment:false", // ✅ allow inline viewing
        use_filename: true,
        unique_filename: false,
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Cloudinary upload failed", error });
        }

        const newPDF = new PDF({
          title: title || file.originalname,
          url: result.secure_url,
          public_id: result.public_id,
          uploadedBy:userId,
        });

        await newPDF.save();

        return res.status(201).json({
          message: "PDF uploaded and saved",
          data: newPDF,
        });
      }
    );

    // ✅ Stream the buffer correctly
    streamifier.createReadStream(file.buffer).pipe(stream);

  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// === 2. Get All PDFs ===
export const getAllPDFs = async (req, res) => {
  try {
    const pdfs = await PDF.find().sort({ uploadedAt: -1 });
    res.status(200).json({ pdfs });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch PDFs", error: err.message });
  }
};

// === 3. Delete PDF ===
export const deletePDF = async (req, res) => {
  try {
    const { id } = req.params;

    const pdf = await PDF.findById(id);
    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    await cloudinary.uploader.destroy(pdf.public_id, { resource_type: "raw" });
    await PDF.findByIdAndDelete(id);

    res.status(200).json({ message: "PDF deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete PDF", error: err.message });
  }
};
