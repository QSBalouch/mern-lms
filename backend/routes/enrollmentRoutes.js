import express from "express";

import {
  enrollCourse,
  myCourses,
  getInstructorStudents,
  getInstructorStudentsList
} from "../controllers/enrollmentController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/enroll", protect, enrollCourse);

router.get("/my-courses", protect, myCourses);

router.get("/instructor/students", protect, getInstructorStudents);

router.get(
  "/instructor/students-list",
  protect,
  getInstructorStudentsList
);

export default router;