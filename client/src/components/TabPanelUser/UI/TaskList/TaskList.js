/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { SliderComponent } from '../Slider/SliderToggle';
import './TaskList.css';
import Modal from '../Modal/Modal';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [disabledBtn, setDisabledBtn] = useState({});
  const [taskStatus, setTaskStatus] = useState({});
  const [filteredTasks, setFilteredTasks] = useState([tasks]);
  const [modalVisible, setModalVisible] = useState(false);
  const [disabledSlider, setDisabledSlider] = useState(false);

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
    console.log(progressStatus, 'GHJUHTCNFEC');
    switch (progressStatus) {
      case '0':
        return 'Начать';
      case '25':
        return 'Принята';
      case '50':
        return 'Выполняется';
      case '75':
        return 'Согласование';
      case '100':
        return 'Готово';
      default:
        return 0;
    }
  };
  console.log(taskStatus, 'Это таск статус');
  console.log(disabledBtn, 'Это дисейбл батонс статус');

  const handleChange = (e) => {
    console.log(e.target.value, 'Это е таргет велью');
    setTaskStatus({ ...taskStatus, [e.target.id]: e.target.value, [e.target.id]: [getProgressStatus(e.target.value)] });
    if (e.target.value === '100') {
      setDisabledSlider(true);
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

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

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
  }

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
        <button
          type="button"
          onClick={() => {
            setModalVisible(true);
          }}
        >
          +

        </button>
      </div>
      <div className="taskContainer2">
        <div className="toDoTasks">

          {filteredTasks.map((task) => {
            // const sliderValue = getProgressStatus(task?.progress_status);
            console.log(222);
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
                  disabled={disabledSlider}
                  key={task.id}
                  step={25}
                  id={task.id}
                  value={0}
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
      <Modal visible={modalVisible} setVisible={setModalVisible} />
    </div>
  );
}
