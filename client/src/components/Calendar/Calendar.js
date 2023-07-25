import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import enUS from 'date-fns/locale/en-US';
import './Calendar.css';
import { showToast } from '../../lib/toasti';

const locales = {
  'en-US': enUS,
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
    const {
      title, content, start, end,
    } = newEvent;

    const date = {
      title, content, start, end,
    };

    const url = 'http://localhost:6622/api/calendar';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(date),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === 'не все поля заполнены') {
          showToast({ message: 'Заполните все поля!', type: 'warning' });
        }
      })
      .catch(console.error);
    setAllEvents([...allEvents, newEvent]);
    setNewEvent(initialState);
  }

  return (
    <div className="Calendar">
      <div className="Calendar-hat">
        <input type="text" className="inputCalendar" placeholder="Добавить задачу" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
        <input type="text" className="inputCalendar" placeholder="Описание задачи" value={newEvent.content} onChange={(e) => setNewEvent({ ...newEvent, content: e.target.value })} />
        <div className="datePickers">
          <DatePicker
            className="inputCalendar2"
            placeholderText="Начальная дата"
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            timeFormat="HH:mm"
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })}
          />
          <DatePicker
            className="inputCalendar2"
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            timeFormat="HH:mm"
            placeholderText="Конечная дата"
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })}
          />
        </div>
        <button className="calendarButton" type="button" onClick={handleAddEvent}>
          ➕
        </button>
      </div>
      <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: '50px', width: '90%' }} />
    </div>
  );
}

export default CalendarComponent;
