import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { app, db } from '../api/firebase';
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore';

const NoteDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleSaveNote = async () => {
    const docRef = doc(db, "notes", auth.currentUser?.uid, "note", id);
    await setDoc(docRef, {
      id: id,
      content: data.content,
      timestamp: Timestamp.now()
    });
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "notes", auth.currentUser?.uid, "note", id);
        const docSnap = await getDoc(docRef);
        const note = docSnap.data();
        if (docSnap.exists()) {
          setData(note);
          console.log("Document data:", note);
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
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <textarea
          value={data?.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none min-h-[200px]"
          placeholder="Write your note here..."
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm">
          {data?.timestamp.toDate().toLocaleString()}
        </p>
        <button
          onClick={handleSaveNote}
          className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NoteDetailPage;
