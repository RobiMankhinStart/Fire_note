import React from "react";
import { FiSearch, FiMenu, FiSettings } from "react-icons/fi";
import { FaRegStickyNote, FaRegLightbulb, FaRegBell } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiArchiveIn } from "react-icons/bi";
import SidebarItem from "./SidebarItem";

const ResNavBar = () => {
  return (
    <nav className="fixed top-26 lg:hidden block">
      <div className="container">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 flex items-center">
            <FiMenu className="text-gray-600 mr-4 cursor-pointer" />
            <h1 className="text-xl font-bold text-gray-800">Notes</h1>
          </div>

          <div className="mt-2">
            <div className="relative mx-4 my-2">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <nav className="mt-6 flex-1">
            <SidebarItem icon={<FaRegStickyNote />} label="Notes" active />
            <SidebarItem icon={<FaRegLightbulb />} label="Ideas" />
            <SidebarItem icon={<FaRegBell />} label="Reminders" />
            <SidebarItem icon={<BiArchiveIn />} label="Archive" />
            <SidebarItem icon={<RiDeleteBinLine />} label="Trash" />
          </nav>

          <div className="p-4 border-t border-gray-200">
            <SidebarItem icon={<FiSettings />} label="Settings" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ResNavBar;
