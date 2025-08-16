import React from "react";
import { FiGrid, FiList, FiRefreshCcw, FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const userData = useSelector((state) => state.first.value);
  const navigate = useNavigate();
  console.log(userData);
  const hadleLogout = () => {
    navigate("/login");
    localStorage.setItem("userinfo", JSON.stringify(null));
  };
  return (
    <navbar className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between">
      <h2 className="text-xl font-medium text-gray-800">My Notes</h2>
      <div className="flex items-center space-x-4">
        <div className="size-8 bg-red-600 rounded-full">
          <img
            className="w-full object-cover"
            src={
              "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
            }
            alt="user"
          />
        </div>
        <h3 className="font-semibold">{userData.displayName}</h3>
        <div onClick={hadleLogout}>
          <FiLogOut className="text-[20px] cursor-pointer" />
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <FiRefreshCcw className="text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <FiList className="text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <FiGrid className="text-gray-600" />
        </button>
      </div>
    </navbar>
  );
};

export default Navbar;
