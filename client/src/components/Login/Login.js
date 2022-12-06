/* eslint-disable max-len */
import React, { useState } from 'react';

const formInitialState = {
  login: '',
  password: '',
};

export default function Login() {
  const [loginForm, setLoginForm] = useState([]);

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
  const handleInput = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  return (
    <div className="loginform">
      <form onSubmit={handleSubmit}>
        {/* <div className={`mb-3 ${isSignup ? 'visible' : 'invisible'}`}> */}
        <div className="inf">
          {/* <img className="log8o" src={log8o} alt="VB" /> */}
          <p className="inftext">Зарегистрируйте компанию</p>
        </div>
        <div className="form-input">
          <label className="form-label">login</label>
          <input type="text" className="form-control" value={loginForm.login} name="login" onChange={handleInput} />
        </div>

        <div className="form-input">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={loginForm.password} name="password" onChange={handleInput} />
        </div>

        {/* <div className="toggle-switch">
        <p>Зареги</p>
        <div>
          <input className="toggle" type="checkbox" id="toggle" onClick={handleFormChange} checked={!isSignup} />
          <label className="toggle-label" htmlFor="toggle" />
        </div>
        <p>Sign In</p>
      </div> */}

        <button type="submit" className="buttonSubmit">Submit</button>
      </form>
    </div>
  );
}
