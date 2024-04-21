import React from 'react'
import { Button, Modal, Table,  } from 'flowbite-react';
import { useEffect,useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';

export default function DashSchedules() {
  const { currentUser } = useSelector((state) => state.user); 
  const [userSchedules, setUserSchedules] = useState([]);
  console.log(userSchedules);
     useEffect(()=>{
       const fetchSchedules = async () => {
        try{
          const res = await fetch(`/api/schedules/getschedules?userId=${currentUser._id}`)
          const data = await res.json()
          if(res.ok){
                setUserSchedules(data.schedules)
          }
        } catch (error) {
          console.log(error.message)
        }
       };
       if(currentUser.isVolunteerManager) {
           fetchSchedules();
       }
     },[currentUser._id])
  return (
  
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
       {currentUser.isVolunteerManager && userSchedules.length > 0? (
        <>
        <Table hoverable className='shadow-md '>
          <Table.Head>
              
                  
               <Table.HeadCell>Schedule ID</Table.HeadCell>
               <Table.HeadCell>Date </Table.HeadCell>
               <Table.HeadCell>Day</Table.HeadCell>
               <Table.HeadCell>Volunteering activity</Table.HeadCell>
               <Table.HeadCell>Time</Table.HeadCell>
               <Table.HeadCell>
                <span>Edit</span>
               </Table.HeadCell>
               <Table.HeadCell>
                <span>Delete</span>
               </Table.HeadCell>
          </Table.Head>
          {userSchedules.map((schedules) => (
            <Table.Body className='divide-y'>
               <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                
               
                <Table.Cell>
                  <Link className='font-medium text-gray-900 dark:text-white' to={`/schedules/${schedules.slug}`}>
                    {schedules.scheduleId}
                  </Link>
                </Table.Cell>
                <Table.Cell>{schedules.date}</Table.Cell>
                <Table.Cell>{schedules.day}</Table.Cell>
                <Table.Cell>{schedules.catagory}</Table.Cell>
                <Table.Cell>{schedules.time}</Table.Cell>
                <Table.Cell>
                  <Link className='text-teal-500 hover:underline' to={`/updateSchedules/${schedules._id}`}>
                    <span>Edit</span>
                    </Link>
                </Table.Cell>
                <Table.Cell>
                  <span className= 'font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                </Table.Cell>
              
                </Table.Row>



            </Table.Body>

          ))}
          
          

        </Table>
      </>
       ):(
        <p>You have no events yet!</p>

       )}
    </div>
   
  )
  
}
