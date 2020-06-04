import React from 'react';
import { Link } from 'react-router-dom';
import './NoteCard.css';
import { getLoggedUser } from '../../../api/usersApi';

export default function NoteCard({ note, onDelete }) {
  const loggedUser = getLoggedUser();
  const hasActionRights = loggedUser.isAdmin || loggedUser.id === note.authorId;

  return (
    <div className="note-wrapper">
      <div className="note-title">{note.title}</div>
      <div className="note-content">{note.content}</div>
      <div className="note-author">Author: {note.authorName}</div>
      {
        hasActionRights &&
        <div className="action-buttons-wrapper">
          <Link className="editBtn" to={`/notes/edit/${note.id}`}>Edit</Link>
          <span className="deleteBtn" onClick={() => onDelete(note.id)}>Delete</span>
        </div>
      }
    </div>
  );
}