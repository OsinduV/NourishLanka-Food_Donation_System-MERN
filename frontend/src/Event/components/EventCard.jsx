import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { BsCalendar2DateFill } from 'react-icons/bs';
import { IoIosTime } from 'react-icons/io';

export default function EventCard({ event }) {
  const renderEventDetails = () => {
    if (event.category === 'DonationEvent') {
      return (
        <>
          <div className="flex justify-center items-center gap-1">
            <BsCalendar2DateFill className="h-4 w-6 text-teal-500" />
            <p className="text-sm text-gray-600 truncate dark:text-white">{event.date}</p>
          </div>

          <div className="flex justify-center items-center gap-1">
            <IoIosTime className="h-4 w-6 text-teal-500" />
            <p className="text-sm text-gray-600 truncate dark:text-white">{event.time}</p>
          </div>

          <div className="flex mx-auto">
            <p className="font-semibold text-slate-700 mr-11 dark:text-slate-300">category - {event.category}</p>
            <p className="font-semibold text-slate-700 dark:text-slate-300">status - {event.status}</p>
          </div>
        </>
      );
    } else if (event.category === 'FoodDrive') {
      if (event.type === 'onedaydrive') {
        return (
          <>
           <div className="flex justify-center items-center gap-1">
           <MdLocationOn className="h-6 w-7 text-teal-500" />
            <p className="text-sm text-gray-600 truncate dark:text-white">{event.eventlocation}</p>
          </div>

            <div className="flex justify-center items-center gap-1">
              <BsCalendar2DateFill className="h-4 w-6 text-teal-500" />
              <p className="text-sm text-gray-600 truncate dark:text-white">{event.eventdate}</p>
            </div>

            <div className="flex justify-center items-center gap-1">
              <IoIosTime className="h-4 w-6 text-teal-500" />
              <p className="text-sm text-gray-600 truncate dark:text-white">{event.eventtimefrom} - {event.eventtimeto}</p>
            </div>

            <div className="flex justify-center items-center gap-1">
              <p className="text-sm text-gray-600 truncate dark:text-white">Drive Type - {event.type}</p>
            </div>

            <div className="flex mx-auto">
              <p className="font-semibold text-slate-700 mr-11 dark:text-slate-300">category - {event.category}</p>
              <p className="font-semibold text-slate-700 dark:text-slate-300">status - {event.status}</p>
            </div>
          </>
        );
      } else if (event.type === 'longdrive') {
        return (
          <>

          <div className="flex justify-center items-center gap-1">
           <MdLocationOn className="h-6 w-7 text-teal-500" />
            <p className="text-sm text-gray-600 truncate dark:text-white">{event.eventlocationlong}</p>
          </div>

            <div className="flex justify-center items-center gap-1">
              <BsCalendar2DateFill className="h-4 w-6 text-teal-500" />
              <p className="text-sm text-gray-600 truncate dark:text-white">{event.DateFrom} - {event.DateTo}</p>
            </div>

            <div className="flex justify-center items-center gap-1">
              <IoIosTime className="h-4 w-6 text-teal-500" />
              <p className="text-sm text-gray-600 truncate dark:text-white">{event.eventtimelongfrom} - {event.eventtimelongto}</p>
            </div>


            <div className="flex justify-center items-center gap-1">
              <p className="text-sm text-gray-600 truncate dark:text-white">Drive Type - {event.type}</p>
            </div>


            <div className="flex mx-auto">
              <p className="font-semibold text-slate-700 mr-11 dark:text-slate-300">category - {event.category}</p>
              <p className="font-semibold text-slate-700 dark:text-slate-300">status - {event.status}</p>
            </div>
          </>
        );
      }
    }
  };

  return (
    <div className="group flex flex-col sm:flex-row p-7 border bg-white dark:border-gray-700 dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow justify-center items-center rounded-xl text-center mb-7 w-full">
      <Link to={`/event/${event.slug}`}>
        <img
          src={event.image}
          alt="event cover"
          className="h-[260px] w-[370px] object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>

      <div className="flex-1 justify-center flex flex-col ml-10 mr-10 gap-2 w-full">
        <p className="truncate text-lg font-semibold text-slate-700 dark:text-slate-400">{event.title}</p>

        <div className="w-[520px] ml-10 truncate overflow-hidden">
  <p className="text-gray-600 dark:text-slate-300 text-center" dangerouslySetInnerHTML={{ __html: event && event.content }}></p>
</div>



        {renderEventDetails()}

        <div className="mt-3">
          <Link to={`/event/${event.slug}`} className="z-10 border border-gray-500 px-3 py-1 rounded-md text-gray-500 transition-all duration-300 hover:text-teal-500 hover:border-teal-500 dark:text-slate-300">
            View more details
          </Link>
        </div>
      </div>
    </div>
  );
}
