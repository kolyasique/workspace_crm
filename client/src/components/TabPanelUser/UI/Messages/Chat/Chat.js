/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import React, { useRef, useContext } from 'react';
import { MainContext } from '../../../../../context/Main.context';
import { SocketContext } from '../../../../../context/Socket.context';

export default function Chat({ recValue, showMessages, userList }) {
  const chatForm = useRef();
  const chatbox = useRef();
  const { state } = useContext(MainContext);
  const { socket } = useContext(SocketContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.send(JSON.stringify({
      type: 'message',
      payload: { ...Object.fromEntries(new FormData(chatForm.current)), chatWithUser: recValue.id },
    }));
    chatForm.current.reset();
  };

  return (
    <div className="chat" key={recValue.id}>
      <h3 className="chatWith">
        {recValue.second_name}
        {' '}
        {recValue.name}
        <div className={userList.includes(recValue.id) ? 'iconOnline' : 'iconOffline'} />
      </h3>
      <span className="chatStatus">{userList.includes(recValue.id) ? 'В сети' : 'Не в сети'}</span>
      <div ref={chatbox} id="chatbox" className="chatbox">
        {showMessages.filter((el) => ((
          el.user_from === state.authUser.id && el.user_to === recValue.id)) || (
          el.user_from === recValue.id && el.user_to === state.authUser.id)).map((message) => (
            <div key={message.id} className={recValue.id === message.user_from ? 'chatbox-textstart' : 'chatbox-textend'}>
              <span className="chatbox-date">{new Date(message.createdAt).toLocaleString('ru-RU')}</span>
              <span className="chatbox-text">{message.text}</span>
            </div>
        ))}
      </div>
      <form ref={chatForm} name="chatForm" className="chatform" onSubmit={handleSubmit}>
        <input type="text" name="text" />
        <input type="hidden" name="user_from" value={state === null ? '' : state.authUser.id} />
        <input type="hidden" name="user_to" value={recValue.id} />
        <button className="sendBtn" type="submit">Отправить</button>
      </form>
    </div>
  );
}
