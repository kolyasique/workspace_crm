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
    console.log(workersForList);
    console.log(formTask);
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
      body: JSON.stringify(formTask),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.createTask);
        console.log(data.sessionId, formTask.taskForUserId);
        if (+data.sessionId === +formTask.taskForUserId) {
          setTasks([...tasks, data.createTask]);
        }
      })
      .catch(console.error);
    setFormTask(initialvalue);
  };

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
        <p>Добавить задачу</p>
        <form className={cl.myModalForm} onSubmit={handleSubmit}>
          <input type="text" value={formTask.title} name="title" placeholder="Название" onChange={handleInput} />
          <textarea value={formTask.content} name="content" placeholder="описание" onChange={handleInput} />
          <input type="date" value={formTask.startDate} name="startDate" placeholder="Дата начала" onChange={handleInput} />
          <input type="date" value={formTask.endDate} name="endDate" placeholder="Дата окончания" onChange={handleInput} />
          <label className="form-label ">Должность</label>
          <select name="taskForUserId" value={formTask.taskForUserId} placeholder="кому" onChange={handleInput}>
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
        {children}
        {/* <ModalTimer timeLeft={timeLeft} />
        <QuestionForm question={question} id={id} setVisibleBtn={setVisibleBtn} value={value} /> */}
      </div>
    </div>
  );
}

export default Modal;
