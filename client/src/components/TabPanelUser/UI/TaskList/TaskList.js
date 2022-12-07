import React, { useEffect, useState } from 'react';
import './TaskList.css';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const abortController = new AbortController();
  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/gettasks', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="taskContainer">
      {tasks.map((task) => (
        <div className="taskItem">
          <div className="taskTitle">{task.title}</div>
          <input type="checkbox" />
        </div>
      ))}
    </div>
  );
}
