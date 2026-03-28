import express from "express";
import connectDB from "../config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "../routes/authRoutes.js";
import courseRoutes from "../routes/courseRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import enrollmentRoutes from "../routes/enrollmentRoutes.js";
import lessonRoutes from "../routes/lessonRoutes.js";
import progressRoutes from "../routes/progressRoutes.js";
import errorHandler from "../middleware/errorMiddleware.js";
import { createAdminIfNotExists } from "../utils/createAdmin.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api", enrollmentRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/progress", progressRoutes);

// Root
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use(errorHandler);

connectDB();
createAdminIfNotExists();

export default app;