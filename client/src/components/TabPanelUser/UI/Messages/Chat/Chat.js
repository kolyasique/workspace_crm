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
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'open', payload: { chatWithUser: recValue.id } }));
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      const { type, payload } = message;

      switch (type) {
        case 'message':
          console.log('rabotaet case message');
          console.log({ message });
          addMessage(payload, payload?.auth);
          break;
        case 'offline':
          console.log('rabotaet case offline');
          setStatus('Не в сети');
          break;
        case 'online':
          console.log('rabotaet case online');
          setStatus('В сети');
          break;

        default:
          break;
      }
    };
    socket.onclose = () => {
      setStatus('Не в сети');
      console.log('rabotaet onclose');
    };

    return () => {
      socket.close();
    };
  }, []);

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
      </h3>
      <span className="chatStatus">{status}</span>
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
