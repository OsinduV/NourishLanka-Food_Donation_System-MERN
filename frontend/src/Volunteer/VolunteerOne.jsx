import React from 'react';

export default function VolunteerOne() {
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
        <h1 className="text-3xl font-bold mb-1 px-1 mt-9">Share Your Kindness</h1>
        <p className="text-lg">Volunteer your time to make a difference in your community.</p>
      </div>

      <div className="gradient-background text-white min-h-screen flex items-center justify-center">
        <div className="flex w-full justify-center">
          <div className="w-3/4 bg-black text-white p-8 rounded-lg shadow-lg">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Join a Food Donating Event</h1>
              <p className="text-lg mb-4">Be a part of the solution! Find upcoming food Donating events in your area and participate in donating food to  families in need. Every contribution helps fight hunger in our community.</p>
              <button className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Join Now</button>
            </div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Volunteer at a Food Bank</h1>
              <p className="text-lg mb-4">Give back directly! Food banks rely on volunteers to help sort, pack, and distribute food. Join a team of dedicated individuals making a real impact on people's lives.</p>
              <button className="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Volunteer Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
