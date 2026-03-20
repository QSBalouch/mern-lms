import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: String,
  description: String,

  videoUrl: String,

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Lesson", lessonSchema);