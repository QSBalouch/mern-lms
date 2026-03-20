import React from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <div
        className="hero d-flex align-items-center"
        style={{
          minHeight: "100vh",
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
          url('https://images.unsplash.com/photo-1519389950473-47ba0277781c') center/cover no-repeat`,
        }}
      >
        <Container className="text-center text-white">
          <h1 className="display-3 fw-bold mb-3 text-gradient">
            Learn Without Limits
          </h1>
          <p className="lead mb-4">
            Upgrade your skills with industry-level courses taught by expert instructors.
          </p>

          <div className="d-flex justify-content-center gap-3">
            <Button as={Link} to="/register" variant="success" size="lg">
              Get Started
            </Button>
            <Button as={Link} to="/courses" variant="outline-light" size="lg">
              Browse Courses
            </Button>
          </div>
        </Container>
      </div>

      {/* FEATURES SECTION */}
      <Container className="mt-5">
        <h2 className="text-center fw-bold mb-4">Why Choose Us?</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="text-center shadow-sm p-4 h-100">
              <h4>🎯 Practical Learning</h4>
              <p>
                Learn by building real-world projects instead of just theory.
              </p>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center shadow-sm p-4 h-100">
              <h4>👨‍🏫 Expert Instructors</h4>
              <p>
                Learn from experienced professionals in the industry.
              </p>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center shadow-sm p-4 h-100">
              <h4>📈 Track Progress</h4>
              <p>
                Monitor your learning journey with real-time progress tracking.
              </p>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* CTA SECTION */}
      <div className="mt-5 py-5 bg-dark text-white text-center">
        <Container>
          <h2 className="fw-bold mb-3">Start Your Learning Journey Today 🚀</h2>
          <p className="mb-4">
            Join thousands of learners and build your future with MERN LMS.
          </p>
          <Button as={Link} to="/register" variant="success" size="lg">
            Join Now
          </Button>
        </Container>
      </div>
    </>
  );
}

export default Home;