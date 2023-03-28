import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";

export function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await login(inputs);
      navigate("/main");
    } catch (err) {
      console.log(err.response.data);
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
                <h4>Login</h4>
              </Card.Header>
              <Card.Body style={{ backgroundColor: "#f7f5f0" }}>
                <Form>
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
                      Login
                    </Button>
                    {error && (
                      <Alert className="p-1 text-center" variant="danger">
                        {error}
                      </Alert>
                    )}
                  </Form.Group>
                  <div>
                    Do you have an account? <Link to="/register">Register</Link>
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
