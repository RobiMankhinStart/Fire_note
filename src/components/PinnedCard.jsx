import React from "react";
import { BsPinAngleFill } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";

const PinnedCard = ({
  handleUnpin,
  HandleEdit,
  handleDel,
  title,
  content,
  color = "#ffffff",
}) => {
  console.log("heello");
  return (
    <div
      style={{ backgroundColor: color }}
      className="w-[300px] md:w-[360px] flex justify-between rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div>
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2 text-sm">{content}</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="hover:scale-110 duration-200" onClick={HandleEdit}>
          <FaRegEdit className="text-3xl text-gray-700" />
        </div>
        <div className="pr-1 hover:scale-110 duration-200" onClick={handleDel}>
          <FiDelete className="text-3xl text-red-600" />
        </div>
        <div
          className="pr-1 hover:scale-110 duration-200"
          onClick={handleUnpin}
        >
          <BsPinAngleFill className="text-3xl text-blue-700" />
        </div>
      </div>
    </div>
  );
};

export default PinnedCard;
