import { Button } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function EventDescription() {
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 font-bold w-full lg:text-6xl text-center'>Host Your Event Today!</h1>
      <h1 className='text-3xl mt-10 p-3 font-bold w-full lg:text-3xl'>
        
      "Small acts of kindness can change the world. Your donation, no matter the size, brings hope to those in need."
      </h1>

      <div className='flex flex-row'>
      <div className='w-1/2 mr-3 mt-5'>
      <div className=' bg-white shadow-lg rounded-xl p-6 dark:bg-gray-800'>
        <div className='flex flex-row'>
          <h1 className='text-xl font-semibold max-w-3xl lg:text-2xl  dark:text-gray-300'>
            Start a Donation Campaign
          </h1>
          </div>
          <div className='w-full mt-5 text-lg  dark:text-gray-400'>
            <p>
              Join us for a heartfelt donation event hosted by generous donors
              like you, where the essence of giving meets the profound need of
              those less fortunate.</p><br></br><p> At this event, food will be distributed to
              recipients in need, ensuring that no one in our community goes
              hungry. By partnering with us at Nourish Lanka, you gain access
              to a wealth of privileges that facilitate a successful donation
              campaign. From logistical support to promotional assistance, we're
              committed to maximizing your impact.</p><br></br><p> Together, we can shed light
              on the harsh reality faced by many in Sri Lanka, where hunger is
              a stark reality for countless individuals. We aim to make a tangible difference in the lives of the
              underprivileged, offering them sustenance and hope for a better
              tomorrow.</p>

            <div className='mt-12'>
              <Link
              to='/previousdonations'
              className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
              View previous Donation Campaigns
            </Link>
            </div>

            <Link to={'/donation-request'}>
            <Button gradientDuoTone='greenToBlue'
              type='button'
              className='text-white'
            >
              Host an Event
            </Button>
            </Link>
          </div>
        </div>
        </div>

        <div className='w-1/2 flex flex-col justify-between ml-12 mt-3'>
          <img
            src='https://i.pinimg.com/564x/49/4f/a9/494fa9d21008d681068b9649c8a1328c.jpg'
            alt='Image 1'
            className='w-full h-2/4 object-cover mb-2'
          />
          <div className='flex justify-between'>
            <img
              src='https://i.pinimg.com/564x/08/35/39/0835392a0e3683a92925999967e97cdb.jpg'
              alt='Image 2'
              className='w-1/2 h-3/4 object-cover mr-1'
            />
            <img
              src='https://i.pinimg.com/564x/db/6f/19/db6f1905c9024f918b35eed13efdff74.jpg'
              alt='Image 3'
              className='w-1/2 h-3/4 object-cover ml-1'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-row'>
        <div className='w-2/4 mr-3'>
        <div className='bg-white shadow-lg rounded-xl p-6 dark:bg-gray-800'>
        <img
            src='https://i.pinimg.com/564x/9a/5a/1b/9a5a1b197b12e5cf0e3777956876732e.jpg'
            alt='Image 1'
            className='w-3/4 h-1/4 object-cover mx-auto mb-5'
          />
          <h1 className='text-xl font-semibold max-w-3xl lg:text-2xl  dark:text-gray-300'>
            Start a Physical Food Drive
          </h1>
          <div className='w-full mt-5 text-lg dark:text-gray-400'>
            <h1 className='max-w-3xl mt-3 font-bold'>
            What is a Physical Food Drive?
          </h1>
            <p>Physical food drives, including one-way and long-day variations, are organized 
              events where individuals or groups collect non-perishable food items from donors
               at designated locations and then gathered and distributed to those in need through food banks  </p>
     
            <div className='mt-12'>
              <Link
              to='/previousfooddrives'
              className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
              View previous FoodDrives
            </Link>
            </div>
            <Link to={'/fooddrive-request'}>
            <Button gradientDuoTone='greenToBlue'
                type='button'
                className='mr-4 text-white'
            >
             Start a Physical Food Drive
            </Button>
            </Link>

          </div>
        </div>
        </div>

        <div className='w-2/4 ml-5 mb-10'>
        <div className=' bg-white shadow-lg rounded-xl p-6 dark:bg-gray-800'>
        <img
            src='https://i.pinimg.com/564x/c6/03/f2/c603f284eb93a9a96149abb304b4621a.jpg'
            alt='Image 1'
            className='w-3/4 h-1/4 object-cover mx-auto mb-5'
          />
          <h1 className='text-xl font-semibold max-w-3xl lg:text-2xl dark:text-gray-300'>
            Start a Virtual Food Drive
          </h1>
          <div className='w-full mt-5 text-lg  dark:text-gray-400'>
            <h1 className='max-w-3xl mt-3 font-bold'>
            What is a Virtual Food Drive?
          </h1>
            <p>A virtual food drive allows you to collect online donations rather than food.
                 The money you collect from your virtual food drive become meals and other 
                 services for people facing hunger. These fundraisers allow you to have a greater
                  impact in the fight against hunger.</p>
            <div className='mt-2 flex flex-wrap w-full'>
            <Link to={'/'}>
            <Button gradientDuoTone='greenToBlue' 
                type='button'
                className='mr-4 text-white mt-6'
            >
             Start a Virtual Food Drive
            </Button>
            </Link>
            </div>
          </div>
        </div>
        </div>
      </div>

{/*four cards */}
{/** 
      <div class="flex">
        <div class="w-1/2 p-3 md:min-h-screen">
           <div class='mr-10 sm:flex-row p-40 border bg-white dark:bg-green-100 shadow-md hover:shadow-lg transition-shadow rounded-xl mb-7'>
       <div class="w-1/2 flex justify-center items-center">

       </div>
       </div>
       <div class='mr-10 sm:flex-row p-40 border bg-white dark:bg-green-100 shadow-md hover:shadow-lg transition-shadow justify-center items-center rounded-xl text-center mb-7'></div>
      </div>

       <div class="w-1/2 p-3 md:min-h-screen">
       <div class='ml-10 sm:flex-row p-40 border bg-white dark:bg-green-100 shadow-md hover:shadow-lg transition-shadow justify-center items-center rounded-xl text-center mb-7'></div>
       <div class='ml-10 sm:flex-row p-40 border bg-white dark:bg-green-100 shadow-md hover:shadow-lg transition-shadow justify-center items-center rounded-xl text-center mb-7'></div>
      </div>

      </div>
*/}

    </main>
  );
}
