import React, { createContext, useContext, useState } from 'react';

// Create the context
const EventsContext = createContext();

// Hook to use the context
export const useEvents = () => useContext(EventsContext);

// Provider component
export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const findNonOverlappingSlot = (events, newEvent, isHighPriority) => {
    // Define the hours for scheduling (8 AM to 10 PM)
    const DAY_START = 8; // 8 AM in 24-hour format
    const DAY_END = 22; // 10 PM in 24-hour format
  
    // Convert duration to milliseconds for calculations
    const durationMs = newEvent.duration * 60 * 60 * 1000;
  
    // Helper function to check if the time slot overlaps with existing events
    const doesOverlap = (start, end) => {
      return events.some(event => {
        let eventStart = new Date(event.start);
        let eventEnd = new Date(event.end);
        return (start < eventEnd && end > eventStart);
      });
    };
  
    // Helper function to adjust the time slot to the next available time slot within the defined hours
    const adjustToDayHours = (proposedStart) => {
      let adjustedStart = new Date(proposedStart);
  
      if (adjustedStart.getHours() >= DAY_END) {
        // If the proposed time is after the end of the day schedule, move to the next day
        adjustedStart.setDate(adjustedStart.getDate() + 1);
        adjustedStart.setHours(DAY_START, 0, 0, 0);
      } else if (adjustedStart.getHours() < DAY_START) {
        // If the proposed time is before the start of the day schedule, set to the start of the day
        adjustedStart.setHours(DAY_START, 0, 0, 0);
      }
  
      return adjustedStart;
    };
  
    // Define a start date for searching
    let searchDate = new Date();
  
    // Start looking for a non-overlapping slot
    while (searchDate < newEvent.end) {
      let proposedStart = isHighPriority ? searchDate : new Date(newEvent.end.getTime() - durationMs);
      let adjustedStart = adjustToDayHours(proposedStart);
      let proposedEnd = new Date(adjustedStart.getTime() + durationMs);
  
      // If the proposed end time is after 10 PM, it doesn't fit into the schedule, adjust start time
      if (proposedEnd.getHours() > DAY_END || (proposedEnd.getHours() === DAY_END && proposedEnd.getMinutes() > 0)) {
        // For high priority, move to the next day
        if (isHighPriority) {
          searchDate = new Date(adjustedStart.setDate(adjustedStart.getDate() + 1));
          continue;
        } else {
          // For low priority, this time slot isn't suitable; there's no space at the end of the schedule
          return null; // Return null or throw an error as no suitable slot is available
        }
      }
  
      // Check if the proposed slot overlaps with existing events
      if (!doesOverlap(adjustedStart, proposedEnd)) {
        // If we find a slot that doesn't overlap, assign it to the new event
        newEvent.start = adjustedStart;
        newEvent.end = proposedEnd;
        return newEvent;
      }
  
      // Increment the search date for high priority or decrement for low priority
      if (isHighPriority) {
        searchDate = new Date(proposedEnd.getTime());
      } else {
        searchDate = new Date(adjustedStart.getTime() - 1); // Subtract 1 millisecond to check the previous slot
      }
    }
  
    // If no slot is found before the deadline for low priority, return null or throw an error
    return null; // Or throw new Error('No available slots before deadline.');
  };
  
  // You would then call this `findNonOverlappingSlot` inside your `addEvent` function as before.
// Revised addEvent function to utilize the new slot finding logic
// Revised addEvent function to handle events based on the 'isEvent' property
const addEvent = (newEvent) => {
  if (newEvent.isEvent) {
    // If 'isEvent' is true, simply add the event to the list
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  } else {
    // If 'isEvent' is false, find a suitable slot
    const isHighPriority = newEvent.priority === 'High';
    const eventWithSlot = findNonOverlappingSlot(events, newEvent, isHighPriority);

    if (eventWithSlot) {
      // If a suitable slot is found, add the event to the list
      setEvents((prevEvents) => [...prevEvents, eventWithSlot]);
    } else {
      // Handle the case where no suitable slot is available (optional)
      console.error('No available slots before deadline.');
    }
  }
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
