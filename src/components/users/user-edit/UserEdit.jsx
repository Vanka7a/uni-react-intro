import React, { useState, useEffect } from 'react';
import { getUserById, saveUser } from '../../../api/usersApi';
import { Redirect } from 'react-router-dom';

export default function UserEdit(props) {
  const [editedUser, setEditedData] = useState({'name': '', 'email': '', 'password': '', 'age': '', 'isAdmin': false});
  const [successRedirect, setSuccessRedirect] = useState(false);
  const id = props.computedMatch.params.id;

  const onInputChange = (event) => {
    setEditedData({ ...editedUser, [event.target.name]: event.target.value });
  }

  const handleAdminToggle = (event) => {
    setEditedData({ ...editedUser, "isAdmin": !editedUser.isAdmin });
  }

  useEffect(() => {
    if (id) {
      getUserById(id).then((currUser) => {
        setEditedData(currUser.data);
      });
    }
  }, [id]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    saveUser(editedUser).then(() => {
      console.log('edit successful.');
      setSuccessRedirect(true);
    }).catch(err => console.error(err));
  }

  return (
    <>
    { successRedirect && <Redirect to="/users" />}
    <div className="auth-form-wrapper">
      <form onSubmit={onFormSubmit}>
        <div className="auth-inputs-wrapper">
          <input
            type="text"
            name="name"
            placeholder="name"
            className="auth-input"
            value={editedUser.name}
            onChange={onInputChange} />
          <input
            type="email"
            name="email"
            placeholder="email"
            className="auth-input"
            value={editedUser.email}
            onChange={onInputChange} />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="auth-input"
            value={editedUser.password}
            onChange={onInputChange} />
          <input
            type="number"
            name="age"
            placeholder="age"
            className="auth-input"
            value={editedUser.age}
            onChange={onInputChange} />
          <span>isAdmin</span>
          <input
            type="checkbox"
            checked={editedUser.isAdmin}
            onChange={handleAdminToggle} />
          <button className="auth-button">Save</button>
        </div>
      </form>
    </div>
    </>
  )
}