/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import './AddWorkersForm.css';

const formInitialState = {
  login: '',
  password: '',
  name: '',
  second_name: '',
  patronymic: '',
  phone: '',
  email: '',
  category_id: '',
};

export default function AddWorkersForm({ setWorkers, workers }) {
  const [form, setForm] = useState(formInitialState);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = 'http://localhost:6622/api/adminpanel/createuser';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((worker) => {
        setWorkers((prev) => [...prev, worker]);
      })
      .catch(console.error);
    setForm(formInitialState);
  };
  return (
    <div className="wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Добавить сотрудника</div>
        <div className="input-container ic1">
          <input id="login" type="text" className="input" value={form.login} name="login" placeholder=" " onChange={handleInput} />
          <div className="cut" />
          <label htmlFor="login" className="placeholder">Логин</label>
        </div>

        <div className="input-container ic2">
          <input id="pass" type="password" className="input" value={form.password} name="password" placeholder=" " onChange={handleInput} />
          <div className="cut" />
          <label htmlFor="pass" className="placeholder">Пароль</label>
        </div>

        <div className="input-container ic2">
          <input id="firstName" type="text" className="input" value={form.name} name="name" placeholder=" " onChange={handleInput} />
          <div className="cut" />
          <label htmlFor="firstName" className="placeholder">Имя</label>
        </div>

        <div className="input-container ic2">
          <input id="secondName" type="text" className="input" value={form.second_name} name="second_name" placeholder=" " onChange={handleInput} />
          <div className="cut" />
          <label htmlFor="secondName" className="placeholder">Фамилия</label>
        </div>

        <div className="input-container ic2">
          <input id="thirdName" type="text" className="input" value={form.patronymic} name="patronymic" placeholder=" " onChange={handleInput} />
          <div className="cut" />
          <label htmlFor="thirdName" className="placeholder">Отчество</label>
        </div>

        <div className="input-container ic2">
          <input id="email" type="text" className="input" value={form.email} name="email" placeholder=" " onChange={handleInput} />
          <div className="cut" />
          <label htmlFor="email" className="placeholder">email</label>
        </div>

        <div className="input-container ic2">
          <input id="phone" type="text" className="input" value={form.phone} name="phone" placeholder=" " onChange={handleInput} />
          <div className="cut" />
          <label htmlFor="phone" className="placeholder">Телефон</label>
        </div>
        <div className="select-container">
          <div className="form-group">
            <div className="select-wrapper">
              <select className="select" name="select" onChange={handleInput} value={form.category_id}>
                <option selected value="">Категория сотрудника</option>
                <option value={1}>Управляющий</option>
                <option value={2}>Исполняющий</option>
              </select>
            </div>
          </div>

        </div>
        <button type="submit" className="submit">Добавить</button>
      </form>
    </div>
  );
}
