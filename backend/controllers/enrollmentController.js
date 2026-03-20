import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

export const enrollCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    // Check if already enrolled
    const exists = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (exists) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId,
    });

    res.json(enrollment);
  } catch (error) {
    next(error);
  }
};

export const myCourses = async (req, res, next) => {
  try {
    const courses = await Enrollment.find({
      student: req.user._id,
    }).populate("course");

    const filtered = courses.filter(c => c.course !== null);

    res.json(filtered);
  } catch (error) {
    next(error);
  }
};

export const getInstructorStudents = async (req, res) => {
  try {
    // 1. Get instructor courses
    const courses = await Course.find({ instructor: req.user._id });

    const courseIds = courses.map(c => c._id);

    // 2. Get enrollments of those courses
    const enrollments = await Enrollment.find({
      course: { $in: courseIds }
    }).populate("student");

    // 3. Get unique students
    const uniqueStudents = [
      ...new Map(
        enrollments.map(e => [e.student._id.toString(), e.student])
      ).values()
    ];

    res.json({ count: uniqueStudents.length });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching students" });
  }
};

export const getInstructorStudentsList = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id });
    const courseIds = courses.map(c => c._id);

    const enrollments = await Enrollment.find({
      course: { $in: courseIds }
    }).populate("student");

    const uniqueStudents = [
      ...new Map(
        enrollments.map(e => [e.student._id.toString(), e.student])
      ).values()
    ];

    res.json(uniqueStudents);

  } catch (error) {
    res.status(500).json({ message: "Error fetching students list" });
  }
};