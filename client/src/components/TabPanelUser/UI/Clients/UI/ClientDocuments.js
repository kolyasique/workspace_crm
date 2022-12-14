import React, { useEffect, useState } from 'react';
import { showToast } from '../../../../../lib/toasti';

import cl from './ClientDocuments.module.css';

export default function ClientDocuments({ client }) {
  const [img, setImg] = useState(null);
  const [docs, setDocs] = useState([]);
  const [form, setForm] = useState({
    text: '',
    image: '',
  });

  const abortController = new AbortController();
  useEffect(() => {
    fetch('http://localhost:6622/api/getdocs', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setDocs(data);
        // setAllWorkers(data.workers);
        // setUserId(data.id);
      });
  }, []);

  const handleSubmit = (e) => {
    try {
      // e.preventDefault();
      const { id } = e.target;
      const data = new FormData();
      data.append('avatar', img);
      // data.append('text', text)
      data.append('form', JSON.stringify(form));
      data.append('client_id', id);
      const url = 'http://localhost:6622/api/upload';
      fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: data,
      })
        .then((res) => res.json())
        .then((newdata) => {
          setDocs([...docs, newdata]);
          setForm({
            text: '',
            image: '',
          });
          showToast({ message: 'Файл загружен', type: 'success' });
        });
      // console.log(form);
      // if (res.status === 200) {
      //   showToast({ message: 'Файл загружен', type: 'success' });
      // }
    } catch (error) {
      console.log(error);
      showToast({ message: 'Не получилось', type: 'error' });
    }
  };
  const uploudImg = (e) => {
    setImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  // const uploadImg = (e) => {
  //   setText(e.target.value[0]);
  //   console.log(e.target.files[0]);
  // };

  const handleDelete = (e) => {
    e.preventDefault();
    const { id } = e.target;
    const url = 'http://localhost:6622/api/deletedoc';
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    setDocs(docs.filter((el) => el.id !== +id));
  };

  return (
    <div className={cl.clientDocFormAndList}>
      <input type="file" name="avatar" onChange={uploudImg} />
      {/* <input type="text" name="avatar" onChange={uploadText} /> */}
      <button type="submit" id={client.id} onClick={handleSubmit}>Загрузить</button>
      <div className={cl.clientDocList}>
        {docs?.filter((el) => el.client_id === client.id).map((doc) => (
          <div className={cl.clientDoc}>
            <a href={`http://localhost:6622/${doc.file}`} target="_blank" rel="noreferrer">
              { doc.file }
            </a>
            <button type="button" className={cl.clientDocListDelBtn} id={doc.id} onClick={handleDelete}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}
