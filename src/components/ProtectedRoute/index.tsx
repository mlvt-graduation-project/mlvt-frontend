import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement | null => {
  const { authToken } = useAuth();
  return authToken ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
