import React, { useEffect, useState, useMemo } from 'react';

export const MainContext = React.createContext();

export default function MainContextProvider({ children }) {
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
    console.log(state);

    return () => {
      abortController.abort();
    };
  }, []);

  const value = useMemo(() => ({ state }), [state]);

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  );
}
