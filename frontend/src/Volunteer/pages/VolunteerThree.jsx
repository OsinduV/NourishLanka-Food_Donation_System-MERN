import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';

export default function VolunteerThree() {

  const navigate = useNavigate();
   const handleVolunteerNow = () => {
    navigate('/volunteer-four');
   }

  
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
        <div className="flex w-full ms-10 mt-6 mb-6">
          <div className="w-2/4 bg-white text-black p-8 rounded-lg shadow-lg ">
          <h1 className="text-3xl font-bold mb-7 px-1 mt-9">Volunteer at a Food Bank</h1>
        <p className="text-lg mb-10">
          Food banks, food pantries, and meal programs in the Nourish Lanka network are continuing to do what they do best - provide meals to our communities. Whether you sort and pack food or distribute food, there are a lot of volunteer opportunities available.
          Pledge to volunteer with your local food bank and find a volunteer opportunity near you.
        </p>
        <h1 className="text-3xl font-bold mb-7 px-1 mt-9">Your nearest Food Bank is:</h1>
        <Button type='button' className="bg-green-500 text-white font-bold py-1 px-1 "gradientDuoTone='greenToBlue' onClick={handleVolunteerNow}> Explore
              </Button>
        
          </div>
        </div>
      </div>
    </>
  )
}
