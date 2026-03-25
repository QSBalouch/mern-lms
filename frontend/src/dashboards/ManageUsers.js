import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import API from "../services/api";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error loading users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      setLoading(true);
      await API.delete(`/users/${id}`);
      toast.success("User deleted");
      await loadUsers();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) return <Loader />;

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Manage Users</h2>

      <div className="table-responsive">
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
            {users.length === 0 && !loading && (
              <tr>
                <td colSpan="4" className="text-center">
                  No users available.
                </td>
              </tr>
            )}

            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td className="text-break">{u.email}</td>
                <td>
                  <span className={`badge 
                  ${u.role === "admin" ? "bg-danger" :
                      u.role === "instructor" ? "bg-warning" :
                        "bg-success"}`}>
                    {u.role}
                  </span>
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteUser(u._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>

        </Table>
      </div>
    </Container>
  );
}

export default ManageUsers;