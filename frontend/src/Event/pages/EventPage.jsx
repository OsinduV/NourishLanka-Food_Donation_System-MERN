import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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
},[eventSlug]);

if (loading)
return (
  <div className='flex justify-center items-center min-h-screen'>
    <Spinner size='xl' />
  </div>
);
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
    <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{event && event.title}</h1>
    <Link
        to={`/search?category=${event && event.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {event && event.category}
        </Button>
      </Link>
      <img
        src={event && event.image}
        alt={event && event.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />

    <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full'></div>

    <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: event && event.content }}
      ></div>
    </main>
  )
}
