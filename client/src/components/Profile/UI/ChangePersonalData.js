import React, { useContext } from 'react';
import { ProfileContext } from '../../../context/Profile.context';
import { showToast } from '../../../lib/toasti';

export default function ChangePersonalData() {
  const { form, setForm, userInfo } = useContext(ProfileContext);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form, 'ЭТО ФОРМА');
  };

  const handleSubmit = (e) => {
    // try {
    e.preventDefault();
    console.log('_+_+__+_+_+_', form);
    // data.append('form', JSON.stringify(form));
    const url = 'http://localhost:6622/api/updworkerinfo';
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
          res.json();
          showToast({ message: 'Информация обновлена!', type: 'success' });
        }
      });
  };

  return (
    <div className="formData">

      <form className="formPersonalData" onSubmit={handleSubmit}>
        <div className="formInput">
          <label className="form-label ">login</label>
          <input type="text" className="form-control" value={form.login} name="login" placeholder={userInfo.login} onChange={handleInput} />
        </div>

        <div className="formInput">
          <label className="form-label ">Фамилия</label>
          <input type="text" className="form-control" value={form.second_name} name="second_name" placeholder="Вы поменяли фамилию?" onChange={handleInput} />
        </div>
        <div className="formInput">
          <label className="form-label ">Имя</label>
          <input type="text" className="form-control" value={form.name} name="name" placeholder="У вас сменилось имя?" onChange={handleInput} />
        </div>
        <div className="formInput">
          <label className="form-label ">Отчество</label>
          <input type="text" className="form-control" value={form.patronymic} name="patronymic" placeholder="У вас поменяся отец?" onChange={handleInput} />
        </div>

        <div className="formInput">
          <label className="form-label ">E-mail</label>
          <input type="email" className="form-control" value={form.email} name="email" placeholder="email" onChange={handleInput} />
        </div>

        <div className="formInput">
          <label className="form-label ">Контактный номер</label>
          <input type="text" className="form-control" value={form.phone} name="phone" placeholder="телефон" onChange={handleInput} />
        </div>
        <button type="submit" className="buttonSubmitData">Подтвердить</button>
      </form>
    </div>
  );
}