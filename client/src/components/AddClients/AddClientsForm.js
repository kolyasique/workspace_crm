/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import './AddClientsForm.css';

const formInitialState = {
  name: '',
  adress: '',
  inn: '',
  email: '',
};

export default function AddCleintsForm({ setClients }) {
  const [form, setForm] = useState(formInitialState);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = 'http://localhost:6622/api/adminpanel/createclient';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((client) => {
        setClients((prev) => [...prev, client]);
      })
      .catch(console.error);
    setForm(formInitialState);
  };
  return (
    <div className="wrapperAddClient">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Добавить клиента</div>
        <div className="input-container ic1">
          <input id="name" type="text" className="input" value={form.name} name="name" placeholder=" " onChange={handleInput} />
          <div className="cut" />
          <label htmlFor="name" className="placeholder">Наименование компании</label>
        </div>

        <div className="input-container ic2">
          <input id="adress" type="text" className="input" value={form.adress} name="adress" placeholder=" " onChange={handleInput} />
          <div className="cut" />
          <label htmlFor="adress" className="placeholder">Адрес</label>
        </div>

        <div className="input-container ic2">
          <input id="inn" type="text" className="input" value={form.inn} name="inn" placeholder=" " onChange={handleInput} />
          <div className="cut" />
          <label htmlFor="inn" className="placeholder">ИНН</label>
        </div>

        <div className="input-container ic2">
          <input id="email" type="text" className="input" value={form.email} name="email" placeholder=" " onChange={handleInput} />
          <div className="cut" />
          <label htmlFor="email" className="placeholder">email</label>
        </div>

        <button type="submit" className="submit">Добавить</button>
      </form>
    </div>
  );
}
