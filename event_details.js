import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./event.css";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false); // Track booking status

  useEffect(() => {
    if (!id) {
      setError('Invalid event ID.');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5002/event/${id}`)
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Event not found');
          } else {
            throw new Error('Network response was not ok');
          }
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Check structure
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError('Error fetching event details.');
        setLoading(false);
      });
  }, [id]);

  const handleBookTicket = () => {
    if (event.availableSeats > 0) {
      setEvent(prevEvent => ({
        ...prevEvent,
        availableSeats: prevEvent.availableSeats - 1, // Decrease the seats
      }));
      setBookingSuccess(true);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!event) return <div>No event details available.</div>;

  return (
    <div>
      <div className="page4">
        <div className="page7"> {/* Changed from 'class' to 'className' */}
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>Category: {event.category}</p>
          <p>Date: {event.date}</p>
          <p>
            {event.availableSeats} seat{event.availableSeats !== 1 ? 's' : ''} left
          </p>
          <p>Price: ${event.price}</p>

          {/* Disable the button if no seats are left */}
          {event.availableSeats > 0 ? (
            <button onClick={handleBookTicket} className="page5">
              Book Ticket
            </button>
          ) : (
            <p style={{ color: 'red' }}>No seats available</p>
          )}
          {bookingSuccess && (
            <p style={{ color: 'green', fontSize: '30px' }}>Ticket successfully booked!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;