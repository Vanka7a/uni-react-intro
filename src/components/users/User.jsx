import React, { useState, useEffect } from 'react';
import UserCard from '../users/user-card/UserCard';
import { getUserById } from '../../api/usersApi';
import { getNotesByAuthorId, deleteNote } from '../../api/notesApi';
import NoteCard from '../notes/note-card/NoteCard';

export default function User(props) {
  const [user, setUser] = useState({});
  const [userNotes, setUserNotes] = useState([]);
  const id = props.computedMatch.params.id;

  useEffect(() => {
    getUserById(id).then((response) => {
      setUser(response.data);
    });

    getNotesByAuthorId(id).then((notes) => {
      setUserNotes(notes);
    });
  }, [id]);

  const onNoteDelete = (id) => {
    deleteNote(id).then(() => {
      setUserNotes(userNotes.filter(note => note.id !== id))
    }).catch(err => console.error(err));
  }

  return (
    <>
    <div>
      <UserCard user={user} />
    </div>
    <div>
      {userNotes.map((note, index) => 
        <NoteCard note={note} key={index} onDelete={onNoteDelete} />
      )}
    </div>
    </>
  );
}