/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import cl from './ClientDocuments.module.css';

export default function ClientHistory({ client }) {
  console.log(client, 'client in userHistory');
  const [history, setHistory] = useState([]);

  const abortController = new AbortController();
  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/gethistory', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((clientHistory) => {
        setHistory(clientHistory);
        // setAllWorkers(data.workers);
        // setUserId(data.id);
      });
  }, []);
  console.log(history, 'Это должно быть все задачи в компании');
  return (
    <div className={cl.historyTasks}>
      {history.filter((task) => task.client_id === client.id && task.closed_by !== null).map((filtTask) => (
        <div className={cl.oneTaskinHistory}>
          <div className={cl.oneTaskinHistoryUp}>
            <div>{filtTask.title}</div>
          </div>
          <div className={cl.oneTaskinHistoryDown}>
            <div>{filtTask.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
