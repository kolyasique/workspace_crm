/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, {
  useState, useEffect, useMemo,
} from 'react';

export const UserContext = React.createContext();

export default function UserContextProvider({ children }) {
  const [dateNow, setDateNow] = useState(null);
  const [allWorkers, setAllWorkers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState({});
  const [mainOrProfile, setMainOrProfile] = useState(true);
  const [done, setDone] = useState({});
  const [history, setHistory] = useState([]);
  const [clients, setClients] = useState([]);

  const checkDateNow = new Date();

  const abortController = new AbortController();

  useEffect(() => {
    const interval = setInterval(() => { setDateNow(Date.now()); }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const dataT = new Date(dateNow);

  function rusufucateMonth(month) {
    let rusMonth;
    switch (month) {
      case 1:
        rusMonth = 'Января';
        break;
      case 2:
        rusMonth = 'Февраля';
        break;
      case 3:
        rusMonth = 'Марта';
        break;
      case 4:
        rusMonth = 'Апреля';
        break;
      case 5:
        rusMonth = 'Мая';
        break;
      case 6:
        rusMonth = 'Июня';
        break;
      case 7:
        rusMonth = 'Июля';
        break;
      case 8:
        rusMonth = 'Августа';
        break;
      case 9:
        rusMonth = 'Сентября';
        break;
      case 10:
        rusMonth = 'Октября';
        break;
      case 11:
        rusMonth = 'Ноября';
        break;
      case 12:
        rusMonth = 'Декабря';
        break;
      default: console.log('empty or error');
    }
    return rusMonth;
  }
  function convertDate1(dataR) {
    const newDate = new Date();
    const time = [newDate.getHours(), newDate.getMinutes()].map((x) => (x < 10 ? `0${x}` : x)).join(':');
    return `${dataR.getDate()} ${
      rusufucateMonth(dataR.getMonth() + 1)} ${
      dataR.getFullYear()} | ${time}`;
  }

  function convertDate2(str) {
    let data = new Date(str);
    const corr = data.getTimezoneOffset() * 60 * 1000;
    if (corr) {
      data = new Date(data.getTime() + corr);
    }
    return `${data.getDate()}-${
      data.getMonth() + 1}-${
      data.getFullYear()} | ${
      data.getHours()}:${
      data.getMinutes()}`;
  }

  const value = useMemo(() => ({
    dateNow,
    setDateNow,
    convertDate1,
    tasks,
    setTasks,
    allWorkers,
    setAllWorkers,
    taskStatus,
    setTaskStatus,
    mainOrProfile,
    setMainOrProfile,
    history,
    setHistory,
    clients,
    setClients,
    done,
    setDone,

  }));

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
