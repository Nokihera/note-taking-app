import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { app, db } from "../api/firebase";
import { Timestamp, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

const NoteDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleSaveNote = async () => {
    setSaveLoading(true);
    try {
      const docRef = doc(db, "notes", auth.currentUser?.uid, "note", id);
      await setDoc(docRef, {
        id: id,
        content: data.content,
        timestamp: Timestamp.now(),
      });
    } catch (err) {
      console.log(err.message);
    } finally {
      setSaveLoading(false);
      navigate("/");
    }
  };

  const handleOnClickDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) return;

    setDeleteLoading(true);
    try {
      const docRef = doc(db, "notes", auth.currentUser?.uid, "note", id);
      await deleteDoc(docRef);
    } catch (err) {
      console.log(err.message);
    } finally {
      setDeleteLoading(false);
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "notes", auth.currentUser?.uid, "note", id);
        const docSnap = await getDoc(docRef);
        const note = docSnap.data();
        if (docSnap.exists()) {
          setData(note);
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [auth.currentUser?.uid, id]);

  if (loading) {
    return <p className="text-center mt-4 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <div className="flex justify-end mb-4">
        <button
          disabled={deleteLoading}
          onClick={handleOnClickDelete}
          className={`bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 ${deleteLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Delete
        </button>
      </div>
      <div className="mb-6">
        <textarea
          value={data?.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none min-h-[200px] focus:shadow-lg transition duration-150"
          placeholder="Write your note here..."
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm italic">
          Last edited: {data?.timestamp.toDate().toLocaleString()}
        </p>
        <button
          disabled={saveLoading}
          onClick={handleSaveNote}
          className={`bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${saveLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NoteDetailPage;
