import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { getCourse, updateCourse } from "../services/courseService";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function EditCourse() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCourse();
    }, []);

    const loadCourse = async () => {
        try {
            setLoading(true);
            const res = await getCourse(id);
            setTitle(res.data.title);
            setDescription(res.data.description);
            setCategory(res.data.category);
            setPrice(res.data.price);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error Loading course");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await updateCourse(id, { title, description, category, price });
            toast.success("Course updated");
            navigate("/instructor/courses");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error Updating course");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <Container className="mt-4">
            <h2>Edit Course</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control value={category} onChange={(e) => setCategory(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </Form.Group>
                <Button type="submit">Update</Button>
            </Form>
        </Container>
    );

}

export default EditCourse;