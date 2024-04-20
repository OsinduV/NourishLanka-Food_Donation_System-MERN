import React from 'react'
import { TextInput } from 'flowbite-react';

export default function VolunteerFive() {
  return (
    <>
    <style>
           {`
             .gradient-background {
               background-image: linear-gradient(to bottom right, rgba(85, 107, 47, 0.9), rgba(255, 255, 255, 0.9));
             }
           `}
         </style>
   
         
   
         <div className="gradient-background text-white min-h-screen flex items-center justify-start">
          <form className='flex flex-col gap-4'>
          <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden'
          
        >
            <TextInput type='text' id='email' placeholder='email'></TextInput>
            </div>
          </form>
          
         </div>
       </>
  )
}
