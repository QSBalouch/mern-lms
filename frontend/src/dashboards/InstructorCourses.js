import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import API from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function InstructorCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadCourses = async () => {
        try {
            setLoading(true);
            const res = await API.get("/courses/instructor/my-courses");
            setCourses(res.data);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error loading courses");
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    const deleteCourse = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            setLoading(true);
            await API.delete(`/courses/${id}`);
            toast.success("Course deleted");
            await loadCourses();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete course");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCourses();
    }, []);

    if (loading) return <Loader />;

    return (
        <Container className="mt-4 dashboard-card p-3">
            <h2 className="mb-3">Manage Courses</h2>

            {/* Desktop Table */}
            <div className="d-none d-md-block">
                <div className="table-responsive">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {courses.length === 0 && !loading && (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        No courses available.
                                    </td>
                                </tr>
                            )}

                            {courses.map((c) => (
                                <tr key={c._id}>
                                    <td>{c.title}</td>
                                    <td>{c.category}</td>
                                    <td>${c.price}</td>
                                    <td>
                                        <Button
                                            variant="success"
                                            size="sm"
                                            as={Link}
                                            to={`/courses/${c._id}/add-lesson`}
                                            className="me-2"
                                        >
                                            Add Lesson
                                        </Button>

                                        <Button
                                            variant="warning"
                                            size="sm"
                                            as={Link}
                                            to={`/courses/edit/${c._id}`}
                                            className="me-2"
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => deleteCourse(c._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="d-md-none">
                {courses.length === 0 && !loading && (
                    <p className="text-center">No courses available.</p>
                )}

                {courses.map((c) => (
                    <div key={c._id} className="card mb-3 shadow-sm">
                        <div className="card-body">

                            <h5 className="card-title">{c.title}</h5>

                            <p className="card-text mb-1">
                                <strong>Category:</strong> {c.category}
                            </p>

                            <p className="card-text">
                                <strong>Price:</strong> ${c.price}
                            </p>

                            <div className="d-flex flex-wrap gap-2">

                                <Button
                                    variant="success"
                                    size="sm"
                                    as={Link}
                                    to={`/courses/${c._id}/add-lesson`}
                                >
                                    Add Lesson
                                </Button>

                                <Button
                                    variant="warning"
                                    size="sm"
                                    as={Link}
                                    to={`/courses/edit/${c._id}`}
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => deleteCourse(c._id)}
                                >
                                    Delete
                                </Button>

                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </Container>
    );
}

export default InstructorCourses;