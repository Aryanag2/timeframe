import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      title: 'Meeting',
      start: new Date(2023, 10, 15, 10, 0),
      end: new Date(2023, 10, 15, 12, 0),
    },
    // Add more events as needed
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
  });

  const [isAddingEvent, setIsAddingEvent] = useState(false);

  const handleEventFormSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, newEvent]);
    setNewEvent({ title: '', start: new Date(), end: new Date() });
    setIsAddingEvent(false);
  };

  const handleEventClick = (event) => {
    // Implement event removal logic here
    const updatedEvents = events.filter((e) => e !== event);
    setEvents(updatedEvents);
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
