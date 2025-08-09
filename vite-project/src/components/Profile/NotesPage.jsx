import React, { useEffect, useState } from "react";
import { usePDFStore } from "../../store/usePDFStore";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { useAuthStore } from "../../store/useAuthStore";

export default function NotesPage() {
  const { user } = useAuthStore();
  const {
    pdfs,
    fetchPDFs,
    uploadPDF,
    deletePDF,
    isUploading,
    isFetching,
    isDeleting,
    pdfError,
  } = usePDFStore();

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [localPDFs, setLocalPDFs] = useState([]);

  useEffect(() => {
    fetchPDFs();
  }, []);

  useEffect(() => {
    setLocalPDFs(pdfs);
  }, [pdfs]);

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      toast.error("Please provide both title and PDF file.");
      return;
    }

    toast.loading("Uploading...");
    const result = await uploadPDF(file, title.trim());
    toast.dismiss();

    if (result.success) {
      toast.success("Note uploaded successfully!");
      setFile(null);
      setTitle("");
    } else {
      toast.error("Failed to upload note.");
    }
  };

  const handleDelete = async (id) => {
    setLocalPDFs((prev) => prev.filter((note) => note._id !== id));
    toast.loading("Deleting...");
    const result = await deletePDF(id);
    toast.dismiss();

    if (result.success) {
      toast.success("Note deleted.");
    } else {
      toast.error("Failed to delete note.");
      fetchPDFs(); // Revert if delete failed
    }
  };

  const getEmbedUrl = (url) =>
    `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles[0]) setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-12">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-primary mb-10"
      >
        📚 My Notes
      </motion.h1>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-200 rounded-xl shadow-lg p-6 space-y-5"
      >
        <h2 className="text-xl font-semibold text-base-content">➕ Upload New Note</h2>

        <input
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
        />

        <div
          {...getRootProps()}
          className={`w-full h-32 flex items-center justify-center border-dashed border-2 rounded-lg transition cursor-pointer text-sm font-medium ${isDragActive
              ? "border-primary bg-primary/10 text-primary"
              : "border-neutral text-neutral-content bg-neutral/30 hover:bg-neutral/50"
            }`}
        >
          <input {...getInputProps()} />
          {file ? file.name : isDragActive ? "Drop your PDF here..." : "Click or drag a PDF file to upload"}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="btn btn-sm btn-primary"
          >
            {isUploading ? "Uploading..." : "Upload Note"}
          </button>
        </div>

        {pdfError && <p className="text-sm text-error">{pdfError}</p>}
      </motion.div>

      {/* Notes Section */}
      <h2 className="text-xl font-semibold text-base-content mt-12 mb-6">📁 Uploaded Notes</h2>

      {isFetching ? (
        <p className="text-sm text-neutral-content">Loading notes...</p>
      ) : localPDFs.length === 0 ? (
        <p className="text-sm text-neutral-content">No notes uploaded yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence>
            {localPDFs
              .filter((note) => note.uploadedBy === user._id)
              .map((note, index) => (


                <motion.div
                  key={note._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="card bg-base-100 shadow-md"
                >
                  <div className="card-body space-y-3">
                    <h3 className="card-title text-base truncate">{note.title}</h3>
                    <div className="aspect-video border rounded overflow-hidden">
                      <iframe
                        src={getEmbedUrl(note.url)}
                        title={note.title}
                        className="w-full h-full border-0"
                      />

                    </div>
                    <button
                      onClick={() => handleDelete(note._id)}
                      disabled={isDeleting}
                      className="btn btn-error btn-sm w-25"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
