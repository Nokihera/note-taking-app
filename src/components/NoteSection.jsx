import React from 'react';
import { Link } from 'react-router-dom';

const NoteSection = ({ data }) => {
  return (
    <div className="mt-4">
      {Array.isArray(data) && data.length > 0 ? (
        data.map((note) => (
          <div key={note.id || note.timestamp.toMillis()} className="mb-4 p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white">
            <Link to={`/note/${note.id}`}>
            <p className='line-clamp-1 w-44 text-gray-800'>{note.content}</p>
            <p className="text-gray-500 text-sm mt-2">
              {note.timestamp.toDate().toLocaleString()}
            </p>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No notes available.</p>
      )}
    </div>
  );
}

export default NoteSection;
