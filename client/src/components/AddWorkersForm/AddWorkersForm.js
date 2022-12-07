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
};

export default function AddWorkersForm() {
  const [form, setForm] = useState(formInitialState);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = 'http://localhost:6622/api/auth/createuser';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.status === 204) return res.json();
        throw new Error('Something went wrong');
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
            <option value="1">Администратор</option>
            <option value="2" selected>АУП</option>
            <option value="3">Исполняющий сотрудник</option>
          </select>
        </div>

        <button type="submit" className="buttonSubmit">Submit</button>
      </form>
    </div>
  );
}
