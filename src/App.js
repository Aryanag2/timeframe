import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import CalendarPage from './CalendarPage';
import TodoPage from './ToDoPage';
import SettingsPage from './SettingsPage';
import { EventsProvider } from './EventsContext'; // Import the EventsProvider
import HomePage from './HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <EventsProvider> {/* Wrap your routes in the EventsProvider */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </EventsProvider>
    </BrowserRouter>
  );
};

export default App;
