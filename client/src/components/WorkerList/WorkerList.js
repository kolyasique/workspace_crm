/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './WorkerList.css';

function WorkerList({ workers, setWorkers }) {
  const getCategory = (id) => {
    switch (id) {
      case 1:
        return 'АУП';
      case 2:
        return 'Исполняющий персонал';
      default:
        return '';
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const { id } = e.target;
    console.log('🚀🚀🚀🚀 =>>>>> file: WorkerList.js:20 =>>>>> handleDelete =>>>>> id', id);
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
    <div className="mainpage usereducer">
      {workers.length !== 0 ? (

        <div>
          {workers.map((el) => (
            <div key={el.id} className="oneWorker">
              <div>{`${getCategory(el.category_id)}:`}</div>
              <div>{el.name}</div>
              <div>{el.second_name}</div>
              <div>{el.patronymic}</div>
              <button id={el.id} onClick={handleDelete} type="submit">Удалить сотрудника</button>
            </div>
          ))}

        </div>

      ) : (
        <div>Список пуст</div>
      )}

    </div>

  );
}

export default WorkerList;
