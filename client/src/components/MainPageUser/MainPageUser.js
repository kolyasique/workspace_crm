/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import VerticalTabs from '../TabPanelUser/TabPanelUser';

import cl from './MainPageUser.module.css';
import MainContextProvider from '../../context/Main.context';

export default function MainPageUser() {
  const [socket, setSocket] = useState(new WebSocket('ws://localhost:6622'));
  return (
    <div className={cl.workerPanel}>
      <MainContextProvider><VerticalTabs socket={socket} /></MainContextProvider>

    </div>
  );
}
