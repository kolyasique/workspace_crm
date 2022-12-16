/* eslint-disable no-unused-vars */
import React from 'react';
import './ClientList.css';

function ClientList({ clients, setClients }) {
  const handleDelete = (e) => {
    e.preventDefault();
    const { id } = e.target;
    const url = 'http://localhost:6622/api/adminpanel/deleteclient';
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    setClients(clients.filter((el) => el.id !== +id));
  };

  return (
    <div className="mainpage client-list">
      {clients.length !== 0 ? (
        <ul>
          <h3>Список клиентов:</h3>
          <div className="allClientsForAdm">
            { clients.map((el) => (
              <div key={el.id} className="oneClient">
                <li>
                  {`${el.name} `}
                  {`${el.email} `}
                </li>
                <button id={el.id} onClick={handleDelete} type="submit">Удалить</button>
              </div>
            ))}
          </div>
        </ul>
      ) : (

        <div className="emptyList">Список пуст</div>

      )}

    </div>

  );
}

export default ClientList;
