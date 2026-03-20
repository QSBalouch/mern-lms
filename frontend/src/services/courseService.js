// frontend/src/services/courseService.js
import API from "./api";

// Courses
export const getCourses = () => {
  return API.get("/courses"); // Public route
};

export const getCourse = (id) => {
  return API.get(`/courses/${id}`); // Public route
};

export const createCourse = (data) => {
  return API.post("/courses", data); // Protected route (Instructor/Admin)
};

export const deleteCourse = (id) => {
  return API.delete(`/courses/${id}`); // Protected route (Instructor/Admin)
};

// Enrollment (Student)
export const enrollCourse = (courseId) => {
  return API.post("/enrollment/enroll", { courseId }); // Protected
};

export const myCourses = () => {
  return API.get("/enrollment/my-courses"); // Protected
};

export const updateCourse = (id, data) => {
  return API.put(`/courses/${id}`, data);
};

export const createLesson = (data) => {
  return API.post("/lessons", data);
};

export const updateLesson = (id,data)=>{
return API.put(`/lessons/${id}`,data);
};