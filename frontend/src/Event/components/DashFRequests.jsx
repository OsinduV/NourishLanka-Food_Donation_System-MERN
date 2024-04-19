//component in user dashboard where user see all the requests made by only themselves
import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function DashFRequests() {
    const { currentUser } = useSelector((state) => state.user);
    const [userFooddrives, setUserFooddrives] = useState([]);
    const [showMore, setShowMore] = useState(true);
    console.log(userFooddrives);
    useEffect(() => {
      const fetchFooddrives = async () => {
        try {
          //retrieving requests from id
         const res = await fetch(`/api/fooddrive/getfooddrives?userId=${currentUser._id}`);
          const data = await res.json();
          if (res.ok) {
            setUserFooddrives(data.fooddrives);
            if (data.fooddrives.length < 9) {
                setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      if (!currentUser.isEventOrganiser) {
        fetchFooddrives();
      }
    },[currentUser._id])

    const handleShowMore = async () => {
        const startIndex = userFooddrives.length;
        try {
          const res = await fetch(
            `/api/fooddrive/getfooddrives?userId=${currentUser._id}&startIndex=${startIndex}`
          );
          const data = await res.json();
          if (res.ok) {
            setUserFooddrives((prev) => [...prev, ...data.fooddrives]);
            if (data.fooddrives.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
  

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
           {/*if the user is event orgniser and if the requests are more than 0 , then display the requests and if not just display a message no requests yet */}
           {userFooddrives.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>Status updated date</Table.HeadCell>
              <Table.HeadCell>Event title</Table.HeadCell>
              <Table.HeadCell>Event date</Table.HeadCell>
              <Table.HeadCell>Event Details</Table.HeadCell>
              <Table.HeadCell>Your event status</Table.HeadCell>
              <Table.HeadCell>Delete your event</Table.HeadCell>
            </Table.Head>

            {userFooddrives.map((fooddrive) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>{new Date(fooddrive.createdAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{new Date(fooddrive.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  <Link className='font-medium text-gray-900 dark:text-white' to={`/fooddrive/${fooddrive.slug}`}>
                    {fooddrive.eventtitle}
                  </Link>
                </Table.Cell>
                <Table.Cell>{fooddrive.eventdate}</Table.Cell>
                <Table.Cell>
                  <Link className='text-teal-500 hover:underline' to={`/fooddrive/${fooddrive.slug}`}>
                    <span>View my Request</span>
                  </Link>
                </Table.Cell>
                <Table.Cell>{fooddrive.status}</Table.Cell>
                <Table.Cell>
                  <span className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
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
          <p>You have no donation requests yet!</p>
        )}
    </div>
  )
}
