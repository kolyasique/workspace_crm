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

const initialState = {
  title: '', content: '', start: '', end: '',
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarComponent() {
  const [newEvent, setNewEvent] = useState(initialState);

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
        setNewEvent(initialState);
        break;
      }
      setNewEvent(initialState);
    }

    const { start } = newEvent;
    const { end } = newEvent;
    const { title, content } = newEvent;
    const date = {
      title, content, start, end,
    };
    console.log('🚀🚀🚀🚀 =>>>>> file: Calendar.js:63 =>>>>> handleAddEvent =>>>>> date', date);
    const url = 'http://localhost:6622/api/calendar';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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
      <div className="wrapper">
        <input type="text" placeholder="Добавить задачу" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
        <input type="text" placeholder="Описание задачи" value={newEvent.content} onChange={(e) => setNewEvent({ ...newEvent, content: e.target.value })} />
        <DatePicker
          placeholderText="Начальная дата"
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          timeFormat="HH:mm"
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />

        {/* () => {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      timeFormat="HH:mm"
      injectTimes={[
        setHours(setMinutes(new Date(), 1), 0),
        setHours(setMinutes(new Date(), 5), 12),
        setHours(setMinutes(new Date(), 59), 23),
      ]}
      dateFormat="MMMM d, yyyy h:mm aa"
    />
  );
}; */}

        <DatePicker
          className="datepicker"
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          timeFormat="HH:mm"
          placeholderText="Конечная дата"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button type="button" onClick={handleAddEvent}>
          Добавить задачу
        </button>
      </div>
      <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: '50px' }} />
    </div>
  );
}

export default CalendarComponent;
