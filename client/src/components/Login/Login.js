/* eslint-disable max-len */
import React, { useState } from 'react';

import './Login.css';
import './toggle.css';

const formInitialState = {
  login: '',
  password: '',
};

export default function Login() {
  const [loginForm, setLoginForm] = useState([]);
  const [admSignup, setAdmSignup] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginForm);

    const url = 'http://localhost:6622/api/auth/signin';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginForm),
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw new Error('Something went wrong');
      })
      .catch(console.error);
    setLoginForm(formInitialState);
  };
  const handleFormChange = () => {
    setAdmSignup(!admSignup);
  };
  const handleInput = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  return (
    <div className="loginFormDiv">
      <form className="loginForm" onSubmit={handleSubmit}>
        {/* <div className={`mb-3 ${isSignup ? 'visible' : 'invisible'}`}> */}
        <div className="inf">
          {/* <img className="log8o" src={log8o} alt="VB" /> */}
          <p className="inftext">Вход для сотрудника</p>
        </div>
        <div className="form-input">
          <label className="form-label">login</label>
          <input type="text" className="form-control" value={loginForm.login} name="login" onChange={handleInput} />
        </div>

        <div className="form-input">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={loginForm.password} name="password" onChange={handleInput} />
        </div>

        <div className="toggle1-switch">
          <p>Войти как сотрудник</p>
          <div>
            <input className="toggle1" type="checkbox" id="toggle1" onClick={handleFormChange} checked={!admSignup} />
            <label className="toggle1-label" htmlFor="toggle1" />
          </div>
          <p>Войти как админ</p>
        </div>

        <button type="submit" className="buttonSubmit">Submit</button>
      </form>
    </div>
  );
}
