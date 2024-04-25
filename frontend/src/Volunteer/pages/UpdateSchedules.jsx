import React from 'react'
import {Select,TextInput,Button,Alert} from 'flowbite-react';
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import {useSelector} from 'react-redux'



export default function UpdateSchedules() {
  const [formData,setFormData] = useState({});
 
  const [publishError, setPublishError] = useState(null);
  const {scheduleId} = useParams();
  const navigate = useNavigate();
  const {currentUser} = useSelector((state) => state.user);

 
  useEffect(() => {
    try {
        const fetchSchedules = async () => {
          const res = await fetch(`/api/schedules/getschedules?scheduleId=${scheduleId}`);
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
            setPublishError(data.message);
            return;
          }
          if (res.ok) {
            setPublishError(null);
            setFormData(data.schedules[0]);
          }
        };
  
        fetchSchedules();
      } catch (error) {
        console.log(error.message);
      }

  }, [scheduleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch(`/api/schedules/updateschedule/${scheduleId}/${currentUser._id}`,{
        method :'PUT',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
    
      if (res.ok) {
        setPublishError(null);
        navigate('/dashboard?tab=schedules');
      }
    } catch (error) {
      
      setPublishError('Something went wrong');
    }
  };
   
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-3xl font-semibold text-center my-7'>Update Schedule</h1>
        <form className='flex flex-col  gap-4' onSubmit={handleSubmit}>

        <div className='flex flex-col mb-7 gap-4 sm:flex-row justify-between'>
            
            Schedule ID : <TextInput
                     type='text'
                     placeholder='schedule ID'
                     required
                     
                     id='scheduleId'
                     className='flex-1'
                     onChange={(e) =>
                      setFormData({ ...formData, scheduleId: e.target.value })
                    }
                    value={formData.scheduleId}
                   />
    
            
                </div>
            
        <div className='flex flex-col mb-7 gap-4 sm:flex-row justify-between'>
            
        Date :<TextInput
                 type='text'
                 placeholder='dd/mm/yyyy'
                 required
                 icon={BsCalendar2DateFill}
                 id='date'
                 className='flex-1'
                 onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                value={formData.date}
               />

        
            </div>
            
            
            <div className='flex flex-col  mb-7 gap-4 sm:flex-row justify-between'>
            Day : <Select
        required
        id='day'
        className='flex-1 '
        onChange={(e) =>
          setFormData({ ...formData, day: e.target.value })
        }
        value={formData.day}
         >
        <option value='uncategorized'>Choose Day</option>
        <option value='monday'>Monday</option>
        <option value='tuesday '>Tuesday</option>
        <option value='wednesday'>Wednesday</option>
        <option value='thursday'>Thursday</option>
        <option value='friday'>Friday</option>
        <option value='saturday'>Saturday</option>
        <option value='sunday'>Sunday</option>
        </Select>
       
        
            </div>

           
            
           
            <div className='flex flex-col   mb-7 gap-4 sm:flex-row justify-between'>
            
           Volunteering activity : <Select
        required
        id='category'
        className='flex-1 '
        onChange={(e) =>
          setFormData({ ...formData, category: e.target.value })
        }
        value={formData.category}
         >
        <option value='uncategorized'>Choose a Voluneering catagory</option>
        <option value='Packing and Sorting'>Packing and Sorting</option>
        <option value='Cooking and Preparing '>Cooking and Preparing</option>
        <option value='Food Distribution'>Food Distribution</option>
        </Select>

          </div>

            <div className='flex flex-col  mb-10 gap-4 sm:flex-row justify-between'>
            
            Time : <Select
        required
        id='time'
        icon={IoIosTime}
        placeholder=' time duration'
        className='flex-1 '
        onChange={(e) =>
          setFormData({ ...formData, time: e.target.value })
        }
        value ={formData.time}
         >
        <option value='uncategorized'>Choose a time duration</option>
        <option value='8.00 am.-11.00 am.'>8.00 am.-11.00 am.</option>
        <option value='2.00 pm.-5.00 pm. '>2.00 pm.- 5.00 pm.</option>
       
        </Select>
       </div>
            <div className='flex flex-col  mr-80  mb-20 gap-4 sm:flex-row justify-between'>
            
            <Button type='submit' gradientDuoTone='greenToBlue' > Update Schedule
           </Button>   
            
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
             

        
            </div>
            

        </form>
      </div>
    
  )
}
