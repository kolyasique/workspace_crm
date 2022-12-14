/* eslint-disable consistent-return */
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

export default function YearStat({ tasks }) {
  function amount(arr, month, status) {
    if (arr !== null) {
      const year = new Date().getFullYear();
      const first = arr.filter((el) => el.start.substring(0, 4) === String(year));
      const second = first.filter((el) => el.start.substring(5, 7) === month);
      const result = second.filter((el) => el.status === status);
      return result.length;
    }
  }

  const data = {
    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    datasets: [
      {
        label: 'Открытые',
        data: [amount(tasks, '01', null), amount(tasks, '02', null), amount(tasks, '03', null), amount(tasks, '04', null), amount(tasks, '05', null), amount(tasks, '06', null), amount(tasks, '07', null), amount(tasks, '08', null), amount(tasks, '09', null), amount(tasks, '10', null), amount(tasks, '11', null), amount(tasks, '12', null)],
        backgroundColor: 'rgba(255, 255, 0, 0.3)',
        borderWidth: 1,
        borderColor: 'rgb(255, 255, 0)',
      },
      {
        label: 'Выполненные',
        data: [amount(tasks, '01', true), amount(tasks, '02', true), amount(tasks, '03', true), amount(tasks, '04', true), amount(tasks, '05', true), amount(tasks, '06', true), amount(tasks, '07', true), amount(tasks, '08', true), amount(tasks, '09', true), amount(tasks, '10', true), amount(tasks, '11', true), amount(tasks, '12', true)],
        backgroundColor: 'rgba(51, 204, 0, 0.3)',
        borderWidth: 1,
        borderColor: 'rgb(51, 204, 0)',
      },
      {
        label: 'Просроченные',
        data: [amount(tasks, '01', false), amount(tasks, '02', false), amount(tasks, '03', false), amount(tasks, '04', false), amount(tasks, '05', false), amount(tasks, '06', false), amount(tasks, '07', false), amount(tasks, '08', false), amount(tasks, '09', false), amount(tasks, '10', false), amount(tasks, '11', false), amount(tasks, '12', false)],
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
