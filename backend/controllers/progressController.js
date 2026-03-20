import Progress from "../models/Progress.js";
import Lesson from "../models/Lesson.js";
import Enrollment from "../models/Enrollment.js";

export const markLessonComplete = async (req, res, next) => {
  try {
    const { lessonId, courseId } = req.body;

    let progress = await Progress.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (!progress) {
      progress = await Progress.create({
        user: req.user._id,
        course: courseId,
        completedLessons: [lessonId],
      });
    } else {
      if (!progress.completedLessons.includes(lessonId.toString())) {
        progress.completedLessons.push(lessonId);
        await progress.save();
      }
    }

    res.json(progress);
  } catch (error) {
    next(error);
  }
};

export const getMyProgress = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user._id,
    }).populate("course");

    const progressRecords = await Progress.find({
      user: req.user._id,
    });

    const result = await Promise.all(
        enrollments
        .filter(enroll => enroll.course)
        .map(async (enroll) => {
          const progress = progressRecords.find(
            (p) => p.course.toString() === enroll.course._id.toString()
          );

          const totalLessons = await Lesson.countDocuments({
            course: enroll.course._id,
          });

          return {
            course: enroll.course,
            completedLessons: progress ? progress.completedLessons : [],
            totalLessons,
          };
        })
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};