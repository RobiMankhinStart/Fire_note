import { FaUndo } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";

const RemovedCard = ({
  handleDelete,
  handleRecicle,
  title,
  content,
  color = "#ffffff",
}) => (
  <div
    style={{ backgroundColor: color }}
    className={`bg[${color}] w-[300px] md:w-[360px] gap-3 flex justify-between rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer`}
  >
    <div>
      <h3 className="font-medium text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2 text-sm">{content}</p>
    </div>
    <div className="flex items-center gap-5">
      <div onClick={handleRecicle}>
        <FaUndo className="text-2xl text-green-700 " />
      </div>
      <div onClick={handleDelete}>
        <MdOutlineDeleteForever className="text-4xl text-red-600 " />
      </div>
    </div>
  </div>
);
export default RemovedCard;
