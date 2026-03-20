import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { createLesson } from "../services/courseService";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function CreateLesson() {

    const { courseId } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await createLesson({
                title,
                description,
                videoUrl,
                courseId
            });
            toast.success("Lesson added");
            navigate(`/course/${courseId}`);
        } catch (err) {
            toast.error(err.response?.data?.message || "Error adding lesson");  
        } finally {
            setLoading(false);
        }
    }; 

    if (loading) return <Loader />;

    return (

        <Container className="mt-4">

            <h2>Add Lesson</h2>

            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">

                    <Form.Label>Lesson Title</Form.Label>

                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Video URL</Form.Label>

                    <Form.Control
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        required
                    />

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Lesson Description</Form.Label>

                    <Form.Control
                        as="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                </Form.Group>

                <Button type="submit">
                    Add Lesson
                </Button>

            </Form>

        </Container>

    )

}

export default CreateLesson;