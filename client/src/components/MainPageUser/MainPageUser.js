import React from 'react';
import CalendarComponent from '../Calendar/Calendar';
import cl from './MainPageUser.module.css';

export default function MainPageUser() {
  return (

    <div className={cl.workerPanel}>
      <CalendarComponent />
    </div>
  );
}
