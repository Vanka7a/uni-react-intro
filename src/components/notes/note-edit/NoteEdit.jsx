import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { saveNote, getNoteById } from '../../../api/notesApi';

export default function NoteEdit(props) {
  const [editedNote, setEditedNote] = useState({'title': '', 'content': '', 'authorId': '', 'authorName': ''});
  const [successRedirect, setSuccessRedirect] = useState(false);
  const id = props.computedMatch.params.id;

  const onInputChange = (event) => {
    setEditedNote({ ...editedNote, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    if (id) {
      getNoteById(id).then((currNote) => {
        setEditedNote(currNote.data);
      });
    }
  }, [id]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    saveNote(editedNote).then(() => {
      console.log('note edit successful.');
      setSuccessRedirect(true);
    }).catch(err => console.error(err));
  }

  return (
    <>
    { successRedirect && <Redirect to="/notes" />}
    <div>
      <form onSubmit={onFormSubmit}>
        <div className="note-inputs-wrapper">
          <input
            type="text"
            name="title"
            placeholder="title"
            className="note-title"
            value={editedNote.title}
            onChange={onInputChange} />
          <textarea
            name="content"
            placeholder="content"
            className="note-content"
            value={editedNote.content}
            onChange={onInputChange} />
          <button className="save-button">Save</button>
        </div>
      </form>
    </div>
    </>
  );
}