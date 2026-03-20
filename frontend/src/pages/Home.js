import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="hero"
      style={{
        height: "100vh",
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
                     url('https://images.unsplash.com/photo-1581092795368-9a26f68f9f64?auto=format&fit=crop&w=1470&q=80') center/cover no-repeat`,
      }}
    >
      <Container className="text-center text-white">
        <h1 className="display-2 fw-bold mb-3 text-gradient">Welcome to MERN LMS</h1>
        <p className="lead mb-4">
          Learn modern web technologies online. Build skills. Advance your career.
        </p>

        {/* CTA Box */}
        <div className="cta-box mx-auto shadow-lg">
          <h3 className="mb-3">Ready to start learning?</h3>
          <p className="mb-4">
            Join MERN LMS today and take your skills to the next level with premium courses and expert instructors.
          </p>
          <Button as={Link} to="/register" variant="success" size="lg">
            Register Now
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Home;