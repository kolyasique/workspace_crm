/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import cl from './Modal.module.css';
// import ModalTimer from '../UI/ModalTimer/ModalTimer';
// import QuestionForm from '../QuestionForm/QuestionForm';

const initialvalue = {
  title: '',
  content: '',
  startDate: '',
  endDate: '',
  taskForUserId: null,

};
function Modal({
  children, visible, setVisible,
}) {
  const [formTask, setFormTask] = useState(initialvalue);
  const rootClasses = [cl.myModal];

  if (visible) {
    rootClasses.push(cl.active);
  }
  const handleInput = (e) => {
    setFormTask({ ...formTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formTask);
  };

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
        <p>Добавить задачу</p>
        <form onSubmit={handleSubmit}>
          <input type="text" value={formTask.title} name="title" placeholder="Название" onChange={handleInput} />
          <textarea value={formTask.content} name="content" placeholder="описание" onChange={handleInput} />
          <input type="date" value={formTask.startDate} name="startDate" placeholder="Дата начала" onChange={handleInput} />
          <input type="date" value={formTask.endDate} name="endDate" placeholder="Дата окончания" onChange={handleInput} />
          <label className="form-label ">Должность</label>
          <select name="taskForUserId" value={formTask.taskForUserId} placeholder="кому" onChange={handleInput}>
            <option value={1}>Администратор</option>
            <option value={2}>АУП</option>
            <option value={3}>Исполняющий сотрудник</option>
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
