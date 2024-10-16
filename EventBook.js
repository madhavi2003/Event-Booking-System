import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import EventList from './Event_list';
import EventDetail from './event_details';
import Login from './event_login';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('User:', user); // Log the user state
  }, [user]);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser}  />} />
        <Route path="/event/:id" element={user ? <EventDetail /> : <Navigate to="/login" />} />
        <Route path="/" element={<EventList />} />
      </Routes>
    </Router>
  );
};

export default App;
