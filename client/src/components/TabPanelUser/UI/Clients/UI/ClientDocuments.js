import React, { useEffect, useState } from 'react';
import { showToast } from '../../../../../lib/toasti';

import cl from './ClientDocuments.module.css';

export default function ClientDocuments({ client }) {
  const [img, setImg] = useState(null);
  const [docs, setDocs] = useState([]);
  const [form, setForm] = useState({
    text: null,
    image: null,
  });
  console.log(form);

  const handleImput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const abortController = new AbortController();
  useEffect(() => {
    fetch('http://localhost:6622/api/getdocs', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('🚀🚀🚀🚀 =>>>>> file: ClientDocuments.js:27 =>>>>> .then =>>>>> data', data);

        setDocs(data);
      });
  }, []);

  const handleSubmit = (e) => {
    try {
      console.log(form.file, form.text);

      const { id } = e.target;
      const data = new FormData();
      data.append('avatar', img);

      data.append('form', JSON.stringify(form));
      data.append('client_id', id);

      if (img !== null) {
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
      } else { showToast({ message: 'Добавьте файл!', type: 'warning' }); }
    } catch (error) {
      console.log(error);
      showToast({ message: 'Не удалось', type: 'error' });
    }
  };
  const uploudImg = (e) => {
    setImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };

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
      <div className={cl.docForm}>
        <input className={cl.nameOfDoc} type="text" value={form.text} name="text" placeholder="Название документа" onChange={handleImput} required />
        <input className={cl.downloadFile} type="file" id="downLoadBtn" name="avatar" onChange={uploudImg} required />
        <button type="submit" className={cl.submitDownload} id={client.id} onClick={handleSubmit}>Загрузить</button>
      </div>
      <div className={cl.clientDocList}>
        {docs?.filter((el) => el.client_id === client.id).map((doc) => (
          <div className={cl.clientDoc}>
            <a href={`http://localhost:6622/${doc.file}`} target="_blank" rel="noreferrer">
              { doc.text }
            </a>
            <button type="button" className={cl.clientDocListDelBtn} id={doc.id} onClick={handleDelete}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}
