import React, { useState, useEffect } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/events')
      .then(response => response.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching events.</div>;

  return (
    <div>
      {events.map(event => (
        <div key={event.id}>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>{event.category}</p>
          <p>{event.date}</p>
          <p>{event.availableSeats} seats left</p>
          <p>{event.price}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
