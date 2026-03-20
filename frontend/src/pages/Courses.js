import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getCourses, enrollCourse, myCourses } from "../services/courseService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import { deleteCourse } from "../services/courseService";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const loadCourses = async () => {
    setLoading(true);
    const res = await getCourses();
    if (user?.role === "instructor") {
      const myCourses = res.data.filter(c => c.instructor._id === user._id);
      setCourses(myCourses);
    } else {
      setCourses(res.data);
    }
    setLoading(false);
  };

  const loadMyCourses = async () => {
    setLoading(true);

    if (user?.role === "student") {
      const res = await myCourses();

      const filtered = res.data
        .filter(c => c.course)   
        .map(c => c.course._id); 

      setEnrolledCourses(filtered);
    }

    setLoading(false);
  };

  const handleEnroll = async (id) => {
    setLoading(true);
    await enrollCourse(id);
    loadMyCourses();
    toast.success("Enrolled successfully!");
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setLoading(true);
      await deleteCourse(id);
      toast.success("Course deleted by admin");
      loadCourses();
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
    loadMyCourses();
  }, []);

  if (loading) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container className="mt-5">
        <h2 className="mb-4 text-center">All Courses</h2>
        <Row>
          {courses.length === 0 && !loading && <p>No courses available.</p>}
          {courses.map((c) => (
            <Col md={4} key={c._id} className="mb-4">
              <Card className="shadow h-100">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{c.title}</Card.Title>
                  <Card.Text>{c.description.substring(0, 100)}...</Card.Text>
                  <Card.Text>
                    <strong>Category:</strong> {c.category} <br />
                    <strong>Price:</strong> ${c.price}
                  </Card.Text>
                  <div className="mt-auto d-flex flex-column gap-2">
                    {user?.role === "student" && (
                      <Button
                        variant={enrolledCourses.includes(c._id) ? "secondary" : "success"}
                        className="w-100"
                        disabled={enrolledCourses.includes(c._id)}
                        onClick={() => handleEnroll(c._id)}
                      >
                        {enrolledCourses.includes(c._id) ? "Enrolled" : "Enroll"}
                      </Button>
                    )}

                    {user?.role === "instructor" && (
                      <>
                        <Button
                          as={Link}
                          to={`/courses/${c._id}/add-lesson`}
                          variant="success"
                          className="w-100"
                        >
                          Add Lesson
                        </Button>
                        <Button
                          as={Link}
                          to={`/course/${c._id}`}
                          variant="primary"
                          className="w-100"
                        >
                          View / Edit
                        </Button>
                      </>
                    )}

                    {user?.role === "admin" && (
                      <>
                        <Button
                          as={Link}
                          to={`/course/${c._id}`}
                          variant="primary"
                          className="w-100"
                        >
                          View
                        </Button>

                        <Button
                          variant="danger"
                          className="w-100 mt-2"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.div>
  );
}

export default Courses;