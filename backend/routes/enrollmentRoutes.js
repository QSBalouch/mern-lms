import express from "express";
import { enrollCourse, myCourses, getInstructorStudents, getInstructorStudentsList } from "../controllers/enrollmentController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();
router.post("/enroll", protect, authorizeRoles("student"), enrollCourse);
router.get("/my-courses", protect, authorizeRoles("student"), myCourses);
router.get("/instructor/students", protect, authorizeRoles("instructor"), getInstructorStudents);
router.get("/instructor/students-list", protect, authorizeRoles("instructor"), getInstructorStudentsList);

export default router;