import React, { createContext, useContext, useState } from 'react';

// Create the context
const EventsContext = createContext();

// Hook to use the context
export const useEvents = () => useContext(EventsContext);

// Provider component
export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  // Function to add a new event
  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  // Function to remove an event
  const removeEvent = (eventToRemove) => {
    setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventToRemove.id));
  };

  // Function to update an event
  const updateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, removeEvent, updateEvent }}>
      {children}
    </EventsContext.Provider>
  );
};
