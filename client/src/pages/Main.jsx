import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Row, Col, Container, Table } from "react-bootstrap";

export function Main() {
  const [users, setUsers] = useState([]);

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
      setUsers(tempUser)
    } else {
      let tempUser = users.map((user) =>
        user.id.toString() === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUser);
    }
  };

  return (
    <>
      <Container className="mt-3">
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
                      checked={users.filter(user => user.isChecked !== true).length < 1}
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
