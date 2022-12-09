/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useState } from 'react';
import { MainContext } from '../../../../context/Main.context';
import Chat from './Chat/Chat';
import './messages.css';

export default function Messages({ socket }) {
  const [recValue, setRecValue] = useState({});
  const { state } = useContext(MainContext);
  const [showChat, setShowChat] = useState(false);

  const handleClick = (e) => {
    const data = e.target.dataset.value;
    const value = JSON.parse(data);
    setRecValue(value);
    setShowChat(true);
  };

  return (
    <div className="chatPage">
      {showChat ? <Chat socket={socket} recValue={recValue} /> : <div className="chat" /> }
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
