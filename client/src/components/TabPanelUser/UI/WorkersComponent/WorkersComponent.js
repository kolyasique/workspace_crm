import React, { useEffect, useState } from 'react';
import cl from './WorkersComponent.module.css';

export default function WorkersComponent() {
  const [companyWorkers, setCompanyWorkers] = useState([]);

  const abortController = new AbortController();
  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/getworkers', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setCompanyWorkers(data));
  }, []);
  return (

    <div className={cl.workerListDiv}>
      {companyWorkers.map((worker) => (
        <div className={cl.workerDiv}>
          <div>
            {worker.avatar === null ? (
              <div className={cl.circleAvatar}> Нет фото</div>
            ) : (
              <div className={cl.circleAvatar}><p>{worker.avatar}</p></div>
            )}
          </div>
          <div className={cl.workerSeconName}>{worker.second_name}</div>
          <div className={cl.workerSeconName}>{worker.name}</div>
          <div className={cl.workerSeconName}>{worker.patronymic}</div>
          <div className={cl.workerPhone}>{worker.phone}</div>
          <div className={cl.workerSeconName}><a href={`mailto:${worker.email}`}>{worker.email}</a></div>
          <button type="button">Написать</button>
        </div>
      ))}

    </div>

  );
}
