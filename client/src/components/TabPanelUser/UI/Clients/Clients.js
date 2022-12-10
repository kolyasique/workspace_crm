import React, { useEffect, useState } from 'react';
import { showToast } from '../../../../lib/toasti';
import './Clients.css';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const abortController = new AbortController();
  const [img, setImg] = useState(null);
  const [form, setForm] = useState({
    text: '',
    image: '',
  });

  const handleSubmit = async (e) => {
    try {
      // e.preventDefault();
      const { id } = e.target;
      const data = new FormData();
      data.append('avatar', img);
      data.append('form', JSON.stringify(form));
      data.append('client_id', id);
      const url = 'http://localhost:6622/api/upload';
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: data,
      });
      setForm({
        text: '',
        image: '',
      });
      console.log(form);
      if (res.status === 200) {
        showToast({ message: 'Файл загружен', type: 'success' });
      }
    } catch (error) {
      console.log(error);
      showToast({ message: 'Не получилось', type: 'error' });
    }
  };

  // const handeleInput = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };


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
          {/* <input onChange={handeleInput} name="text" value={form.text} /> */}
          <input type="file" onChange={uploudImg} />
          <button type="submit" id={client.id} onClick={handleSubmit}>Загрузить документ</button>
        </div>
      ))}
    </div>
  );
}
