# 📚 MERN Learning Management System (LMS)

A full-stack Learning Management System built using the MERN stack (MongoDB, Express, React, Node.js).  
This platform supports students, instructors, and admins with features like course management, enrollment, lesson handling, and progress tracking.

---


**Note: Vercel deploy link is: https://mern-lms-peach.vercel.app/ **

## 🚀 Features

### 👨‍🎓 Student
- Browse available courses  
- Enroll in courses  
- Watch lessons (video-based learning)  
- Track learning progress  
- Mark lessons as completed  

### 👨‍🏫 Instructor
- Create, update, and delete courses  
- Add and manage lessons  
- View enrolled students  

### 🛡️ Admin
- Manage users  
- Manage courses  
- Oversee platform activity  

---

## 🏗️ Tech Stack

### Frontend
- React.js  
- React Router  
- React Bootstrap  
- Axios  
- Recharts  
- React Toastify  
- Framer Motion  

### Backend
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT Authentication  
- bcrypt.js  

---

## 📁 Project Structure

```

project-root/  
│  
├── backend/  
│   ├── config/   
│   │   ├── db.js  
│   ├── controllers/ 
│   │   ├── authController.js 
│   │   ├── courseController.js 
│   │   ├── enrollmentController.js 
│   │   ├── lessonController.js 
│   │   ├── progressController.js 
│   │   ├── userController.js 
│   ├── middleware/  
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── roleMiddleware.js
│   ├── models/ 
│   │   ├── Course.js  
│   │   ├── Enrollment.js  
│   │   ├── Lesson.js  
│   │   ├── Progress.js  
│   │   ├── User.js  
│   ├── routes/  
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── enrollmentRoutes.js
│   │   ├── lessonRoutes.js
│   │   ├── progressRoutes.js
│   │   ├── userRoutes.js
│   ├── utils/  
│   │   ├── createAdmin.js
│   │   ├── generateToken.js
│   ├── api
│   │   ├── server.js
│   └── .env 
│   
├── frontend/  
│   ├── src/  
│   │   ├── components/
│   │   │   ├── CourseCard.js  
│   │   │   ├── Loader.js  
│   │   │   ├── NavbarComponent.js  
│   │   │   ├── ProtectedRoute.js  
│   │   ├── context/  
│   │   │   ├── AuthContext.js
│   │   ├── dashboards/
│   │   │   ├── InstructorCourses.js   
│   │   │   ├── ManageUsers.js   
│   │   │   ├── StudentCourses.js   
│   │   ├── pages/  
│   │   │   ├── Home.js  
│   │   │   ├── About.js 
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Profile.js
│   │   │   ├── Courses.js
│   │   │   ├── CourseDetail.js  
│   │   │   ├── CreateCourse.js 
│   │   │   ├── CreateLesson.js 
│   │   │   ├── EditCourse.js 
│   │   │   ├── EditLesson.js 
│   │   │   ├── InstructorStudents.js 
│   │   ├── services/  
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── courseService.js
│   │   │   ├── progressiveService.js
│   │   ├── routes/ 
│   │   │   ├── AppRoutes.js 
│   │   ├── App.js  
│   │   └── index.js
│   │   └── index.css  
│   └── .env  
├── vercel.json 


```


## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
git clone <your-repo-url>  
cd project-root  

---

### 2️⃣ Backend Setup
cd backend  
npm install  

Create `.env` inside backend/config:

MONGODB_URI=mongodb://localhost:27017/lms  
PORT=5000  
JWT_SECRET=your_secret_key  

Run backend:
npm run dev  

---

### 3️⃣ Frontend Setup
cd frontend  
npm install  

Create `.env` inside frontend:

REACT_APP_API_URL=http://localhost:5000/api  

Run frontend:
npm start  

---

## 🔐 Authentication

- JWT-based authentication  
- Secure login & registration  
- Passwords are hashed using bcrypt  
- Role-based access control:
  - student  
  - instructor  
  - admin  

---

## 🔌 API Overview

### Auth
POST /api/register → Register user  
POST /api/login → Login user  

### Courses
GET /api/courses → Get all courses  
GET /api/courses/:id → Get single course  
POST /api/courses → Create course  (Instructor)
PUT /api/courses/:id → Update course (Instructor)
DELETE /api/courses/:id → Delete course (Instructor + Admin)
GET /api/courses/instructor/my-courses → Managing Course (Instructor)

### Lessons
POST /api/lessons → Create lesson  (Instructor)
GET /api/lessons/:courseId → Get lessons  
GET /api/lessons/lesson/:id → Get single lesson  
PUT /api/lessons/:id → Update lesson  (Instructor)
DELETE /api/lessons/:id → Delete lesson (Instructor)

### Enrollment
POST /api/enroll → Enroll in course  (Student)
GET /api/my-courses → Get enrolled courses  (Student)
GET /api/instructor/students → Get student count  (Instructor)
GET /api/instructor/students-list → Get student list  (Instructor)

### Progress
POST /api/progress/complete → Mark lesson complete  (Student)
GET /api/progress/my-progress → Get progress  (Student)

### Users (Admin)
GET /api/users → Get all users  (Admin)
DELETE /api/users/:id → Delete user  (Admin)

---

## 📊 Core Functionalities

- Course creation & management  
- Lesson management with video URLs  
- Student enrollment system  
- Progress tracking system  
- Instructor dashboards  
- Admin controls  
- Role-based authorization  
- Secure JWT authentication 
- Responsiveness 

---

## 🎯 Notes

- Ensure MongoDB is running locally or provide a cloud URI  
- Admin account is auto-created if not exists:
  - Email: admin@example.com  
  - Password: AdminPassword123  
- Use environment variables properly for security  

---

## 📌 Future Improvements

- Payment gateway integration  
- Live chat / discussion system  
- Certificate generation  
- Advanced analytics dashboard  
- Mobile application  