/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './WorkerList.css';

function WorkerList({ workers }) {
  return (
    <div className="mainpage usereducer">
      {workers.length !== 0 ? (

        <div>
          {workers.map((el) => (
            <div key={el.id} className="oneWorker">
              <div>{el.name}</div>
              <div>{el.second_name}</div>
              <div>{el.patronymic}</div>
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
