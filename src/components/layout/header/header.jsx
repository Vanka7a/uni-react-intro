import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { logout, getLoggedUser } from '../../../api/usersApi';
import './header.css';

const Header = () => {
  const [isLoggedOut, setLogout] = useState(false);
  const loggedUser = getLoggedUser();

  const onLogout = (event) => {
    logout();
    setLogout(true);
  }

  return (
    <>
    { isLoggedOut && <Redirect to='/login'/>}
    <ul className="nav-menu">
      <div className="nav-menu-left">
        <li>
          <Link to="/" className="nav-option">Home</Link>
        </li>
        <li>
          <Link to="/users" className="nav-option">Users</Link>
        </li>
        {
          loggedUser.isAdmin &&
          <li>
            <Link to="/users/create" className="nav-option">Create User</Link>
          </li>
        }
        <li>
          <Link to="/notes" className="nav-option">Notes</Link>
        </li>
        <li>
          <Link to="/notes/create" className="nav-option">Create Note</Link>
        </li>
        <li>
          <Link to="/notes/my-notes" className="nav-option">My Notes</Link>
        </li>
      </div>
      <div className="nav-menu-right">
        <li>
          <Link to="/logout" className="nav-option" onClick={onLogout}>Logout</Link>
        </li>
      </div>
    </ul>
    </>
  );
}

export default Header;