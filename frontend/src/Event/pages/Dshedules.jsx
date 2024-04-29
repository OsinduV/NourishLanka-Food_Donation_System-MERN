import { Button, Modal, Spinner, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Dshedules() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const [userEvents, setUserEvents] = useState([]);
  console.log(userEvents);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [eventIdToDelete, setEventIdToDelete] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/event/getevents?category=DonationEvent`);
        const data = await res.json();
        if (res.ok) {
          setUserEvents(data.events);
          if (data.events.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchEvents();
  }, []);

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

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>

      { userEvents.length > 0 ? (
        <>
            <Table hoverable className='shadow-md'>
             <Table.Head>
             <Table.HeadCell>Event ID</Table.HeadCell>
              <Table.HeadCell>Event Date</Table.HeadCell>
              <Table.HeadCell>Event Time</Table.HeadCell>
              <Table.HeadCell>Event Location</Table.HeadCell>
              <Table.HeadCell>Organizer(Donor) Email</Table.HeadCell>
            </Table.Head>

            {userEvents.map((event) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>{event.customId}</Table.Cell>
                <Table.Cell>{event.date}</Table.Cell>
                <Table.Cell>{event.time}</Table.Cell>
                <Table.Cell>{event.location}</Table.Cell>
                <Table.Cell>{event.donoremail}</Table.Cell>
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