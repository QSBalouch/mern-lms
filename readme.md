## Project Overview

MERN LMS is a full-stack Learning Management System built with MongoDB, Express, React, and Node.js.  
It allows users to register as students, instructors, or admins and provides role-based access:

- Students: Can browse courses, enroll, view lessons, and track progress.  
- Instructors: Can create, edit, and manage courses and lessons.  
- Admins: Can manage users, view analytics, and oversee the platform.

The platform is designed to be interactive, modern, and responsive, providing a professional online learning experience.

---

## Features

- Role-based authentication and protected routes
- Instructor course management (create, edit, delete)
- Lesson management for courses
- Student enrollment and progress tracking
- Admin dashboard with user management and analytics
- Responsive UI using React-Bootstrap
- Notifications using React-Toastify

---

## Installation Steps

### 1. Clone the repository
git clone <your-repo-url>
cd <repo-folder>

### 2. Backend Setup
cd backend
npm install

- Create a `.env` file in the backend folder with:

MONGODB_URI=<your_mongodb_connection_string>
PORT=5000
JWT_SECRET=<your_jwt_secret>

- Start the backend server:

npm run dev

> The backend runs on http://localhost:5000 by default.

### 3. Frontend Setup
cd ../frontend
npm install
npm start

> The frontend runs on http://localhost:3000 by default.

### 4. Admin Setup (Optional)
- By default, the system creates an admin automatically when the backend starts.  
- Login with credentials:

Email: admin@example.com
Password: AdminPassword123

---

## Technologies Used

- Frontend: React, React Router, React-Bootstrap, React-Toastify  
- Backend: Node.js, Express.js  
- Database: MongoDB, Mongoose  
- Authentication: JWT, bcryptjs  
- Others: Cors, dotenv, Axios

---

## Project Structure

backend/
  controllers/      # Route logic
  middleware/       # Authentication and role checks
  models/           # MongoDB models
  routes/           # API routes
  utils/            # Helper functions (e.g., createAdmin, generateToken)
  config/           # DB connection
frontend/
  components/       # Reusable UI components
  dashboards/       # Role-based dashboards
  pages/            # Public and protected pages
  routes/           # App routes
  services/         # API service files
  context/          # Auth context for login/logout

---

## Future Improvements

- Support for file uploads via Cloudinary  
- More analytics and reporting for admins  
- Advanced UI/UX with better course/lesson layout  
