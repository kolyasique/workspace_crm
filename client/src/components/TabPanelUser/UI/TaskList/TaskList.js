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
  const [done, setDone] = useState({});
  const [filteredTasks, setFilteredTasks] = useState([tasks]);
  const [modalVisible, setModalVisible] = useState(false);
  const [disabledSlider, setDisabledSlider] = useState({});

  const getProgressStatus = (progressStatus) => {
    console.log(progressStatus, 'GHJUHTCNFEC');
    switch (progressStatus) {
      case '0':
        return 'Новая';
      case '25':
        return 'Принята';
      case '50':
        return 'Выполняется';
      case '75':
        return 'Согласование';
      case '100':
        return 'Завершить';
      default:
        return 0;
    }
  };
  console.log(taskStatus, 'Это таск статус');
  console.log(disabledBtn, 'Это дисейбл батонс статус');

  // useEffect(() => {

  // }, [taskStatus]);

  const handleChange = (e) => {
    console.log(e.target.value, 'Это е таргет велью');
    const taskId = e.target.id;
    const taskProgressStatus = getProgressStatus(e.target.value);
    const taskToUpdate = { [taskId]: taskProgressStatus };
    setTaskStatus({ ...taskStatus, [e.target.id]: e.target.value, [e.target.id]: [getProgressStatus(e.target.value)] });
    // useEffect(() => {
    const url = 'http://localhost:6622/api/userpanel/changetaskprogress';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskToUpdate),
    })
      .then((res) => res.json())
    // .then((data) => {
    //   console.log(data, 'це дата статуса');
    //   setDone({ ...done, [data]: true });
    // })
      .catch(console.error);
    if (e.target.value === '100') {
      setDisabledSlider({ ...disabledSlider, [e.target.id]: true });
      setDisabledBtn({ ...disabledBtn, [e.target.id]: true });
    }
    // }}, [taskStatus]);
  };

  const handleClick = (e) => {
    const taskId = { taskId: [e.target.id] };
    const url = 'http://localhost:6622/api/userpanel/settaskdone';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskId),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'це дата статуса');
        setDone({ ...done, [data]: true });
      })
      .catch(console.error);
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
        <button type="button" className="filterMyTasksBtn" value="personal" onClick={(e) => doTaskFilter(e.target.value)}>Свои задачи</button>
        <button type="button" className="filterMyTaskFromAnotherBtn" value="ordered" onClick={(e) => doTaskFilter(e.target.value)}>Поставленные</button>
        <button type="button" className="clearFilterBtn" value="clear" onClick={(e) => doTaskFilter(e.target.value)}>Все задачи</button>
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
          Добавить задачу

        </button>
      </div>
      <div className="taskContainer2">
        <div className="toDoTasks">

          {filteredTasks.map((task) => {
            // const sliderValue = getProgressStatus(task?.progress_status);
            if (done[task.id] === true || task.status === true) {
              return (
                <div key={task.id} className={(done[task.id] === true) || ((task.status === true)) ? 'doneTaskItem' : 'taskItem'}>
                  <div className="taskItemUpperDiv">
                    <div className={task.task_type === 'personal' ? 'personalClass' : 'orderedClass'}>{task.task_type}</div>

                    <div className="taskTitle">{task.title}</div>
                    <div className="taskStatus">
                      Выполнено
                    </div>
                  </div>
                  <div className="taskItemLowerDiv">
                    <div className="taskContent">{task?.content}</div>
                  </div>

                </div>
              );
            }
            return (
            // {done[task.id] === true || task.status === true ? (
            //   <div></div>) : (
            //     <div></div>)}
              <div key={task.id} className={(done[task.id] === true) || ((task.status === true)) ? 'doneTaskItem' : 'taskItem'}>
                <div className="taskItemUpperDiv">
                  <div className={task.task_type === 'personal' ? 'personalClass' : 'orderedClass'}>{task.task_type}</div>
                  <div className="taskTitle">{task.title}</div>
                  {/* <div className="taskStatus">{taskStatus[task.id] ? taskStatus[task.id] : (<>Начать</>) }</div> */}
                  <button className="taskStatusBtn" id={task.id} disabled={!disabledBtn[task.id]} type="button" onClick={handleClick}>{taskStatus[task.id] ? taskStatus[task.id] : (<>Новая</>) }</button>
                </div>
                <div className="taskItemLowerDiv">
                  <div className="taskContent">{task?.content}</div>
                </div>

                <SliderComponent
                  width="70%"
                  disabled={disabledSlider[task.id]}
                  step={25}
                  id={task.id}
                  value={0}
                  handleChange={handleChange}
                  min={0}
                  max={100}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Modal visible={modalVisible} setVisible={setModalVisible} tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
