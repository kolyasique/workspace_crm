import React, { useContext, useEffect, useRef } from 'react';
import { ChatContext } from '../../context/Chat.context';
import './messages.css';

export default function Messages() {
  const socket = new WebSocket('ws://localhost:6622');
  const { state } = useContext(ChatContext);

  const chatForm = useRef();

  useEffect(() => {
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'open', payload: 'moe soobshenie' }));
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('ESS', message);
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
    <div className="chatPage">
      <div className="chat">
        <div id="chatbox" className="chatbox chatbox-close" />
        <form ref={chatForm} name="chatForm" className="chatform" onSubmit={handleSubmit}>
          <input type="text" name="text" />
          <input type="hidden" name="user_from" value={state === null ? '' : state.authUser.id} />
          <input type="hidden" name="user_to" />
          <button type="submit">Send</button>
        </form>
      </div>
      <div className="chatContacts">{state === null ? '' : state.companyUsers.map((user) => (<div key={user.id}>{user.name}</div>))}</div>
    </div>
  );
}
