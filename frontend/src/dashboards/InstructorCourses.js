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
        setLoading(true);
        const res = await API.get("/courses/instructor/my-courses");
        setCourses(res.data);
        setLoading(false);
    };

    const deleteCourse = async (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            setLoading(true);
            await API.delete(`/courses/${id}`);
            toast.success("Course deleted");
            loadCourses();
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCourses();
    }, []);

    if (loading) return <Loader />;

    return (
        <Container className="mt-4 dashboard-card p-3">
            <h2>Manage Courses</h2>
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
                    {courses.length === 0 && !loading && <p>No courses available.</p>}
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
        </Container>
    );
}

export default InstructorCourses;