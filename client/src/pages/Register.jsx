import { useState } from "react";
import { Link } from "react-router-dom";

export function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  };

  console.log(inputs);

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
        <button>Register</button>
        <p>This is an error</p>
        <span>
          Do you have an account? <Link to="/login">Register</Link>
        </span>
      </form>
    </div>
  );
}
