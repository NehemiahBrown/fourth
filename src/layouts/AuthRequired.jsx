import { useState, useContext } from "react";
import { Outlet, Navigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

import LoadingPage from "../components/layout/LoadingPage.jsx";

export function AuthRequired() {
  const { currentUser, isLoading } = useAuth();

  if(isLoading){
    return <LoadingPage/>
  }

  if (!currentUser) {
    return <Navigate to="login" replace />;
  }

  return <Outlet />;
}
