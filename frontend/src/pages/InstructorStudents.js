import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import API from "../services/api";
import Loader from "../components/Loader";

function InstructorStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.get("/enrollment/instructor/students-list")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <Container className="mt-4">
      <h2>My Students</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 && !loading && <p>No students available.</p>}
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default InstructorStudents;