import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function Volunteers() {
  const { currentUser } = useSelector((state) => state.user);
  const [volunteers, setVolunteers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [volunteerIdToDelete, setVolunteerIdToDelete] = useState('');

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await fetch(`/api/volunteer/getvolunteer`);
        const data = await res.json();
        if (res.ok) {
          setVolunteers(data.volunteers || []);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchVolunteers();
    }
  }, [currentUser._id]);

  const handleDeleteVolunteer = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/volunteer/deletevolunteer/${volunteerIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setVolunteers((prev) =>
          prev.filter((volunteers) => volunteers._id !== volunteerIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const generateReport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Full Name,Email,Address,Phone Number, Date,Volunteering activity,time\n";
    const rows = volunteers.map(
      (request) =>
        `${request.fullName},${request.email},${request.address},${request.phoneNumber},${new Date(
          request.updatedAt
        ).toLocaleDateString()},${ request.category},${request.time}`
    );
    const csvRows = rows.join("\n");
    const csv = csvContent + csvRows;
    const encodedUri = encodeURI(csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "volunteers_report.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <Button
              type="button"
              gradientDuoTone="greenToBlue"
              onClick={generateReport}
              className="ml-auto"
            >
              Generate Report
            </Button>
      <Table hoverable className='shadow-md'>
        <Table.Head>
          <Table.HeadCell>Full Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>Phone Number</Table.HeadCell>
          
          <Table.HeadCell>Date</Table.HeadCell>
          
          <Table.HeadCell>Volunteering activity</Table.HeadCell>
          <Table.HeadCell>Time</Table.HeadCell>
          <Table.HeadCell>
            <span>Delete</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          {volunteers.map((volunteer) => (
            <Table.Row
              key={volunteer._id}
              className='bg-white dark:border-gray-700 dark:bg-gray-800'
            >
              <Table.Cell>{volunteer.fullName}</Table.Cell>
              <Table.Cell>{volunteer.email}</Table.Cell>
              <Table.Cell>{volunteer.address}</Table.Cell>
              <Table.Cell>{volunteer.phoneNumber}</Table.Cell>
            
              <Table.Cell>{volunteer.date}</Table.Cell>
              
              <Table.Cell>{volunteer.category}</Table.Cell>
              <Table.Cell>{volunteer.time}</Table.Cell>
              <Table.Cell>
                <span
                  onClick={() => {
                    setShowModal(true);
                    setVolunteerIdToDelete(volunteer._id);
                  }}
                  className='font-medium text-red-500 hover:underline cursor-pointer'
                >
                  Delete
                </span>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

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
              Are you sure you want to delete this volunteer?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteVolunteer}>
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
