/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
import React, { useContext, useState, useEffect } from 'react';
import { MainContext } from '../../../../context/Main.context';
import { SocketContext } from '../../../../context/Socket.context';
import Chat from './Chat/Chat';
import './messages.css';

export default function Messages() {
  const [recValue, setRecValue] = useState({});
  // eslint-disable-next-line no-unused-vars
  const { state, userListContext } = useContext(MainContext);
  const [showChat, setShowChat] = useState(false);
  const [showMessages, setShowMessages] = useState([]);
  const { socket } = useContext(SocketContext);
  const [userList, setUserList] = useState(userListContext);

  const [activeSobesednik, setActiveSobesednik] = useState();

  const handleClick = (e) => {
    const data = e.target.dataset.value;
    const value = JSON.parse(data);
    setRecValue(value);
    setShowChat(true);
    setActiveSobesednik(e.target.id);
  };

  useEffect(() => {
    const abortController = new AbortController();

    fetch('http://localhost:6622/api/chat/message', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((res) => res.reverse())
      .then((res) => setShowMessages(res))
      .catch(console.log);

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      const { type, payload } = message;
      console.log({ type });

      switch (type) {
        case 'message':
          setShowMessages((showMessages) => [payload, ...showMessages]);
          break;
        case 'new_connection':
          setUserList((userList) => [...userList, payload]);
          break;
        case 'all_connections':
          setUserList((userList) => [...userList, ...payload]);
          break;
        case 'some_close':
          setUserList(payload);
          break;

        default:
          break;
      }
    };
    socket.onclose = () => {
      console.log('rabotaet onclose');
    };
    socket.onerror = (error) => {
      console.log('socket', error);
    };
  }, []);

  return (
    <div className="chatPage">
      {showChat ? <Chat showMessages={showMessages} recValue={recValue} userList={userList} /> : (
        <div className="beforeChat">
          {' '}
          <span>Выберите, кому хотели бы написать </span>
        </div>
      ) }
      <div className="rightSide">
        <h3 className="h3">Сотрудники</h3>
        <div className="chatContacts">
          {state === null ? '' : state.companyUsers.map((user) => (
            <div key={user.id} id={user.id} style={state.authUser.id === user.id ? { display: 'none' } : { display: 'flex' }} className={activeSobesednik == user.id ? 'activeContact' : 'contact'} data-value={JSON.stringify(user)} onClick={handleClick}>
              {user.second_name}
              {' '}
              {user.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
