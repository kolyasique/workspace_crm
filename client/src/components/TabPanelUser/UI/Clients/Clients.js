/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import './Clients.css';
import CreateClientTask from './UI/CreateClientTask';
import ClientDocuments from './UI/ClientDocuments';
import ModalClient from './ModalClient';
import { UserContext } from '../../../../context/User.context';

export default function Clients() {
  const [component, setComponent] = useState(null);
  const [clients, setClients] = useState([]);
  const [clientTasks, setClientTasks] = useState([]);
  const [progressValue, setProgressValue] = useState({});
  const {
    tasks, setTasks, allWorkers, taskStatus, setTaskStatus,
  } = useContext(UserContext);
  const [visibleModalForOrder, setVisibleModalForOrder] = useState(false);
  const abortController = new AbortController();

  const [findClient, setFindClient] = useState({ query: '' });

  const findClients = clients.filter((el) => (el.name.toLowerCase() + String(el.inn) + el.email + el.adress.toLowerCase()).includes(findClient.query.toLowerCase()));
  // const handeleInput = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };
  const handleClick = async (e) => {
    try {
      console.log(e, 'Создать заявку');
      setVisibleModalForOrder(true);
    } catch (error) {
      console.log(error);
      // showToast({ message: 'Не получилось', type: 'error' });
    }
  };

  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/getclients', {
      credentials: 'include',
      // ручка за которую у нас цепляется abortcontroller
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);

  // useEffect(() => {
  //   fetch('http://localhost:6622/api/userpanel/gettasks', {
  //     credentials: 'include',
  //     signal: abortController.signal,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTasks(data.allTasks);
  //       // setAllWorkers(data.workers);
  //     });
  // }, []);
  // const getUserDays = (userCreationDay) => {
  //   const date = new Date();
  //   const timeDiff = Math.abs(date.getTime() - userCreationDay.getTime());
  //   const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  //   return console.log(diffDays);
  // };

  function getUserDays(userCreationDay) {
    const date1 = new Date(userCreationDay);
    const date2 = new Date();

    const timeDiff = date2.getTime() - date1.getTime();

    const diffDaysRound = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDaysRound;
  }

  function caseForProgress(id, value) {
    console.log(id, 'id', value, 'value');
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
      for (let i = 0; i < statesArr.length; i++) {
        caseForProgress(statesArr[i]);
        console.log(statesArr[i], '++');
        console.log(taskStatus[statesArr[i]], '+++');
        caseForProgress(statesArr[i], taskStatus[statesArr[i]][0]);
      }
    },
    [taskStatus],
  );

  console.log(taskStatus);
  return (
    <div>
      <div className="clientPanel">
        <input type="text" id="searchfilter" value={findClient.query} onChange={(e) => { setFindClient({ query: e.target.value }); }} placeholder="Поиск клиента (по инн или названию)" />
      </div>
      <div className="clientListDiv">
        {findClients.map((client) => (
          <div key={client.id} className="clientItem">
            <div className="clientInfo">
              <div className="clientInfoHead">
                <div className="clientInn">{client.inn}</div>
                <div className="clientName">{client.name}</div>
                <div className="clientPartnershipAge">
                  {`С нами уже: ${getUserDays(client.createdAt)} дня`}
                </div>
              </div>
              <div>{`адрес: ${client.adress}`}</div>

              <div>{client.email}</div>
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
                    <div className={(clientTask.status === false && clientTask.progress_status !== 'Завершить') ? 'oneFailedClientTask' : 'oneClientTask'}>

                      <div className="clientTaskTitle">{clientTask.title}</div>
                      <div className="executorTaskStatus">
                        <div className="clientTaskExecutor">
                          {`Ответственный: ${(allWorkers.filter((el) => el.id == clientTask.worker_id))[0].name} ${(allWorkers.filter((el) => el.id == clientTask.worker_id))[0].second_name}`}
                        </div>
                        <div className="executorProgressStatus">
                          <progress max="100" value={progressValue[clientTask.id] !== undefined ? progressValue[clientTask.id] : caseForProgressFromBase(clientTask.progress_status)}> </progress>
                        </div>
                      </div>
                    </div>
                  ))}

              </div>
              {/* <button type="button" value={client.createdAt} onClick={(e) => { getUserDays(e.target.value); }}>SKOLKO</button> */}
            </div>
            {/* <input type="file" onChange={uploudImg} />
          <button type="submit" id={client.id} onClick={handleSubmit}>Загрузить документ</button> */}
            <button type="button" id={client.id} onClick={(e) => { handleClick(e); setComponent(<CreateClientTask client={client} />); }}>Создать задачу</button>
            <button type="button" id={client.id}>Взаимодействие</button>
            <button type="button" id={client.id} onClick={(e) => { handleClick(e); setComponent(<ClientDocuments client={client} />); }}>Документы</button>
            <button type="button" id={client.id}>Удалить</button>
          </div>
        ))}
      </div>
      <ModalClient visible={visibleModalForOrder} setVisible={setVisibleModalForOrder}>
        {component}
      </ModalClient>
    </div>
  );
}
