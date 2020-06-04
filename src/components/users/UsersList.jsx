import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser, getLoggedUser } from '../../api/usersApi';
import UserCard from './user-card/UserCard';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const loggedUserId = getLoggedUser().id;

  useEffect(() => {
    getAllUsers().then((response) => {
      setUsers(response.data);
    });
  }, []);

  const onUserDelete = (id) => {
    deleteUser(id).then(() => {
      setUsers(users.filter(user => user.id !== id))
    }).catch(err => console.error(err));
  }

  return (
    <div className="users-list">
      {users
        .filter(u => u.id !== loggedUserId)
        .map((user, index) =>
          <UserCard user={user} key={index} onDelete={onUserDelete} />
      )}
    </div>
  )
}