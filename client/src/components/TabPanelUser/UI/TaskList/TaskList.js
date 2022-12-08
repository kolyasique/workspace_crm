/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-undef */
import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SliderComponent } from '../Slider/SliderToggle';
import './TaskList.css';
// import SearchTool from '../SearchTool/SearchTool';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalParams, setModalParams] = useState({
    visible: false,
    id: null,
    question: '',
    value: null,
  });
  const [disabledBtn, setDisabledBtn] = useState(true);

  const [taskStatus, setTaskStatus] = useState({ id: null, value: 0, mean: 'Начать ->' });

  useEffect(() => {
    if (taskStatus.value === 100) {
      setDisabledBtn(false);
    }
    if (taskStatus.value !== 100) {
      setDisabledBtn(true);
    }
    // console.log(taskStatus);
  }, [taskStatus]);

  const handleChange = (e) => {
    // setTaskStatus(Number(e.target.value));
    if (e.target.value === '25') {
      setTaskStatus({ id: e.target.id, value: Number(e.target.value), mean: 'Начали' });
    } else if (e.target.value === '50') {
      setTaskStatus({ id: e.target.id, value: Number(e.target.value), mean: 'В процессе' });
    } else if (e.target.value === '75') {
      setTaskStatus({ id: e.target.id, value: Number(e.target.value), mean: 'Заканчиваем' });
    } else if (e.target.value === '100') {
      setTaskStatus({ id: e.target.id, value: Number(e.target.value), mean: 'Выполнено' });
    }
  };
  console.log(taskStatus);
  const abortController = new AbortController();
  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/gettasks', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);
  console.log(taskStatus, disabledBtn, 'Taskstatus');
  return (
    <div className="taskContainer">
      <div className="taskTools">
        <form className="taskTools">
          <input type="text" />
          <button type="submit">искать</button>
        </form>
      </div>
      <div className="taskContainer2">
        <div className="toDoTasks">
          <h2>Задачи</h2>
          {tasks.map((task) => (
            <div key={task.id} className="taskItem">
              <div className="taskItemUpperDiv">
                <div className="taskType">{task.task_type}</div>
                <div className="taskTitle">{task.title}</div>
              </div>
              <div className="taskItemLowerDiv">
                <div className="taskContent">{task.content}</div>
                <input type="checkbox" />
              </div>
              <div>{taskStatus.mean}</div>
              <SliderComponent
                dots
                step={25}
                id={task.id}
                value={taskStatus.value}
                handleChange={handleChange}
                min={0}
                max={100}
                marks={{ 0: 'Начало', 25: 'В работе', 100: 'Выполнено' }}
              />
              <button id={task.id} disabled={disabledBtn} type="button">Завершить</button>

            </div>
          ))}
        </div>
        {/* <div className="taskInProcess">
          <h2>Выполняется</h2>
          {tasks.map((task) => (
            <div className="taskItem">
              <div className="taskTitle">{task.title}</div>
              <input type="checkbox" />
            </div>
          ))}
        </div> */}
      </div>
      {/* <Modal key={modalParams.id} visible={modal} setVisible={setModal} /> */}
    </div>
  );
}
