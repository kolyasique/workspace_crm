import React, { useEffect } from 'react';
import './messages.css';

export default function Messages() {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:6622');

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'open', payload: 'moe soobshenie' }));
    };

    socket.onmessage = (event) => {
      console.log('+++++++++', event);
    };
    return () => {
      socket.close();
    };
  }, []);
  return (
    <div className="chat">
      <div id="chatbox" className="chatbox chatbox-close" />
      <form name="chatForm" className="chatform">
        <input type="text" name="text" />
        <input type="hidden" name="user_from" />
        <input type="hidden" name="user_to" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
