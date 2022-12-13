import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/User.context';
import AddCleintsForm from '../AddClients/AddClientsForm';
import ClientList from '../AddClients/ClientList';
import AddWorkersForm from '../AddWorkersForm/AddWorkersForm';
import WorkerList from '../AddWorkersForm/WorkerList';
import cl from './MainPageCompany.module.css';

export default function MainPageCompany() {
  const [workers, setWorkers] = useState([]);
  const [clients, setClients] = useState([]);
  const {
    mainOrProfile,
  } = useContext(UserContext);
  console.log('🚀🚀🚀🚀 =>>>>> file: MainPageCompany.js:15 =>>>>> MainPageCompany =>>>>> mainOrProfile', mainOrProfile);
  const abortController = new AbortController();

  useEffect(() => {
    fetch('http://localhost:6622/api/adminpanel/getworkers', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setWorkers(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:6622/api/adminpanel/getclients', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);

  return (
    <div className={cl.mainPageCompany}>
      <div className={cl.workerPanel}>
        {mainOrProfile ? (
          <>
            <div className={cl.btnWrap}>
              <div className={cl.workerForm}><AddWorkersForm setWorkers={setWorkers} /></div>
            </div>
            <div className={cl.workerList}>
              <WorkerList setWorkers={setWorkers} workers={workers} />
            </div>
          </>
        ) : (
          <>
            <div className={cl.btnWrap}>
              <div className={cl.workerForm}><AddCleintsForm setClients={setClients} /></div>
            </div>
            <div className={cl.workerList}>
              <ClientList setClients={setClients} clients={clients} />
            </div>
          </>
        )}

      </div>
    </div>
  );
}
