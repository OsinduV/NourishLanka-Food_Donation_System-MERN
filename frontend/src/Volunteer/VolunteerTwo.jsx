import React, { useState } from 'react'

export default function VolunteerTwo() {
  const [formData, setFormData] = useState({});
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

      <div className="gradient-background text-black flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-1 px-1 mt-9">Register</h1>
        <p className="text-lg">Get registered under a Food Bank.</p>
      </div>

      <div className="gradient-background text-white min-h-screen flex items-center justify-start">
        <div className="flex w-full ms-10 mt-6 mb-6">
          <div className="w-2/4 bg-black text-white p-8 rounded-lg shadow-lg ">
          <h1 className="text-3xl font-bold mb-7 px-1 mt-9">Volunteer at a Food Bank</h1>
        <p className="text-lg mb-10">
          Food banks, food pantries, and meal programs in the Nourish Lanka network are continuing to do what they do best - provide meals to our communities. Whether you sort and pack food or distribute food, there are a lot of volunteer opportunities available.
          Pledge to volunteer with your local food bank and find a volunteer opportunity near you.
        </p>
            <form className="mb-8">
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-white text-lg font-bold mb-2">First Name:</label>
                <input type="text" id="firstName" name="firstName" className="w-full bg-gray-300 border border-gray-400 rounded py-2 px-3 focus:outline-none focus:border-green-500" onChange={handleChange}/>
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-white text-lg font-bold mb-2">Last Name:</label>
                <input type="text" id="lastName" name="lastName" className="w-full bg-gray-300 border border-gray-400 rounded py-2 px-3 focus:outline-none focus:border-green-500"onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white text-lg font-bold mb-2">Email:</label>
                <input type="email" id="email" name="email" className="w-full bg-gray-300 border border-gray-400 rounded py-2 px-3 focus:outline-none focus:border-green-500" onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-white text-lg font-bold mb-2">Address:</label>
                <textarea id="address" name="address" className="w-full bg-gray-300 border border-gray-400 rounded py-2 px-3 focus:outline-none focus:border-green-500" onChange={handleChange}></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-white text-lg font-bold mb-2">Phone Numbers:</label>
                <input type="text" id="phone" name="phone" className="w-full bg-gray-300 border border-gray-400 rounded py-2 px-3 focus:outline-none focus:border-green-500" onChange={handleChange}/>
                <small className="text-gray-400">Add multiple phone numbers separated by commas.</small>
              </div>
              <div className="mb-4">
                <label htmlFor="district" className="block text-white text-lg font-bold mb-2">Select District:</label>
                <select id="district" name="district" className="w-full bg-gray-300 border border-gray-400 rounded py-2 px-3 focus:outline-none focus:border-green-500 text-black"onChange={handleChange}>
                  <option value="">Select District</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Kalutara">Kalutara</option>
                  <option value="Jaffna">Jaffna</option>
                  <option value="Anuradhapura">Anuradhapura</option>
                  <option value="Matara">Matara</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="block text-white text-lg font-bold mb-2">Username:</label>
                <input type="text" id="username" name="username" className="w-full bg-gray-300 border border-gray-400 rounded py-2 px-3 focus:outline-none focus:border-green-500"onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-white text-lg font-bold mb-2">Password:</label>
                <input type="password" id="password" name="password" className="w-full bg-gray-300 border border-gray-400 rounded py-2 px-3 focus:outline-none focus:border-green-500"onChange={handleChange} />
              </div>
              <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Get Started</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
