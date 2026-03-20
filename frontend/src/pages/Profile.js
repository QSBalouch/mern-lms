import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  ProgressBar,
  Table,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Loader from "../components/Loader";

function Profile() {
  const { user, logout } = useContext(AuthContext);

  const [courses, setCourses] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [uniqueStudents, setUniqueStudents] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Chart data
  const adminChartData = [
    { name: "Users", value: usersCount },
    { name: "Courses", value: courses.length },
  ];

  const instructorChartData = [
    { name: "Courses", value: courses.length },
    { name: "Students", value: uniqueStudents },
  ];

  useEffect(() => {
    if (!user) return;

    // STUDENT
    if (user.role === "student") {
      setLoading(true);
      API.get("/progress/my-progress").then((res) => {
        const data = res.data;
        setCourses(data);

        const totalLessons = data.reduce((sum, c) => sum + c.totalLessons, 0);
        const completedLessons = data.reduce(
          (sum, c) => sum + c.completedLessons.length,
          0
        );

        const prog = totalLessons
          ? Math.round((completedLessons / totalLessons) * 100)
          : 0;

        setOverallProgress(prog);
        setLoading(false);
      });
    }

    // INSTRUCTOR
    else if (user.role === "instructor") {
      setLoading(true);
      API.get("/courses").then((res) => {
        const myCourses = res.data.filter(
          (c) => c.instructor._id === user._id
        );
        setCourses(myCourses);
        setLoading(false);
      });

      setLoading(true);
      API.get("/instructor/students")
        .then((res) => {
          setUniqueStudents(res.data.count);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setLoading(false));

    }

    // ADMIN
    else if (user.role === "admin") {
      setLoading(true);
      API.get("/users").then((res) => setUsersCount(res.data.length));
      API.get("/courses").then((res) => setCourses(res.data));
      setLoading(false);
    }
  }, [user]);

  if (!user) return null;

  if (loading) return <Loader />;

  return (
    <Container fluid className="vh-100 pt-2">
      <Row style={{ height: "88vh" }}>

        {/* LEFT PANEL */}
        <Col md={3} className="d-flex">
          <Card className="w-100 text-center p-4 d-flex flex-column">

            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff&size=128`}
              alt="profile"
              className="rounded-circle mx-auto mb-3"
              style={{ width: "100px", height: "100px" }}
            />

            <h5 className="fw-bold">{user.name}</h5>
            <p className="text-muted small">{user.email}</p>

            <span className="badge bg-primary mb-3 px-3 py-2">
              {user.role.toUpperCase()}
            </span>

            <div className="d-grid gap-2 mb-3">

              {user.role === "student" && (
                <>
                  <Button variant="outline-primary" as={Link} to="/courses">All Courses</Button>
                  <Button variant="outline-primary" as={Link} to="/student">Enrolled Courses</Button>
                </>
              )}

              {user.role === "instructor" && (
                <>
                  <Button variant="outline-primary" as={Link} to="/courses">View Courses</Button>
                  <Button variant="outline-primary" as={Link} to="/instructor/students">View Students</Button>
                  <Button variant="outline-primary" as={Link} to="/instructor/courses">Manage Courses</Button>
                  <Button variant="outline-primary" as={Link} to="/courses/create">Create New Course</Button>
                </>
              )}

              {user.role === "admin" && (
                <>
                  <Button variant="outline-primary" as={Link} to="/admin/users">Manage Users</Button>
                  <Button variant="outline-primary" as={Link} to="/courses">Manage Courses</Button>
                </>
              )}

            </div>

            <Button variant="danger" className="mt-auto" onClick={logout}>
              Logout
            </Button>
          </Card>
        </Col>

        {/* RIGHT PANEL */}
        <Col md={9} className="d-flex flex-column h-100 overflow-auto">

          {/* STUDENT */}
          {user.role === "student" && (
            <div className="d-flex flex-column h-100">

              {/* TOP CARD */}
              <Card className="shadow-sm p-4 mb-3">
                <h5>Overall Progress</h5>
                <ProgressBar
                  now={overallProgress}
                  label={`${overallProgress}%`}
                  style={{ height: "25px" }}
                />
              </Card>

              {/* TABLE CARD */}
              <Card className="shadow-sm p-3 flex-grow-1 d-flex flex-column">
                <h5>Course Progress</h5>

                <div className="flex-grow-1 overflow-auto">
                  <Table hover>
                    <thead className="table-light sticky-top">
                      <tr>
                        <th>Course</th>
                        <th>Done</th>
                        <th>Total</th>
                        <th>Progress</th>
                      </tr>
                    </thead>

                    <tbody>
                      {courses.map((c) => {
                        const completed = c.completedLessons.length;
                        const total = c.totalLessons;
                        const prog = total
                          ? Math.round((completed / total) * 100)
                          : 0;

                        return (
                          <tr key={c._id}>
                            <td>{c.course.title}</td>
                            <td>{completed}</td>
                            <td>{total}</td>
                            <td style={{ minWidth: "150px" }}>
                              <ProgressBar now={prog} label={`${prog}%`} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Card>
            </div>
          )}

          {/* INSTRUCTOR */}
          {user.role === "instructor" && (
            <>
              <Row className="mb-3">
                <Col md={6}>
                  <Card className="text-center p-4">
                    <h6>Courses</h6>
                    <h2>{courses.length}</h2>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="text-center p-4">
                    <h6>Students</h6>
                    <h2>{uniqueStudents}</h2>
                  </Card>
                </Col>
              </Row>

              <Card className="p-4">
                <h5 className="text-center mb-3">Instructor Analytics</h5>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={instructorChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0d8abc"/>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </>
          )}

          {/* ADMIN */}
          {user.role === "admin" && (
            <>
              <Row className="mb-3">
                <Col md={6}>
                  <Card className="text-center p-4">
                    <h6>Users</h6>
                    <h2>{usersCount}</h2>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className="text-center p-4">
                    <h6>Courses</h6>
                    <h2>{courses.length}</h2>
                  </Card>
                </Col>
              </Row>

              <Card className="p-4">
                <h5 className="text-center mb-3">Platform Analytics</h5>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={adminChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0d8abc"/>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </>
          )}

        </Col>
      </Row>
    </Container>
  );
}

export default Profile;