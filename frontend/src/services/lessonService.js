import API from "./api";

export const getAllLessons = (courseId) => {
  return API.get(`/lessons/${courseId}`);
};

export const getLessonById = (id) => {
  return API.get(`/lessons/lesson/${id}`); 
};

export const createNewLesson = (data) => {
  return API.post("/lessons", data);
};

export const updateLessonById = (id,data)=>{
return API.put(`/lessons/${id}`,data);
};

export const deleteLessonById = (id) => {
  return API.delete(`/lessons/${id}`); 
};