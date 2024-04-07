import React from 'react'
import { Link } from 'react-router-dom'

export default function EventCard({ event }) {
  return (
    <div className='group flex flex-col sm:flex-row p-7 border border-teal-500 justify-center items-center rounded-xl text-center mb-7'>
    <Link to={`/event/${event.slug}`}>
        <img
          src={event.image}
          alt='event cover'
          className='h-[260px] w-[350px]  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
        />
      </Link>
      <div className="flex-1 justify-center flex flex-col ml-4">
        <p className='text-lg font-semibold line-clamp-3'>{event.title}</p>
        <span className='text-sm'>{event.category}</span>
        <div className="mt-14">
          <Link to={`/event/${event.slug}`} className='z-10 border border-gray-500 px-3 py-1 rounded-md text-gray-500 transition-all duration-300 hover:text-teal-500 hover:border-teal-500'>
            View more details
          </Link>
        </div>
      </div>
    </div>
  )
}
