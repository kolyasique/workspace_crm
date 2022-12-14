
/* eslint-disable no-lone-blocks */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../../context/Profile.context';

import { showToast } from '../../lib/toasti';
import './Profile.css';
import ChangeAvatar from './UI/ChangeAvatar';
import ChangePasswordForm from './UI/ChangePasswordForm';
import ChangePersonalData from './UI/ChangePersonalData';

export default function Profile() {
  const [component, setComponent] = useState(<ChangeAvatar />);
  const [activeButton, setActiveButton] = useState('1');
  const {
    form, setForm, userInfo, setUserInfo, userAvatar, setUserAvatar, img, setImg,
  } = useContext(ProfileContext);

  // const formInitialState = {
  //   second_name: userInfo.second_name,
  //   name: userInfo?.name,
  //   patronymic: userInfo?.patronymic,
  //   login: userInfo?.login,
  //   phone: userInfo?.phone,
  //   email: userInfo?.email,
  // };

  // ; setForm(formInitialState);
  // const handleInput = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };
  // const handleSubmit = (e) => {
  //   // try {
  //   e.preventDefault();
  //   const data = new FormData();
  //   data.append('avatar', img);
  //   // data.append('form', JSON.stringify(form));
  //   const url = 'http://localhost:6622/api/avatar';
  //   fetch(url, {
  //     method: 'POST',
  //     credentials: 'include',
  //     // headers: {
  //     //   'content-type': 'multipart/form-data',
  //     // },
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((newdata) => {
  //       console.log(newdata);
  //       setUserInfo({
  //         avatar: newdata.findThisUser.avatar,
  //       });
  //       showToast({ message: 'Файл загружен', type: 'success' });
  //     });
  // };
  // const handleSubmit1 = (e) => {
  //   // try {
  //   e.preventDefault();
  //   // data.append('form', JSON.stringify(form));
  //   const url = 'http://localhost:6622/api/updworkerinfo';
  //   fetch(url, {
  //     method: 'POST',
  //     credentials: 'include',
  //     // headers: {
  //     //   'content-type': 'multipart/form-data',
  //     // },
  //     body: JSON.stringify(form),
  //   })
  //     .then((res) => res.json());
  // .then((newdata) => {
  //   console.log(newdata);
  //   setUserInfo({
  //     avatar: newdata.findThisUser.avatar,
  //   });
  //   showToast({ message: 'Файл загружен', type: 'success' });
  // });

  // if (res.status === 200) {
  //   showToast({ message: 'Данные изменены', type: 'success' });
  //   setUserInfo({ avatar: data.avatar });
  // }

  // .then((data) => { console.log(data); });
  // };
  // setUserInfo({ avatar: data1.avatar });
  // setForm(formInitialState);
  //     if (res.status === 200) {
  //       showToast({ message: 'Данные изменены', type: 'success' });
  //       setUserInfo({ avatar: res.avatar });
  //     }
  //   } catch (error) {
  //     console.log('======>>>', error);
  //     showToast({ message: 'Не получилось', type: 'error' });
  //   }
  // };
  // const handleSubmit1 = (e) => {
  //   console.log('forma');
  // };

  // const uploudImg = (e) => {
  //   setImg(e.target.files[0]);
  //   console.log(e.target.files[0]);
  // };

  // const avatarPath = () => {
  //   if (userAvatar.path === undefined) {
  //     return userInfo.avatar;
  //   }
  // };
  return (
    <div className="profileDiv">
      <div className="box1">
        <div className="upperMenu">

          <button id="1" className={activeButton === '1' ? 'activeButton1' : 'unActiveButton1'} type="button" onClick={(event) => { setActiveButton(event.target.id); setComponent(<ChangeAvatar />); }}>АВАТАР</button>
          <button id="2" className={activeButton === '2' ? 'activeButton1' : 'unActiveButton1'} type="button" onClick={(event) => { setActiveButton(event.target.id); setComponent(<ChangePersonalData />); }}>ДАННЫЕ</button>
          <button id="3" className={activeButton === '3' ? 'activeButton1' : 'unActiveButton1'} type="button" onClick={(event) => { setActiveButton(event.target.id); setComponent(<ChangePasswordForm />); }}>ПАРОЛЬ</button>

        </div>
        <div className="lowerComponents">{component}</div>
      </div>
    </div>

  );
}

{ /* <div className="formInput">
<label className="form-label ">password</label>
<input type="password" defaultValue="dsfsdfdsfdsf" className="form-control" value={form.password} name="password" placeholder="Пароль сотрудника" onChange={handleInput} />
</div> */ }
