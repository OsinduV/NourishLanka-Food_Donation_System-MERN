import { Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function DashFooddrives() {
    const { currentUser } = useSelector((state) => state.user);
    const [userFooddrives, setUserFooddrives] = useState([]);
    console.log(userFooddrives);
    useEffect(() => {
      const fetchFooddrives = async () => {
        try {
          //retrieving requests from id
         {/**  const res = await fetch(`/api/donation/getdonations?userId=${currentUser._id}`);*/}
         const res = await fetch(`/api/fooddrive/getfooddrives`);
          const data = await res.json();
          if (res.ok) {
            setUserFooddrives(data.fooddrives);
            if (data.fooddrives.length < 9) {
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      if (currentUser.isEventOrganiser) {
        fetchFooddrives();
      }
    },[currentUser._id])

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
           {/*if the user is event orgniser and if the requests are more than 0 , then display the requests and if not just display a message no requests yet */}
           {currentUser.isEventOrganiser && userFooddrives.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Event title</Table.HeadCell>
              <Table.HeadCell>Donor ID</Table.HeadCell>
              <Table.HeadCell>Donor Email</Table.HeadCell>
              <Table.HeadCell>Event date</Table.HeadCell>
              <Table.HeadCell>Event Details</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>

            {userFooddrives.map((fooddrive) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>{new Date(fooddrive.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  <Link className='font-medium text-gray-900 dark:text-white' to={`/fooddrive/${fooddrive.slug}`}>
                    {fooddrive.eventtitle}
                  </Link>
                </Table.Cell>
                <Table.Cell>{fooddrive.dnid}</Table.Cell>
                <Table.Cell>{fooddrive.donoremail}</Table.Cell>
                <Table.Cell>{fooddrive.eventdate}</Table.Cell>
                <Table.Cell>
                  <Link className='text-teal-500 hover:underline' to={`/fooddrive/${fooddrive.slug}`}>
                    <span>View more Details</span>
                  </Link>
                </Table.Cell>

                <Table.Cell>
                  <span className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                </Table.Cell>

                <Table.Cell>
                  <Link className='text-teal-500 hover:underline' to={`/update-fooddrive/${fooddrive._id}`}>
                    <span>Edit status</span>
                  </Link>
                </Table.Cell>

                </Table.Row>
              </Table.Body>
            ))}
            </Table>

          </>
        ) : (
          <p>You have no donation requests yet!</p>
        )}
    </div>
  )
}