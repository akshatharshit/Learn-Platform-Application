import Course from "../models/Course.js";
import cloudinary from "../utility/cloudinary.js";

// Add New Course Controller
export const addNewCourse = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      // pricing,
      category,
      level,
      primaryLanguage,
      welcomeMessage,
      objectives,
      lectures,
    } = req.body;

    // // ✅ Validate core fields
    // if (!title || !description || !pricing || !category || !level || !lectures) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }

    // ✅ Validate core fields
    if (!title || !description  || !category || !level || !lectures) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const parsedLectures = JSON.parse(lectures);
    if (!Array.isArray(parsedLectures) || parsedLectures.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one lecture is required" });
    }

    // ✅ Validate file structure
    const imageFile = req.files?.image?.[0] || null;
    const videoFiles = Array.isArray(req.files?.videos) ? req.files.videos : [];

    if (!imageFile) {
      return res.status(400).json({ message: "Course thumbnail is required" });
    }

    if (videoFiles.length !== parsedLectures.length) {
      return res
        .status(400)
        .json({ message: "Mismatch between lectures and video files" });
    }

    // ✅ Upload image to Cloudinary
    const imageUpload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "course_thumbnails",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(imageFile.buffer);
    });

    // ✅ Upload videos and link them to parsedLectures
    const uploadedLectures = await Promise.all(
      videoFiles.map((file, index) => {
        const lectureData = parsedLectures[index];

        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              resource_type: "video",
              folder: "course_lectures",
            },
            (error, result) => {
              if (error) return reject(error);

              resolve({
                title: lectureData.title,
                videoUrl: result.secure_url,
                public_id: result.public_id,
                freePreview: Boolean(lectureData.freePreview),
              });
            }
          ).end(file.buffer);
        });
      })
    );

    // ✅ Save course to DB
    const newCourse = await Course.create({
      title,
      subtitle,
      description,
      // pricing,
      pricing: 0,
      category,
      level,
      primaryLanguage,
      welcomeMessage,
      objectives,
      instructorId: req.user.id,
      instructorName: req.user.name,
      image: {
        url: imageUpload.secure_url,
        public_id: imageUpload.public_id,
      },
      curriculum: uploadedLectures,
      isPublished: false,
      students: [],
    });

    return res.status(201).json({
      message: "Course created successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Course creation failed:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};









// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, courses: courses });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch courses" });
  }
};



// Get course by ID
export const getCourseDetailsByID = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch course" });
  }
};

// Update course
export const updateCourseByID = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ course: updatedCourse }); // ✅ exact format needed by frontend
  } catch (err) {
    res.status(500).json({ message: "Failed to update course" });
  }
};


// Delete course and its resources
export const deleteCourseByID = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Delete course image
    if (course.image?.public_id) {
      await cloudinary.uploader.destroy(course.image.public_id);
    }

    // Delete video lectures
    for (const lecture of course.curriculum) {
      if (lecture.public_id) {
        await cloudinary.uploader.destroy(lecture.public_id, {
          resource_type: "video",
        });
      }
    }

    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete course" });
  }
};





