import express from "express";
import { markLessonComplete, getMyProgress } from "../controllers/progressController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/complete", protect, markLessonComplete);
router.get("/my-progress", protect, getMyProgress);

export default router;