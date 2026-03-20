import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function About() {
  return (
    <Container className="mt-5 mb-5">
      {/* HEADER */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">About MERN LMS</h2>
        <p className="text-muted">
          A modern platform designed to make learning simple, engaging, and effective.
        </p>
      </div>

      {/* MISSION & VISION */}
      <Row className="g-4 mb-5">
        <Col md={6}>
          <Card className="shadow border-0 p-4 h-100 about-card">
            <Card.Body>
              <h4 className="fw-bold mb-3">🎯 Our Mission</h4>
              <p>
                To empower students and instructors with a seamless learning
                platform focused on practical knowledge, real-world skills,
                and career growth.
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow border-0 p-4 h-100 about-card">
            <Card.Body>
              <h4 className="fw-bold mb-3">🚀 Our Vision</h4>
              <p>
                To become a leading LMS platform offering interactive,
                scalable, and visually engaging learning experiences
                worldwide.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* FEATURES */}
      <Row className="g-4 text-center">
        <Col md={4}>
          <Card className="shadow-sm p-4 h-100">
            <h5>📚 Wide Range of Courses</h5>
            <p className="text-muted">
              Access courses from multiple domains and skill levels.
            </p>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm p-4 h-100">
            <h5>⚡ Fast & Responsive</h5>
            <p className="text-muted">
              Optimized UI for smooth experience on all devices.
            </p>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm p-4 h-100">
            <h5>🔒 Secure Platform</h5>
            <p className="text-muted">
              Role-based authentication ensures data security.
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;