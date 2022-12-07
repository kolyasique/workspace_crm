import React from 'react';
import AddWorkersForm from '../AddWorkersForm/AddWorkersForm';
import WorkerList from '../WorkerList/WorkerList';
import cl from './MainPageCompany.module.css';

export default function MainPageCompany() {
  return (

    <div className={cl.workerPanel}>
      <div className={cl.workerForm}><AddWorkersForm /></div>
      <div className={cl.workerList}><WorkerList /></div>
    </div>
  );
}
