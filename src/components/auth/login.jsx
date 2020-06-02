import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../api/usersApi';
import './auth.css';

export default function Login() {
  const [userData, setUserData] = useState({});
  const [isLoggedUser, setLoggedUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onInputChange = (event) => {
    setUserData({...userData, [event.target.name]: event.target.value});
    setErrorMessage('');
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    login(userData).then(() => {
      console.log('login success');
      setLoggedUser(true);
    }).catch(err => {
      setErrorMessage(err.message);
    });
  }

  return (
    <>
    { isLoggedUser && <Redirect to="/" />}
    <div className="auth-form-wrapper">
      <form onSubmit={onFormSubmit}>
        <div className="auth-inputs-wrapper">
          <input
            type="email"
            name="email"
            placeholder="email"
            className="auth-input"
            onChange={onInputChange} />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="auth-input"
            onChange={onInputChange} />
          <button className="auth-button">Login</button>
          {errorMessage && <span className="errorMsg">{errorMessage}</span>}
          <p className="auth-redirect">Don't have an account? <Link to="/register">Register now!</Link></p>
        </div>
      </form>
    </div>
    </>
  );
}