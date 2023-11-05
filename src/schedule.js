// Import the required API functions
import { fetchEvents, createEvent } from './api';

const scheduleTodos = async (todos) => {
  // Fetch events to find free slots
  const events = await fetchEvents();
  // Assuming the workday starts at 8 AM and ends at 8 PM
  const workDayStart = new Date().setHours(8, 0, 0, 0);
  const workDayEnd = new Date().setHours(20, 0, 0, 0);

  let freeSlots = [{
    start: new Date(workDayStart),
    end: new Date(workDayEnd),
  }];

  // Adjust freeSlots based on existing events
  events.forEach(event => {
    freeSlots = adjustFreeSlots(freeSlots, event);
  });

  // Sort todos by duration, shortest first for better fitting
  const sortedTodos = todos.sort((a, b) => a.duration - b.duration);

  // Try to schedule todos in the free slots
  for (const todo of sortedTodos) {
    let scheduled = false;
    for (const slot of freeSlots) {
      if (slot.end - slot.start >= todo.duration) {
        // Schedule the todo
        const newEvent = {
          title: todo.title,
          start: new Date(slot.start),
          end: new Date(slot.start.getTime() + todo.duration),
        };
        
        // Create event via API
        await createEvent(newEvent);

        // Update the slot start to reflect the scheduled todo
        slot.start = new Date(slot.start.getTime() + todo.duration);
        scheduled = true;
        break; // Break the loop since todo has been scheduled
      }
    }
    
    if (!scheduled) {
      console.log(`Could not schedule todo: ${todo.title}`);
    }
  }
};

const adjustFreeSlots = (freeSlots, event) => {
  return freeSlots.reduce((slots, slot) => {
    if (event.end <= slot.start || event.start >= slot.end) {
      // No overlap
      slots.push(slot);
    } else if (event.start > slot.start && event.end < slot.end) {
      // Event splits the slot into two
      slots.push({ start: slot.start, end: new Date(event.start) });
      slots.push({ start: new Date(event.end), end: slot.end });
    } else if (event.start <= slot.start && event.end < slot.end) {
      // Event cuts off the start of the slot
      slots.push({ start: new Date(event.end), end: slot.end });
    } else if (event.start > slot.start && event.end >= slot.end) {
      // Event cuts off the end of the slot
      slots.push({ start: slot.start, end: new Date(event.start) });
    }
    // If the event covers the whole slot, it's consumed entirely, so don't add it back
    return slots;
  }, []);
};

// Mock todos for testing purposes
const mockTodos = [
  { title: 'Write Code', duration: 2 * 60 * 60 * 1000 }, // 2 hours in milliseconds
  { title: 'Debug App', duration: 1 * 60 * 60 * 1000 }, // 1 hour
  // Add more todos as needed for the demo
];

// Call the function with mockTodos or actual todos retrieved from somewhere
scheduleTodos(mockTodos).then(() => {
  console.log('Scheduling complete');
}).catch(error => {
  console.error('Scheduling failed', error);
});
