import React from 'react'
import { Button, Modal, Table,  } from 'flowbite-react';
import { useEffect,useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashSchedules() {
  const { currentUser } = useSelector((state) => state.user); 
  const [userSchedules, setUserSchedules] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [scheduleIdToDelete, setscheduleIdToDelete] = useState('');

  
     useEffect(()=>{
       const fetchSchedules = async () => {
        try{
          const res = await fetch(`/api/schedules/getschedules`)
          const data = await res.json()
          if(res.ok){
                setUserSchedules(data.schedules)
                if(data.schedules.length < 9){
                  setShowMore(false);
                }
          }
        } catch (error) {
          console.log(error.message)
        }
       };
       if(currentUser.isAdmin) {
           fetchSchedules();
       }
     },[currentUser._id]);

     const schedulesByCategory = {
      'Packing and Sorting': userSchedules.filter((schedule) => schedule.category === 'Packing and Sorting'),
      'Cooking and Preparing': userSchedules.filter((schedule) => schedule.category === 'Cooking and Preparing'),
      'Food Distribution': userSchedules.filter((schedule) => schedule.category === 'Food Distribution'),
      'Event': userSchedules.filter((schedule) => schedule.category === 'Event'),
    };


     const handleShowMore = async () => {
        const startIndex = userSchedules.length;
        try{

          const res = await fetch (`api/schedules/getschedules?startIndex=${startIndex}`);
          const data = await res.json();
          if(res.ok){
            setUserSchedules((prev) => [...prev, ...data.schedules]);
            if(data.schedules.length < 9){
              setShowMore(false);
            }
          }

        } catch (error){
          console.log(error.message);
        }
     };
     const handleDeleteSchedule = async () => {
      setShowModal(false);
      try {
        const res = await fetch(
          `/api/schedules/deleteschedule/${scheduleIdToDelete}/${currentUser._id}`,
          {
            method: 'DELETE',
          }
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          setUserSchedules((prev) =>
            prev.filter((schedules) => schedules._id !== scheduleIdToDelete )
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

  return (
  
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
       {currentUser.isAdmin &&  Object.keys(schedulesByCategory).map((category, index) => (
        
        <div key={index} className='mb-6'>
            <h2 className='text-2xl font-bold'>{category}</h2>
            {schedulesByCategory[category].length > 0 ? (

        <Table hoverable className='shadow-md '>
          <Table.Head>
              
                  
               <Table.HeadCell>Schedule ID</Table.HeadCell>
               <Table.HeadCell>Date </Table.HeadCell>
           
               <Table.HeadCell>Volunteering activity</Table.HeadCell>
               <Table.HeadCell>Time</Table.HeadCell>
               <Table.HeadCell>
                <span>Edit</span>
               </Table.HeadCell>
               <Table.HeadCell>
                <span>Delete</span>
               </Table.HeadCell>
          </Table.Head>
          {schedulesByCategory[category].map((schedules) => (
            <Table.Body className='divide-y'>
               <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                
               
                <Table.Cell>
                  <Link className='font-medium text-gray-900 dark:text-white' to={`/schedules/${schedules.slug}`}>
                    {schedules.scheduleId}
                  </Link>
                </Table.Cell>
                <Table.Cell>{schedules.date}</Table.Cell>
              
                <Table.Cell>{schedules.category}</Table.Cell>
                <Table.Cell>{schedules.time}</Table.Cell>
                <Table.Cell>
                  <Link className='text-teal-500 hover:underline' to={`/update-schedules/${schedules._id}`}>
                    <span>Edit</span>
                    </Link>
                </Table.Cell>
                <Table.Cell>
                  <span onClick={() => {
                    setShowModal(true);
                    setscheduleIdToDelete(schedules._id);
                  } } className= 'font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                  
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
        {
          showMore && (
            <button onClick={handleShowMore}
            className = 'w-full text-teal-500 self-center text-sm py-7'>
            Show more
            </button>
          )
        }
      

      

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
              Are you sure you want to delete this schedule?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteSchedule}>
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