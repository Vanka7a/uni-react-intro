import React, { useState, useEffect } from 'react';
import NoteCard from './note-card/NoteCard';
import { getMyNotes, deleteNote } from '../../api/notesApi';

export default function MyNotes() {
  const [userNotes, setUserNotes] = useState([]);

  useEffect(() => {
    getMyNotes().then((notes) => {
      setUserNotes(notes);
    });
  }, []);

  const onNoteDelete = (id) => {
    deleteNote(id).then(() => {
      setUserNotes(userNotes.filter(note => note.id !== id))
    }).catch(err => console.error(err));
  }

  return (
    <div>
      {userNotes.map((note, index) => 
        <NoteCard note={note} key={index} onDelete={onNoteDelete} />)}
    </div>
  );
}