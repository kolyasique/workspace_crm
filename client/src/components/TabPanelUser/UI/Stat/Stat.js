
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
  const [statPage, setStatPage] = useState(true);
  const [btnStyle, setBtnStyle] = useState(true);

  return (
    <div className="stat">
      <div className="statButtons">
        <button id={btnStyle === true ? 'statBtnActive' : 'statBtnInactive'} className="statBtn leftBtn" type="button" onClick={() => { setStatPage(true); setBtnStyle(true); }}>Годовая статистика</button>
        <button id={btnStyle === false ? 'statBtnActive' : 'statBtnInactive'} className="statBtn rightBtn" type="button" onClick={() => { setStatPage(false); setBtnStyle(false); }}>Месячная статистика</button>
      </div>
      {statPage === true ? <Year /> : <Mounth /> }
    </div>
  );
}
