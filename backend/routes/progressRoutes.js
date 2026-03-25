import express from "express";
import { markLessonComplete, getMyProgress } from "../controllers/progressController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/complete", protect, authorizeRoles("student"), markLessonComplete);
router.get("/my-progress", protect, authorizeRoles("student"), getMyProgress);

export default router;