import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { getLessonById, updateLessonById } from "../services/lessonService";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function EditLesson() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadLesson(id);
    }, [id]);

    const loadLesson = async (id) => {
        try {
            setLoading(true);
            const res = await getLessonById(id);
            setTitle(res.data.title);
            setDescription(res.data.description);
            setVideoUrl(res.data.videoUrl);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error Loading lesson");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try { 
            setLoading(true);
            await updateLessonById(id, { title, description, videoUrl });
            toast.success("Lesson updated");
            navigate(-1);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error Updating lesson");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <Container className="mt-4">
            <h2>Edit Lesson</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Video URL</Form.Label>
                    <Form.Control
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit">
                    Update Lesson
                </Button>
            </Form>
        </Container>
    );
}

export default EditLesson;