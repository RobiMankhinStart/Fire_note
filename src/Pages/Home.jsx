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

const NoteCard = ({ title, content, color = "bg-white" }) => (
  <div
    className={`${color} rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer`}
  >
    <h3 className="font-medium text-gray-800">{title}</h3>
    <p className="text-gray-600 mt-2 text-sm">{content}</p>
  </div>
);

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
  const [colours, setColours] = useState("bg-cyan-100");
  const changeColor = (col) => {
    setColours(col);
  };
  const notes = [
    {
      id: 1,
      title: "Welcome to Notes App",
      content: "Start creating your first note by clicking the + button",
      color: "bg-yellow-50",
    },
    {
      id: 2,
      title: "Shopping List",
      content: "Milk, Eggs, Bread, Fruits",
      color: "bg-blue-50",
    },
    {
      id: 3,
      title: "Meeting Notes",
      content: "Discuss project timeline with team",
      color: "bg-green-50",
    },
    {
      id: 4,
      title: "Ideas",
      content: "Build a new feature for the app",
      color: "bg-pink-50",
    },
    {
      id: 5,
      title: "Books to Read",
      content: "Atomic Habits, Deep Work, The Psychology of Money",
      color: "bg-purple-50",
    },
  ];

  const handleCreate = () => {
    set(push(ref(db, "users/")), {
      username: "Robi",
      roll: 1,
    });
  };

  const handleRemove = () => {
    remove(ref(db, "users/"));
  };
  useEffect(() => {
    // const starCountRef = ref(db, "posts/");
    onValue(ref(db, "users/"), (snapshot) => {
      const data = snapshot.val();
      // updateStarCount(postElement, data);
      console.log(snapshot.val());
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
                className={`${colours}  shadow-md rounded-md p-3 w-[800px] mx-auto flex  justify-between gap-10`}
              >
                <div className="w-[87%] p-2">
                  <input
                    className="font-semibold outline-none text-gray-800 font-mono text-xl p-2 rounded-lg w-[100%] shadow-md shadow-gray-700"
                    placeholder="Name...."
                    type="text"
                  />
                  <textarea
                    className="mt-3 font-semibold outline-none text-gray-800 font-mono text-xl p-2 rounded-lg w-[100%] shadow-md shadow-gray-700"
                    placeholder="your note..."
                    name="text"
                    id="text"
                  ></textarea>
                  <div className="mt-5 flex items-center gap-3">
                    <button
                      onClick={() => changeColor("bg-pink-400")}
                      className="shadow-md shadow-amber-950 size-10 bg-pink-400 rounded-full"
                    ></button>
                    <button
                      onClick={() => changeColor("bg-blue-500")}
                      className="shadow-md shadow-amber-950 size-10 bg-blue-500 rounded-full"
                    ></button>
                    <button
                      onClick={() => changeColor("bg-yellow-400")}
                      className="shadow-md shadow-amber-950 size-10 bg-yellow-400 rounded-full"
                    ></button>
                    <button
                      onClick={() => changeColor("bg-green-500")}
                      className="shadow-md shadow-amber-950 size-10 bg-green-500 rounded-full"
                    ></button>
                  </div>
                </div>
                <button
                  onClick={handleRemove}
                  className="cursor-pointer size-[50px] flex items-center justify-center text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                >
                  <FiPlus className="text-5xl" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {notes.map((note) => (
                  <NoteCard
                    key={note.id}
                    title={note.title}
                    content={note.content}
                    color={note.color}
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
