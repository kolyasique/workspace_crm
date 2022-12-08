/* eslint-disable no-param-reassign */
import React, { useRef, useEffect, useContext } from 'react';
import { MainContext } from '../../../../../context/Main.context';

export default function Chat({ recValue, socket }) {
  const chatForm = useRef();
  const chatbox = useRef();
  const { state } = useContext(MainContext);

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
      socket.send(JSON.stringify({ type: 'open', payload: 'moe soobshenie' }));
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('ESS', message);

      const { type, payload, auth } = message;

      switch (type) {
        case 'message':
          addMessage(payload, auth);

          break;

        default:
          break;
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.send(JSON.stringify({
      type: 'message',
      payload: Object.fromEntries(new FormData(chatForm.current)),
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
      <div ref={chatbox} id="chatbox" className="chatbox chatbox-close" />
      <form ref={chatForm} name="chatForm" className="chatform" onSubmit={handleSubmit}>
        <input type="text" name="text" />
        <input type="hidden" name="user_from" value={state === null ? '' : state.authUser.id} />
        <input type="hidden" name="user_to" value={recValue.id} />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}
