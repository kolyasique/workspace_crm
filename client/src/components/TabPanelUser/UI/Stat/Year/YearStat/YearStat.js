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

export default function YearStat() {
  const data = {
    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    datasets: [
      {
        label: 'Открытые',
        data: [0, 1, 13],
        backgroundColor: 'rgba(255, 255, 0, 0.3)',
        borderWidth: 1,
        borderColor: 'rgb(255, 255, 0)',
      },
      {
        label: 'Выполненные',
        data: [3, 6, 12],
        backgroundColor: 'rgba(51, 204, 0, 0.3)',
        borderWidth: 1,
        borderColor: 'rgb(51, 204, 0)',
      },
      {
        label: 'Просроченные',
        data: [5, 2, 7],
        backgroundColor: 'rgba(222, 0, 0, 0.3)',
        borderWidth: 1,
        borderColor: 'rgb(222, 0, 0)',

      },
    ],
  };

  const options = {
    plugins: {
    },
  };

  return (
    <div className="yearStat">
      <div className="yearStatHeader">Статистика выполнения задач по месяцам:</div>
      <div style={{
        display: 'flex', width: '100%', height: '90%', alignItems: 'center',
      }}
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
