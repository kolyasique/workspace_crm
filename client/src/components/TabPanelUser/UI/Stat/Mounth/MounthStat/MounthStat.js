import React from 'react';
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

export default function MounthStat() {
  const data = {
    labels: ['Март'],
    datasets: [
      {
        label: 'Принята',
        data: [4],
        backgroundColor: 'rgba(0,172,174,0.3)',
        borderWidth: 1,
        borderColor: 'rgb(0,172,174)',
      },
      {
        label: 'Выполняется',
        data: [6],
        backgroundColor: 'rgba(255, 255, 0, 0.3)',
        borderWidth: 1,
        borderColor: 'rgb(255, 255, 0)',
      },
      {
        label: 'Согласование',
        data: [3],
        backgroundColor: 'rgba(139,107,207,0.3)',
        borderWidth: 1,
        borderColor: 'rgb(139,107,207)',
      },
      {
        label: 'Завершено',
        data: [12],
        backgroundColor: 'rgba(51, 204, 0, 0.3)',
        borderWidth: 1,
        borderColor: 'rgb(51, 204, 0)',
      },
    ],
  };

  const options = {
    indexAxis: 'y',
  };

  return (
    <div className="yearStat">
      <div className="yearStatHeader">Статус задач этого месяца:</div>
      <div style={{
        display: 'flex', width: '100%', height: '90%', alignItems: 'center',
      }}
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
