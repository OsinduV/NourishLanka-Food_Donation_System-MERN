import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EventCard from '../components/EventCard';


export default function EventHome() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
          const fetchEvents = async () => {
          const res = await fetch('/api/event/getEvents');
          const data = await res.json();
          setEvents(data.events);
        };
        fetchEvents();
      }, []);

  return (
    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to event Page</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>Together, we can help our neighbors get the food and resources they need to thrive. Whether you're looking to contribute your time, skills, or resources, every action brings us closer to a future where no one goes hungry.
Hunger is a crisis, but it's a challenge we can overcome. Join us in tackling this issue head-on.</p>

    <Link
        to='/search'
        className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
        View all events
    </Link>

    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {events && events.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Upcoming Events</h2>
            <div className='flex-col gap-4'>
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>

            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all events
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
