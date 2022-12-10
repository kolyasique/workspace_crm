import React, { useEffect, useState } from 'react';

import './Clients.css';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const abortController = new AbortController();
  const [img, setImg] = useState(null);
  const [form, setForm] = useState({
    text: '',
    image: '',
    client_id: '',
  });

  const handleSubmit = (e) => {
    // e.preventDefault();
    const { id } = e.target;
    console.log('🚀🚀🚀🚀 ===> file: Clients.js:18 ===> handleSubmit ===> id', id);
    const data = new FormData();
    data.append('avatar', img);
    data.append('form', JSON.stringify(form));
    data.append('client_id', id);
    const url = 'http://localhost:6622/api/upload';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: data,
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
    setForm(form);
    setImg(null);
    console.log(form);
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploudImg = (e) => {
    setImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };

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
        <div key={client.id} className="clientItem">
          {client.name}
          <input onChange={handleInput} name="text" value={form.text} />
          <input type="file" onChange={uploudImg} />
          <button type="submit" id={client.id} onClick={handleSubmit}>Загрузить документ</button>
        </div>
      ))}
    </div>
  );
}
