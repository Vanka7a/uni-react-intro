import React, { useState, useEffect } from 'react';
import { getAllNotes, deleteNote } from '../../api/notesApi';
import NoteCard from './note-card/NoteCard';

export default function NotesList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getAllNotes().then((response) => {
      setNotes(response.data);
    })
  }, []);

  const onNoteDelete = (id) => {
    deleteNote(id).then(() => {
      setNotes(notes.filter(note => note.id !== id))
    }).catch(err => console.error(err));
  }

  return (
    <div className="notes-list">
      {notes.map((note, index) => 
        <NoteCard note={note} key={index} onDelete={onNoteDelete} />)}
    </div>
  );
} 