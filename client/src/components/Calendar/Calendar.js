import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { setDefaultOptions } from 'date-fns';
import { ru } from 'date-fns/locale';
import './Calendar.css';

// setDefaultOptions({ locale: ru });

const locales = {
  'ru-UA': ru,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarComponent() {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [allEvents, setAllEvents] = useState([]);

  const abortController = new AbortController();
  useEffect(() => {
    fetch('http://localhost:6622/api/calendar', {
      credentials: 'include',
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((events) => setAllEvents(events));
  }, []);

  async function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i += 1) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      if (
        ((d1 <= d2) && (d2 <= d3)) || ((d1 <= d4) && (d4 <= d3))
      ) {
        alert('Наложение задач');
        break;
      }
    }

    const start = newEvent.start.toDateString();
    const end = newEvent.end.toDateString();
    const { title } = newEvent;
    const date = { title, start, end };
    const url = 'http://localhost:6622/api/calendar';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(date),
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        throw new Error('Something went wrong');
      })
      .catch(console.error);
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div className="Calendar">
      <h1>Календарь</h1>
      <h2>Добавить новую задачу</h2>
      <div>
        <input type="text" placeholder="Добавить задачу" style={{ width: '20%', marginRight: '10px' }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
        <DatePicker placeholderText="Начальная дата" style={{ marginRight: '10px' }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
        <DatePicker placeholderText="Конечная дата" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
        <button type="button" style={{ marginTop: '10px' }} onClick={handleAddEvent}>
          Добавить задачу
        </button>
      </div>
      <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: '50px' }} />
    </div>
  );
}

export default CalendarComponent;
