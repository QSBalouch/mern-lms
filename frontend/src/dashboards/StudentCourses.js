import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { myCourses } from "../services/courseService";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function StudentCourses() {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        try {
            setLoading(true);
            const res = await myCourses();
            setCourses(res.data);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error loading data");
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <Container className="mt-4">
            <h2>My Courses</h2>
            <div className="course-grid mt-3">
                {courses.length === 0 && !loading && <p>Not enrolled in any course yet.</p>}
                {courses
                    .filter(c => c.course)
                    .map((c) => (
                        <Card key={c._id} className="dashboard-card mb-4">
                            <Card.Body>
                                <h5>{c.course.title}</h5>
                                <p>{c.course.description}</p>
                                <Button
                                    as={Link}
                                    to={`/course/${c.course._id}`}
                                    variant="primary"
                                >
                                    Open Course
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
            </div>
        </Container>
    )

}

export default StudentCourses;