/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

export const SocketContext = React.createContext();

export default function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(new WebSocket('ws://localhost:6622'));
  const { user } = useSelector((store) => store.userStore);

  socket.onopen = () => {
    socket.send(JSON.stringify({ type: 'open', payload: user }));
  };
  socket.onclose = () => {
  };
  useEffect(() => () => {
    socket.close();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SocketContext.Provider value={{ socket, user }}>
      {children}
    </SocketContext.Provider>
  );
}
