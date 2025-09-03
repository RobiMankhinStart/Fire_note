import { useEffect, useState } from "react";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { IoIosColorPalette } from "react-icons/io";
import { useSelector } from "react-redux";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const db = getDatabase();
  const [colours, setColours] = useState("#ffffff");
  console.log(colours);
  const [title, setTitle] = useState("");
  const [textArea, setTextArea] = useState("");
  const changeColor = (col) => {
    setColours(col);
  };

  const userDetails = useSelector((state) => state.first.value);
  // console.log(userDetails.uid);

  // ...........create
  const handleCreate = () => {
    set(push(ref(db, "tasks/")), {
      noteTitle: title,
      notedescription: textArea,
      noteColour: colours,
      noteUser: userDetails.uid,
    });
    console.log("note added");
    setTitle("");
    setTextArea("");
  };

  // ------------Remove
  const handleDel = (user) => {
    set(push(ref(db, "removedNotes/")), {
      noteTitle: user.notes.noteTitle,
      notedescription: user.notes.notedescription,
      noteColour: user.notes.noteColour,
      noteUser: user.notes.noteUser, // include user for filtering
    });
    remove(ref(db, "tasks/" + user.key));
  };

  //....EditData state.........
  const [editData, setEditData] = useState("");
  console.log(editData);
  // ....editData .......
  const HandleEdit = (data) => {
    setEditData(data);
    setTitle(data.notes.noteTitle);
    setTextArea(data.notes.notedescription);
    setColours(data.notes.noteColour);
  };
  const editDataButton = () => {
    update(ref(db, "tasks/" + editData.key), {
      noteTitle: title,
      notedescription: textArea,
      noteColour: colours,
    });
    setEditData("");
    setTitle("");
    setTextArea("");
    setColours("");
  };

  const [loading, setLoading] = useState(true);
  const [allNotes, setAllNotes] = useState([]);
  console.log("allNotes : ", allNotes);

  //.............. read
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

      // console.log("Snapshot:", snapshot.val());
      setAllNotes(myArr);
      setLoading(false);
    });
    // return()=>MdUnsubscribe()
  }, []);

  return (
    <section className="pt-24 h-screen bg-gray-50">
      <div className="container">
        <div className="homeDiv">
          <div className="items-center flex flex-col overflow-hidden">
            <main className="flex flex-col gap-8 overflow-y-auto p-6">
              {/* Notes Head */}
              <div
                style={{ backgroundColor: colours }}
                className={`bg[${colours}] shadow-md rounded-lg p-4 w-[800px] mx-auto flex  justify-between gap-10`}
              >
                <div className="w-[87%] p-2">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="font-semibold outline-none text-gray-800 font-mono text-xl p-2 rounded-lg w-[100%] shadow-md shadow-gray-700"
                    placeholder="Name...."
                    type="text"
                  />
                  <textarea
                    value={textArea}
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
                      className="shadow-md shadow-amber-950 size-10 bg-[#f3e4e7] rounded-full"
                    ></button>
                    <button
                      onClick={() => changeColor("#59bae0")}
                      className="shadow-md shadow-amber-950 size-10 bg-[#4fc1ee] rounded-full"
                    ></button>
                    <button
                      onClick={() => changeColor("#9ACD32")}
                      className="shadow-md shadow-amber-950 size-10 bg-[#a8e232] rounded-full"
                    ></button>
                    <button
                      onClick={() => changeColor("#eea8a7")}
                      className="shadow-md shadow-amber-950 size-10 bg-[#fae0b8] rounded-full"
                    ></button>
                    <label
                      className="text-[50px] pt-1 text-lime-700 cursor-pointer"
                      htmlFor="color"
                    >
                      <IoIosColorPalette />
                    </label>
                    <input
                      value={colours}
                      onChange={(e) => setColours(e.target.value)}
                      id="color"
                      className="hidden"
                      type="color"
                    ></input>
                  </div>
                </div>
                <div className="mt-3">
                  {editData ? (
                    <button
                      onClick={editDataButton}
                      className="cursor-pointer h-[40px] pb-[1px] w-[120px] text-xl font-semibold font-mono flex items-center justify-center text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                    >
                      Edit Data
                    </button>
                  ) : (
                    <button
                      disabled={!title.trim() || !textArea.trim()}
                      onClick={handleCreate}
                      className={` ${
                        !title.trim() || !textArea.trim()
                          ? "bg-gray-400 cursor-not-allowed" // disabled style
                          : "bg-blue-600 hover:bg-blue-700"
                      } cursor-pointer h-[40px] pb-[1px] w-[120px] text-xl font-semibold font-mono flex items-center justify-center text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors`}
                    >
                      Add Data
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                {loading ? (
                  // Showing placeholders matching number of notes
                  Array.from({ length: allNotes.length || 6 }).map(
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
                ) : allNotes.length > 0 ? (
                  allNotes.map((item) => (
                    <NoteCard
                      HandleEdit={() => HandleEdit(item)}
                      handleDel={() => handleDel(item)}
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
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
