//component in event organiser dashboard where event organiser see all the requests made by donors
import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function DashDonations() {
    const { currentUser } = useSelector((state) => state.user);
    const [userDonations, setUserDonations] = useState([]);
    console.log(userDonations);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [donationIdToDelete, setDonationIdToDelete] = useState('');
    useEffect(() => {
      const fetchDonations = async () => {
        try {
          //retrieving requests from id
         {/**  const res = await fetch(`/api/donation/getdonations?userId=${currentUser._id}`);*/}
         const res = await fetch(`/api/donation/getdonations`);
          const data = await res.json();
          if (res.ok) {
            setUserDonations(data.donations);
            if (data.donations.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      if (currentUser.isEventOrganiser) {
        fetchDonations();
      }
    },[currentUser._id])

    const handleShowMore = async () => {
      const startIndex = userDonations.length;
      try {
        const res = await fetch(
          `/api/donation/getdonations?startIndex=${startIndex}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserDonations((prev) => [...prev, ...data.donations]);
          if (data.donations.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const handleDeleteDonation = async () => {
      setShowModal(false);
      try {
        const res = await fetch(`/api/donation/deletedonation/${donationIdToDelete}/${currentUser._id}`, {
          method: 'DELETE',
        });
        
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          setUserDonations((prev) =>
            prev.filter((donation) => donation._id !== donationIdToDelete)
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
           {/*if the user is event orgniser and if the requests are more than 0 , then display the requests and if not just display a message no requests yet */}
           {currentUser.isEventOrganiser && userDonations.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Event title</Table.HeadCell>
              <Table.HeadCell>Donor ID</Table.HeadCell>
              <Table.HeadCell>Donor Email</Table.HeadCell>
              <Table.HeadCell>Event date</Table.HeadCell>
              <Table.HeadCell>Event Details</Table.HeadCell>
              <Table.HeadCell>Current Status</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit Status</span>
              </Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>

            {userDonations.map((donation) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>{new Date(donation.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  <Link className='font-medium text-gray-900 dark:text-white' to={`/donation/${donation.slug}`}>
                    {donation.eventtitle}
                  </Link>
                </Table.Cell>
                <Table.Cell>{donation.dnid}</Table.Cell>
                <Table.Cell>{donation.donoremail}</Table.Cell>
                <Table.Cell>{donation.eventdate}</Table.Cell>
                <Table.Cell>
                  <Link className='text-teal-500 hover:underline' to={`/donation/${donation.slug}`}>
                    <span>View more Details</span>
                  </Link>
                </Table.Cell>
                <Table.Cell>{donation.status}</Table.Cell>


                <Table.Cell>
                  <Link className='text-teal-500 hover:underline' to={`/update-dstatus/${donation._id}`}>
                    <span>Edit status</span>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <span onClick={()=>{
                      setShowModal(true);
                      setDonationIdToDelete(donation._id);
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
          <p>You have no donation requests yet!</p>
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
              <Button color='failure' onClick={handleDeleteDonation}>
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