/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-undef */
import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
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
  const [disabledBtn, setDisabledBtn] = useState({});
  const [taskStatus, setTaskStatus] = useState({});
  const [filteredTasks, setFilteredTasks] = useState([tasks]);

  // useEffect(() => {
  //   if (taskStatus.value === 100) {
  //     setDisabledBtn(false);
  //   }
  //   if (taskStatus.value !== 100) {
  //     setDisabledBtn(true);
  //   }
  //   // console.log(taskStatus);
  // }, [taskStatus]);

  const getProgressStatus = (progressStatus) => {
    switch (progressStatus) {
      case 'Haчало':
        return 0;
      case 'Уже':
        return 50;
      case 'Почти':
        return 75;
      case 'Завершениe':
        return 100;
      default:
        return 0;
    }
  };
  console.log(taskStatus, 'Это таск статус');
  console.log(disabledBtn, 'Это дисейбл батонс статус');

  const handleChange = (e) => {
    console.log(e.target.value, 'Это е таргет велью');
    setTaskStatus({ ...taskStatus, [e.target.id]: e.target.value });
    if (e.target.value === '100') {
      setDisabledBtn({ ...disabledBtn, [e.target.id]: true });
    }
  };

  const abortController = new AbortController();
  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/gettasks', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then(
        (data) => setTasks(data),
      );
  }, []);

  function doTaskFilter(filterType) {
    const newTaskArr = [...tasks];
    switch (filterType) {
      case 'clear':
        return setFilteredTasks(tasks);
      case 'personal':
        return setFilteredTasks(newTaskArr.filter((el) => el.task_type === 'personal'));
      case 'ordered':
        return setFilteredTasks(newTaskArr.filter((el) => el.task_type === 'ordered'));
      default:
        return setFilteredTasks(tasks);
    }
    // if (filterType === 'clear') {
    //   setFilteredTasks(tasks);
    // }
    // const tasksFromLocal = localStorage.getItem('tasks');
    // console.log(tasksFromLocal);
    // setTasks(tasksFromLocal);
    // console.log(tasks, 'После получения с локальной формы');
    // if (e.target.value == 'clear') {
    //   return setTasks(tasksFromLocal);
    // } return setTasks(tasks.filter((el) => el.task_type == e.target.value));
  }
  console.log(tasks, 'Это таски вне функции');
  return (
    <div className="taskContainer">
      <div className="taskTools">
        <button type="button" value="personal" onClick={(e) => doTaskFilter(e.target.value)}>personal</button>
        <button type="button" value="ordered" onClick={(e) => doTaskFilter(e.target.value)}>ordered</button>
        <button type="button" value="clear" onClick={(e) => doTaskFilter(e.target.value)}>clear</button>
        <form className="taskTools">
          <input type="text" />
          <button type="submit">искать</button>
        </form>
      </div>
      <div className="taskContainer2">
        <div className="toDoTasks">

          {filteredTasks.map((task) => {
            const sliderValue = getProgressStatus(task?.progress_status);
            console.log(sliderValue);
            // console.log(task.progress_status);
            return (
              <div key={task.id} className="taskItem">
                <div className="taskItemUpperDiv">
                  <div className={task.task_type === 'personal' ? 'personalClass' : 'orderedClass'}>{task.task_type}</div>
                  <div className="taskTitle">{task.title}</div>
                </div>
                <div className="taskItemLowerDiv">
                  <div className="taskContent">{task?.content}</div>
                  <input type="checkbox" />
                </div>
                <div>{taskStatus[task.id] ? taskStatus[task.id] : (<>Начать</>) }</div>
                <SliderComponent
                  dots
                  step={25}
                  id={task.id}
                  value={sliderValue}
                  handleChange={handleChange}
                  min={0}
                  max={100}
                />
                <button className="deleteTask" id={task.id} disabled={!disabledBtn[task.id]} type="button">Завершить</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
