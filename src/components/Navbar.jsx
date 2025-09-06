import React from "react";
import { FiGrid, FiList, FiRefreshCcw, FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, Links, useNavigate } from "react-router";
import { userinfo } from "../slices/UserSlice";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiHome } from "react-icons/bi";

const Navbar = () => {
  const userData = useSelector((state) => state.first.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(userData);
  const hadleLogout = () => {
    //   localStorage.setItem("userinfo", JSON.stringify(null));
    dispatch(userinfo(null));
    localStorage.removeItem("userinfo");
    navigate("/login");
  };
  return (
    <section className="bg-white border-b border-gray-200 fixed left-0 right-0">
      <div className="container">
        <nav className="p-6 flex items-center justify-between">
          <h2 className="text-[32px] font-mono font-semibold text-gray-600">
            Noteit-Down
          </h2>
          <div>
            <input
              type="text"
              placeholder="search......"
              className=" p-2 rounded-lg w-[300px] bg-cyan-100 shadow-lg
        "
            />
          </div>
          <div className="flex gap-8">
            <Link to={"/"} className="cursor-pointer hover:scale-110">
              <BiHome className="text-gray-600 text-[30px] cursor-pointer" />
            </Link>
            <Link
              to={"/trash"}
              className="cursor-pointer hover:text-gray-400 hover:scale-110 duration-300"
            >
              <RiDeleteBin5Line className="text-gray-600 text-[30px] cursor-pointer duration-300" />
            </Link>
          </div>
          <div className="flex items-center gap-8">
            <div className="size-8 bg-red-600 rounded-full">
              <img
                className="w-full object-cover"
                src={
                  "https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
                }
                alt="user"
              />
            </div>
            <h3 className="font-semibold">{userData?.displayName}</h3>
            <div onClick={hadleLogout}>
              <FiLogOut className="text-[20px] cursor-pointer" />
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
