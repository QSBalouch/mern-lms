import React, { useContext, useState } from "react";
import { Navbar, Nav, Container, Button, NavDropdown, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavbarComponent() {
  const { user, logout } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-lg">
      <Container>

        <Navbar.Brand as={Link} to="/" onClick={handleClose}>
          MERN LMS
        </Navbar.Brand>

        <Navbar.Toggle onClick={handleShow} />

        <Navbar.Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>MERN LMS</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="ms-auto">

              <Nav.Link as={Link} to="/" onClick={handleClose}>
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/about" onClick={handleClose}>
                About
              </Nav.Link>

              {user && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/courses"
                    onClick={handleClose}
                  >
                    Courses
                  </Nav.Link>

                  <Nav.Link
                    as={Link}
                    to="/profile"
                    onClick={handleClose}
                  >
                    Profile
                  </Nav.Link>
                </>
              )}

              {!user && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/login"
                    onClick={handleClose}
                  >
                    Login
                  </Nav.Link>

                  <Nav.Link
                    as={Link}
                    to="/register"
                    onClick={handleClose}
                  >
                    Register
                  </Nav.Link>
                </>
              )}

              {user && (
                <NavDropdown title={user.name} id="user-nav-dropdown">

                  {user.role === "student" && (
                    <NavDropdown.Item
                      as={Link}
                      to="/student"
                      onClick={handleClose}
                    >
                      My Courses
                    </NavDropdown.Item>
                  )}

                  {user.role === "instructor" && (
                    <>
                      <NavDropdown.Item
                        as={Link}
                        to="/instructor/courses"
                        onClick={handleClose}
                      >
                        Manage Courses
                      </NavDropdown.Item>

                      <NavDropdown.Item
                        as={Link}
                        to="/courses/create"
                        onClick={handleClose}
                      >
                        Create Course
                      </NavDropdown.Item>
                    </>
                  )}

                  {user.role === "admin" && (
                    <NavDropdown.Item
                      as={Link}
                      to="/admin/users"
                      onClick={handleClose}
                    >
                      Manage Users
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Divider />

                  <NavDropdown.Item
                    as={Button}
                    onClick={() => {
                      logout();
                      handleClose();
                    }}
                    variant="danger"
                  >
                    Logout
                  </NavDropdown.Item>

                </NavDropdown>
              )}

            </Nav>
          </Offcanvas.Body>

        </Navbar.Offcanvas>

      </Container>
    </Navbar>
  );
}

export default NavbarComponent;