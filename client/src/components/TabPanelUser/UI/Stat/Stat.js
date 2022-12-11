/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

export default function Stat() {
  const [allWorkersInclTasks, setAllWorkersInclTasks] = useState([]);
  const abortController = new AbortController();
  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/getinfoforstat', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setAllWorkersInclTasks(data);
      });
  }, []);

  return (
    <div>
      {/* {allWorkersInclTasks.map((worker) => (
        <div></div>
        <div>{worker.name}</div>
        <div>
      ))} */}
    </div>
  );
}
