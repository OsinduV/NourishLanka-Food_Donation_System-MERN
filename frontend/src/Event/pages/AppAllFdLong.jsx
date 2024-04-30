//event organiser dashboard londay approved fooddrives
import { Button, Modal, Spinner, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function AppAllFdLong() {
  const [loading, setLoading] = useState(true);
    const { currentUser } = useSelector((state) => state.user);
    const [userFooddrives, setUserFooddrives] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [fooddriveIdToDelete, setFooddriveIdToDelete] = useState('');
    console.log(userFooddrives);
    useEffect(() => {
      const fetchFooddrives = async () => {
        try {
          setLoading(true);
          //retrieving requests from id
         {/**  const res = await fetch(`/api/donation/getdonations?userId=${currentUser._id}`);*/}
         const res = await fetch(`/api/fooddrive/getfooddrives?type=longdrive&status=approved`);
          const data = await res.json();
          if (res.ok) {
            setUserFooddrives(data.fooddrives);
            setLoading(false);
            if (data.fooddrives.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
          setLoading(false);
        }
      };
      if (currentUser.isAdmin) {
        fetchFooddrives();
      }
    },[currentUser._id])

    const handleShowMore = async () => {
      const startIndex = userFooddrives.length;
      try {
        const res = await fetch(
          `/api/fooddrive/getfooddrives?&startIndex=${startIndex}`
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

    const handleDeleteFooddrive = async () => {
      setShowModal(false);
      try {
        const res = await fetch(`/api/fooddrive/deletefooddrive/${fooddriveIdToDelete}/${currentUser._id}`, {
          method: 'DELETE',
        });

        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          setUserFooddrives((prev) =>
            prev.filter((fooddrive) => fooddrive._id !== fooddriveIdToDelete)
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
    <div className="flex items-center mb-10 justify-center mt-10 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold flex">Long Day FoodDrive Request List - Approved</h2>
    </div>
                  {/* Header-like section1 */}
                  <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold"></h2>
                {/* Add navigation links here */}
                <div className="flex space-x-12 font-semibold mr-10">
                <Link to='/dashboard?tab=fooddrives'>All FoodDrive requests</Link>
                <Link to='/dashboard?tab=foneday'>One day FoodDrive requests</Link>
                <Link to="/dashboard?tab=flongday">Long Day FoodDrive requests</Link>
                    {/* Add more navigation links as needed */}
                </div>
            </div>

                      {/* Header-like section2 */}
                      <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold"></h2>
                {/* Add navigation links here */}
                <div className="flex space-x-12 mr-10">
                <Link to='/dashboard?tab=fooddrives'>Approved</Link>
                <Link to='/dashboard?tab=fdeclinedlong'>Declined</Link>
                <Link to="/dashboard?tab=fcompletedlong">Completed</Link>
                    {/* Add more navigation links as needed */}
                </div>
            </div>

           {/*if the user is event orgniser and if the requests are more than 0 , then display the requests and if not just display a message no requests yet */}
           {currentUser.isAdmin && userFooddrives.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Donor ID</Table.HeadCell>
              <Table.HeadCell>Event stating date</Table.HeadCell>
              <Table.HeadCell>Event ending date</Table.HeadCell>
              <Table.HeadCell>Event Details</Table.HeadCell>
              <Table.HeadCell>Current Status</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>

            </Table.Head>

            {userFooddrives.map((fooddrive) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>{new Date(fooddrive.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{fooddrive.dnid}</Table.Cell>
                <Table.Cell>{fooddrive.DateFrom}</Table.Cell>
                <Table.Cell>{fooddrive.DateTo}</Table.Cell>
                <Table.Cell>
                  <Link className='text-teal-500 hover:underline' to={`/fooddrive/${fooddrive.slug}`}>
                    <span>View more Details</span>
                  </Link>
                </Table.Cell>

                <Table.Cell>{fooddrive.status}</Table.Cell>
                <Table.Cell>
                  <Link className='text-teal-500 hover:underline' to={`/update-fstatus/${fooddrive._id}`}>
                    <span>Edit status</span>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  
                <span onClick={()=>{
                      setShowModal(true);
                      setFooddriveIdToDelete(fooddrive._id);
                  }}
                  className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
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
          <p>You have no food drive requests yet!</p>
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
              Are you sure you want to delete this request?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteFooddrive}>
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
  )
}