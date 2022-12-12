import React from 'react';
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

export default function MounthEffectivity() {
  const textCenter = {
    id: 'textCenter',
    beforeDatasetDraw(chart) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = '25px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        `${((data.datasets[0].data[1] / (data.datasets[0].data[1] + data.datasets[0].data[2])) * 100).toFixed(2)}%`,
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
        data: [13, 12, 7],
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
        text: ['Выполненные: 12', 'Просроченные: 7', 'Открытые: 13'],
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
