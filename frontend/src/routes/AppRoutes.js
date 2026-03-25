import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Courses from "../pages/Courses";
import CourseDetail from "../pages/CourseDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";

import StudentCourses from "../dashboards/StudentCourses";
import InstructorCourses from "../dashboards/InstructorCourses";
import ManageUsers from "../dashboards/ManageUsers";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateCourse from "../pages/CreateCourse";
import EditCourse from "../pages/EditCourse";
import CreateLesson from "../pages/CreateLesson";
import EditLesson from "../pages/EditLesson";
import Profile from "../pages/Profile";
import InstructorStudents from "../pages/InstructorStudents";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
                path="/courses"
                element={
                    <ProtectedRoute>
                        <Courses />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/course/:id"
                element={
                    <ProtectedRoute>
                        <CourseDetail />
                    </ProtectedRoute>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Student */}
            <Route path="/student" element={
                <ProtectedRoute role="student">
                    <StudentCourses />
                </ProtectedRoute>
            } />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            {/* Instructor */}
            <Route path="/instructor/courses" element={
                <ProtectedRoute role="instructor">
                    <InstructorCourses />
                </ProtectedRoute>
            } />
            <Route path="/courses/create" element={
                <ProtectedRoute role="instructor">
                    <CreateCourse />
                </ProtectedRoute>
            } />

            <Route
                path="/courses/edit/:id"
                element={
                    <ProtectedRoute role="instructor">
                        <EditCourse />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/courses/:courseId/add-lesson"
                element={
                    <ProtectedRoute role="instructor">
                        <CreateLesson />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/lessons/edit/:id"
                element={
                    <ProtectedRoute role="instructor">
                        <EditLesson />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/instructor/students"
                element={
                    <ProtectedRoute role="instructor">
                        <InstructorStudents />
                    </ProtectedRoute>
                }
            />

            {/* Admin */}
            <Route path="/admin/users" element={
                <ProtectedRoute role="admin">
                    <ManageUsers />
                </ProtectedRoute>
            } />

        </Routes>
    );
}

export default AppRoutes;