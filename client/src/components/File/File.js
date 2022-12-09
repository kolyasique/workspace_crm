/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

export default function File() {
  const [img, setImg] = useState(null);
  const [form, setForm] = useState({
    text: '',
    image: '',
  });

  const handeleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // e.preventDefault();
    const data = new FormData();
    data.append('avatar', img);
    data.append('form', JSON.stringify(form));
    const url = 'http://localhost:6622/api/upload';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      body: data,
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
    setForm(form);
    console.log(form);
  };

  const uploudImg = (e) => {
    setImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  return (
    <form className="imageForm">
      <input onChange={handeleInput} name="text" value={form.text} />
      <input type="file" onChange={uploudImg} />
      <button type="submit" onClick={handleSubmit}>Загрузить документ</button>
    </form>
  );
}
