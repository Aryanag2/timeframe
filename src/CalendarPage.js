import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link } from 'react-router-dom';
import { useEvents } from './EventsContext';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const { events, addEvent, removeEvent } = useEvents(); // Use the context
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    isEvent: true,
  });

  const [isAddingEvent, setIsAddingEvent] = useState(false);

  const handleEventFormSubmit = (e) => {
    e.preventDefault();
    addEvent(newEvent); // Use addEvent from context
    setNewEvent({ title: '', start: new Date(), end: new Date(), isEvent: true });
  };

  const handleEventClick = (event) => {
    removeEvent(event); // Use removeEvent from context
  };


  return (
    <div>
      <h1>Calendar</h1>
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={(slotInfo) => {
            setNewEvent({
              title: '',
              start: slotInfo.start,
              end: slotInfo.end,
            });
            setIsAddingEvent(true);
          }}
          onSelectEvent={handleEventClick}
        />
        <Link to="/todo" className="btn">
        Add Todo
      </Link>
      </div>
      {isAddingEvent ? (
        <div>
          <h2>Add Event</h2>
          <form onSubmit={handleEventFormSubmit}>
            <div className="input-field">
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                required
              />
            </div>
            <div className="input-field">
              <label>Start Date and Time</label>
              <input
                type="datetime-local"
                value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    start: moment(e.target.value).toDate(),
                  })
                }
                required
              />
            </div>
            <div className="input-field">
              <label>End Date and Time</label>
              <input
                type="datetime-local"
                value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    end: moment(e.target.value).toDate(),
                  })
                }
                required
              />
            </div>
            <button className="btn waves-effect waves-light" type="submit">
              Add Event
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default CalendarPage;
