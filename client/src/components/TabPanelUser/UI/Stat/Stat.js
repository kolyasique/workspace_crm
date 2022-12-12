import React, { useState } from 'react';
import Year from './Year/Year';
import './Stat.css';
import Mounth from './Mounth/Mounth';

export default function Stat() {
  const [statPage, setStatPage] = useState(true);
  const [btnStyle, setBtnStyle] = useState(true);

  return (
    <div className="stat">
      <div className="statButtons">
        <button id={btnStyle === true ? 'statBtnActive' : 'statBtnInactive'} className="statBtn leftBtn" type="button" onClick={() => { setStatPage(true); setBtnStyle(true); }}>Годовая статистика</button>
        <button id={btnStyle === false ? 'statBtnActive' : 'statBtnInactive'} className="statBtn rightBtn" type="button" onClick={() => { setStatPage(false); setBtnStyle(false); }}>Месячная статистика</button>
      </div>
      {statPage === true ? <Year /> : <Mounth /> }
    </div>
  );
}
