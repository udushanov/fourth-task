import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import "./styles.scss";

function App() {
  return (
    <div className="app">
      <div className="container">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
