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
        <h1 className="text-5xl font-bold mb-1 px-1 mt-9">Share Your Kindness</h1>
        <p className="text-lg">Volunteer your time to make a difference in your community.</p>
      
      </div>

      <div className="flex-container">
      <div className="box-container">
      <div className=" text-white min-h-screen flex items-center justify-center">
        <div className="flex w-full justify-center">
          <div className=" g w-2/4 bg-white text-black p-8 rounded-lg shadow-lg ">
           
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Volunteer at a Food Bank</h1>
              <p className="text-lg mb-4">Give back directly! Get involved and make a difference! Our food bank relies on compassionate volunteers like you to help us serve our community. Whether you're sorting donations, packing food parcels, or lending a hand in distribution, your contribution matters. Join us in our mission to combat hunger and nourish lives. Together, we can create a brighter future for those in need. Sign up now to be a part of this impactful journey!</p>
              <Button type='button' gradientDuoTone='greenToBlue'  onClick={handleVolunteerNow}>  Volunteer Now
              </Button>
              
            </div>
            </div>
            <div className="image-container">
          <img src="https://img.freepik.com/free-photo/smiley-female-volunteers-putting-food-bag-donation_23-2148637969.jpg?t=st=1714169960~exp=1714173560~hmac=be8ea4454473489e90cc2120cec07d5988132e142356de8e29f32d50296d767a&w=360" className="w-" />
        </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
