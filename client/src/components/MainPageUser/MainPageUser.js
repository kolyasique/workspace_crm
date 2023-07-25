/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import VerticalTabs from '../TabPanelUser/TabPanelUser';

import cl from './MainPageUser.module.css';
import MainContextProvider from '../../context/Main.context';

export default function MainPageUser() {
  return (
    <div className={cl.workerPanel}>
      <MainContextProvider><VerticalTabs /></MainContextProvider>
    </div>
  );
}
