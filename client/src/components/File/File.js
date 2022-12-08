/* eslint-disable react/button-has-type */
import React, { useState, useCallback } from 'react';
import axios from 'axios';

export default function File() {
  const [img, setImg] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const sendFile = useCallback(async () => {
    try {
      const data = new FormData();
      data.append('avatar', img);
      console.log(data);
      await axios.post('http://localhost:6622/api/upload', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then((res) => setAvatar(res.data.path));
    } catch (error) {
      console.log('=====>', error);
    }
  }, [img]);
  console.log(avatar);
  return (
    <>
      <input type="file" onChange={(e) => setImg(e.target.files[0])} />
      <button className="btn" onClick={sendFile}>Загрузить документ</button>
    </>
  );
}
