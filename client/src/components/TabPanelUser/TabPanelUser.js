/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useContext } from 'react';
import TaskList from './UI/TaskList/TaskList';
import Clients from './UI/Clients/Clients';
import Documents from './UI/Documents/Documents';
import './TabPanelUser.css';
import Stat from './UI/Stat/Stat';
import CalendarComponent from '../Calendar/Calendar';
import ChatContextProvider from '../../context/Main.context';
import Messages from './UI/Messages/Messages';
import WorkersComponent from './UI/WorkersComponent/WorkersComponent';

// const functionalBlocks = {

// };
export default function VerticalTabs() {
  const [component, setComponent] = useState(<TaskList />);
  const [activeButton, setActiveButton] = useState('1');

  return (
    <div className="box">
      <div className="leftMenu">
        <button id="1" className={activeButton === '1' ? 'activeButton' : 'unActiveButton'} type="button" onClick={(event) => { setActiveButton(event.target.id); setComponent(<TaskList />); }}>Главная</button>
        <button id="2" className={activeButton === '2' ? 'activeButton' : 'unActiveButton'} type="button" onClick={(event) => { setActiveButton(event.target.id); setComponent(<Stat />); }}> Статистика</button>
        <button id="3" className={activeButton === '3' ? 'activeButton' : 'unActiveButton'} type="button" onClick={(event) => { setActiveButton(event.target.id); setComponent(<Messages />); }}>Сообщения</button>
        <button id="4" className={activeButton === '4' ? 'activeButton' : 'unActiveButton'} type="button" onClick={(event) => { setActiveButton(event.target.id); setComponent(<Clients />); }}>Клиенты</button>
        <button id="5" className={activeButton === '5' ? 'activeButton' : 'unActiveButton'} type="button" onClick={(event) => { setActiveButton(event.target.id); setComponent(<CalendarComponent />); }}>Календарь</button>
        <button id="6" className={activeButton === '6' ? 'activeButton' : 'unActiveButton'} type="button" onClick={(event) => { setActiveButton(event.target.id); setComponent(<WorkersComponent />); }}>Сотрудники</button>
      </div>
      <div className="rightComponents">{ component }</div>
    </div>

  );
}
