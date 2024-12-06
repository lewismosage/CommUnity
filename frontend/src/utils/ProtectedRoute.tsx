import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

// Export type declaration
export type ProtectedRouteProps = {
  children: React.ReactElement;
};

// Export the component as a named export
export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Default export
export default ProtectedRoute;
