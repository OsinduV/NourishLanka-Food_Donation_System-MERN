import React from 'react'
import {Select,TextInput,Button} from 'flowbite-react';
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function CreateSchedules() {

  const navigate = useNavigate();
  const handleVolunteerNow = () => {
   navigate('/schedules');
  }
  return (
    <div className='container mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Schedule</h1>
        <form classname='flex flex-col  sm:flex=row w-2/4 p-8 rounded-lg shadow-lg outline'>
            
        <div className='flex flex-col ml-80 mr-80
         mb-7 gap-4 sm:flex-row justify-between'>
            
        <TextInput
                 type='text'
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
            
            
            <div className='flex flex-col ml-80 mr-80 mb-7 gap-4 sm:flex-row justify-between'>
            <Select
        required
        id='day'
        className='flex-1 '
        onChange={(e) =>
          setFormData({ ...formData,  day: e.target.value })
        }
         >
        <option value='uncategorized'>Choose Day</option>
        <option value='monday'>Monday</option>
        <option value='tuesday '>Tuesday</option>
        <option value='wednesday'>Wednesday</option>
        <option value='thursday'>Thursday</option>
        <option value='friday'>Friday</option>
        <option value='saturday'>Saturday</option>
        <option value='sunday'>Friday</option>
        </Select>
       
        
            </div>

           
            
           
            <div className='flex flex-col  ml-80 mr-80 mb-7 gap-4 sm:flex-row justify-between'>
            
            <Select
        required
        id='catagory'
        className='flex-1 '
        onChange={(e) =>
          setFormData({ ...formData,  category: e.target.value })
        }
         >
        <option value='uncategorized'>Choose a Voluneering catagory</option>
        <option value='packing and Sorting'>Packing and Sorting</option>
        <option value='cooking and Preparing '>Cooking and Preparing</option>
        <option value='food Distribution'>Food Distribution</option>
        </Select>

          </div>

            <div className='flex flex-col ml-80 mr-80 mb-10 gap-4 sm:flex-row justify-between'>
            
            <Select
        required
        id='time'
        icon={IoIosTime}
        placeholder=' time duration'
        className='flex-1 '
        onChange={(e) =>
          setFormData({ ...formData,  time: e.target.value })
        }
         >
        <option value='uncategorized'>Choose a time duration</option>
        <option value='8.00 am.-11.00 am.'>8.00 am.-11.00 am.</option>
        <option value='2.00 pm.-5.00 pm. '>2.00 pm.- 5.00 pm.</option>
       
        </Select>
       </div>
            <div className='flex flex-col  ml-80 mr-80 mb-20 gap-4 sm:flex-row justify-between'>
            
            <Button type='button' gradientDuoTone='greenToBlue' onClick={handleVolunteerNow} > Create Schedules
           </Button>   

             

        
            </div>
            

        </form>
      </div>
    
  )
}
