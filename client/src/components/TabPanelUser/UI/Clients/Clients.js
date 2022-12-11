/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { showToast } from '../../../../lib/toasti';
import './Clients.css';
import CreateOrder from './UI/CreateOrder';
import ModalClient from './ModalClient';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [visibleModalForOrder, setVisibleModalForOrder] = useState(false);
  const abortController = new AbortController();
  const [img, setImg] = useState(null);
  const [form, setForm] = useState({
    text: '',
    image: '',
  });
  const [findClient, setFindClient] = useState({ query: '' });

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

  const findClients = clients.filter((el) => (el.name.toLowerCase() + String(el.inn) + el.email + el.adress.toLowerCase()).includes(findClient.query.toLowerCase()));
  // const handeleInput = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };
  const handleClick = async (e) => {
    try {
      console.log(e, 'Создать заявку');
      setVisibleModalForOrder(true);
    } catch (error) {
      console.log(error);
      showToast({ message: 'Не получилось', type: 'error' });
    }
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

  // const getUserDays = (userCreationDay) => {
  //   const date = new Date();
  //   const timeDiff = Math.abs(date.getTime() - userCreationDay.getTime());
  //   const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  //   return console.log(diffDays);
  // };

  function getUserDays(userCreationDay) {
    const date1 = new Date(userCreationDay);
    const date2 = new Date();

    const timeDiff = date2.getTime() - date1.getTime();

    const diffDaysRound = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDaysRound;
  }
  return (
    <div className="clientListDiv">
      <div className="clientPanel">
        <input type="text" id="searchfilter" value={findClient.query} onChange={(e) => { setFindClient({ query: e.target.value }); }} placeholder="Поиск клиента (по инн или названию)" />
      </div>
      {findClients.map((client) => (
        <div key={client.id} className="clientItem">
          <div className="clientInfo">
            <div>{client.name}</div>
            <div>{`адрес: ${client.adress}`}</div>
            <div>{client.inn}</div>
            <div>{client.email}</div>
            <div>
              {`С нами уже: ${getUserDays(client.createdAt)} дня`}
            </div>
            {/* <button type="button" value={client.createdAt} onClick={(e) => { getUserDays(e.target.value); }}>SKOLKO</button> */}
          </div>
          <input type="file" onChange={uploudImg} />
          <button type="submit" id={client.id} onClick={handleSubmit}>Загрузить документ</button>
          <button type="button" id={client.id} onClick={(e) => handleClick(e)}>Создать заявку</button>
          <button type="button" id={client.id}>Взаимодействие</button>
          <button type="button" id={client.id}>Документы</button>
          <button type="button" id={client.id}>Удалить</button>
        </div>
      ))}
      <ModalClient visible={visibleModalForOrder} setVisible={setVisibleModalForOrder}>
        <CreateOrder />
      </ModalClient>
    </div>
  );
}
