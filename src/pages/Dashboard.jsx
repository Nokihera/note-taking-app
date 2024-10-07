import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { app, db } from "../api/firebase";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Timestamp, doc, setDoc } from "firebase/firestore";

const Dashboard = () => {
  const auth = getAuth(app);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        navigate("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleClickNewNote = () => {
    setNewNote(true);
  };

  const handleCloseModal = () => {
    setNewNote(false);
    setNoteContent("");
  };

  const handleSaveNote = async () => {
    const noteId = Date.now();
    try {
      const action = await setDoc(
        doc(db, "notes", auth.currentUser.uid, "note", noteId.toString()),
        {
          content: noteContent,
          timestamp: Timestamp.now(),
        }
      );
      console.log("Note saved:", noteContent);
      handleCloseModal(); // Close the modal after saving
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="px-8 py-7">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleClickNewNote}
          className="flex gap-2 items-center bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        >
          <FaPlus />
          Create Note
        </button>
      </div>

      {newNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-3xl font-bold mb-4">Create Note</h1>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              cols="45"
              rows="10"
              className="w-full border rounded-md p-2 outline-none resize-none"
              placeholder="Write your note here..."
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="mr-2 bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
