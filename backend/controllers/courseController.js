import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Lesson from "../models/Lesson.js";
import Progress from "../models/Progress.js";

export const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate("instructor", "name");
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

export const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor", "name");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    next(error);
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, price } = req.body;

    const course = await Course.create({
      title,
      description,
      category,
      price,
      instructor: req.user._id,
    });

    res.json(course);
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Delete related enrollments
    await Enrollment.deleteMany({ course: course._id });

    // Delete related lessons
    await Lesson.deleteMany({ course: course._id });

    await course.deleteOne();

    res.json({ message: "Course deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting course" });
  }
};


export const updateCourse = async (req, res, next) => {
  try {
    const { title, description, category, price } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Ownership check
    if (
      course.instructor.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.category = category || course.category;
    course.price = price || course.price;

    const updated = await course.save();

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const getInstructorCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({ instructor: req.user._id });
    res.json(courses);
  } catch (error) {
    next(error);
  }
};