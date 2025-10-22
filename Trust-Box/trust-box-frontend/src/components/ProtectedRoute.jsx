// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // if token not found → redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // else render the child route
  return children;
};

export default ProtectedRoute;
