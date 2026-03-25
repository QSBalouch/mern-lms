import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import { Container, Button, Card } from "react-bootstrap";
import { myCourses } from "../services/courseService";
import { toast } from "react-toastify";
import { markLessonComplete } from "../services/progressService";
import Loader from "../components/Loader";

function CourseDetail() {
  const { id } = useParams();

  const [course, setCourse] = useState({});
  const [lessons, setLessons] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadCourse();
    loadLessons();
    checkEnrollment();
  }, []);

  // Load course info
  const loadCourse = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/courses/${id}`);
      setCourse(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error loading course");
    } finally {
      setLoading(false);
    }
  };

  // Load lessons
  const loadLessons = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/lessons/${id}`);
      setLessons(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error loading lessons");
    } finally {
      setLoading(false);
    }
  };

  const deleteLesson = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;
    try {
      setLoading(true);
      await API.delete(`/lessons/${id}`); 
      toast.success("Lesson deleted");
      await loadLessons();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete lesson");
    } finally {
      setLoading(false);
    }
  };

  // Check if student is enrolled
  const checkEnrollment = async () => {
    if (user?.role === "student") {
      try {
        setLoading(true);
        const res = await myCourses();
        setIsEnrolled(res.data.some((c) => c.course._id === id));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      setIsEnrolled(true);
    }
  };

  const getYoutubeEmbed = (url) => {
    if (!url) return "";

    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleCompleteLesson = async (lessonId) => {
    try {
      setLoading(true);
      await markLessonComplete(lessonId, id);
      toast.success("Lesson marked as completed");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error marking lesson complete");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <Container className="mt-4">
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>
        <strong>Instructor:</strong> {course?.instructor?.name}
      </p>

      {/* Lessons Section */}
      {(user?.role === "instructor" || user?.role === "admin" || isEnrolled) && (
        <>
          <h4 className="mt-4 mb-3">Course Lessons</h4>
          {lessons.length === 0 && <p>No lessons added yet.</p>}

          {lessons.map((l) => (
            <Card key={l._id} className="dashboard-card mb-3 shadow-sm">
              <Card.Body>
                <h5>{l.title}</h5>
                {l.description && <p>{l.description}</p>}
                <iframe
                  width="100%"
                  height="400"
                  src={getYoutubeEmbed(l.videoUrl)}
                  title="Lesson video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>

                {user?.role === "student" && isEnrolled && (
                  <Button
                    variant="success"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleCompleteLesson(l._id)}
                  >
                    Mark Complete
                  </Button>
                )}

                {/* Edit button only for instructor */}
                {user?.role === "instructor" && (
                  <>
                    <Button
                      as={Link}
                      to={`/lessons/edit/${l._id}`}
                      variant="warning"
                      size="sm"
                      className="mt-2 me-2"
                    >
                      Edit Lesson
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      className="mt-2"
                      onClick={() => deleteLesson(l._id)}
                    >
                      Delete Lesson
                    </Button></>
                )}
              </Card.Body>
            </Card>
          ))}
        </>
      )}

      {user?.role === "instructor" && (
        <Button
          as={Link}
          to={`/courses/${id}/add-lesson`}
          variant="success"
          className="w-100 mb-3"
        >
          Add New Lesson
        </Button>
      )}

      {/* Message for students not enrolled */}
      {user?.role === "student" && !isEnrolled && (
        <p className="text-danger mt-3">
          You are not enrolled in this course. Please enroll to view lessons.
        </p>
      )}
    </Container>
  );
}

export default CourseDetail;