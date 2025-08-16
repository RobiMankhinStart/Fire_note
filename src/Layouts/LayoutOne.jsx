import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const LayoutOne = () => {
  const userData = useSelector((state) => state.first.value);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData === null) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default LayoutOne;
