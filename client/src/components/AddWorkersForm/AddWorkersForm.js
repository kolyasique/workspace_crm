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
  select: '',
};

export default function AddWorkersForm({ setWorkers }) {
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
    <div className="wrapperAddWorkers">
      <form className="formWorkers" onSubmit={handleSubmit}>
        <div className="title">Добавить сотрудника</div>
        <div className="input-container ic1">
          <input id="login" type="text" className="input" value={form.login} name="login" placeholder="Логин" onChange={handleInput} required />
        </div>

        <div className="input-container ic2">
          <input id="pass" type="password" className="input" value={form.password} name="password" placeholder="Пароль для входа" onChange={handleInput} required />
        </div>

        <div className="input-container ic2">
          <input id="secondName" type="text" className="input" value={form.second_name} name="second_name" placeholder="Фамилия" onChange={handleInput} required />
        </div>

        <div className="input-container ic2">
          <input id="firstName" type="text" className="input" value={form.name} name="name" placeholder="Имя" onChange={handleInput} required />
        </div>

        <div className="input-container ic2">
          <input id="thirdName" type="text" className="input" value={form.patronymic} name="patronymic" placeholder="Отчество" onChange={handleInput} required />
        </div>

        <div className="input-container ic2">
          <input id="email" type="text" className="input" value={form.email} name="email" placeholder="E-mail" onChange={handleInput} required />
        </div>

        <div className="input-container ic2">
          <input id="phone" type="text" className="input" value={form.phone} name="phone" placeholder="Контактный номер" onChange={handleInput} required />
        </div>
        <div className="select-container">
          <div className="form-group">
            <div className="select-wrapper">
              <select className="select" name="select" onChange={handleInput} value={form.select} required>
                <option value="">Категория сотрудника</option>
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
