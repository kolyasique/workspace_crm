import React, { useContext } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
// eslint-disable-next-line import/no-unresolved
import { Doughnut } from 'react-chartjs-2';
import { MainContext } from '../../../../../../context/Main.context';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
);

export default function YearEffectivity() {
  const { tasks } = useContext(MainContext);

  const year = new Date().getFullYear();

  function amount(arr, status) {
    const first = arr.filter((el) => el.start.substring(0, 4) === String(year));
    const second = first.filter((el) => el.status === status);
    return second.length;
  }

  function getStat() {
    const completed = tasks.filter((el) => el.status === true || false);
    const result = completed.filter((el) => el.start.substring(0, 4) === String(year));
    return result.length;
  }

  const textCenter = {
    id: 'textCenter',
    beforeDatasetDraw(chart) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = '25px sans-serif';
      //   ctx.fillStyle = 'red';
      ctx.textAlign = 'center';
      ctx.fillText(
        getStat() === 0 ? 'Нет данных'
          : `${((data.datasets[0].data[1] / (Math.round(data.datasets[0].data[1] + data.datasets[0].data[2]))) * 100)}%`,
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
        <Doughnut data={data} options={options} plugins={[textCenter]} />
      </div>
    </div>
  );
}
