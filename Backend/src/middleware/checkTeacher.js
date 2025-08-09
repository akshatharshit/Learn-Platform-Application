// middleware/checkTeacher.js
export const checkTeacherRole = (req, res, next) => {
  if (req.user?.role !== "teacher") {
    return res.status(403).json({ success: false, message: "Only teachers can perform this action." });
  }
  next();
};
