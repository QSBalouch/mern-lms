import Lesson from "../models/Lesson.js";
import Course from "../models/Course.js";

export const createLesson = async (req, res, next) => {
  try {
    const { title, description, videoUrl, courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Only instructor owner can add lesson
    if (
      course.instructor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }
    const lesson = await Lesson.create({
      title,
      description,
      videoUrl,
      course: courseId,
    });
    res.json(lesson);
  } catch (error) {
    next(error);
  }
};

export const updateLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    lesson.title = req.body.title ?? lesson.title;
    lesson.description = req.body.description ?? lesson.description;
    lesson.videoUrl = req.body.videoUrl ?? lesson.videoUrl;
    const updated = await lesson.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const getLessons = async (req, res, next) => {
  try {
    const lessons = await Lesson.find({
      course: req.params.courseId,
    });
    res.json(lessons);
  } catch (error) {
    next(error);
  }
};

export const getLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.json(lesson);
  } catch (error) {
    next(error);
  }
}; 

export const deleteLesson = async (req, res, next) => {
  try { 
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    await lesson.deleteOne();
    res.json({ message: "Lesson deleted successfully" });
  } catch (error) {
    next(error);
  }
};