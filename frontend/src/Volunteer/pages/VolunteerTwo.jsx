import React, { useState } from 'react'
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export default function VolunteerTwo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleVolunteerNow = () => {
    navigate('/volunteer-three');
  };
  
  const handleChange = (e) => {
    setFormData ({... formData,[e.target.id]:e.target.value});
  };
  console.log(formData);
  return (
    <>
   <style>
        {`
          .gradient-background {
            background-image: linear-gradient(to bottom right, rgba(85, 107, 47, 0.9), rgba(255, 255, 255, 0.9));
          }
        `}
      </style>

      <div className=" bg-white text-black flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-bold mb-1 px-1 mt-9">Register</h1>
        <p className="text-lg">Get registered under a Food Bank.</p>
      </div>

      <div className="  bg-white text-black min-h-screen flex items-center justify-start">
        <div className="flex w-full ms-10 mt-6 mb-6">
          <div className="w-1/4  bg-white text-black p-8 rounded-lg shadow-lg outline ">
          <h1 className="text-3xl font-bold mb-7 px-1 mt-9">Volunteer at a Food Bank</h1>
        <p className="text-lg mb-10">
          Food banks, food pantries, and meal programs in the Nourish Lanka network are continuing to do what they do best - provide meals to our communities. Whether you sort and pack food or distribute food, there are a lot of volunteer opportunities available.
          Pledge to volunteer with your local food bank and find a volunteer opportunity near you.
        </p>
            <form className="mb-8">
              
              <div className="mb-4">
                <label htmlFor="district" className="block text-black text-lg font-bold mb-2">Select District:</label>
                <select id="district" name="district" className="w-full bg-gray-300 border border-gray-400 rounded py-2 px-3 focus:outline-none focus:border-green-500 text-black"onChange={handleChange}>
                  <option value="">Select District</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Kalutara">Kalutara</option>
                  <option value="Jaffna">Jaffna</option>
                  <option value="Anuradhapura">Anuradhapura</option>
                  <option value="Matara">Matara</option>
                </select>
              </div>
              
              <Button type='button' className="bg-green-500 text-black font-bold py-1 px-1 "gradientDuoTone='greenToBlue'  onClick={handleVolunteerNow}>  Volunteer Now
              </Button>
             
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
