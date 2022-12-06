/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

export default function WorkerList() {
  const [workers, setWorkers] = useState([]);
  const abortController = new AbortController();
  useEffect(() => {
    fetch('http://localhost:6622/api/adminpanel/getworkers', {
      credentials: 'include',
      // ручка за которую у нас цепляется abortcontroller
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setWorkers(data));
  }, []);
  console.log(workers);
  return (
    <div className="mainpage usereducer">
      <div>
        {workers.map((el) => (
          <div key={el.id}>{el.name}</div>))}
      </div>
    </div>

  );
}
