import { Outlet, Navigate } from "react-router-dom";

export function PrivateRoutes() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth ? <Outlet /> : <Navigate to="/" />;
}
