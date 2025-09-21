import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, showArchiveButtons = false }) {
  return (
    <div className="notes-list">
      {notes.map(note => (
        <NoteItem 
          key={note.id} 
          note={note} 
          showArchiveButtons={showArchiveButtons}
        />
      ))}
    </div>
  );
}

export default NotesList;