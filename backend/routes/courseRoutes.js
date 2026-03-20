import express from "express";

import {
  getCourses,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse,
  getInstructorCourses
} from "../controllers/courseController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getCourses);

router.get("/:id", getCourse);

router.post("/", protect, authorizeRoles("instructor", "admin"), createCourse);

router.delete("/:id", protect, authorizeRoles("instructor", "admin"), deleteCourse);

router.put("/:id",
  protect,
  authorizeRoles("instructor", "admin"),
  updateCourse
);

router.get(
  "/instructor/my-courses",
  protect,
  authorizeRoles("instructor"),
  getInstructorCourses
);

export default router;