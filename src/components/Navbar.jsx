import React from "react";
import { FiGrid, FiList, FiRefreshCcw, FiLogOut } from "react-icons/fi";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <navbar className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between">
      <h2 className="text-xl font-medium text-gray-800">My Notes</h2>
      <div className="flex items-center space-x-4">
        <div className="size-8 bg-red-600 rounded-full"></div>
        <h3 className="font-semibold">User Name</h3>
        <Link to={"/login"}>
          <FiLogOut className="text-[20px] cursor-pointer" />
        </Link>
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
