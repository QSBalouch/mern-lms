import API from "./api";

export const markLessonComplete = (lessonId, courseId) => {
  return API.post("/progress/complete", { lessonId, courseId });
};

export const getMyProgress = () => {
  return API.get("/progress/my-progress");
};

export const getStudents = () => {
  return API.get("/instructor/students");
};

export const getStudentsList = () => {
  return API.get("/instructor/students-list");
};
