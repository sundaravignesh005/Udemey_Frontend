
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
  requiredRole?: "student" | "instructor";
  currentRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  requiredRole,
  currentRole,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && currentRole && requiredRole !== currentRole) {
    return <Navigate to="/authenticated-home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;