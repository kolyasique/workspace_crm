/* eslint-disable consistent-return */
import React, { } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
// eslint-disable-next-line import/no-unresolved
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
);

export default function MonthEffectivity({ tasks }) {
  const month = `0${String(((new Date()).getMonth() + 1))}`.slice(-2);

  function amount(arr, status) {
    if (arr !== null) {
      const first = arr.filter((el) => el.status === status);
      const second = first.filter((el) => el.start.substring(5, 7) === month);
      return second.length;
    }
  }

  function getStat() {
    if (tasks !== null) {
      const completed = tasks.filter((el) => el.status === true || false);
      console.log('completed1', completed);
      const result = completed.filter((el) => el.start.substring(5, 7) === month);
      return result.length;
    }
  }

  const textCenter = {
    id: 'textCenter',
    beforeDatasetDraw(chart) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = '30px sans-serif';
      //   ctx.fillStyle = 'red';
      ctx.textAlign = 'center';
      ctx.fillText(
        getStat() === 0 ? 'Нет данных'
          : `${Math.round(((data.datasets[0].data[1] / (data.datasets[0].data[1] + data.datasets[0].data[2]))) * 100)}%`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y,
      );
    },
  };
  const data = {
    labels: ['Открытые', 'Выполненные', 'Просроченные'],
    datasets: [
      {
        label: 'Количество',
        data: [amount(tasks, null), amount(tasks, true), amount(tasks, false)],
        backgroundColor: ['rgba(255, 255, 0, 0.3)', 'rgba(51, 204, 0, 0.3)', 'rgba(222, 0, 0, 0.3)'],
        borderColor: ['rgb(255, 255, 0)', 'rgb(51, 204, 0)', 'rgb(222, 0, 0)'],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        // display: false,
        position: 'bottom',
        align: 'center',
        labels: {
          boxWidth: 10,
        },
      },
      title: {
        display: true,
        text: [`Выполненные: ${amount(tasks, true)}`, `Просроченные: ${amount(tasks, false)}`, `Открытые: ${amount(tasks, null)}`],
        font: {
          size: '18',
          weight: 'normal',
        },
        color: 'black',
      },
    },
  };
  return (
    <div className="yearEff">
      <div className="yearEffHeader">Процент эффективности:</div>
      <div style={{
        display: 'flex', width: '100%', height: '90%', alignItems: 'center',
      }}
      >
        {tasks === null ? '' : <Doughnut data={data} options={options} plugins={[textCenter]} />}
      </div>
    </div>
  );
}
