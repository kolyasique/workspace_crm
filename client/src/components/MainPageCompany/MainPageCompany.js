import React from 'react';
import AddWorkersForm from '../AddWorkersForm/AddWorkersForm';
import WorkerList from '../WorkerList/WorkerList';
import cl from './MainPageCompany.module.css';

export default function MainPageCompany() {
  return (

    <div className={cl.workerPanel}>
      <AddWorkersForm />
      <WorkerList />
    </div>
  );
}
