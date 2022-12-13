import React, { useState } from 'react';
import Year from './Year/Year';
import Month from './Month/Month';
import './Stat.css';

export default function Stat() {
  const [statPage, setStatPage] = useState(true);
  const [btnStyle, setBtnStyle] = useState(true);

  return (
    <div className="stat">
      <div className="statButtons">
        <button id={btnStyle === true ? 'statBtnActive' : 'statBtnInactive'} className="statBtn leftBtn" type="button" onClick={() => { setStatPage(true); setBtnStyle(true); }}>Статистика за текущий год</button>
        <button id={btnStyle === false ? 'statBtnActive' : 'statBtnInactive'} className="statBtn rightBtn" type="button" onClick={() => { setStatPage(false); setBtnStyle(false); }}>Статистика за текущий месяц</button>
      </div>
      {statPage === true ? <Year /> : <Month /> }
    </div>
  );
}
