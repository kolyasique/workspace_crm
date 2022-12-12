/* eslint-disable no-unused-vars */
import React from 'react';
import './WorkerList.css';

function WorkerList({ workers, setWorkers }) {
  const getCategory = (id) => {
    switch (id) {
      case 1:
        return 'Список Управляющих';
      case 2:
        return 'Список исполнителей';
      default:
        return '';
    }
  };

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
    <div className="mainpage usereducer">
      {workers.length !== 0 ? (

        <div>
          {
            <>
              {workers.filter((el) => el.category_id === 1).length >= 1 && (
              <>
                <h3>Список Управляющих</h3>
                { workers.filter((el) => el.category_id === 1).map((el) => (
                  <div key={el.id} className="oneWorker">
                    {/* <div>{`${getCategory(el.category_id)}:`}</div> */}
                    <div>{el.name}</div>
                    <div>{el.second_name}</div>
                    <div>{el.patronymic}</div>
                    <button id={el.id} onClick={handleDelete} type="submit">Удалить сотрудника</button>
                  </div>
                ))}
              </>
              )}

              {workers.filter((el) => el.category_id === 2).length >= 1 && (
              <>
                <h3>Список исполнителей</h3>
                { workers.filter((el) => el.category_id === 2).map((el) => (
                  <div key={el.id} className="oneWorker">
                    {/* <div>{`${getCategory(el.category_id)}:`}</div> */}
                    <div>{el.name}</div>
                    <div>{el.second_name}</div>
                    <div>{el.patronymic}</div>
                    <button id={el.id} onClick={handleDelete} type="submit">Удалить сотрудника</button>
                  </div>
                ))}
              </>
              )}
            </>
          }

        </div>

      ) : (
        <div>Список пуст</div>
      )}

    </div>

  );
}

export default WorkerList;
