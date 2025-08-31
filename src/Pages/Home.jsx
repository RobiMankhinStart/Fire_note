import {
  FiSearch,
  FiMenu,
  FiRefreshCw,
  FiSettings,
  FiPlus,
} from "react-icons/fi";
import { FaRegStickyNote, FaRegLightbulb, FaRegBell } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiArchiveIn } from "react-icons/bi";
import { useEffect, useState } from "react";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { IoIosColorPalette } from "react-icons/io";
import { useSelector } from "react-redux";
import { CiCircleRemove } from "react-icons/ci";
import NoteCard from "../components/NoteCard";

const SidebarItem = ({ icon, label, active = false }) => (
  <div
    className={`flex items-center px-4 py-3 rounded-r-full cursor-pointer ${
      active ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
    }`}
  >
    <span className="mr-4 text-lg">{icon}</span>
    <span className="font-medium">{label}</span>
  </div>
);

const Home = () => {
  const db = getDatabase();
  const [colours, setColours] = useState("#ffffff");
  console.log(colours);
  const [title, setTitle] = useState("");
  const [textArea, setTextArea] = useState("");
  // const [inputcolour, setInputColour] = useState("white");
  // console.log(inputcolour);
  const changeColor = (col) => {
    setColours(col);
  };

  const userDetails = useSelector((state) => state.first.value);
  // console.log(userDetails.uid);

  const handleCreate = () => {
    set(push(ref(db, "tasks/")), {
      noteTitle: title,
      notedescription: textArea,
      noteColour: colours,
      noteUser: userDetails.uid,
    });
    console.log("note added");
  };

  const handleDel = (user) => {
    set(push(ref(db, "removedNotes/")), {
      title: user.notes.noteTitle,
      content: user.notes.notedescription,
      color: user.notes.noteColour,
    });
    // ------------Remove
    remove(ref(db, "tasks/" + user.key));
  };

  const [allNotes, setAllNotes] = useState([]);
  console.log("allNotes : ", allNotes);
  useEffect(() => {
    console.log("User UID in effect:", userDetails?.uid);
    // const starCountRef = ref(db, "posts/");
    onValue(ref(db, "tasks/"), (snapshot) => {
      let myArr = [];
      snapshot.forEach((item) => {
        if (item.val().noteUser == userDetails.uid) {
          myArr.push({ key: item.key, notes: item.val() });
        }
      });

      console.log("Snapshot:", snapshot.val());

      setAllNotes(myArr);
    });
  }, []);
  return (
    <section className=" h-screen bg-gray-50">
      <div className="container">
        <div className="homeDiv flex">
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

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Notes Grid */}
            <main className="flex flex-col gap-8 overflow-y-auto p-6">
              <div
                style={{ backgroundColor: colours }}
                className={`bg[${colours}] shadow-md rounded-md p-3 w-[800px] mx-auto flex  justify-between gap-10`}
              >
                <div className="w-[87%] p-2">
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    className="font-semibold outline-none text-gray-800 font-mono text-xl p-2 rounded-lg w-[100%] shadow-md shadow-gray-700"
                    placeholder="Name...."
                    type="text"
                  />
                  <textarea
                    onChange={(e) => setTextArea(e.target.value)}
                    className={`${
                      title ? " block" : "hidden"
                    } mt-3 font-semibold outline-none text-gray-800 font-mono text-xl p-2 rounded-lg w-[100%] shadow-md shadow-gray-700`}
                    placeholder="your note..."
                    name="text"
                    id="text"
                  ></textarea>
                  <div className="mt-5 flex items-center gap-3">
                    <button
                      onClick={() => changeColor("#FFC0CB")}
                      className="shadow-md shadow-amber-950 size-10 bg-[#FFC0CB] rounded-full"
                    ></button>
                    <button
                      onClick={() => changeColor("#59bae0")}
                      className="shadow-md shadow-amber-950 size-10 bg-[#59bae0] rounded-full"
                    ></button>
                    <button
                      onClick={() => changeColor("#9ACD32")}
                      className="shadow-md shadow-amber-950 size-10 bg-[#9ACD32] rounded-full"
                    ></button>
                    <button
                      onClick={() => changeColor("#eea8a7")}
                      className="shadow-md shadow-amber-950 size-10 bg-[#eea8a7] rounded-full"
                    ></button>
                    <label
                      className="text-[46px] text-emerald-700 cursor-pointer"
                      htmlFor="color"
                    >
                      <IoIosColorPalette />
                    </label>
                    <input
                      onChange={(e) => setColours(e.target.value)}
                      id="color"
                      className="hidden"
                      type="color"
                    ></input>
                  </div>
                </div>
                <button
                  onClick={handleCreate}
                  className="cursor-pointer size-[50px] flex items-center justify-center text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                >
                  <FiPlus className="text-5xl" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {allNotes.map((item) => (
                  <NoteCard
                    handleDel={() => handleDel(item)}
                    key={item.key}
                    title={item.notes.noteTitle}
                    content={item.notes.notedescription}
                    color={item.notes.noteColour}
                  />
                ))}
              </div>
            </main>
          </div>

          {/* Create Note Button */}
          <button className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
            <FiPlus className="text-2xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
