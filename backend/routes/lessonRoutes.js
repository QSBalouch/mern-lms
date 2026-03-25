import express from "express";
import { createLesson, getLessons, updateLesson, getLesson, deleteLesson } from "../controllers/lessonController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();
router.post("/", protect, authorizeRoles("instructor"), createLesson);
router.put("/:id", protect, authorizeRoles("instructor"), updateLesson);
router.get("/lesson/:id", protect, getLesson);
router.get("/:courseId", protect, getLessons);
router.delete("/:id", protect, authorizeRoles("instructor"), deleteLesson);

export default router; 