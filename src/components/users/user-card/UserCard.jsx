import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../api/usersApi';
import './UserCard.css';

export default function UserCard({ user, onDelete }) {
  const loggedUser = getLoggedUser();

  return (
    <div className="user-card">
      <img className="profile-picture" src={user.picture} alt="Profile" />
      <div className="profile-info">
        <div className="name">
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </div>
        <div className="age">Age: {user.age}</div>
        <div className="email">Email: {user.email}</div>
      </div>
      {
        loggedUser.isAdmin &&
        <div className="action-buttons-wrapper">
          <span><Link className="editBtn" to={`/users/edit/${user.id}`}>Edit</Link></span>
          <span className="deleteBtn" onClick={() => onDelete(user.id)}>Delete</span>
        </div>
      }
    </div>
  );
}