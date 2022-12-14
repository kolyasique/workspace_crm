import React, { } from 'react';
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

export default function MonthStat({ tasks }) {
  function amount(arr, status) {
    const month = `0${String(((new Date()).getMonth() + 1))}`.slice(-2);
    const first = arr.filter((el) => el.status === status);
    const second = first.filter((el) => el.start.substring(5, 7) === month);
    return second.length;
  }
  function amountProgress(arr, status) {
    const month = `0${String(((new Date()).getMonth() + 1))}`.slice(-2);
    const first = arr.filter((el) => el.progress_status === status);
    const second = first.filter((el) => el.start.substring(5, 7) === month);
    return second.length;
  }

  function actualMonth() {
    const month = `0${String(((new Date()).getMonth() + 1))}`.slice(-2);

    switch (month) {
      case '01':
        return 'Январь';
      case '02':
        return 'Февраль';
      case '03':
        return 'Март';
      case '04':
        return 'Апрель';
      case '05':
        return 'Май';
      case '06':
        return 'Июнь';
      case '07':
        return 'Июль';
      case '08':
        return 'Август';
      case '09':
        return 'Сентябрь';
      case '10':
        return 'Октябрь';
      case '11':
        return 'Ноябрь';
      case '12':
        return 'Декабрь';
      default:
        return month;
    }
  }
  const data = {
    labels: [actualMonth()],
    datasets: [
      {
        label: 'Новая',
        data: [amountProgress(tasks, 'Начало')],
        backgroundColor: 'rgba(0,172,174,0.3)',
        borderWidth: 1,
        borderColor: 'rgb(0,172,174)',
        barPercentage: 0.5,
      },
      {
        label: 'Принята',
        data: [amountProgress(tasks, 'Принята')],
        backgroundColor: 'rgba(255, 255, 0, 0.3)',
        borderWidth: 1,
        borderColor: 'rgb(255, 255, 0)',
        barPercentage: 0.5,
      },
      {
        label: 'Выполняется',
        data: [amountProgress(tasks, 'Выполняется')],
        backgroundColor: 'rgba(255,178,78,0.3)',
        borderWidth: 1,
        borderColor: 'rgb(255,178,78)',
        barPercentage: 0.5,
      },
      {
        label: 'Согласование',
        data: [amountProgress(tasks, 'Согласование')],
        backgroundColor: 'rgba(209,172,231,0.3)',
        borderWidth: 1,
        borderColor: 'rgb(209,172,231)',
        barPercentage: 0.5,
      },
      {
        label: 'Завершено',
        data: [amount(tasks, true)],
        backgroundColor: 'rgba(51, 204, 0, 0.3)',
        borderWidth: 1,
        borderColor: 'rgb(51, 204, 0)',
      },
      {
        label: 'Просрочено',
        data: [amount(tasks, false)],
        backgroundColor: 'rgba(222, 0, 0, 0.3)',
        borderWidth: 1,
        borderColor: 'rgb(222, 0, 0)',
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
