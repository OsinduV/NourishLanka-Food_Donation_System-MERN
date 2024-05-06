import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EventCard from '../components/EventCard';


export default function PreviousDonations() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
          const fetchEvents = async () => {
          const res = await fetch('/api/event/getEvents?status=completed&category=DonationEvent');
          const data = await res.json();
          setEvents(data.events);
        };
        fetchEvents();
      }, []);

  return (
    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Our Successful journey in Donation Campaigns</h1>
        <p className='text-gray-500 text-lg'>Join our community of compassionate donors 
        who have successfully hosted numerous donation and food drive events with our support. Together, 
        we've made a meaningful impact, providing crucial support to those in need. Working alongside us, 
        donors have found a fulfilling opportunity to contribute to their communities, making a tangible difference
         in the lives of others. Start your journey with us today and be a part of something truly transformative."</p>

    <Link
        to='/search'
        className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
        View all events
    </Link>

    <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {events && events.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Past Events</h2>
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
