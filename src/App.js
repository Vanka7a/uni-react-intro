import React from 'react';
import {
  BrowserRouter,
  Switch
} from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Layout from './components/layout/layout';
import AuthenticatedRoute from './components/guards/AuthenticatedRoute';
import NonAuthenticatedRoute from './components/guards/NonAuthenticatedRoute';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <NonAuthenticatedRoute exact path="/login" component={Login} />
        <NonAuthenticatedRoute exact path="/register" component={Register} />
        <AuthenticatedRoute path="/" component={Layout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
