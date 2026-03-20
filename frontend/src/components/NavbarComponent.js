import React, { useContext } from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavbarComponent() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-lg">
      <Container>
        <Navbar.Brand as={Link} to="/">MERN LMS</Navbar.Brand>
        <Nav className="ms-auto">

          {/* Home link always visible */}
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>

          {/* Only show these links if user is logged in */}
          {user && (
            <>
              <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            </>
          )}

          {/* Login/Register links if not logged in */}
          {!user && (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          )}

          {/* User dropdown menu */}
          {user && (
            <NavDropdown title={user.name} id="user-nav-dropdown">
              {user.role === "student" && (
                <NavDropdown.Item as={Link} to="/student">My Courses</NavDropdown.Item>
              )}
              {user.role === "instructor" && (
                <>
                  <NavDropdown.Item as={Link} to="/instructor/courses">Manage Courses</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/courses/create">Create Course</NavDropdown.Item>
                </>
              )}
              {user.role === "admin" && (
                <>
                  <NavDropdown.Item as={Link} to="/admin/users">Manage Users</NavDropdown.Item>
                </>
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item as={Button} onClick={logout} variant="danger">Logout</NavDropdown.Item>
            </NavDropdown>
          )}

        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;