import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Form,
  Row,
  Col,
  Container,
  Table,
  Navbar,
  Nav,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Main() {
  const [users, setUsers] = useState([]);

  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/main");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "selectAll") {
      let tempUser = users.map((user) => ({ ...user, isChecked: checked }));
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) =>
        user.id.toString() === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await logout();
    navigate("/");
  };

  const logged = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      return JSON.parse(localStorage.getItem("user"))?.username;
    }

    return "";
  };

  return (
    <>
      <Navbar
        bg="warning"
        expand="lg"
        className="position-absolute top-0 start-0 end-0 d-flex justify-content-end align-items-center"
      >
        <h5 className="me-3">{logged()}</h5>
        <Button
          className="me-5"
          onClick={handleSubmit}
          variant="outline-secondary"
        >
          Log out
        </Button>
      </Navbar>
      <Container style={{ marginTop: "80px" }}>
        <Row>
          <Col className="d-flex justify-content-end gap-2">
            <Button>Block</Button>
            <Button variant="success">Unblock</Button>
            <Button variant="danger">Delete</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="text-center mb-3">User list</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover className="shadow-lg">
              <thead>
                <tr>
                  <th className="d-flex align-items-center gap-2">
                    <Form.Check
                      type="checkbox"
                      name="selectAll"
                      checked={
                        users.filter((user) => user.isChecked !== true).length <
                        1
                      }
                      onChange={handleChange}
                    />
                    <div>Select all</div>
                  </th>
                  <th>ID</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Registrated date</th>
                  <th>Last loginded date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 &&
                  users.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td>
                          <Form.Check
                            type="checkbox"
                            name={user.id}
                            onChange={handleChange}
                            checked={user.isChecked || false}
                          />
                        </td>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{new Date(user.regisrtydate).toLocaleString()}</td>
                        <td>
                          {new Date(user.lastlogineddate).toLocaleString()}
                        </td>
                        <td>{user.status}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
