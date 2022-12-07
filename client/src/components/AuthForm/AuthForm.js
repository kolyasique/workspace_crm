/* eslint-disable max-len */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { startUserAuthAC } from '../../store/actions/userActions';

import './AuthForm.css';
import './toggle.css';

const formInitialState = {
  name: '',
  email: '',
  password: '',
};

// eslint-disable-next-line react/prop-types
export default function AuthForm() {
  const navigate = useNavigate();
  // const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState(formInitialState);

  // const handleFormChange = () => {
  //   setIsSignup(!isSignup);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    setForm(formInitialState);
    try {
      navigate('/adminpage');
    } catch (error) {
      navigate('/reg');
    }
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
