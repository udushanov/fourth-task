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
        const res = await axios.get(
          `${proccess.env.REACT_APP_SERVER_URL}/main`
        );
        if (res.data.length === 0) {
          navigate("/");
        }

        res.data.forEach(async (user) => {
          if (user.status === "blocked") {
            const active = JSON.parse(localStorage.getItem("user")).id;
            if (user.id === active) {
              await logout();
              navigate("/");
            }
          }
        });

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

  const handleBlock = (e) => {
    e.preventDefault();
    try {
      users.forEach(async (user) => {
        if (user.isChecked) {
          await axios.patch(`${proccess.env.REACT_APP_SERVER_URL}/main`, {
            id: user.id,
            status: "blocked",
          });
        }
      });

      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleUnblock = (e) => {
    e.preventDefault();
    try {
      users.forEach(async (user) => {
        if (user.isChecked) {
          await axios.patch(`${proccess.env.REACT_APP_SERVER_URL}/main`, {
            id: user.id,
            status: "unblocked",
          });
        }
      });

      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    try {
      users.forEach(async (user) => {
        if (user.isChecked) {
          const data = { id: user.id };
          await axios.delete(`${proccess.env.REACT_APP_SERVER_URL}main`, {
            data,
          });

          const active = JSON.parse(localStorage.getItem("user")).id;
          if (user.id === active) {
            await logout();
          }
        }
      });

      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (err) {
      console.log(err.response.data);
    }
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
            <Button onClick={handleBlock}>Block</Button>
            <Button variant="success" onClick={handleUnblock}>
              Unblock
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
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
