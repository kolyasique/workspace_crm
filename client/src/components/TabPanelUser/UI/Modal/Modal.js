/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import cl from './Modal.module.css';
// import ModalTimer from '../UI/ModalTimer/ModalTimer';
// import QuestionForm from '../QuestionForm/QuestionForm';

function Modal({
  children, visible, setVisible,
}) {
  const rootClasses = [cl.myModal];

  if (visible) {
    rootClasses.push(cl.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
        {children}
        {/* <ModalTimer timeLeft={timeLeft} />
        <QuestionForm question={question} id={id} setVisibleBtn={setVisibleBtn} value={value} /> */}
      </div>
    </div>
  );
}

export default Modal;
