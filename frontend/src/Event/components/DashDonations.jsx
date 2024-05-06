//component in event organiser dashboard where event organiser see all the requests made by donors
import { Button, Modal, Select, Spinner, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function DashDonations() {
    const [loading, setLoading] = useState(true);
    const { currentUser } = useSelector((state) => state.user);
    const [userDonations, setUserDonations] = useState([]);
    console.log(userDonations);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [donationIdToDelete, setDonationIdToDelete] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    useEffect(() => {
      const fetchDonations = async () => {
        try {
          setLoading(true);
// Corrected code for constructing API endpoint URL
let apiUrl = '/api/donation/getdonations'; // Define apiUrl here

// Construct the query parameters using URLSearchParams
const queryParams = new URLSearchParams();
if (selectedStatus) {
  queryParams.append('status', selectedStatus);
}
if (selectedDate) {
  // Convert selectedDate to ISO format to match with the createdAt date
  const selectedISODate = new Date(selectedDate).toISOString().split('T')[0];
  queryParams.append('date', selectedISODate);
}

// Append query parameters to apiUrl if any
if (queryParams.toString()) {
  apiUrl += `?${queryParams.toString()}`;
}

// Fetch data from the constructed API endpoint
const res = await fetch(apiUrl);

          const data = await res.json();
          if (res.ok) {
            // Sort the donations by creation date if selectedDate is provided
            if (selectedDate) {
                data.donations.sort((a, b) => new Date(a.eventdate) - new Date(b.eventdate));
            }
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
      if (currentUser.isAdmin) {
        fetchDonations();
      }
    },[currentUser._id, selectedStatus, selectedDate])

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
    if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen ml-40'>
        <Spinner size='xl' />
      </div>
    );

    const generateReport = () => {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        "DonationID, Date Created,Event Title,Event Date,Status\n";
      const rows = userDonations.map(
        (request) =>
          `${request.donationId},${new Date(request.createdAt).toLocaleDateString()},${request.eventtitle},${request.eventdate},${request.status
          }`
      );
      const csvRows = rows.join("\n");
      const csv = csvContent + csvRows;
      const encodedUri = encodeURI(csv);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "donation_request_report.csv");
      document.body.appendChild(link);
      link.click();
    };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
           {/*if the user is event orgniser and if the requests are more than 0 , then display the requests and if not just display a message no requests yet */}

        <div className="flex items-center mb-10 justify-center mt-10 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
            <h2 className="text-3xl font-semibold flex">Donation Campaign Request List</h2>
        </div>

                              {/* Header-like section2 */}
                              <div className="flex justify-between items-center mb-5">
    <h2 className="text-xl font-semibold"></h2>
    {/* Add navigation links here */}
    <div className="flex space-x-12 font-semibold mr-10 items-center w-full">

        <div className="flex items-center">
            <p className="mr-2">Sort by Event date:</p>
            <div className="flex items-center">
                <input
                    type="date"
                    id="selectedDate"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 max-w-xs" // Adjusted width
                    max={new Date().toISOString().split("T")[0]} // Set max date to today's date
                />
            </div>
        </div>

        <div className="flex space-x-4 font-semibold mr-10 items-center">
            <Select className='w-full' onChange={(e) => setSelectedStatus(e.target.value)} value={selectedStatus}>
                <option value="">Sort by Status</option>
                <option value="approved">Approved</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="declined">Declined</option>
            </Select>
        </div>
    </div>

    <Button
                type="button"
                gradientDuoTone="greenToBlue"
                onClick={generateReport}
              >
                Generate Report
              </Button>

</div>
           {currentUser.isAdmin && userDonations.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Request created date</Table.HeadCell>
              <Table.HeadCell>Request ID</Table.HeadCell>
              <Table.HeadCell>Donor ID</Table.HeadCell>
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
                <Table.Cell>{new Date(donation.createdAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{donation.donationId}</Table.Cell>
                <Table.Cell>{donation.dnid}</Table.Cell>
                <Table.Cell>{new Date(donation.eventdate).toLocaleDateString('en-GB')}</Table.Cell>
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
