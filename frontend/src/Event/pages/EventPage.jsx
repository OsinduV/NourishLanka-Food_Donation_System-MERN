import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CalltoAction from '../components/CalltoAction';
import { MdLocationOn } from "react-icons/md";
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import CommentSection from '../../Ratings and Review_f/components/CommentSection';

export default function EventPage() {
  const { eventSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/event/getevents?slug=${eventSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setEvent(data.events[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventSlug]);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl'>{event && event.title}</h1>
      <p className='font-semibold text-slate-700 dark:text-slate-300 mx-auto text-xl'>Event ID - {event.customId}</p>
      <p className='font-semibold text-slate-700 dark:text-slate-300 mx-auto'>status - {event.status}</p>

      ,<div className='flex flex-row'></div>
      <Link
        to={`/search?category=${event && event.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {event && event.category}
        </Button>
      </Link>

      <div className='flex justify-center items-center gap-1'>
                <p className='text-sm text-gray-600 truncate dark:text-white mt-5'>FoodDrive Type - {event.type}</p>
      </div>

      <img
        src={event && event.image}
        alt={event && event.title}
        className='mt-10 p-3 h-[400px] w-[800px] object-cover mx-auto'
      />

      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full'></div>

      <div className='p-3 w-full post-content text-center'>
        <p className='text-2xl font-semibold word'>Event description</p>
        <div className="text-left break-words" dangerouslySetInnerHTML={{ __html: event && event.content }}></div>

        {/* Render Event Details Based on Category */}
        {event && event.category === 'DonationEvent' ? (
          <>
            <div className='flex mt-9'>
              <p className='text-xl font-semibold mr-14'>Event Date</p>
              <BsCalendar2DateFill className='h-5 w-7 text-teal-500 mr-1' />
              <p className='text-xl text-gray-600 truncate'>{event.date}</p>
            </div>

            <div className='flex '>
              <p className='text-xl font-semibold mr-8'>Starting Time</p>
              <IoIosTime className='h-6 w-7 text-teal-500' />
              <p className='text-xl text-gray-600 truncate'>{event.time}</p>
            </div>

            <div className='flex '>
              <p className='text-xl font-semibold mr-5'>Event Location</p>
              <MdLocationOn className='h-6 w-7 text-teal-500' />
              <p className='text-xl text-gray-600 truncate'>{event.location}</p>
            </div>
          </>
        ) : event && event.category === 'FoodDrive' ? (
          event.type === 'onedaydrive' ? (
            <>
            <div className='flex mt-9'>
            <p className='text-xl font-semibold mr-14'>Event Date</p>
            <BsCalendar2DateFill className='h-5 w-7 text-teal-500 mr-1 mt-1 ml-9' />
                <p className='text-xl text-gray-600 truncate'>{event.eventdate}</p>
            </div>

            <div className='flex '>
            <p className='text-xl font-semibold mr-8'>Collection Time</p>
                <IoIosTime className='h-5 w-7 text-teal-500 mt-1 ml-4' />
                <p className='text-xl text-gray-600 truncate dark:text-white'>{event.eventtimefrom} - {event.eventtimeto}</p>
            </div>
            

            <div className='flex '>
            <p className='text-xl font-semibold mr-5'>Collection Point(s)</p>
                <MdLocationOn className='h-6 w-7 text-teal-500 ' />
                <p className='text-xl text-gray-600 truncate'>{event.eventlocation}</p>
              </div>

            </>
          ) : (
            <>

              <div className='flex justify-center items-center gap-1'>
                <BsCalendar2DateFill className='h-4 w-6 text-teal-500' />
                <p className='text-sm text-gray-600 truncate dark:text-white'>{event.DateFrom} - {event.DateTo}</p>
              </div>

              <div className='flex justify-center items-center gap-1'>
                <IoIosTime className='h-4 w-6 text-teal-500' />
                <p className='text-sm text-gray-600 truncate dark:text-white'>{event.eventtimelongfrom} - {event.eventtimelongto}</p>
              </div>

              <div className='flex justify-center items-center gap-1'>
                <MdLocationOn className='h-6 w-7 text-teal-500' />
                <p className='text-sm text-gray-600 truncate dark:text-white'>{event.eventlocationlong}</p>
              </div>


              <div className='flex justify-center items-center gap-1'>
                <p className='text-sm text-gray-600 truncate dark:text-white'>Drive Type - {event.type}</p>
              </div>

              <div className='flex mx-auto'>
                <p className='font-semibold text-slate-700 mr-11 dark:text-slate-300'>category - {event.category}</p>
                <p className='font-semibold text-slate-700 dark:text-slate-300'>status - {event.status}</p>
              </div>
            </>
          )
        ) : null}

      </div>

  

    <div className='max-w-4xl mx-auto w-full mt-20'>
    <CommentSection postId={event._id} />

        <CalltoAction />
      </div>
    </main>
  );
}

