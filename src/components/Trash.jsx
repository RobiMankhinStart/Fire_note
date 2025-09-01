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

  const [loading, setLoading] = useState(true);
  const [removedNotes, setRemovedNotes] = useState([]);
  console.log("removedNotes : ", removedNotes);

  useEffect(() => {
    onValue(ref(db, "removedNotes/"), (snapshot) => {
      let myArr = [];
      snapshot.forEach((item) => {
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
    <section className=" h-screen bg-gray-50">
      <div className="container">
        <div className=" pt-10  flex flex-wrap items-center justify-center md:justify-start gap-4">
          {loading ? (
            // Show placeholders matching number of notes
            Array.from({ length: removedNotes.length || 6 }).map((_, index) => (
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
            ))
          ) : removedNotes.length > 0 ? (
            removedNotes.map((item) => (
              <RemovedCard
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
    </section>
  );
};

export default Trash;
