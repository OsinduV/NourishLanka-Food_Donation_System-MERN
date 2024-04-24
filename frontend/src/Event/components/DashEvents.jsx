import { Button, Modal, Spinner, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashEvents() {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const [userEvents, setUserEvents] = useState([]);
  console.log(userEvents);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState('');
  useEffect(() => {
    console.log("useEffect triggered");
    const fetchEvents = async () => {
      try {
        setLoading(true);
        console.log("fetchEvents function called");
        const res = await fetch(`/api/event/getevents?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          console.log("Data received:", data.events);
          setUserEvents(data.events);
          setLoading(false);

          console.log("userEvents after setting:", userEvents);
          if (data.events.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    if (currentUser.isAdmin) {
      fetchEvents();
    }
  },[currentUser._id])

  const handleShowMore = async () => {
    const startIndex = userEvents.length;
    try {
      const res = await fetch(
        `/api/event/getevents?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserEvents((prev) => [...prev, ...data.events]);
        if (data.events.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteEvent = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/event/deleteevent/${eventIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserEvents((prev) =>
          prev.filter((event) => event._id !== eventIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading)
  return (
    <div className='flex justify-center items-center min-h-screen ml-40'>
      <Spinner size='xl' />
    </div>
  );
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>

      {/*if the user is event orgniser and if the events are more than 0 , then display the events and if not just display a message no events yet */}
      {currentUser.isAdmin && userEvents.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Event image</Table.HeadCell>
              <Table.HeadCell>Event title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Organzer(donor) ID</Table.HeadCell>
              <Table.HeadCell>Event status</Table.HeadCell>
              <Table.HeadCell>Hosting date</Table.HeadCell>
              <Table.HeadCell>Hosting time</Table.HeadCell>
              <Table.HeadCell>Hosting Location</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>

            {userEvents.map((event) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>{new Date(event.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  <Link to={`/event/${event.slug}`}>
                      <img
                        src={event.image}
                        alt={event.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link className='font-medium text-gray-900 dark:text-white' to={`/event/${event.slug}`}>
                    {event.title}
                  </Link>
                </Table.Cell>
                <Table.Cell>{event.category}</Table.Cell>
                <Table.Cell>{event.donorid}</Table.Cell>
                <Table.Cell>{event.status}</Table.Cell>
                <Table.Cell>{event.date}</Table.Cell>
                <Table.Cell>{event.time}</Table.Cell>
                <Table.Cell>{event.location}</Table.Cell>
                <Table.Cell>
                  <span onClick={() => {
                        setShowModal(true);
                        setEventIdToDelete(event._id);
                      }} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                </Table.Cell>
                <Table.Cell>
                  <Link className='text-teal-500 hover:underline' to={`/update-event/${event._id}`}>
                    <span>Edit</span>
                  </Link>
                </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
            </Table>

            {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
          </>
        ) : (
          <p>You have no events yet!</p>
        )}

    <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this event?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteEvent}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}