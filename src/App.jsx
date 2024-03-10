import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
// import { nanoid } from "nanoid";
import { addDoc, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db, notesCollection } from "../firebase";

export default function App() {
  // localStorage
  // const [notes, setNotes] = useState(
  //   () => JSON.parse(localStorage.getItem("notes")) || []
  // );  // Adding db to localStorage
  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(notes));
  // }, [notes]);

  // Adding db to firebase
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState("");
  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];
  const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt);
  const [tempNoteTxt, setTempNoteTxt] = useState("");

  useEffect(() => {
    const unSubscribe = onSnapshot(notesCollection, (snapshot) => {
      // Sync up our local notes array with the snapshot data
      console.log("things are fucked");
      const notesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesArr);
    });
    return unSubscribe;
  }, []);

  useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tempNoteTxt !== currentNote.body) {
        updateNote(tempNoteTxt);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [tempNoteTxt]);

  useEffect(() => {
    if (currentNote) {
      setTempNoteTxt(currentNote.body);
    }
  }, [currentNote]);

  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const newNoteRef = await addDoc(notesCollection, newNote);
    // localStorage
    // setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNoteRef.id);
  }

  // localstorage updates notes
  // function updateNote(text) {
  //   setNotes((oldNotes) => {
  //     const newArray = [];
  //     for (let i = 0; i < oldNotes.length; i++) {
  //       const oldNote = oldNotes[i];
  //       if (oldNote.id === currentNoteId) {
  //         newArray.unshift({ ...oldNote, body: text });
  //       } else {
  //         newArray.push(oldNote);
  //       }
  //     }
  //     return newArray;
  //   });
  // }

  // firebase updates notes
  async function updateNote(text) {
    const docRef = doc(db, "notes", currentNoteId);
    await setDoc(
      docRef,
      { body: text, updatedAt: Date.now() },
      { merge: true }
    );
  }

  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId);
    await deleteDoc(docRef);
    // setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />

          <Editor tempNoteTxt={tempNoteTxt} setTempNoteTxt={setTempNoteTxt} />
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have currently empty notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>{" "}
          <br />
          <button className="first-note second-btn">
            <i className="fa-regular fa-circle-question"></i> &nbsp;How to use
            Note Keeper guide
          </button>
        </div>
      )}
    </main>
  );
}
