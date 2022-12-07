import React from 'react';
import VerticalTabs from '../TabPanelUser/TabPanelUser';
import cl from './MainPageUser.module.css';

export default function MainPageUser() {
  return (

    <div className={cl.workerPanel}>
      <VerticalTabs />
    </div>
  );
}
