/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import React, {
  useRef, useEffect, useContext, useState,
} from 'react';
import { MainContext } from '../../../../../context/Main.context';
import { SocketContext } from '../../../../../context/Socket.context';

export default function Chat({ recValue, showMessages }) {
  const chatForm = useRef();
  const chatbox = useRef();
  const { state } = useContext(MainContext);
  const { socket } = useContext(SocketContext);
  const [status, setStatus] = useState('Не в сети');
  const test = useRef();
  const [userList, setUserList] = useState([]);

  const addMessage = (newMessage, auth) => {
    const div = document.createElement('div');
    div.classList.add(auth ? 'chatbox-textend' : 'chatbox-textstart');
    const date = document.createElement('span');
    date.classList.add('chatbox-date');
    date.innerText = new Date(newMessage.createdAt).toLocaleString('ru-RU');
    const text = document.createElement('span');
    text.classList.add('chatbox-text');
    text.innerText = newMessage.text;

    div.insertAdjacentElement('beforeend', date);
    div.insertAdjacentElement('beforeend', text);
    chatbox.current.insertAdjacentElement('afterbegin', div);
  };

  useEffect(() => {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      const { type, payload } = message;
      console.log({ type });

      switch (type) {
        case 'online':
          console.log('rabotaet case online');
          setStatus('В сети');
          break;
        case 'message':
          console.log('rabotaet case message');
          console.log({ message });
          addMessage(payload, payload?.auth);
          break;
        case 'offline':
          console.log('rabotaet case offline');
          setStatus('Не в сети');
          break;
        case 'new_connection':
          console.log('new_connection');
          console.log({ type, payload });
          setUserList((userList) => [...userList, payload]);
          break;
        case 'all_connections':
          console.log('all_connections');
          console.log({ type, payload });
          setUserList((userList) => [...userList, ...payload]);
          break;

        default:
          break;
      }
    };
    socket.onclose = () => {
      setStatus('Не в сети');
      console.log('rabotaet onclose');
    };
    socket.onerror = (error) => {
      console.log('socekt', error);
    };

    return () => {
      socket.close();
    };
  }, []);
  useEffect(() => {
    if (userList.includes(recValue.id)) {
      setStatus('В сети');
    }
  }, [userList]);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.send(JSON.stringify({
      type: 'message',
      payload: { ...Object.fromEntries(new FormData(chatForm.current)), chatWithUser: recValue.id },
    }));
    chatForm.current.reset();
  };
  console.log('PROVERKA', userList);
  return (
    <div className="chat" key={recValue.id}>
      <h3 className="chatWith">
        {recValue.second_name}
        {' '}
        {recValue.name}
      </h3>
      <span ref={test} className="chatStatus">{status}</span>
      <div ref={chatbox} id="chatbox" className="chatbox">
        {showMessages.map((message) => (
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
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}
