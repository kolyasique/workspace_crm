/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-undef */
import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
              <div className="taskTitle">{task.title}</div>
              <input type="checkbox" />
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
