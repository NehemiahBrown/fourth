import { useState, useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

export function AuthRequired() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="login" replace />;
  }

  return <Outlet />;
}
