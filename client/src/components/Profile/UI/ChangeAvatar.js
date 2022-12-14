/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '../../../context/Profile.context';
import { showToast } from '../../../lib/toasti';
import './ProfileForms.css';

export default function ChangeAvatar() {
  const {
    userInfo, setUserInfo, img, setImg, userAvatar, setUserAvatar,
  } = useContext(ProfileContext);

  // const { user } = useSelector((store) => store.userStore);

  // console.log(userInfo.phone, 'user user uis info');
  // console.log(formInitialState);
  // console.log(form);

  // ; setForm(formInitialState);

  const handleSubmit = (e) => {
    // try {
    e.preventDefault();
    const data = new FormData();
    data.append('avatar', img);
    // data.append('form', JSON.stringify(form));
    const url = 'http://localhost:6622/api/avatar';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      // headers: {
      //   'content-type': 'multipart/form-data',
      // },
      body: data,
    })
      .then((res) => res.json())
      .then((newdata) => {
        console.log(newdata);
        setUserInfo({
          avatar: newdata.findThisUser.avatar,
        });
        showToast({ message: 'Файл загружен', type: 'success' });
      });
  };

  const uploudImg = (e) => {
    setImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  return (

    <div className="containerChanges">
      {userInfo.avatar === null ? (
        <div className="profileAvatar"><img className="imgProfile" src="https://www.meme-arsenal.com/memes/31ce45559a80470ce5aadd5ef3983555.jpg" alt="авaтарка" /></div>

      ) : (
        <div className="profileAvatar"><img className="imgProfile" src={`http://localhost:6622/${userInfo.avatar}`} alt="аватарка" /></div>
      )}
      <form className="changeAva" onSubmit={handleSubmit}>
        <div className="formInput">
          <label className="form-label ">Изменить аватар</label>
          <input type="file" name="file" onChange={uploudImg} />
        </div>
        <button type="submit" className="buttonSubmitAva">Загрузить</button>
      </form>
    </div>
  );
}
