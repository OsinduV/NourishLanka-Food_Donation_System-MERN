import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

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
    <div>

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
              <Table.Body>
                
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