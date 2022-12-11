import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../../context/User.context';
import cl from './UIclasses.module.css';

const initialvalue = {
  title: '',
  content: '',
  startDate: '',
  endDate: '',
  taskForUserId: '',

};
export default function CreateClientTask() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handlesubmit');
    // const taskId = { taskId: [e.target.id] };
    const url = 'http://localhost:6622/api/userpanel/createtask';
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
        console.log(data.createTask);
        console.log(data.sessionId, formClientTask.taskForUserId);
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
      <form className={cl.myModalForm} onSubmit={handleSubmit}>
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
