import React from 'react';
import { Link } from 'react-router-dom';
import './NoteCard.css';

export default function NoteCard({ note }) {
  return (
    <div className="note-wrapper">
      <div className="note-title">{note.title}</div>
      <div className="note-content">{note.content}</div>
      <div className="note-author">Author: {note.authorName}</div>
      <div className="action-buttons-wrapper">
        <span><Link className="editBtn" to={`/notes/edit/${note.id}`}>Edit</Link></span>
        <span className="deleteBtn">Delete</span>
      </div>
    </div>
  );
}