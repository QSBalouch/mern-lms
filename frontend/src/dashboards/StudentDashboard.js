import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { myCourses } from "../services/courseService";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Loader from "../components/Loader";

function StudentDashboard() {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        load();

    }, []);

    const load = async () => {
        setLoading(true);
        const res = await myCourses();
        setCourses(res.data);
        setLoading(false);

    };

    return (

        <Container className="mt-4">

            <h2>My Courses</h2>

            <div className="course-grid mt-3">
                {courses.map((c) => (

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

export default StudentDashboard;