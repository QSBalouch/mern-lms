import React, { useState, useContext, useEffect } from "react"; // added useEffect
import { Container, Form, Button } from "react-bootstrap";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, user } = useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profile", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await loginUser({ email, password });
      login(res.data);
      toast.success("Login successful");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;