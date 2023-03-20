import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



export function Login() {
  const [inputs, setInputs] = useState({
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
      setError("");
      console.log("start");
      await axios.post("http://localhost:8800/", {
        ...inputs,
        // regisrtydate: new Date().toISOString().slice(0, 19).replace("T", " "),
        // lastlogineddate: new Date()
        //   .toISOString()
        //   .slice(0, 19)
        //   .replace("T", " "),
        // status: "unblocked",
      });
      console.log('end')
      navigate("/main");
      localStorage.setItem('user', JSON.stringify(inputs))
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
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
        <button onClick={handleSubmit}>Login</button>
        {error && <p>{error}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
}
