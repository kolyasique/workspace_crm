import React, { useContext, useState, useEffect } from 'react';
import { MainContext } from '../../../../context/Main.context';
import Chat from './Chat/Chat';
import './messages.css';

export default function Messages() {
  const [recValue, setRecValue] = useState({});
  const { state } = useContext(MainContext);
  const [showChat, setShowChat] = useState(false);
  const [showMessages, setShowMessages] = useState([]);

  const handleClick = (e) => {
    const data = e.target.dataset.value;
    const value = JSON.parse(data);
    setRecValue(value);
    setShowChat(true);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const userFromId = recValue.id;

    fetch('http://localhost:6622/api/chat/message', {
      credentials: 'include',
      signal: abortController.signal,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userFromId }),
    })
      .then((res) => res.json())
      .then((res) => setShowMessages(res))
      .catch(console.log);

    return () => {
      abortController.abort();
    };
  }, [recValue]);
  return (
    <div className="chatPage">
      {showChat ? <Chat showMessages={showMessages} recValue={recValue} /> : <div className="chat" /> }
      <div className="chatContacts">
        {state === null ? '' : state.companyUsers.map((user) => (
          <div key={user.id} className="contact" data-value={JSON.stringify(user)} onClick={handleClick}>
            {user.second_name}
            {' '}
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
}
