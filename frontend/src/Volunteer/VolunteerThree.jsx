import React from 'react'

export default function VolunteerThree() {
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
          <div className="w-2/4 bg-black text-white p-8 rounded-lg shadow-lg ">
          <h1 className="text-3xl font-bold mb-7 px-1 mt-9">Volunteer at a Food Bank</h1>
        <p className="text-lg mb-10">
          Food banks, food pantries, and meal programs in the Nourish Lanka network are continuing to do what they do best - provide meals to our communities. Whether you sort and pack food or distribute food, there are a lot of volunteer opportunities available.
          Pledge to volunteer with your local food bank and find a volunteer opportunity near you.
        </p>
        <h1 className="text-3xl font-bold mb-7 px-1 mt-9">Your nearest Food Bank is:</h1>
        <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Explore</button>
          </div>
        </div>
      </div>
    </>
  )
}
