import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { app, db } from "../api/firebase";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Timestamp, doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import NoteSection from "../components/NoteSection";

const Dashboard = () => {
  const auth = getAuth(app);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [data, setData] = useState([]); // Initialize as an array
  const [errorMessage, setErrorMessage] = useState(""); // To display error messages
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const notesRef = collection(db, "notes", auth.currentUser?.uid, "note"); // Access the 'note' sub-collection
        const snapshot = await getDocs(notesRef);
        let notes = snapshot.docs.map(doc => doc.data()); // Map each document's data
        
        // Sort notes by timestamp in descending order (newest first)
        notes = notes.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
  
        setData(notes); // Set the sorted notes
        console.log("Notes fetched and sorted:", notes);
      } catch (err) {
        console.log(err.message);
      }
    };
    
    if (auth.currentUser?.uid) {
      fetchData();
    }
  }, [auth.currentUser?.uid]);
  
  

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
    setErrorMessage(""); // Clear error message on close
  };

  const handleSaveNote = async () => {
    setSaveLoading(true);
    const noteId = Date.now();
    try {
      await setDoc(
        doc(db, "notes", auth.currentUser.uid, "note", noteId.toString()),
        {
          id: noteId,
          content: noteContent,
          timestamp: Timestamp.now(),
        }
      );
      console.log("Note saved:", noteContent);
      setData((prevData) => [...prevData, { content: noteContent, timestamp: Timestamp.now() }]); // Update local state
      handleCloseModal(); // Close the modal after saving
    } catch (err) {
      setErrorMessage(err.message); // Set error message for display
      console.log(err.message);
    }finally{
      setSaveLoading(false);
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
            {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="mr-2 bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                disabled={saveLoading}
                onClick={handleSaveNote}
                className={`bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 ${saveLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <NoteSection data={data} />
    </div>
  );
};

export default Dashboard;
