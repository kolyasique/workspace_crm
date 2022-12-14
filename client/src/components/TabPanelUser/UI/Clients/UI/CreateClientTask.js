/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
// import client from '../../../../../../../server/db/models/client';
import { UserContext } from '../../../../../context/User.context';
import cl from './ClientDocuments.module.css';

export default function CreateClientTask({ client }) {
  const initialvalue = {
    title: '',
    content: '',
    startDate: '',
    endDate: '',
    taskForUserId: '',
    client_id: client.id,

  };
  const [formClientTask, setClientFormTask] = useState(initialvalue);
  const { tasks, setTasks } = useContext(UserContext);
  const [workersForList, setWorkersForList] = useState([]);
  const abortController = new AbortController();
  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/getworkers', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setWorkersForList(data));
  }, []);
  console.log(client.id, '😉😉😉');
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e.target.id, '😉');
    console.log(formClientTask);
    // formClientTask.append('client_id', client.id);
    // const taskId = { taskId: [e.target.id] };
    const url = 'http://localhost:6622/api/userpanel/createtaskforclient';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formClientTask),
    })
      .then((res) => res.json())
      .then((data) => {
        // if (+data.sessionId === +formClientTask.taskForUserId) {
        setTasks([...tasks, data.createTask]);
        // }
      })
      .catch(console.error);
    setClientFormTask(initialvalue);
    // setVisible(false);
  };

  const handleInput = (e) => {
    setClientFormTask({ ...formClientTask, [e.target.name]: e.target.value });
  };

  return (
    <form className={cl.myModalForm} id={client.id} onSubmit={handleSubmit}>
      <p className={cl.pForModal}>Задача по клиенту</p>
      <p className={cl.p2ForModal}>{client.name}</p>
      <label className={cl.ModalLabel}>Добавить название</label>
      <input type="text" className={cl.myModalInput} value={formClientTask.title} name="title" placeholder="Название" maxLength="30" onChange={handleInput} required />
      <label className={cl.ModalLabel}>Добавить описание</label>
      <textarea value={formClientTask.content} className={cl.myModalInputTextArea} name="content" placeholder="описание" maxLength="150" onChange={handleInput} />
      <label className={cl.ModalLabel}>Установить дату начала</label>
      <input type="datetime-local" className={cl.myModalInputData} value={formClientTask.startDate} name="startDate" min="2022-12-13T00:00" max="2055-12-31T00:00" placeholder="Дата начала" onChange={handleInput} required />
      <label className={cl.ModalLabel}>Установить дедлайн</label>
      <input type="datetime-local" className={cl.myModalInputData} value={formClientTask.endDate} name="endDate" min="2022-12-13T00:00" max="2055-12-31T00:00" placeholder="Дата окончания" onChange={handleInput} required />
      <label className={cl.ModalLabel}>Добавить исполнителя</label>
      <select name="taskForUserId" className={cl.myModalInput} value={formClientTask.taskForUserId} placeholder="кому" onChange={handleInput} required>
        <option selected disabled value="">Выбрать сотрудника</option>
        {workersForList.map((worker) => (
          <option value={worker.id}>
            {worker.second_name}
            {' '}
            {worker.name}
            {' '}
            {worker.patronymic}
          </option>
        ))}
      </select>
      <button type="submit" className={cl.myModalSubmit}> Добавить </button>
    </form>
  );
}
