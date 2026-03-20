import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { updateLesson } from "../services/courseService";
import API from "../services/api";
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
        loadLesson();
    }, [id]);

    const loadLesson = async () => {
        setLoading(true);
        const res = await API.get(`/lessons/lesson/${id}`);

        setTitle(res.data.title);
        setDescription(res.data.description);
        setVideoUrl(res.data.videoUrl);
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await updateLesson(id, {
            title,
            description,
            videoUrl
        });

        toast.success("Lesson updated");

        navigate(-1);
        setLoading(false);
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