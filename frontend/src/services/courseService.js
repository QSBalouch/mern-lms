// frontend/src/services/courseService.js
import API from "./api";

// Courses
export const getCourses = () => {
  return API.get("/courses"); 
};

export const getCourse = (id) => {
  return API.get(`/courses/${id}`); 
};

export const createCourse = (data) => {
  return API.post("/courses", data); 
};

export const deleteCourse = (id) => {
  return API.delete(`/courses/${id}`); 
};

// Enrollment (Student)
export const enrollCourse = (courseId) => {
  return API.post("/enroll", { courseId }); 
};

export const myCourses = () => {
  return API.get("/my-courses"); 
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