import React from "react";
import { Navigate } from "react-router-dom";
import { AuthService } from "./AuthService";

// AuthGuard for authentication and authorization of user for accessing of application
const AuthGuard = ({ children, role }) => {
  const user = AuthService.getCurrentUser();

  if (!AuthService.isAuthenticated || (role && user?.role !== role)) {
    return <Navigate to="/" />;
  }
  return React.cloneElement(children, {user});
};

export default AuthGuard;
