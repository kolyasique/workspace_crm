import React from 'react';

import CalendarComponent from '../Calendar/Calendar';
import VerticalTabs from '../TabPanelUser/TabPanelUser';

import cl from './MainPageUser.module.css';

export default function MainPageUser() {
  return (

    <div className={cl.workerPanel}>

      <CalendarComponent />
      <VerticalTabs />

    </div>
  );
}
