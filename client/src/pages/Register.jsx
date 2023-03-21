import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import axios from "axios";

export function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await axios.post("http://localhost:8800/register", {
        ...inputs,
        regisrtydate: new Date().toISOString().slice(0, 19).replace("T", " "),
        lastlogineddate: new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
        status: "unblocked",
      });
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <Container className="vh-100 d-flex justify-content-center flex-column">
        <Row className="d-flex justify-content-center">
          <Col md={3}>
            <Card className="shadow-lg">
              <Card.Header
                className="p-3"
                style={{ backgroundColor: "#ffc107" }}
              >
                <h4>Register</h4>
              </Card.Header>
              <Card.Body style={{ backgroundColor: "#f7f5f0" }}>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control
                      name="username"
                      onChange={handleChange}
                      type="text"
                      placeholder="Username"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      name="email"
                      onChange={handleChange}
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      name="password"
                      onChange={handleChange}
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 text-center">
                    <Button
                      onClick={handleSubmit}
                      variant="warning"
                      type="submit"
                      className="w-100 mb-1"
                    >
                      Register
                    </Button>
                    {error && (
                      <Alert className="p-1 text-center" variant="danger">
                        {error}
                      </Alert>
                    )}
                  </Form.Group>
                  <div>
                    Do you have an account? <Link to="/">Login</Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
