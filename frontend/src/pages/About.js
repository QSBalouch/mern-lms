import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function About() {
  return (
    <Container className="mt-5">
      <h2 className="mb-5 text-center fw-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        About MERN LMS
      </h2>
      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-lg border-0 p-4 about-card">
            <Card.Body>
              <Card.Title className="fw-bold mb-3">Our Mission</Card.Title>
              <Card.Text>
                To provide students and instructors a modern platform to create, share, and learn courses online efficiently.  
                We focus on usability, real-world projects, and premium learning experience.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-lg border-0 p-4 about-card">
            <Card.Body>
              <Card.Title className="fw-bold mb-3">Our Vision</Card.Title>
              <Card.Text>
                Build a scalable learning management system with real-world features like role-based dashboards, course management, and analytics.  
                Our aim is to make learning interactive, engaging, and visually stunning.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;