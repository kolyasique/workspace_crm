/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from 'react';
import { SliderComponent } from '../Slider/SliderToggle';
import './TaskList.css';
import Modal from '../Modal/Modal';
import { UserContext } from '../../../../context/User.context';

export default function TaskList() {
  const {
    dateNow, setDateNow, converterDate1, tasks, setTasks, done, setDone,
  } = useContext(UserContext);

  const {
    allWorkers, setAllWorkers, taskStatus, setTaskStatus,
  } = useContext(UserContext);
  const [disabledBtn, setDisabledBtn] = useState({});
  // const {taskStatus, setTaskStatus} = useContext()
  const [closed, setClosed] = useState({});
  const [filteredTasks, setFilteredTasks] = useState([tasks]);
  const [modalVisible, setModalVisible] = useState(false);
  const [disabledSlider, setDisabledSlider] = useState({});
  const [find, setFind] = useState({ query: '' });
  const [userId, setUserId] = useState(null);
  const [filter, setFilter] = useState('actual');
  const [clientsForTasks, setClientsForTasks] = useState([]);
  console.log(tasks, filteredTasks, 'tasks');
  const getProgressStatus = (progressStatus) => {
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

  const abortController = new AbortController();
  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/gettasks', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.allTasks);
        setAllWorkers(data.workers);
        setUserId(data.id);
        // setFirstShow(true);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/getclients', {
      credentials: 'include',
      // ручка за которую у нас цепляется abortcontroller
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setClientsForTasks(data));
  }, []);

  const handleChange = (e) => {
    const taskId = e.target.id;
    const taskProgressStatus = getProgressStatus(e.target.value);
    setFilteredTasks(filteredTasks.map((a) => {
      if (+a.id === +taskId) {
        a.progress_status = taskProgressStatus;
      } return a;
    }));

    // console.log(task, 'ТАСКИ');
    // console.log(e.target.value, 'e');

    const taskToUpdate = { [taskId]: taskProgressStatus };
    // console.log(taskToUpdate, 'taskProgressStatus');
    setTaskStatus({ ...taskStatus, [e.target.id]: e.target.value, [e.target.id]: [getProgressStatus(e.target.value)] });
    const url = 'http://localhost:6622/api/userpanel/changetaskprogress';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskToUpdate),
    })
      .then((res) => res.json());
    // .then((data2) => {
    //   setTasks(data2.allTasks1);
    //   setAllWorkers(data2.workers1);
    //   setUserId(data2.id);
    // // setFirstShow(true);
    // });

    if (e.target.value === '100') {
      setDisabledSlider({ ...disabledSlider, [e.target.id]: true });
      setDisabledBtn({ ...disabledBtn, [e.target.id]: true });
    }
    // }}, [taskStatus]);
  };

  const handleClose = (e) => {
    const taskId = { taskId: [e.target.id] };
    // const taskValue = { taskValue: [e.target.value] };
    // const taskToUpdate = { [taskId]: taskProgressStatus };
    const url = 'http://localhost:6622/api/userpanel/settaskclosed';
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
        setClosed({ ...closed, [data.taskId]: data.id });
        setFilteredTasks((state) => state.filter((el) => el.id !== +e.target.id));
        setTasks((state) => state.filter((el) => el.id !== +e.target.id));
      });
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
        setDone({ ...done, [data]: true });
        // setFilteredTasks((state) => state.filter((el) => el.id !== +e.target.id));
        // setTasks((state) => state.filter((el) => el.id !== +e.target.id));
      })
      .catch(console.error);
  };

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  // const sortedAndSearchedPosts = useMemo(()=>{
  //   return sortedPosts.filter(post=>post.title.toLowerCase().includes(filter.query))
  // }, [filter.query,sortedPosts])

  function setCreator(creatorId) {
    if (creatorId !== undefined) {
      const nameAndSecondName = `${(allWorkers.filter((el) => +el.id === +creatorId))[0].name} ${(allWorkers.filter((el) => el.id == creatorId))[0].second_name}`;
      return nameAndSecondName;
    }
    return 'Error';
  }
  function setClient(clientId) {
    if (clientsForTasks.length > 0) {
      const clientName = `${(clientsForTasks.filter((el) => +el.id === +clientId))[0].name}`;
      return clientName;
    }
    return 'error';
  }
  function createdDate(date) {
    const newDate = new Date(date);
    const oldMonth = newDate.getMonth();
    const dayDate = newDate.getDate();
    const dateFullYear = newDate.getFullYear();
    let month;
    switch (oldMonth + 1) {
      case 1:
        month = 'Января';
        break;
      case 2:
        month = 'Февраля';
        break;
      case 3:
        month = 'Марта';
        break;
      case 4:
        month = 'Апреля';
        break;
      case 5:
        month = 'Мая';
        break;
      case 6:
        month = 'Июня';
        break;
      case 7:
        month = 'Июля';
        break;
      case 8:
        month = 'Августа';
        break;
      case 9:
        month = 'Сентября';
        break;
      case 10:
        month = 'Октября';
        break;
      case 11:
        month = 'Ноября';
        break;
      case 12:
        month = 'Декабря';
        break;
      default: console.log('Что-то не так с твоим месяцем!');
    }
    // const time = [newDate.getHours(), newDate.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(':');
    // ${time}
    const creationDate = `${String(dayDate)} ${month} ${dateFullYear}`;
    return creationDate;
  }
  function checkRestTime(dateOfEnd) {
    const date1 = new Date(dateOfEnd);
    const date2 = new Date();
    const timeDiff = date1.getTime() - date2.getTime();
    const diffDays = (timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  function setRestTime(dateOfEnd) {
    const date1 = new Date(dateOfEnd);
    const date2 = new Date();

    const timeDiff = date1.getTime() - date2.getTime();
    const diffDaysRaw = (timeDiff / (1000 * 3600 * 24));
    const diffDaysRawString = `${Math.round(timeDiff / (1000 * 3600 * 24))} дн.`;
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    const hoursLeftRaw = timeDiff / (1000 * 3600);
    const hoursLeftString = `${Math.ceil(timeDiff / (1000 * 3600))} ч.`;

    const minutesLeftRaw = timeDiff / (1000 * 60);
    const minutesLeftString = `${Math.ceil(timeDiff / (1000 * 60))} минут`;
    if (diffDaysRaw < 1) {
      return hoursLeftString;
    }
    if (hoursLeftRaw < 1) {
      return minutesLeftString;
    }
    return diffDaysRawString;
  }

  function doTaskFilter(e) {
    const newTaskArr = [...tasks];
    const filterElement = e.target.id;
    const findTasks = tasks.filter((el) => el.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setFind({ ...find, query: e.target.value });
    switch (filterElement) {
      case 'clear':
        return (setFilteredTasks(tasks), setFilter('clear'));
      case 'personal':
        return (setFilteredTasks(findTasks.filter((el) => el.task_type === 'personal')), setFilter('personal'));
      case 'ordered':
        return (setFilteredTasks(findTasks.filter((el) => el.task_type === 'ordered' && +el.worker_id === +userId)), setFilter('ordered'));
        // && el.status === null
      case 'searchfilter':
        return (setFilteredTasks(findTasks), setFilter('searchfilter'));
      case 'control':
        return (setFilteredTasks(findTasks.filter((el) => +el.creator_id === +userId && +el.worker_id !== +userId)), setFilter('control'));
      // case 'successfull':
      //   // (state) => state.filter((el) => el.id !== +e.target.id)
      //   return (setFilteredTasks(findTasks.filter((el) => el.status === true)), setFilter('successfull'));
      // case 'failed':
      //   return (setFilteredTasks(findTasks.filter((el) => el.status === false)), setFilter('failed'));
      default:
        return (setFilteredTasks(tasks), setFilter('clear'));
    }
  }
  // useEffect(() => {
  //   const e = { e: { target: { filter } } };
  //   doTaskFilter(e);
  // }, [filteredTasks]);

  function setSliderValueFromBase(progress) {
    switch (progress) {
      case 'Начало':
        return 0;
      case 'Принята':
        return 25;
      case 'Выполняется':
        return 50;
      case 'Согласование':
        return 75;
      case 'Завершить':
        return 100;
      default: return 0;
    }
  }

  return (
    <div className="taskContainer">
      <div className="taskTools">
        {/* <div>
          <button type="button" className="filterMyTasksBtn" id="actual" onClick={(e) => doTaskFilter(e)}>Актуальные</button>
          <button type="button" className="filterMyTasksBtn" id="successfull" onClick={(e) => doTaskFilter(e)}>Успешные</button>
          <button type="button" className="filterMyTasksBtn" id="failed" onClick={(e) => doTaskFilter(e)}>Неуспешные</button>
        </div> */}
        <button type="button" className="filterBtn" id="personal" onClick={(e) => doTaskFilter(e)}>Мои задачи</button>
        <button type="button" className="filterBtn" id="ordered" onClick={(e) => doTaskFilter(e)}> Задачи мне</button>
        <button type="button" className="filterBtn" id="control" onClick={(e) => doTaskFilter(e)}>Контроль</button>
        <button type="button" className="filterBtn" id="clear" onClick={(e) => doTaskFilter(e)}>Все задачи</button>

        <input type="text" id="searchfilter" value={find.query} onChange={(e) => doTaskFilter(e)} placeholder="Поиск задач" />
        {/* setFind({ ...find, query: e.target.value }) */}

        <button
          className="addTaskBtn"
          type="button"
          onClick={() => {
            setModalVisible(true);
          }}
        >
          ➕

        </button>
      </div>
      <div className="taskContainer2">
        <div className="toDoTasks">
          {/* filteredTasks findTasks (214) */}
          {/* .filter((taskF) => taskF.worker_id === userId) */}
          {filteredTasks?.filter((taskF) => taskF.worker_id === userId || taskF.creator_id === userId).map((task) => {
            // const sliderValue = getProgressStatus(task?.progress_status);
            if ((done[task.id] === true || task.status === true) || (done[task.id] === false || task.status === false)) {
              return (
                <div key={task.id} className={(done[task.id] === true) || ((task.status === true)) ? 'doneTaskItem' : 'failedTaskItem'}>
                  {task?.client_id === null ? (
                    null
                  ) : (
                    <div className="taskForClient">
                      {' '}
                      {setClient(task?.client_id)}
                    </div>
                  )}
                  <div className="taskItemUpperDiv">
                    <div className={task.task_type === 'personal' ? 'personalClass' : 'orderedClass'}>
                      {task.task_type === 'personal' ? ('Личная') : (task.creator_id === userId ? (
                        `${setCreator(task.worker_id)}`
                      ) : (
                        `${setCreator(task.creator_id)}`
                      ))}
                    </div>
                    <div className="taskTitle">{task.title}</div>
                    <div className="taskStatus">
                      { (task.task_type === 'ordered' ? (+userId === +task.creator_id ? (
                        (done[task.id] === true || task.status === true) ? (<button type="button" id={task.id} value={true} className="taskStatusBtn" onClick={handleClose}> Закрыть </button>) : (<button type="button" id={task.id} value={false} className="failedTaskStatusBtn" onClick={handleClose}> Закрыть </button>)
                      ) : (
                        (done[task.id] === true || task.status === true) ? 'Выполнено' : 'Просрочено'
                      ))
                        : ((done[task.id] === true || task.status === true) ? (<button type="button" id={task.id} value={true} className="taskStatusBtn" onClick={handleClose}> Закрыть </button>)
                          : (<button type="button" className="failedTaskStatusBtn" id={task.id} value={false} onClick={handleClose}> Закрыть </button>)))}
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
              <div key={task.id} className={(checkRestTime(task.end) > 0 ? ((done[task.id] === true) || (task.status === true) ? 'doneTaskItem' : 'taskItem') : ('failedTaskItem'))}>
                {task?.client_id === null ? (
                  null
                ) : (
                  <div className="taskForClient">
                    {' '}
                    {setClient(task?.client_id)}
                  </div>
                )}
                <div className="taskItemUpperDiv">
                  <div className={task.task_type === 'personal' ? 'personalClass' : 'orderedClass'}>
                    {task.task_type === 'personal' ? ('Личная') : (task.creator_id === userId ? (
                      `${setCreator(task.worker_id)}`
                    ) : (
                      `${setCreator(task.creator_id)}`
                    ))}
                  </div>
                  <div className="taskTitle">{task.title}</div>
                  {/* <div className="taskStatus">{taskStatus[task.id] ? taskStatus[task.id] : (<>Начать</>) }</div> */}
                  <button className="taskStatusBtn" id={task.id} disabled={!disabledBtn[task.id]} type="button" onClick={handleClick}>{taskStatus[task.id] ? taskStatus[task.id] : task.progress_status }</button>
                </div>
                <div className="taskItemLowerDiv">
                  <div className="taskContent">{task?.content}</div>
                </div>
                { (task?.creator_id === userId && task?.worker_id !== userId) ? (
                  null
                ) : (
                  <SliderComponent
                    width="70%"
                    disabled={disabledSlider[task.id]}
                    step={25}
                    id={task.id}
                    name={task.progress_status}
                    value={setSliderValueFromBase(task.progress_status)}
                    handleChange={handleChange}
                    min={0}
                    max={100}
                  />
                )}
                <div className="taskDates">
                  <div className="startAt">
                    <label> Начало</label>
                    <div>{`${createdDate(task.start)}`}</div>
                  </div>
                  <div className="endAt">
                    <label> Дедлайн</label>
                    <div>{`${createdDate(task.end)}`}</div>
                  </div>
                  <div className="restTime">
                    <label> Осталось</label>
                    <div id={task.id}>{checkRestTime(task.end) > 0 ? (`${setRestTime(task.end)}`) : ('Задача просрочена!')}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal visible={modalVisible} setVisible={setModalVisible} tasks={tasks} setTasks={setTasks} />
    </div>
  );
}
