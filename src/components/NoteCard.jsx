import React from "react";
import { CiCircleRemove } from "react-icons/ci";

const NoteCard = ({ handleDel, title, content, color = "#ffffff" }) => (
  <div
    style={{ backgroundColor: color }}
    className={`bg[${color}] w-[300px] md:w-[360px] flex justify-between rounded-lg shadow-sm border  border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer`}
  >
    <div>
      <h3 className="font-medium text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2 text-sm">{content}</p>
    </div>
    <div onClick={handleDel}>
      <CiCircleRemove className="text-4xl text-red-600 " />
    </div>
  </div>
);
export default NoteCard;
