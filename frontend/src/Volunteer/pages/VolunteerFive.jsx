import React from 'react'
import {Select,TextInput,Button,Alert, Textarea} from 'flowbite-react';
import { BsCalendar2DateFill } from "react-icons/bs";
import { IoIosTime } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


export default function VolunteerFive() {
  const [formData,setFormData] = useState({});
 
  const [publishError, setPublishError] = useState(null);
  const {scheduleId} = useParams();
  const navigate = useNavigate();
  console.log(formData);
 

 
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
      const res = await fetch('/api/volunteer/createvolunteer',{
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
        navigate (`/volunteer-six/${data.userId}`);
        
      }
    } catch (error) {
      
      setPublishError('Something went wrong');
    }
  };
  return (
    
     
 
      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
          <h1 className='text-3xl font-semibold text-center my-7'>Sign up for a Volunteering shift</h1>
          <form className='flex flex-col mb-7 gap-4' onSubmit={handleSubmit}>
          
          <div className='flex flex-col mb-7 gap-4 sm:flex-row justify-between'>
        Full Name :  <TextInput
          type='text'
          placeholder='Full Name'
          id='fullName'
          className='flex-1'
          required
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          value={formData.fullName || ''}
        />
              
      
              
                  </div>
                  <div className='flex flex-col mb-7 gap-4 sm:flex-row justify-between'>
                Email :  <TextInput
          type='email'
          placeholder='Email'
          id='email'
          required
          className='flex-1'
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email || ''}
        />
              
          </div>

                  <div className='flex flex-col mb-7 gap-4 sm:flex-row justify-between'>
              
              
            Address  :    <Textarea
          type='text'
          placeholder='Address'
          id='address'
          required
          className='flex-1'
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          value={formData.address || ''}
        />
              
       </div>

                 
                  <div className='flex flex-col mb-7 gap-4 sm:flex-row justify-between'>
              
             Phone Number  :   <TextInput
          type='tel'
          placeholder='Phone Number'
          id='phoneNumber'
          required
          className='flex-1'
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          value={formData.phoneNumber || ''}
        />
       </div>
              <div className='flex flex-col mb-7 gap-4 sm:flex-row justify-between'>
              
       Choose Dustrict  :  <Select
          required
          id='district'
          className='flex-1'
          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
          value={formData.district || ''}
        >
          <option value=''>Choose District</option>
          <option value='Colombo'>Colombo</option>
        <option value='Gampaha'>Gampaha</option>
        <option value='Kalutara'>Kalutara</option>
        <option value='Kandy'>Kandy</option>
        <option value='Matale'>Matale</option>
        <option value='Nuwara Eliya'>Nuwara Eliya</option>
        <option value='Galle'>Galle</option>
        <option value='Matara'>Matara</option>
        <option value='Hambantota'>Hambantota</option>
        <option value='Jaffna'>Jaffna</option>
        <option value='Kilinochchi'>Kilinochchi</option>
        <option value='Mannar'>Mannar</option>
        <option value='Vavuniya'>Vavuniya</option>
        <option value='Mullaitivu'>Mullaitivu</option>
        <option value='Batticaloa'>Batticaloa</option>
        <option value='Ampara'>Ampara</option>
        <option value='Trincomalee'>Trincomalee</option>
        <option value='Kurunegala'>Kurunegala</option>
        <option value='Puttalam'>Puttalam</option>
        <option value='Anuradhapura'>Anuradhapura</option>
        <option value='Polonnaruwa'>Polonnaruwa</option>
        <option value='Badulla'>Badulla</option>
        <option value='Monaragala'>Monaragala</option>
        <option value='Ratnapura'>Ratnapura</option>
        <option value='Kegalle'>Kegalle</option>
          
        </Select>   
              
        
              
      
              
              </div>
                  
     
          
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
                      readOnly  />
      
              
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
                  readOnly />
  
          
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
          readOnly </Select>
         
          
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
          <option value='uncategorized'>Choose a Voluneering category</option>
          <option value='Packing and Sorting'>Packing and Sorting</option>
          <option value='Cooking and Preparing '>Cooking and Preparing</option>
          <option value='Food Distribution'>Food Distribution</option>
          readOnly </Select>
  
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
         
          readOnly </Select>
         </div>
              <div className='flex flex-col  mr-80  mb-20 gap-4 sm:flex-row justify-between'>
              
              <Button type='submit' gradientDuoTone='greenToBlue' > Register
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

