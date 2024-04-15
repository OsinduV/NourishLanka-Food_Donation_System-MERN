import React from 'react'

export default function VolunteerFour() {
  return (
    <>
 <style>
        {`
          .gradient-background {
            background-image: linear-gradient(to bottom right, rgba(85, 107, 47, 0.9), rgba(255, 255, 255, 0.9));
          }
        `}
      </style>

      <div className="gradient-background text-black flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-1 px-1 mt-9">Register</h1>
        <p className="text-lg">Fill out the form and Sign up for a volunteering shift.</p>
      </div>

      

      <div className="gradient-background text-white min-h-screen flex items-center justify-start">
        <div className="flex w-full ms-10 mt-6 mb-6">
          <div className="w-2/4 bg-black text-white p-8 rounded-lg shadow-lg ">
          <form className="mb-8">
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-white text-lg font-bold mb-2"> Name:</label>
                <input type="text" id="firstName" name="firstName" className="w-full bg-gray-300 border border-gray-400 rounded py-2 px-3 focus:outline-none focus:border-green-500" />
              </div>
              
              <div className="mb-4">
                <label htmlFor="username" className="block text-white text-lg font-bold mb-2">Username:</label>
                <input type="text" id="username" name="username" className="w-full bg-gray-300 border border-gray-400 rounded py-2 px-3 focus:outline-none focus:border-green-500" />
              </div>
             
              <div className="mb-4">
                <label htmlFor="email" className="block text-white text-lg font-bold mb-2">Email:</label>
                <input type="email" id="email" name="email" className="w-full bg-gray-300 border border-gray-400 rounded py-2 px-3 focus:outline-none focus:border-green-500" />
              </div>
              <div className="mb-4">
  <label htmlFor="day" className="block text-white text-lg font-bold mb-2">Select Day:</label>
  <select id="day" name="day" className="w-full bg-gray-300 border border-gray-400 rounded py-2 px-3 focus:outline-none focus:border-green-500 text-black">
    <option value="">Select Day</option>
    <option value="Monday">Monday</option>
    <option value="Tuesday">Tuesday</option>
    <option value="Wednesday">Wednesday</option>
    <option value="Thursday">Thursday</option>
    <option value="Friday">Friday</option>
    <option value="Saturday">Saturday</option>
    <option value="Sunday">Sunday</option>
  </select>
</div>
              
              
<div className="mb-4">
  <label htmlFor="time" className="block text-white text-lg font-bold mb-2">Select Time:</label>
  <select id="time" name="time" className="w-full bg-gray-300 border border-gray-400 rounded py-2 px-3 focus:outline-none focus:border-green-500 text-black">
    <option value="">Select Time</option>
    <option value="8:00 AM - 11:00 AM">8:00 AM - 11:00 AM</option>
    <option value="2:00 PM - 5:00 PM">2:00 PM - 5:00 PM</option>
  </select>
</div>

<div className="mb-4">
  <label htmlFor="activity" className="block text-white text-lg font-bold mb-2">Select Volunteering Activity:</label>
  <select id="activity" name="activity" className="w-full bg-gray-300 border border-gray-400 rounded py-2 px-3 focus:outline-none focus:border-green-500 text-black">
    <option value="">Select Activity</option>
    <option value="Food distribution">Food distribution</option>
    <option value="Cooking and preparing meals">Cooking and preparing meals</option>
    <option value="Packing and sorting">Packing and sorting</option>
  </select>
</div>
              
              <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
            </form>
          
       
          </div>
        </div>
      </div>
    </>
  )
}
