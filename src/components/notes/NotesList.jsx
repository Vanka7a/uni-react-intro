import React, { useState, useEffect } from 'react';
import { getAllNotes } from '../../api/notesApi';
import NoteCard from './note-card/NoteCard';

export default function NotesList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getAllNotes().then((response) => {
      setNotes(response.data);
    })
  }, []);

  return (
    <div className="notes-list">
      {notes.map((note, index) => 
        <NoteCard note={note} key={index} />)}
    </div>
  );
} 