/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
// eslint-disable-next-line import/no-unresolved
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
);

const data = {
  labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  datasets: [
    {
      label: 'Выполнено',
      data: [3, 6, 9],
      backgroundColor: 'green',
      borderColor: 'black',
      borderWidth: 1,
    },
    {
      label: 'Просрочено',
      data: [5, 2, 7],
      backgroundColor: 'red',
      borderColor: 'black',
      borderWidth: 1,
    },
  ],
};
const options = {
  responsive: true,
  plugins: {
    // legend: {
    //   position: 'top',
    // },
    title: {
      display: true,
      text: '2022',
    },
  },

};

export default function Stat() {
  const [allWorkersInclTasks, setAllWorkersInclTasks] = useState([]);
  const abortController = new AbortController();
  useEffect(() => {
    fetch('http://localhost:6622/api/userpanel/getinfoforstat', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((dataC) => {
        setAllWorkersInclTasks(dataC);
      });
  }, []);

  return (
    <div>

      <Bar data={data} options={options} />

      {/* {allWorkersInclTasks.map((worker) => (
        <div></div>
        <div>{worker.name}</div>
        <div>
      ))} */}

    </div>
  );
}
