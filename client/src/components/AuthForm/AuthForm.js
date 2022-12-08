/* eslint-disable max-len */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './AuthForm.css';
import './toggle.css';

const formInitialState = {
  name: '',
  email: '',
  password: '',
  // eslint-disable-next-line no-dupe-keys
  email: '',
  inn: '',
  phone: '',
};

// eslint-disable-next-line react/prop-types
export default function AuthForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState(formInitialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = 'http://localhost:6622/api/auth/signup';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error('Something went wrong');
      })
      .then((res) => {
        dispatch({ type: 'USER_SIGNIN', payload: res });
      })
      .catch(console.error);
    navigate('/adminpage');

    setForm(formInitialState);
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="formDiv">
      <form className="authform" onSubmit={handleSubmit}>
        {/* <div className={`mb-3 ${isSignup ? 'visible' : 'invisible'}`}> */}
        <div className="inf">
          {/* <img className="log8o" src={log8o} alt="VB" /> */}
          <p className="inftext">Зарегистрируйте компанию</p>
        </div>
        <div className="form-input">
          <label className="form-label ">Название компании</label>
          <input type="text" className="form-control" value={form.name} name="name" placeholder="ООО 'Спелая слива'" onChange={handleInput} />
        </div>

        <div className="form-input">
          <label className="form-label">Придумайте логин</label>
          <input type="text" className="form-control" value={form.login} name="login" placeholder="mycompanylogin24" onChange={handleInput} />
        </div>
        <div className="loginPassword">
          <div className="form-input">
            <label className="form-label">Создайте пароль</label>
            <input type="password" className="form-control" value={form.password} name="password" onChange={handleInput} />
          </div>
        </div>
        <div className="form-input">
          <label className="form-label">E-mail</label>
          <input type="email" className="form-control" value={form.email} name="email" placeholder="pochta@gmail.com" onChange={handleInput} />
        </div>
        <div className="form-input">
          <label className="form-label">ИНН организации</label>
          <input type="number" className="form-control" value={form.inn} name="inn" onChange={handleInput} />
        </div>
        <div className="form-input">
          <label className="form-label">Телефон</label>
          <input type="text" className="form-control" value={form.phone} name="phone" onChange={handleInput} />
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
