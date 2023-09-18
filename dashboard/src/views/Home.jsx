import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";

const Home = () => {
  const { role } = useSelector((state) => state.auth);
  if (role === "seller") return <Navigate to="seller/dashboard"></Navigate>;
  else if (role === "admin") return <Navigate to="admin/dashboard"></Navigate>;
  else return <Navigate to="/login" replace />;
};

export default Home;
