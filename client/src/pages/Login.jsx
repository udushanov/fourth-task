import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="username" />
        <input type="text" placeholder="password" />
        <button>Login</button>
        <p>This is an error</p>
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
}
