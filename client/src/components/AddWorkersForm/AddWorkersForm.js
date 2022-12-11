/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useState } from 'react';

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
    <div>
      <form onSubmit={handleSubmit}>
        <div> addworkersForm</div>

        <div className="form-input">
          <label className="form-label ">login</label>
          <input type="text" className="form-control" value={form.login} name="login" placeholder="Логин сотрудника" onChange={handleInput} />
        </div>

        <div className="form-input">
          <label className="form-label ">password</label>
          <input type="password" className="form-control" value={form.password} name="password" placeholder="Пароль сотрудника" onChange={handleInput} />
        </div>

        <div className="form-input">
          <label className="form-label ">Имя</label>
          <input type="text" className="form-control" value={form.name} name="name" placeholder="имя" onChange={handleInput} />
        </div>

        <div className="form-input">
          <label className="form-label ">фамилия</label>
          <input type="text" className="form-control" value={form.second_name} name="second_name" placeholder="фамилия" onChange={handleInput} />
        </div>

        <div className="form-input">
          <label className="form-label ">Отчество</label>
          <input type="text" className="form-control" value={form.patronymic} name="patronymic" placeholder="отчество" onChange={handleInput} />
        </div>

        <div className="form-input">
          <label className="form-label ">email</label>
          <input type="text" className="form-control" value={form.email} name="email" placeholder="email" onChange={handleInput} />
        </div>

        <div className="form-input">
          <label className="form-label ">телефон</label>
          <input type="text" className="form-control" value={form.phone} name="phone" placeholder="телефон" onChange={handleInput} />
        </div>

        <div className="form-input">
          <label className="form-label ">Должность</label>
          {/* <input type="text" className="form-control" value={form.phone} name="phone" placeholder="телефон" onChange={handleInput} /> */}
          <select name="select" onChange={handleInput} value={form.category_id}>
            <option selected disabled value="">Категория сотрудника</option>
            <option value={1}>Управляющий</option>
            <option value={2}>Исполняющий</option>
          </select>
        </div>

        <button type="submit" className="buttonSubmit">Submit</button>
      </form>
    </div>
  );
}
