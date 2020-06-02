import React from 'react';
import { Switch } from 'react-router-dom';
import UsersList from '../users/UsersList';
import User from '../users/User';
import UserEdit from '../users/user-edit/UserEdit';
import NotesList from '../notes/NotesList';
import NoteEdit from '../notes/note-edit/NoteEdit';
import AuthenticatedRoute from '../guards/AuthenticatedRoute';

const Main = () => {
  return (
    <Switch>
      <AuthenticatedRoute exact path="/users" component={UsersList} />
      <AuthenticatedRoute exact path="/users/create" admin={true} component={UserEdit} />
      <AuthenticatedRoute exact path="/users/:id" component={User} />
      <AuthenticatedRoute exact path="/users/edit/:id" admin={true} component={UserEdit} />

      <AuthenticatedRoute exact path="/notes" component={NotesList} />
      <AuthenticatedRoute exact path="/notes/create" component={NoteEdit} />
      <AuthenticatedRoute exact path="/notes/:id" component={NotesList} />
      <AuthenticatedRoute exact path="/notes/edit/:id" component={NoteEdit} />
    </Switch>
  );
}

export default Main;