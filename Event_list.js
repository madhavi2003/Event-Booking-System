import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "./event.css"; // Assuming your CSS file is named event.css

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5; // Number of events per page

  useEffect(() => {
    fetch('http://localhost:5002/event')
      .then(response => response.json())
      .then(data => {
        const eventData = Array.isArray(data) ? data : data.events || [];
        setEvents(eventData);
        setFilteredEvents(eventData);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(value.toLowerCase()) ||
      event.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEvents(filtered);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Memoize the current events for the page
  const paginatedEvents = useMemo(() => {
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    return filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  }, [currentPage, filteredEvents]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching events.</div>;
  if (filteredEvents.length === 0) return <div>No events available.</div>;

  return (
    <div>
      <h1 className="item1">Event Booking System</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearch}
          className='search'
        />
      </div>

      <div className="page1">
        {paginatedEvents.map(event => (
          <div key={event.id} className="page2">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>Category: {event.category}</p>
            <p>Date: {event.date}</p>
            <p>{event.availableSeats} seats left</p>
            <p>Price: ${event.price}</p>
            <button className="btn">
              <Link to={`/event/${event.id}`}>More Details</Link>
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EventList;
