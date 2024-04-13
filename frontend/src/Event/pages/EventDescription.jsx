import { Button } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function EventDescription() {
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        Wanna Host an Event?
      </h1>

      <div className='flex flex-row'>
        <div className='w-1/2 mr-3 mt-10'>
          <h1 className='text-xl font-serif max-w-3xl lg:text-2xl'>
            Start a Donation Campaign
          </h1>
          <div className='w-full mt-5 text-lg'>
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

            <div className='mt-12 flex flex-wrap w-full'>
            <Link to={'/'}>
            <Button
                type='button'
                className='mr-4 bg-gradient-to-r from-green-500 via-green-300 to-green-400 text-white'
            >
             Upcoming events
            </Button>
            </Link>


            <Link to={'/donation-request'}>
            <Button
              type='button'
              className='bg-gradient-to-r from-green-500 via-green-300 to-green-400 text-white'
            >
              Host an Event
            </Button>
            </Link>
            </div>
          </div>
        </div>

        <div className='w-1/2 flex flex-col justify-between ml-12'>
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
        <div className='w-3/4 mr-3'>
          <h1 className='text-xl font-serif max-w-3xl lg:text-2xl'>
            Start a Food Drive
          </h1>
          <div className='w-full mt-5 text-lg'>
            <h1 className='max-w-3xl mt-3 font-bold'>
            What is a Virtual Food Drive?
          </h1>
            <p>A virtual food drive allows you to collect online donations rather than food.
                 The money you collect from your virtual food drive become meals and other 
                 services for people facing hunger. These fundraisers allow you to have a greater
                  impact in the fight against hunger.</p>
            <div className='mt-2 flex flex-wrap w-full'>
            <Link to={'/'}>
            <Button
                type='button'
                className='mr-4 bg-gradient-to-r from-green-500 via-green-300 to-green-400 text-white'
            >
             Start a Virtual Food Drive
            </Button>
            </Link>
            </div>
          </div>

          <div className='w-full mt-10 text-lg'>
            <h1 className='max-w-3xl mt-5 font-bold'>
            What is a Physical Food Drive?
          </h1>
            <p>A virtual food drive allows you to collect online donations rather than food.
                 The money you collect from your virtual food drive become meals and other 
                 services for people facing hunger. These fundraisers allow you to have a greater
                  impact in the fight against hunger.</p>

            <div className='mt-2 flex flex-wrap w-full'>
            <Link to={'/'}>
            <Button
                type='button'
                className='mr-4 bg-gradient-to-r from-green-500 via-green-300 to-green-400 text-white'
            >
             View Upcoming events
            </Button>
            </Link>


            <Link to={'/donation-request'}>
            <Button
              type='button'
              className='bg-gradient-to-r from-green-500 via-green-300 to-green-400 text-white'
            >
            Start a Physical Food Drive
            </Button>
            </Link>
            </div>
          </div>
        </div>

        

        <div className='w-2/4 flex flex-col justify-between ml-12 mt-5'>
          <img
            src='https://i.pinimg.com/564x/ba/1c/89/ba1c89ad621c5cad9cd4ace0abdeea37.jpg'
            alt='Image 1'
            className='w-full h-3/4 object-cover'
          />
        </div>
      </div>

      {/*new */}
      <div className='flex flex-row'>
        <div className='w-1/2 mr-3'>
          <div className='w-full mt-5 text-lg'>
            <h1 className='max-w-3xl mt-3 font-bold text-center'>
            Feed people for your Birthday
            </h1>

            <img
            src='https://i.pinimg.com/564x/9a/5a/1b/9a5a1b197b12e5cf0e3777956876732e.jpg'
            alt='Image 1'
            className='w-3/4 h-1/4 object-cover mx-auto'
          />
          </div>

          <div className='w-full mt-10 text-lg text-center'>
            <p>A birthday food drive allows you to collect online donations rather than food.
                 The money you collect from your virtual food drive.</p>

          </div>
        </div>
        <div className='w-1/2 mr-3'>
          <div className='w-full mt-5 text-lg'>
            <h1 className='max-w-3xl mt-3 font-bold text-center'>
            Feed people for your Birthday
            </h1>

            <img
            src='https://i.pinimg.com/564x/3a/01/ce/3a01ce30936cef93737bd94035c44242.jpg'
            alt='Image 1'
            className='w-3/4 h-1/4 object-cover mx-auto'
          />
          </div>

          <div className='w-full mt-10 text-lg text-center ml-10'>
            <p>A birthday food drive allows you to collect online donations rather than food.
                 The money you collect from your virtual food drive.</p>
          </div>
        </div>
      </div>


      <div className='flex flex-row mt-10 mb-10'>
        <div className='w-1/2 mr-3'>
          <div className='w-full mt-5 text-lg'>
            <h1 className='max-w-3xl mt-3 font-bold text-center'>
            Feed people for your Birthday
            </h1>

            <img
            src='https://i.pinimg.com/564x/a8/50/89/a85089be8f59ae1c01a02a737b9e2897.jpg'
            alt='Image 1'
            className='w-3/4 h-1/4 object-cover mx-auto mt-8'
          />
          </div>

          <div className='w-full mt-12 text-lg text-center'>
            <p>A birthday food drive allows you to collect online donations rather than food.
                 The money you collect from your virtual food drive.</p>
          </div>
        </div>
        <div className='w-1/2 mr-3'>
          <div className='w-full mt-5 text-lg'>
            <h1 className='max-w-3xl mt-3 font-bold text-center'>
            Feed people for your Birthday
            </h1>

            <img
            src='https://i.pinimg.com/564x/c6/03/f2/c603f284eb93a9a96149abb304b4621a.jpg'
            alt='Image 1'
            className='w-3/4 h-1/4 object-cover mx-auto'
          />
          </div>

          <div className='w-full mt-10 text-lg text-center ml-10'>
            <p>A birthday food drive allows you to collect online donations rather than food.
                 The money you collect from your virtual food drive.</p>
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
