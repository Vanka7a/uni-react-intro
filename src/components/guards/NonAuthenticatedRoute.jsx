import React from 'react';
import { Redirect } from 'react-router-dom';
import { getLoggedUser } from '../../api/usersApi';

export default function NonAuthenticatedRoute(props) {
  const loggedUser = getLoggedUser();

  if (!loggedUser) {
    return <props.component {...props} />
  }

  return <Redirect to='/' />
}