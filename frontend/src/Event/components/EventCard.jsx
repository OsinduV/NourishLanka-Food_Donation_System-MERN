import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from "react-icons/md";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";

export default function EventCard({ event }) {
  return (
    <div className='group flex flex-col sm:flex-row p-7 border bg-white dark:bg-slate-200 shadow-md hover:shadow-lg transition-shadow justify-center items-center rounded-xl text-center mb-7 w-full'>
    <Link to={`/event/${event.slug}`}>
        <img
          src={event.image}
          alt='event cover'
          className='h-[260px] w-[350px]  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
        />
      </Link>
      
      <div className="flex-1 justify-center flex flex-col ml-10 mr-10 gap-2 w-full">
        <p className='truncate text-lg font-semibold text-slate-700'>{event.title}</p>


        <div className='flex justify-center items-center gap-1'>
          <p className='text-gray-600 line-clamp-2' dangerouslySetInnerHTML={{ __html: event && event.content }}></p>
        </div>

        <div className='flex justify-center items-center gap-1'>
          <MdLocationOn className='h-6 w-7 text-teal-500'/>
          <p className='text-sm text-gray-600 truncate'>{event.location}</p>
        </div>

        <div className='flex justify-center items-center gap-1'>
          <BsCalendar2DateFill className='h-4 w-6 text-teal-500'/>
          <p className='text-sm text-gray-600 truncate'>{event.date}</p>
        </div>

        <div className='flex justify-center items-center gap-1'>
          <IoIosTime className='h-4 w-6 text-teal-500'/>
          <p className='text-sm text-gray-600 truncate'>{event.time}</p>
        </div>

        <div className='flex mx-auto'>
        <p className='font-semibold text-slate-700 mr-11'>category - {event.category}</p>
        <p className='font-semibold text-slate-700'>status - {event.status}</p>
        </div>
        <div className="mt-3">
          <Link to={`/event/${event.slug}`} className='z-10 border border-gray-500 px-3 py-1 rounded-md text-gray-500 transition-all duration-300 hover:text-teal-500 hover:border-teal-500'>
            View more details
          </Link>
        </div>
      </div>
    </div>
  )
}
