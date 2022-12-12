import React, { useEffect, useState } from 'react';
import AddCleintsForm from '../AddClients/AddClientsForm';
import ClientList from '../AddClients/ClientList';
import AddWorkersForm from '../AddWorkersForm/AddWorkersForm';
// import File from '../File/File';
import WorkerList from '../AddWorkersForm/WorkerList';
import cl from './MainPageCompany.module.css';

export default function MainPageCompany() {
  // const [component, setComponent] = useState(<Workers/>);
  const [workers, setWorkers] = useState([]);
  const [clients, setClients] = useState([]);
  const [buttonWorker, setButtonWorker] = useState(true);
  const [buttonClient, setButtonClient] = useState(false);
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
        {(buttonWorker) && (
          <>
            <div className={cl.btnWrap}>
              <button type="button" className={cl.changeForm} onClick={() => { setButtonClient(!buttonClient); setButtonWorker(!buttonWorker); }}>Клиенты</button>
              <div className={cl.workerForm}><AddWorkersForm setWorkers={setWorkers} /></div>
            </div>
            <div className={cl.workerList}>
              <WorkerList setWorkers={setWorkers} workers={workers} />
            </div>
          </>
        )}
        {(buttonClient) && (
          <>
            <div className={cl.btnWrap}>
              <button type="button" className={cl.changeForm} onClick={() => { setButtonWorker(!buttonWorker); setButtonClient(!buttonClient); }}>Сотрудники</button>
              <div className={cl.workerForm}><AddCleintsForm setClients={setClients} /></div>
            </div>
            <div className={cl.workerList}>
              <ClientList setClients={setClients} clients={clients} />
            </div>

          </>
        )}
        {/* <div className="File"><File /></div> */}
      </div>
    </div>
  );
}
