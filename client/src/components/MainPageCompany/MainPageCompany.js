import React, { useEffect, useState } from 'react';
import AddWorkersForm from '../AddWorkersForm/AddWorkersForm';
import WorkerList from '../WorkerList/WorkerList';
import cl from './MainPageCompany.module.css';

export default function MainPageCompany() {
  const [workers, setWorkers] = useState([]);
  const abortController = new AbortController();

  useEffect(() => {
    fetch('http://localhost:6622/api/adminpanel/getworkers', {
      credentials: 'include',
      // ручка за которую у нас цепляется abortcontroller
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setWorkers(data));
  }, [workers]);
  return (

    <div className={cl.workerPanel}>
      <div className={cl.workerForm}><AddWorkersForm /></div>
      <div className={cl.workerList}><WorkerList workers={workers} /></div>
    </div>
  );
}
