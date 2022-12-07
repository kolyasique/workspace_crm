import React, { useEffect, useState, useMemo } from 'react';

export const ChatContext = React.createContext();

export default function ChatContextProvider({ children }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch('http://localhost:6622/api/chat', {
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

  const value = useMemo(() => ({ state }), [state]);

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}
