/* eslint-disable no-unused-vars */
import React from 'react';
import './WorkerList.css';

function WorkerList({ workers, setWorkers }) {
  const handleDelete = (e) => {
    e.preventDefault();
    const { id } = e.target;
    const url = 'http://localhost:6622/api/adminpanel/deleteuser';
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    setWorkers(workers.filter((el) => el.id !== +id));
  };

  return (
    <div className="worker-list">
      {workers.length !== 0 ? (

        <ul>
          {workers.filter((el) => el.category_id === 1).length >= 1 && (
          <>
            <h3>Список управляющих:</h3>
            <div className="workerList">
              { workers.filter((el) => el.category_id === 1).map((el) => (
                <div key={el.id} className="oneWorker">
                  <li>
                    {`${el.second_name} `}
                    {`${el.name} `}
                    {el.patronymic}
                  </li>
                  <button id={el.id} onClick={handleDelete} type="submit">Уволить</button>
                </div>
              ))}
            </div>
          </>
          )}

          {workers.filter((el) => el.category_id === 2).length >= 1 && (
          <>
            <h3>Список исполнителей:</h3>
            <div className="workerList">
              { workers.filter((el) => el.category_id === 2).map((el) => (
                <div key={el.id} className="oneWorker">
                  <li>
                    {`${el.second_name} `}
                    {`${el.name} `}
                    {el.patronymic}
                  </li>
                  <button id={el.id} onClick={handleDelete} type="submit">Уволить</button>
                </div>
              ))}
            </div>
          </>
          )}

        </ul>

      ) : (
        <div className="emptyList">Список пуст</div>
      )}

    </div>

  );
}

export default WorkerList;
