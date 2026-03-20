# 📚 MERN Learning Management System (LMS)

A full-stack Learning Management System built using the MERN stack (MongoDB, Express, React, Node.js).  
This platform supports students, instructors, and admins with features like course management, enrollment, lesson handling, and progress tracking.

---

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
- Access course-related analytics  

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

project-root/  
│  
├── backend/  
│   ├── config/  
│   ├── controllers/  
│   ├── middleware/  
│   ├── models/  
│   ├── routes/  
│   ├── utils/  
│   ├── server.js  
│   └── .env  
│  
├── frontend/  
│   ├── src/  
│   │   ├── components/  
│   │   ├── context/  
│   │   ├── dashboards/  
│   │   ├── pages/  
│   │   ├── services/  
│   │   ├── routes/  
│   │   ├── App.js  
│   │   └── index.js  
│   └── .env  

---

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
POST /api/courses → Create course  
PUT /api/courses/:id → Update course  
DELETE /api/courses/:id → Delete course  

### Lessons
POST /api/lessons → Create lesson  
GET /api/lessons/:courseId → Get lessons  
GET /api/lessons/lesson/:id → Get single lesson  
PUT /api/lessons/:id → Update lesson  

### Enrollment
POST /api/enroll → Enroll in course  
GET /api/my-courses → Get enrolled courses  
GET /api/instructor/students → Get student count  
GET /api/instructor/students-list → Get student list  

### Progress
POST /api/progress/complete → Mark lesson complete  
GET /api/progress/my-progress → Get progress  

### Users (Admin)
GET /api/users → Get all users  
DELETE /api/users/:id → Delete user  

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