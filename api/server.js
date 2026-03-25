import express from "express";
import connectDB from "../backend/config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "../backend/routes/authRoutes.js";
import courseRoutes from "../backend/routes/courseRoutes.js";
import userRoutes from "../backend/routes/userRoutes.js";
import enrollmentRoutes from "../backend/routes/enrollmentRoutes.js";
import lessonRoutes from "../backend/routes/lessonRoutes.js";
import progressRoutes from "../backend/routes/progressRoutes.js";
import errorHandler from "../backend/middleware/errorMiddleware.js";
import { createAdminIfNotExists } from "../backend/utils/createAdmin.js";

dotenv.config({ path: './backend/config/.env' });

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