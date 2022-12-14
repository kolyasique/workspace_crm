/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../../context/User.context';
import cl from './ClientDocuments.module.css';

export default function ClientHistory({ client }) {
  console.log(client, 'client in userHistory');
  const { allWorkers, history, setHistory } = useContext(UserContext);

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

  function checkPastTime(dateOfEnd) {
    const date1 = new Date(dateOfEnd);
    const date2 = new Date();
    const timeDiff = date2.getTime() - date1.getTime();
    const diffDays = (timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  function setExecutor(workerId) {
    if (workerId !== undefined) {
      const nameAndSecondName = `${(allWorkers.filter((el) => el.id == workerId))[0].name} ${(allWorkers.filter((el) => el.id == workerId))[0].second_name}`;
      return nameAndSecondName;
    }
    return 'Error';
  }

  function setCloser(closerId) {
    if (closerId !== undefined) {
      const nameAndSecondName = `${(allWorkers.filter((el) => el.id == closerId))[0].name} ${(allWorkers.filter((el) => el.id == closerId))[0].second_name}`;
      return nameAndSecondName;
    }
    return 'Error';
  }

  console.log(history, 'Это должно быть все задачи в компании');
  return (
    <div className={cl.historyTasks}>
      {history.filter((task) => task.client_id === client.id && task.closed_by !== null).sort((a, b) => checkPastTime(a.updatedAt) - checkPastTime(b.updatedAt)).map((filtTask) => (
        <div className={filtTask.status !== false ? cl.oneTaskinHistory : cl.oneTaskinHistoryFailed}>
          <div className={cl.oneTaskinHistoryTitle}>{filtTask.title}</div>

          <div className={cl.oneTaskinHistoryDown}>
            <div>
              {checkPastTime(filtTask.updatedAt) < 1 ? (
                'Закрыта менее дня назад'
              ) : (
                `Закрыта ${Math.round(checkPastTime(filtTask.updatedAt))} дн. назад`
              )}
              <div>{`Исполнитель: ${setExecutor(filtTask.worker_id)}`}</div>
              <div>{`Принял: ${setCloser(filtTask.closed_by)}`}</div>
            </div>
            <div />

          </div>
        </div>
      ))}
    </div>
  );
}
