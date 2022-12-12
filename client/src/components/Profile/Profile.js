import React, { useState } from 'react';
import { showToast } from '../../lib/toasti';

export default function Profile() {
  const formInitialState = {
    avatar: '',
    login: '',
    password: '',
    phone: '',
    email: '',
  };
  const [img, setImg] = useState(null);
  const [form, setForm] = useState(formInitialState);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = new FormData();
      data.append('avatar', img);
      data.append('form', JSON.stringify(form));
      const url = 'http://localhost:6622/api/avatar';
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: data,
      });
      setForm(formInitialState);
      if (res.status === 200) {
        showToast({ message: 'Данные изменены', type: 'success' });
      }
    } catch (error) {
      console.log('======>>>', error);
      showToast({ message: 'Не получилось', type: 'error' });
    }
  };

  const uploudImg = (e) => {
    setImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div> Profile</div>
        <input type="file" onChange={uploudImg} />

        <div className="form-input">
          <label className="form-label ">login</label>
          <input type="text" className="form-control" value={form.login} name="login" placeholder="Логин сотрудника" onChange={handleInput} />
        </div>

        <div className="form-input">
          <label className="form-label ">password</label>
          <input type="password" defaultValue="dsfsdfdsfdsf" className="form-control" value={form.password} name="password" placeholder="Пароль сотрудника" onChange={handleInput} />
        </div>

        <div className="form-input">
          <label className="form-label ">email</label>
          <input type="text" className="form-control" value={form.email} name="email" placeholder="email" onChange={handleInput} />
        </div>

        <div className="form-input">
          <label className="form-label ">телефон</label>
          <input type="text" className="form-control" value={form.phone} name="phone" placeholder="телефон" onChange={handleInput} />
        </div>

        <button type="submit" className="buttonSubmit">Submit</button>
      </form>
    </div>
  );
}
