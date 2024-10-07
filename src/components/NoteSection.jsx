import React from 'react';

const NoteSection = ({ data }) => {
  return (
    <div>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((note) => (
          <div key={note.id || note.timestamp.toMillis()}>
            <p>{note.content}</p>
            <p>{note.timestamp.toDate().toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
}

export default NoteSection;
