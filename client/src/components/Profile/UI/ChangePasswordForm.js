/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { ProfileContext } from '../../../context/Profile.context';
import { showToast } from '../../../lib/toasti';
import cl from './Password.module.css';

const initialValuePasswordForm = {
  oldpassword: '',
  password: '',
  repassword: '',
};
export default function ChangePasswordForm() {
  const { userInfo } = useContext(ProfileContext);
  const [passwordForm, setPasswordForm] = useState(initialValuePasswordForm);

  const handleInput = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(passwordForm, 'После сабмита!');
    const url = 'http://localhost:6622/api/updworkerpassword';
    if (passwordForm.password === passwordForm.repassword) {
      fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordForm),
      })
        .then((res) => res.json())
        .then((datas) => {
          if (datas.changed === true) {
            setPasswordForm(initialValuePasswordForm);
            showToast({ message: 'Пароль обновлен!', type: 'success' });
          }
          if (datas.changed === false) {
            showToast({ message: 'Вы ввели неверный пароль!', type: 'error' });
          }
        });
    } else showToast({ message: 'Пароли не совпадают!', type: 'warning' });
  };
  console.log(passwordForm);
  return (
    <form className={cl.docForm} onSubmit={handleSubmit}>
      <div className={cl.text}>Создать новый пароль</div>
      <input className={cl.nameOfDoc} type="password" name="oldpassword" value={passwordForm.oldpassword} placeholder="Ваш пароль" onChange={handleInput} />
      <input className={cl.nameOfDoc} type="password" name="password" value={passwordForm.password} placeholder="Введите новый пароль" onChange={handleInput} />
      <input className={cl.nameOfDoc} type="password" name="repassword" value={passwordForm.repassword} placeholder="Подтвердите пароль" onChange={handleInput} />
      <button className={cl.submitDownload} type="submit">Изменить</button>
    </form>
  );
}
