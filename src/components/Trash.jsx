import { useEffect, useState } from "react";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import RemovedCard from "./RemovedCard";

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

const Trash = () => {
  const db = getDatabase();
  const [loading, setLoading] = useState(true);
  const [removedNotes, setRemovedNotes] = useState([]);
  console.log("removedNotes : ", removedNotes);
  const userDetails = useSelector((state) => state.first.value);
  // console.log(userDetails.uid);

  const handleRecicle = (user) => {
    set(push(ref(db, "tasks/")), {
      noteTitle: user.notes.noteTitle,
      notedescription: user.notes.notedescription,
      noteColour: user.notes.noteColour,
      noteUser: user.notes.noteUser,
    });
    remove(ref(db, "removedNotes/" + user.key));
  };

  // ------------Remove
  const handleDelete = (user) => {
    remove(ref(db, "removedNotes/" + user.key));
  };

  // ------------RemoveAll

  const handleDeleteAll = () => {
    removedNotes.map((item) => {
      remove(ref(db, "removedNotes/" + item.key));
    });
  };

  useEffect(() => {
    onValue(ref(db, "removedNotes/"), (snapshot) => {
      let myArr = [];
      snapshot.forEach((item) => {
        // console.log("item", item.val());
        if (item.val().noteUser == userDetails.uid) {
          myArr.push({ key: item.key, notes: item.val() });
        }
      });

      console.log("RemovedSnapshot:", snapshot.val());

      setRemovedNotes(myArr);
      setLoading(false);
    });
  }, []);
  return (
    <section className="pt-28 h-screen bg-gray-50">
      <div className="container">
        <div className="trashDiv flex flex-col gap-8">
          <div className=" flex justify-center shadow-md rounded-lg p-2">
            <button
              onClick={handleDeleteAll}
              class="inline-flex text-xl font-semibold font-mono items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white  rounded-md hover:-translate-y-1 hover:scale-110"
            >
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                class="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
              Delete All
            </button>
          </div>
          <div className="  flex flex-wrap items-center justify-around gap-3 ">
            {loading ? (
              // Show placeholders matching number of notes
              Array.from({ length: removedNotes.length || 6 }).map(
                (_, index) => (
                  <div
                    key={index}
                    role="status"
                    className="w-[300px] md:w-[360px] animate-pulse"
                  >
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                  </div>
                )
              )
            ) : removedNotes.length > 0 ? (
              removedNotes.map((item) => (
                <RemovedCard
                  handleDelete={() => handleDelete(item)}
                  handleRecicle={() => handleRecicle(item)}
                  key={item.key}
                  title={item.notes.noteTitle}
                  content={item.notes.notedescription}
                  color={item.notes.noteColour}
                />
              ))
            ) : (
              <p className="text-4xl text-center mt-20 w-full font-bold text-gray-500">
                No notes found
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trash;
