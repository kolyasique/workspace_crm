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

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>

        {children}

      </div>
    </div>
  );
}

export default ModalClient;
