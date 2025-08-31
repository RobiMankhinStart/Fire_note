import React from "react";
import { CiCircleRemove } from "react-icons/ci";

const NoteCard = ({ handleDel, title, content, color = "#ffffff" }) => (
  <div
    style={{ backgroundColor: color }}
    className={`bg[${color}] flex justify-between rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer`}
  >
    <div>
      <h3 className="font-medium text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2 text-sm">{content}</p>
    </div>
    <div onClick={handleDel}>
      <CiCircleRemove className="text-4xl text-red-600 " />
    </div>

    {/* .............. */}

    <div role="status" class="max-w-sm animate-pulse">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);
export default NoteCard;
