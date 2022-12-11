/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import cl from './ModalClient.module.css';
// import ModalTimer from '../UI/ModalTimer/ModalTimer';
// import QuestionForm from '../QuestionForm/QuestionForm';

const initialvalue = {
  title: '',
  content: '',
  startDate: '',
  endDate: '',
  taskForUserId: '',

};
function ModalClient({
  children, visible, setVisible, tasks, setTasks,
}) {
  const rootClasses = [cl.myModal];

  if (visible) {
    rootClasses.push(cl.active);
  }
  //   const abortController = new AbortController();
  //   useEffect(() => {
  //     fetch('http://localhost:6622/api/userpanel/getworkers', {
  //       credentials: 'include',
  //       signal: abortController.signal,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setWorkersForList(data));
  //   }, []);
  //   const handleInput = (e) => {
  //     setFormTask({ ...formTask, [e.target.name]: e.target.value });
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log('handlesubmit');
  //     // const taskId = { taskId: [e.target.id] };
  //     const url = 'http://localhost:6622/api/userpanel/createtask';
  //     fetch(url, {
  //       method: 'POST',
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formTask),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data.createTask);
  //         console.log(data.sessionId, formTask.taskForUserId);
  //         if (+data.sessionId === +formTask.taskForUserId) {
  //           setTasks([...tasks, data.createTask]);
  //         }
  //       })
  //       .catch(console.error);
  //     setFormTask(initialvalue);
  //     setVisible(false);
  //   };

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>

        {children}

      </div>
    </div>
  );
}

export default ModalClient;
