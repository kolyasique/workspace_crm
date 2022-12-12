/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
// import client from '../../../../../../../server/db/models/client';
import { UserContext } from '../../../../../context/User.context';
import cl from './UIclasses.module.css';

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
        if (+data.sessionId === +formClientTask.taskForUserId) {
          setTasks([...tasks, data.createTask]);
        }
      })
      .catch(console.error);
    setClientFormTask(initialvalue);
    // setVisible(false);
  };

  const handleInput = (e) => {
    setClientFormTask({ ...formClientTask, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form className={cl.myModalForm} id={client.id} onSubmit={handleSubmit}>
        <input type="text" value={formClientTask.title} name="title" placeholder="Название" onChange={handleInput} />
        <textarea value={formClientTask.content} name="content" placeholder="описание" onChange={handleInput} />
        <input type="datetime-local" value={formClientTask.startDate} name="startDate" placeholder="Дата начала" onChange={handleInput} />
        <input type="datetime-local" value={formClientTask.endDate} name="endDate" placeholder="Дата окончания" onChange={handleInput} />
        <label className="form-label ">Должность</label>
        <select name="taskForUserId" value={formClientTask.taskForUserId} placeholder="кому" onChange={handleInput}>
          <option selected disabled value="">Исполнитель задачи</option>
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
        <button type="submit"> Добавить </button>
      </form>
    </div>
  );
}
