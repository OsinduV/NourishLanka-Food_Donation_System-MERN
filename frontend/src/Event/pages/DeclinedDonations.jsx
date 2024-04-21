//user dashboard declined donation events
import { Spinner, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Button, Modal,} from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DeclinedDonations() {
  const [loading, setLoading] = useState(true);
    const { currentUser } = useSelector((state) => state.user);
    const [userDonations, setUserDonations] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [mydonationIdToDelete, setmyDonationIdToDelete] = useState('');
    console.log(userDonations);
    useEffect(() => {
      const fetchDonations = async () => {
        try {
          setLoading(true);
          //retrieving requests from id
         const res = await fetch(`/api/donation/getdonations?status=declined&userId=${currentUser._id}`);
          const data = await res.json();
          if (res.ok) {
            setUserDonations(data.donations);
            setLoading(false);
            if (data.donations.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
          setLoading(false);
        }
      };
      if (!currentUser.isEventOrganiser) {
        fetchDonations();
      }
    },[currentUser._id])

    const handleShowMore = async () => {
      const startIndex = userDonations.length;
      try {
        const res = await fetch(
          `/api/donation/getdonations?userId=${currentUser._id}&startIndex=${startIndex}`
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
        const res = await fetch(`/api/donation/deletemydonation/${mydonationIdToDelete}/${currentUser._id}`, {
          method: 'DELETE',
        });

        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          setUserDonations((prev) =>
            prev.filter((donation) => donation._id !== mydonationIdToDelete)
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
            <h2 className="text-3xl font-semibold flex">Declined My Donation Campaign Requests</h2>
        </div>
             {/* Header-like section */}
             <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold"></h2>
                {/* Add navigation links here */}
                <div className="flex space-x-12 font-semibold mr-10">
                <Link to="/dashboard?tab=drequests">All requests</Link>
                <Link to='/dashboard?tab=dapproved'>Approved events</Link>
                <Link to="/dashboard?tab=ddeclined">Declined events</Link>
                <Link to="/dashboard?tab=dcompleted">Completed events</Link>
                    {/* Add more navigation links as needed */}
                </div>
            </div>
           {/*if the user is event orgniser and if the requests are more than 0 , then display the requests and if not just display a message no requests yet */}
           {userDonations.length > 0 ? (
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

            {userDonations.map((donation) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>{new Date(donation.createdAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{new Date(donation.updatedAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  <Link className='font-medium text-gray-900 dark:text-white' to={`/donation/${donation.slug}`}>
                    {donation.eventtitle}
                  </Link>
                </Table.Cell>
                <Table.Cell>{donation.eventdate}</Table.Cell>
                <Table.Cell>
                  <Link className='text-teal-500 hover:underline' to={`/donation/${donation.slug}`}>
                    <span>View my request</span>
                  </Link>
                </Table.Cell>
                <Table.Cell>{donation.status}</Table.Cell>

                <Table.Cell>
                  <span onClick={()=>{
                      setShowModal(true);
                      setmyDonationIdToDelete(donation._id);
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