import React, { useEffect, useState } from 'react';

import './Clients.css';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const abortController = new AbortController();
  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/getclients', {
      credentials: 'include',
      // ручка за которую у нас цепляется abortcontroller
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);
  return (
    <div className="clientListDiv">
      {clients.map((client) => (
        <div className="clientItem">{client.name}</div>
      ))}
    </div>
  );
}
