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
  const [taskStatus, setTaskStatus] = useState({ value: 0, mean: 'Начать->' });

  const handleChange = (e) => {
    switch (e.target.value) {
      case 25:
        setTaskStatus({ value: e.target.value, mean: 'Начали' });
        break;
      case 75:
        setTaskStatus({ value: e.target.value, mean: 'Заканчиваем' });
        break;
      case 100:
        setTaskStatus({ value: e.target.value, mean: 'Закончили' });
        break;
      default:
        console.log('Sorry, we are out of');
    }

    setTaskStatus({ value: e.target.value });
  };

  const abortController = new AbortController();
  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/gettasks', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

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
            <div className="taskItem">
              <div className="taskItemUpperDiv">
                <div className="taskType">{task.task_type}</div>
                <div className="taskTitle">{task.title}</div>
              </div>
              <div className="taskItemLowerDiv">
                <div className="taskContent">{task.content}</div>
                <input type="checkbox" />
              </div>
              <div>{taskStatus.value}</div>
              <SliderComponent
                dots
                step={25}
                value={taskStatus.value}
                handleChange={handleChange}
                min={0}
                max={100}
                marks={{ 0: 'Начало', 25: 'В работе', 100: 'Выполнено' }}
              />
              {' '}

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
