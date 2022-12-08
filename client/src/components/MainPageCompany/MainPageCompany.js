import React, { useEffect, useState } from 'react';
import AddWorkersForm from '../AddWorkersForm/AddWorkersForm';
import WorkerList from '../WorkerList/WorkerList';
import cl from './MainPageCompany.module.css';

export default function MainPageCompany() {
  const [workers, setWorkers] = useState([]);
  console.log('🚀🚀🚀🚀 =>>>>> file: MainPageCompany.js:9 =>>>>> MainPageCompany =>>>>> workers', workers);
  const abortController = new AbortController();

  useEffect(() => {
    fetch('http://localhost:6622/api/adminpanel/getworkers', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setWorkers(data));
  }, []);

  return (

    <div className={cl.workerPanel}>
      <div className={cl.workerForm}>
        <AddWorkersForm
          setWorkers={setWorkers}
          workers={workers}
        />

      </div>
      <div className={cl.workerList}><WorkerList workers={workers} /></div>
    </div>
  );
}
