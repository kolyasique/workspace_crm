import React, { useState } from 'react';
import { showToast } from '../../../../../lib/toasti';

export default function ClientDocuments({ client }) {
  const [img, setImg] = useState(null);
  const [form, setForm] = useState({
    text: '',
    image: '',
  });

  const uploudImg = (e) => {
    setImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };

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

  return (
    <div>
      <input type="file" onChange={uploudImg} />
      <button type="submit" id={client.id} onClick={handleSubmit}>Загрузить документ</button>
    </div>
  );
}
