import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

export const enrollCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    // ✅ Check if already enrolled
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

    res.json(courses);
  } catch (error) {
    next(error);
  }
};

export const getInstructorStudents = async (req, res, next) => {
  try {
    const courses = await Course.find({ instructor: req.user._id });

    const courseIds = courses.map((c) => c._id);

    const result = await Enrollment.aggregate([
      { $match: { course: { $in: courseIds } } },
      { $group: { _id: "$student" } },
      { $count: "totalStudents" },
    ]);

    res.json({ count: result[0]?.totalStudents || 0 });
  } catch (error) {
    next(error);
  }
};

export const getInstructorStudentsList = async (req, res, next) => {
  try {
    const courses = await Course.find({ instructor: req.user._id });

    const courseIds = courses.map((c) => c._id);

    const enrollments = await Enrollment.find({
      course: { $in: courseIds },
    }).populate("student", "name email");

    const uniqueMap = new Map();

    enrollments.forEach((e) => {
      uniqueMap.set(e.student._id.toString(), e.student);
    });

    res.json(Array.from(uniqueMap.values()));
  } catch (error) {
    next(error);
  }
};