/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export const SocketContext = React.createContext();

export default function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(new WebSocket('ws://localhost:6622'));

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
