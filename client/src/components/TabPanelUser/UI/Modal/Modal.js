/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import cl from './Modal.module.css';
// import ModalTimer from '../UI/ModalTimer/ModalTimer';
// import QuestionForm from '../QuestionForm/QuestionForm';

const initialvalue = {
  title: '',
  content: '',
  startDate: '',
  endDate: '',
  taskForUserId: '',

};
function Modal({
  children, visible, setVisible, tasks, setTasks,
}) {
  const [workersForList, setWorkersForList] = useState([]);
  const [formTask, setFormTask] = useState(initialvalue);
  const rootClasses = [cl.myModal];

  if (visible) {
    rootClasses.push(cl.active);
  }
  const abortController = new AbortController();
  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/getworkers', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setWorkersForList(data));
  }, []);
  const handleInput = (e) => {
    setFormTask({ ...formTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handlesubmit');
    const url = 'http://localhost:6622/api/userpanel/createtask';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formTask),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.createTask);
        console.log(data.sessionId, formTask.taskForUserId);
        setTasks([...tasks, data.createTask]);
      })
      .catch(console.error);
    setFormTask(initialvalue);
    setVisible(false);
  };

  function today() {
    const todayOK = new Date().toLocaleDateString('ru');
    return todayOK;
  }
  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
        <form className={cl.myModalForm} onSubmit={handleSubmit}>
          <p className={cl.pForModal}>Добавить задачу</p>
          <input className={cl.myModalInput} type="text" value={formTask.title} name="title" placeholder="Название" maxLength="30" onChange={handleInput} required />
          <textarea className={cl.myModalInputTextArea} value={formTask.content} name="content" placeholder="Описание" maxLength="150" onChange={handleInput} />
          <label className={cl.myModalLabel}>Дата начала</label>
          <input className={cl.myModalInputData} type="datetime-local" value={formTask.startDate} name="startDate" placeholder="Дата начала" min="2022-12-16T00:00" max="2055-12-31T00:00" onChange={handleInput} required />
          <label className={cl.myModalLabel}>Дата окончания</label>
          <input className={cl.myModalInputData} type="datetime-local" value={formTask.endDate} name="endDate" placeholder="Дата окончания" min="2022-12-16T00:00" max="2055-12-31T00:00" onChange={handleInput} required />
          <label className={cl.myModalLabel}>Исполнитель задачи</label>
          <select className={cl.myModalInput} name="taskForUserId" value={formTask.taskForUserId} placeholder="кому" onChange={handleInput} required>
            <option selected disabled value="">Сотрудники</option>
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
          <button className={cl.myModalSubmit} type="submit"> Добавить </button>
        </form>
        {children}
      </div>
    </div>
  );
}

export default Modal;
