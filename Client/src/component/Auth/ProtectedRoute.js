import React from "react";
import { getToken } from "../../ultils/localStorage";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = getToken();
  console.log(!isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
