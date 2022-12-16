/* eslint-disable max-len */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showToast } from '../../lib/toasti';

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
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === 'не все поля заполнены') {
          showToast({ message: 'Заполните все поля!', type: 'warning' });
          navigate('/reg');
        } else {
          dispatch({ type: 'USER_SIGNIN', payload: res });
        }
      })
      .catch(console.error);
    navigate('/adminpage');

    setForm(formInitialState);
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="formDivAuth">
      <form className="authform" onSubmit={handleSubmit}>
        <div className="inf">
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
          <input type="email" className="form-control" value={form.email} name="email" placeholder="pochta@gmail.com" pattern="\S+@\S+\.\S+" onChange={handleInput} />
        </div>
        <div className="form-input">
          <label className="form-label">ИНН организации</label>
          <input type="text" className="form-control" value={form.inn} name="inn" onChange={handleInput} minLength="12" maxLength="12" placeholder="Введите 12-значный номер ИНН" />
        </div>
        <div className="form-input tel">
          <label className="form-label">Телефон</label>
          <input type="tel" className="form-control" value={form.phone} name="phone" onChange={handleInput} placeholder="+7(926)9554747" pattern="^\+?[0-9]\s?\(?[0-9]{3}\)?\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}" />
        </div>
        <button type="submit" className="buttonSubmit">Регистрация</button>
      </form>
    </div>
  );
}
