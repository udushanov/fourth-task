import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { PrivateRoutes } from "./utils/PrivateRoutes";

function App() {
  return (
    <div className="app">
      <div className="container">
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/main" element={<Main />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
