import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('')
      await axios.post("http://localhost:8800/register", {
        ...inputs,
        regisrtydate: new Date().toISOString().slice(0, 19).replace("T", " "),
        lastlogineddate: new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
        status: "unblocked",
      });
      navigate('/')
    } catch (err) {
      setError(err.response.data)
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          onChange={handleChange}
          name="username"
        />
        <input
          required
          type="text"
          placeholder="email"
          onChange={handleChange}
          name="email"
        />
        <input
          required
          type="text"
          placeholder="password"
          onChange={handleChange}
          name="password"
        />
        <button onClick={handleSubmit}>Register</button>
        {error && <p>{error}</p>}
        <span>
          Do you have an account? <Link to="/">Login</Link>
        </span>
      </form>
    </div>
  );
}
