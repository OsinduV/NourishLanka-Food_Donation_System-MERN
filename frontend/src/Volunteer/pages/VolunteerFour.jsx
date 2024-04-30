import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { Link , } from 'react-router-dom';

export default function VolunteerFour() {
  const { currentUser } = useSelector((state) => state.user);
  const [userSchedules, setUserSchedules] = useState([]);
  const [showMore, setShowMore] = useState(true);

  


  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await fetch('/api/schedules/getschedules');
        const data = await res.json();
        if (res.ok) {
          setUserSchedules(data.schedules);
          if (data.schedules.length < 9) {
            setShowMore(true);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSchedules();
  }, []);
  const schedulesByCategory = {
    'Packing and Sorting': userSchedules.filter((schedule) => schedule.category === 'Packing and Sorting'),
    'Cooking and Preparing': userSchedules.filter((schedule) => schedule.category === 'Cooking and Preparing'),
    'Food Distribution': userSchedules.filter((schedule) => schedule.category === 'Food Distribution'),
    'Event': userSchedules.filter((schedule) => schedule.category === 'Event'),
  };

  const handleShowMore = async () => {
    const startIndex = userSchedules.length;
    try {
      const res = await fetch(`/api/schedules/getschedules?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserSchedules((prev) => [...prev, ...data.schedules]);
        if (data.schedules.length < 9) {
          setShowMore(true);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
          <div>
      {/* Display the food bank details at the top */}
      <div className='p-4 bg-gray-100 rounded-lg mb-4'>
       
      </div>
      {/* Rest of the component */}
    </div>

      {Object.keys(schedulesByCategory).map((category, index) => (
        <div key={index} className='mb-6'>
          <h2 className='text-2xl font-bold'>{category}</h2>
          {schedulesByCategory[category].length > 0 ? (
            <Table hoverable className='shadow-md '>
              <Table.Head>
                <Table.HeadCell>Schedule ID</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Day</Table.HeadCell>
                <Table.HeadCell>Volunteering activity</Table.HeadCell>
                <Table.HeadCell>Time</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>
              {schedulesByCategory[category].map((schedules) => (
                <Table.Body className='divide-y' key={schedules._id}>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <Link className='font-medium text-gray-900 dark:text-white' to={`/schedules/${schedules.slug}`}>
                        {schedules.scheduleId}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{schedules.date}</Table.Cell>
                    <Table.Cell>{schedules.day}</Table.Cell>
                    <Table.Cell>{schedules.category}</Table.Cell>
                    <Table.Cell>{schedules.time}</Table.Cell>
                    <Table.Cell>
                      <Link className='text-red-600 hover:underline' to={`/volunteer-five/${schedules._id}`}>
                        <span>Register</span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          ) : (
            <p>You have no schedules for {category} yet!</p>
          )}
        </div>
      ))}
      {showMore && (
        <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
          Show more
        </button>
      )}
    </div>
  );
}