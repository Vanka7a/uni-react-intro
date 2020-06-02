import React, { useState, useEffect } from 'react';
import UserCard from '../users/user-card/UserCard';
import { getUserById } from '../../api/usersApi';

export default function User(props) {
  const [user, setUser] = useState({});
  const id = props.computedMatch.params.id;

  useEffect(() => {
    getUserById(id).then((response) => {
        setUser(response.data);
      });
  }, [id]);

  return (
    <div>
      <UserCard user={user}/>
    </div>
  );
}