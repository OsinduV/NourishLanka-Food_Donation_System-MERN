import React from 'react';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export default function VolunteerOne() {
  const navigate = useNavigate();

  const handleVolunteerNow = () => {
    navigate('/volunteer-two');
  };
  return (
    <>
 <style>
        {`
          .gradient-background {
            background-image: linear-gradient(to bottom right, rgba(85, 107, 47, 0.9), rgba(255, 255, 255, 0.9));
          }
        `}
      </style>

      <div className=" flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-1 px-1 mt-9">Share Your Kindness</h1>
        <p className="text-lg">Volunteer your time to make a difference in your community.</p>
      </div>

      <div className=" text-white min-h-screen flex items-center justify-center">
        <div className="flex w-full justify-center">
          <div className=" gradient-background w-3/4 bg-white text-black p-8 rounded-lg shadow-lg outline">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Join a Food Donating Event</h1>
              <p className="text-lg mb-4">Be a part of the solution! Find upcoming food Donating events in your area and participate in donating food to  families in need. Every contribution helps fight hunger in our community.</p>
              <Button type='button' gradientDuoTone='greenToBlue'  >  Join Now
              </Button>
              
            </div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Volunteer at a Food Bank</h1>
              <p className="text-lg mb-4">Give back directly! Food banks rely on volunteers to help sort, pack, and distribute food. Join a team of dedicated individuals making a real impact on people's lives.</p>
              <Button type='button' gradientDuoTone='greenToBlue'  onClick={handleVolunteerNow}>  Volunteer Now
              </Button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
