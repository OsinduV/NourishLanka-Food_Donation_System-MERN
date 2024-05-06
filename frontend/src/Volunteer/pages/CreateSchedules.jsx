import React from 'react'
import {Select,TextInput,Button,Alert} from 'flowbite-react';
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



export default function CreateSchedules() {
  const [formData,setFormData] = useState({});
 
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch('/api/schedules/create',{
        method :'POST',
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
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Schedule</h1>
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
                   />
    
            
                </div>
            
        <div className='flex flex-col mb-7 gap-4 sm:flex-row justify-between'>
            
        Date :<TextInput
                 type='date'
                 placeholder='dd/mm/yyyy'
                 required
                 icon={BsCalendar2DateFill}
                 id='date'
                 className='flex-1'
                 onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
               />

        
            </div>
            
            
           

           
            
           
            <div className='flex flex-col   mb-7 gap-4 sm:flex-row justify-between'>
            
           Volunteering activity : <Select
        required
        id='category'
        className='flex-1 '
        onChange={(e) =>
          setFormData({ ...formData, category: e.target.value })
        }
         >
        <option value='uncategorized'>Choose a Voluneering catagory</option>
        <option value='Packing and Sorting'>Packing and Sorting</option>
        <option value='Cooking and Preparing'>Cooking and Preparing</option>
        <option value='Food Distribution'>Food Distribution</option>
        <option value='Event'>Event</option>
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
         >
        <option value='uncategorized'>Choose a time duration</option>
        <option value='8.00 am.-11.00 am.'>8.00 am.-11.00 am.</option>
        <option value='2.00 pm.-5.00 pm. '>2.00 pm.- 5.00 pm.</option>
       
        </Select>
       </div>
            <div className='flex flex-col  mr-80  mb-20 gap-4 sm:flex-row justify-between'>
            
            <Button type='submit' gradientDuoTone='greenToBlue' > Create Schedules
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
