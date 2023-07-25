/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import './Clients.css';
import CreateClientTask from './UI/CreateClientTask';
import ClientDocuments from './UI/ClientDocuments';
import ClientHistory from './UI/ClientHistory';
import ModalClient from './ModalClient';
import { UserContext } from '../../../../context/User.context';

export default function Clients() {
  const [component, setComponent] = useState(null);

  const [clientTasks, setClientTasks] = useState([]);
  const [progressValue, setProgressValue] = useState({});
  const {
    tasks, setTasks, allWorkers, taskStatus, setTaskStatus, clients, setClients, done, setDone,
  } = useContext(UserContext);
  const [visibleModalForOrder, setVisibleModalForOrder] = useState(false);
  const [findClient, setFindClient] = useState({ query: '' });
  const abortController = new AbortController();

  const findClients = clients
    .filter((el) => (el.name.toLowerCase() + String(el.inn) + el.email + el.adress
      .toLowerCase()).includes(findClient.query.toLowerCase()));

  const handleClick = async (e) => {
    try {
      console.log(e, 'Создать заявку');
      setVisibleModalForOrder(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/getclients', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);

  function getUserDays(userCreationDay) {
    const date1 = new Date(userCreationDay);
    const date2 = new Date();

    const timeDiff = date2.getTime() - date1.getTime();

    const diffDaysRound = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDaysRound;
  }

  function caseForProgress(id, value) {
    switch (value) {
      case 'Начало':
        return setProgressValue({ ...progressValue, [id]: 0 });
      case 'Принята':
        return setProgressValue({ ...progressValue, [id]: 25 });
      case 'Выполняется':
        return setProgressValue({ ...progressValue, [id]: 50 });
      case 'Согласование':
        return setProgressValue({ ...progressValue, [id]: 75 });
      case 'Завершить':
        return setProgressValue({ ...progressValue, [id]: 100 });
      default: return 0;
    }
  }

  function caseForProgressFromBase(progress) {
    switch (progress) {
      case 'Начало':
        return 0;
      case 'Принята':
        return 25;
      case 'Выполняется':
        return 50;
      case 'Согласование':
        return 75;
      case 'Завершить':
        return 100;
      default: return 0;
    }
  }

  console.log(progressValue, 'ПРОГРЕС');
  useEffect(
    () => {
      const statesArr = Object.keys(taskStatus);
      for (let i = 0; i < statesArr.length; i += 1) {
        caseForProgress(statesArr[i]);
        console.log(statesArr[i], '++');
        console.log(taskStatus[statesArr[i]], '+++');
        caseForProgress(statesArr[i], taskStatus[statesArr[i]][0]);
      }
    },
    [taskStatus],
  );

  function checkRestTime(dateOfEnd) {
    const date1 = new Date(dateOfEnd);
    const date2 = new Date();
    const timeDiff = date1.getTime() - date2.getTime();
    const diffDays = (timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  function checkPastTime(dateOfEnd) {
    const date1 = new Date(dateOfEnd);
    const date2 = new Date();
    const timeDiff = date2.getTime() - date1.getTime();
    const diffDays = (timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  return (
    <div className="taskContainerClient">

      <div className="taskContainerClientTools">
        <input type="text" className="searchClientInput" id="searchfilter" value={findClient.query} onChange={(e) => { setFindClient({ query: e.target.value }); }} placeholder="Поиск ИНН | e-mail | Название" />
      </div>
      <div className="taskContainerClient2">
        <div className="clientContainerAll">
          {findClients.sort((a, b) => checkPastTime(a.createdAt) - checkPastTime(b.createdAt)).map((client) => (
            <div key={client.id} className="clientItem">
              <div className="clientInfo">
                <div className="clientInfoHead">
                  <div className="clientName">{client.name}</div>
                  <div className="clientInn">{client.inn}</div>
                  <div className="clientPartnershipAge">
                    {`С нами уже: ${getUserDays(client.createdAt)} дн.`}
                  </div>
                </div>
                <div className="clientAdress12">{`адрес: ${client.adress}`}</div>

                <div className="clientEmailDiv"><a className="clientEmail12" href={`mailto:${client.email}`}>{client.email}</a></div>
                <div className="clientsTasksListDiv">
                  <div className="taskListTitle">
                    {' '}
                    Активные задачи:
                    {' '}
                    {tasks.filter((task) => task.client_id === client.id && (task.status === null || (task.status === false && task.progress_status !== 'Завершить'))).length}
                    {' '}
                  </div>
                  {tasks.filter((task) => task.client_id === client.id && (task.status === null || (task.status === false && task.progress_status !== 'Завершить')))
                    .map((clientTask) => (
                      <div className={(checkRestTime(clientTask.end) > 0 ? ((done[clientTask.id] === true) || (clientTask.status === true) ? 'oneClientTask' : 'oneClientTask') : ('oneFailedClientTask'))}>

                        <div className="clientTaskTitle">{clientTask.title}</div>
                        <div className="executorTaskStatus">
                          <div className="clientTaskExecutor">
                            {`Ответственный: ${(allWorkers.filter((el) => +el.id === +clientTask.worker_id))[0].name} ${(allWorkers.filter((el) => +el.id === +clientTask.worker_id))[0].second_name}`}
                          </div>
                          <div className="executorProgressStatus">
                            <progress max="100" value={progressValue[clientTask.id] !== undefined ? progressValue[clientTask.id] : caseForProgressFromBase(clientTask.progress_status)}> </progress>
                          </div>
                        </div>
                      </div>
                    ))}

                </div>
              </div>

              <div className="clientButtonBar">
                <button type="button" className="clientButton" id={client.id} onClick={(e) => { handleClick(e); setComponent(<CreateClientTask client={client} />); }}>Создать задачу</button>
                <button type="button" className="clientButton" id={client.id} onClick={(e) => { handleClick(e); setComponent(<ClientHistory client={client} />); }}> История</button>
                <button type="button" className="clientButton" id={client.id} onClick={(e) => { handleClick(e); setComponent(<ClientDocuments client={client} />); }}>Документы</button>
              </div>
            </div>
          ))}
        </div>
        <ModalClient visible={visibleModalForOrder} setVisible={setVisibleModalForOrder}>
          {component}
        </ModalClient>
      </div>
    </div>
  );
}
