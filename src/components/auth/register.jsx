import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login, register } from '../../api/usersApi';
import './auth.css';

export default function Register() {
  const [userData, setUserData] = useState({});
  const [isLoggedUser, setLoggedUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onInputChange = (event) => {
    setUserData({...userData, [event.target.name]: event.target.value});
    setErrorMessage('');
  }

  const onFormSubmit = (event) => {
    event.preventDefault();
    register(userData).then((response) => {
      login({
        "email": userData.email,
        "password": userData.password
      }).then(() => {
        console.log('login success');
        setLoggedUser(true);
      });
    }).catch(err => {
      setErrorMessage(err.message);
    });
  }

  return (
    <>
    {isLoggedUser && <Redirect to="/" />}
    <div className="auth-form-wrapper">
      <form onSubmit={onFormSubmit}>
        <div className="auth-inputs-wrapper">
          <input
            type="text"
            name="name"
            placeholder="name"
            className="auth-input"
            onChange={onInputChange}
            required />
          <input
            type="email"
            name="email"
            placeholder="email"
            className="auth-input"
            onChange={onInputChange}
            required />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="auth-input"
            onChange={onInputChange}
            required />
          <input
            type="number"
            name="age"
            placeholder="age"
            className="auth-input"
            onChange={onInputChange}
            required />
          <button className="auth-button">Register</button>
          {errorMessage && <span className="errorMsg">{errorMessage}</span>}
          <p className="auth-redirect">Already have an account? <Link to="/login">Login!</Link></p>
        </div>
      </form>
    </div>
    </>
  );
}