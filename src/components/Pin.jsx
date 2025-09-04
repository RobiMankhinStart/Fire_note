import React, { useEffect, useState } from "react";
import PinnedCard from "./PinnedCard";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";

const Pin = ({ HandleEdit }) => {
  const db = getDatabase();
  const userDetails = useSelector((state) => state.first.value);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  console.log("pinnedNotes : ", pinnedNotes);
  //.............. read
  useEffect(() => {
    console.log("User UID in effect:", userDetails?.uid);
    onValue(ref(db, "pinNotes/"), (snapshot) => {
      let myArr = [];
      snapshot.forEach((item) => {
        if (item.val().noteUser == userDetails.uid) {
          myArr.push({ key: item.key, notes: item.val() });
        }
      });
      setPinnedNotes(myArr);
    });
  }, []);

  const handleDel = (user) => {
    set(push(ref(db, "removedNotes/")), {
      noteTitle: user.notes.noteTitle,
      notedescription: user.notes.notedescription,
      noteColour: user.notes.noteColour,
      noteUser: user.notes.noteUser,
    });
    remove(ref(db, "pinNotes/" + user.key));
  };
  const handleUnpin = (user) => {
    set(push(ref(db, "tasks/")), {
      noteTitle: user.notes.noteTitle,
      notedescription: user.notes.notedescription,
      noteColour: user.notes.noteColour,
      noteUser: user.notes.noteUser,
    });
    remove(ref(db, "pinNotes/" + user.key));
  };

  return (
    <div className="flex gap-3 flex-wrap">
      {pinnedNotes.map((item) => (
        <PinnedCard
          key={item.key}
          handleUnpin={() => handleUnpin(item)}
          HandleEdit={() => HandleEdit(item, "pinNotes")}
          handleDel={() => handleDel(item)}
          title={item.notes.noteTitle}
          content={item.notes.notedescription}
          color={item.notes.noteColour}
        />
      ))}
    </div>
  );
};

export default Pin;
