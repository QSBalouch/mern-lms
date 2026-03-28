import API from "./api";

// Courses
export const getAllCourses = () => {
  return API.get("/courses"); 
};

export const getCourseById = (id) => {
  return API.get(`/courses/${id}`); 
};

export const createNewCourse = (data) => {
  return API.post("/courses", data); 
};

export const deleteCourseById = (id) => {
  return API.delete(`/courses/${id}`); 
};

export const updateCourseById = (id, data) => {
  return API.put(`/courses/${id}`, data);
};

export const getInstructorCourses = () => {
  return API.get("/courses/instructor/my-courses");
}
 

// Enrollment (Student)
export const enrollInCourse = (courseId) => {
  return API.post("/enroll", { courseId }); 
};

export const myCourses = () => {
  return API.get("/my-courses"); 
};



