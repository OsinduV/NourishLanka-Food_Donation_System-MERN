import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashEvents() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const [userEvents, setUserEvents] = useState([]);
  console.log(userEvents);
  useEffect(() => {
    console.log("useEffect triggered");
    const fetchEvents = async () => {
      try {
        console.log("fetchEvents function called");
        const res = await fetch(`/api/event/getevents?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          console.log("Data received:", data.events);
          setUserEvents(data.events);

          console.log("userEvents after setting:", userEvents);
          if (data.events.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isEventOrganiser) {
      fetchEvents();
    }
  },[currentUser._id])

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>

      {/*if the user is event orgniser and if the events are more than 0 , then display the events and if not just display a message no events yet */}
      {currentUser.isEventOrganiser && userEvents.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
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
                <Table.Cell>
                  <span className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
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
          </>
        ) : (
          <p>You have no events yet!</p>
        )}
  
    </div>
  );
}