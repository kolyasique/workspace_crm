/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, {
  useEffect, useState, useMemo, useContext,
} from 'react';
import { SocketContext } from './Socket.context';

export const MainContext = React.createContext();

export default function MainContextProvider({ children }) {
  const [state, setState] = useState(null);
  const [userListContext, setUserListContext] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const abortController = new AbortController();

    fetch('http://localhost:6622/api/chat/user', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((res) => setState(res))
      .catch(console.log);

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      const { type, payload } = message;

      switch (type) {
        case 'new_connection':

          setUserListContext((userListContext) => [...userListContext, payload]);
          break;
        case 'all_connections':

          setUserListContext((userListContext) => [...userListContext, ...payload]);
          break;

        default:
          break;
      }
    };
  }, []);

  const value = useMemo(() => ({ state, userListContext }), [state, userListContext]);

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  );
}
