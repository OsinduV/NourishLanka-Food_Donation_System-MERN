import { Button, FileInput, Select, TextInput, Textarea } from 'flowbite-react'
import React from 'react'
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function DonationRequest() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-3xl font-semibold text-center my-7'>Hosting Donation Event Request Form</h1>
      <form className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        Event title 
               <TextInput
                 type='text'
                 placeholder='Title'
                 required
                 id='eventtitle'
                 className='flex-1 ml-9'
               />


                <Select>
                 <option value='donationevent'>Donation Event</option>
                </Select>
      </div>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              Donor ID 
              <TextInput
                 type='text'
                 placeholder='Requesting Donor ID'
                 required
                 icon={FaUserCheck}
                 id='dnid'
                 className='flex-1 ml-11'
               />
      </div>

      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              Donor Email
              <TextInput
                 type='text'
                 placeholder='Requesting Donor Email'
                 required
                 icon={MdEmail}
                 id='donoremail'
                 className='flex-1 ml-5'
               />
      </div>

      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              Event Date 
              <TextInput
                 type='text'
                 placeholder='dd/mm/yyyy'
                 required
                 icon={BsCalendar2DateFill}
                 id='eventdate'
                 className='flex-1 ml-7'
               />
      </div>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              Event Time 
              <TextInput
                 type='text'
                 placeholder='Expected starting time'
                 required
                 icon={IoIosTime}
                 id='eventtime'
                 className='flex-1 ml-7'
               />
      </div>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              Event Location
              <TextInput
                 type='text'
                 placeholder='Event location'
                 required
                 icon={FaLocationDot}
                 id='eventlocation'
                 className='flex-1'
               />
      </div>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              Event Description
              <Textarea
                  type='text'
                  placeholder=' Provide a detailed description of the event, including its purpose, goals, and any specific activities planned.'
                  id='eventdescription'
                  rows='5'
                >
              </Textarea>
        </div>

        Financial Stability
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
           Your Event Budget
           <Select className='w-full ml-12'>
                 <option value='nobudget'>Select Your Event Budget</option>
                 <option value='nobudget'>less than Rs.30000.00</option>
                 <option value='nobudget'>less than Rs.60000.00</option>
                 <option value='nobudget'>greater than Rs.60000.00</option>
            </Select>
          </div>
        
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          Proof of financial documents
          <div className='flex gap-4 items-center justify-between border-2 w-full'>
              <FileInput
                type='file'
                accept='image1/*'
              />

              <Button
                type='button'
                gradientDuoTone='greenToBlue'
                size='sm'
                outline
>
              </Button>
            </div>
          </div>
<br></br>
          Event Sacle
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
              No. of attendees expecting
              <TextInput
                 type='number'
                 placeholder='No of attendees'
                 required
                 id='attendees'
                 className='flex-1 mr-5'
               />

              No. of Volunteers needed
              <TextInput
                 type='number'
                 placeholder='No of volunteers'
                 required
                 id='volunteers'
                 className='flex-1'
               /> 
      </div>

      <div className='flex flex-col gap-4 sm:flex-row justify-between mt-2'> 
        Event Proposal/Plan
        <div className='flex gap-4 items-center justify-between border-2 w-full ml-6'>
              <FileInput
                type='file'
                accept='image2/*'
              />

              <Button
                type='button'
                gradientDuoTone='greenToBlue'
                size='sm'
                outline
>
              </Button>
            </div>
          </div>

          <div className='flex flex-col gap-4 sm:flex-row justify-between mt-2'> 
        Partnership Agreements
        <div className='flex gap-4 items-center justify-between border-2 w-full'>
              <FileInput
                type='file'
                accept='image3/*'
              />

              <Button
                type='button'
                gradientDuoTone='greenToBlue'
                size='sm'
                outline
>
              </Button>
            </div>
          </div>

          <div className='flex flex-col gap-4 sm:flex-row justify-between mb-20'>
              Conernrs or Requests
              <Textarea
                  type='text'
                  placeholder=' Any concerns or requests?'
                  id='conserns'
                  rows='8'
                >
              </Textarea>
        </div>

      </form>
    </div>
  )
}
