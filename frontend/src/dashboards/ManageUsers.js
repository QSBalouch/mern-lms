import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import API from "../services/api";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    const res = await API.get("/users");
    setUsers(res.data);
    setLoading(false);
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setLoading(true);
      await API.delete(`/users/${id}`);
      toast.success("User deleted");
      loadUsers();
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) return <Loader />;

  return (
    <Container className="mt-4">
      <h2>Manage Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && !loading && <p>No users available.</p>}
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => deleteUser(u._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ManageUsers;