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
