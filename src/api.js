// api.js
const apiUrl = 'http://localhost:5000/api/todos'; // Replace with the actual API URL

export const fetchTodos = async () => {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const createTodo = async (todoData) => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const updateTodo = async (id, todoData) => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const API_BASE_URL = 'http://localhost:3000'; // Replace with your actual API base URL

export const fetchEvents = async () => {
  // This should be replaced with an actual API call to fetch events
  const response = await fetch(`${API_BASE_URL}/events`);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error fetching events');
  }
};

export const createEvent = async (newEvent) => {
  // This should be replaced with an actual API call to create an event
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEvent),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error creating event');
  }
};

export const deleteEvent = async (eventId) => {
  // This should be replaced with an actual API call to delete an event
  const response = await fetch(`${API_BASE_URL}/events/${eventId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting event');
  }
};