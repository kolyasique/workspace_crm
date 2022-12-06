/* eslint-disable max-len */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startUserAuthAC } from '../../store/actions/userActions';

import './AuthForm.css';
import './toggle.css';

const formInitialState = {
  name: '',
  email: '',
  password: '',
};

// eslint-disable-next-line react/prop-types
export default function AuthForm() {
  const dispatch = useDispatch();
  // const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState(formInitialState);

  // const handleFormChange = () => {
  //   setIsSignup(!isSignup);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(startUserAuthAC(form));

    setForm(formInitialState);
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="authform">
      <form onSubmit={handleSubmit}>
        {/* <div className={`mb-3 ${isSignup ? 'visible' : 'invisible'}`}> */}
        <div className="inf">
          {/* <img className="log8o" src={log8o} alt="VB" /> */}
          <p className="inftext">Зарегистрируйте компанию</p>
        </div>
        <div className="form-input">
          <label className="form-label ">пп</label>
          <input type="text" className="form-control" value={form.name} name="name" placeholder="Название компании" onChange={handleInput} />
        </div>
        <div className="form-input">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" value={form.email} name="email" onChange={handleInput} />
        </div>
        <div className="form-input">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={form.password} name="password" onChange={handleInput} />
        </div>
        <div className="form-input">
          <label className="form-label">Inn</label>
          <input type="number" className="form-control" value={form.inn} name="inn" onChange={handleInput} />
        </div>
        <div className="form-input">
          <label className="form-label">Phone</label>
          <input type="text" className="form-control" value={form.phone} name="phone" onChange={handleInput} />
        </div>
        <div className="form-input">
          <label className="form-label">login</label>
          <input type="text" className="form-control" value={form.login} name="login" onChange={handleInput} />
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
