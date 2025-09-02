import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import ResNavBar from "../components/ResNavBar";

const LayoutOne = () => {
  const userData = useSelector((state) => state.first.value);
  const navigate = useNavigate();
  // console.log(userData);
  useEffect(() => {
    if (userData === null) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <ResNavBar />
      <Outlet />
    </div>
  );
};

export default LayoutOne;
