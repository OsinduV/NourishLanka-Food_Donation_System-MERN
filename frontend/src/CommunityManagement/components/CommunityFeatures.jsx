import React from 'react'

export default function CommunityFeatures() {
  return (
    <div className='my-24 md:px-14 px-4 max-w-screen-2xl mx-auto'>
        <div className='flex flex-col lg:flex-row justify-between items-start gap-10'>
            <div className='lg:w-1/4'>
                <h3 className='text-2xl font-bold lg:w-1/2 mb-3'>How Community works in NourishLanka</h3>
                 <p className='text-base text-tartiary'>Seamlessly connecting those in need with generous hearts, our platform empowers recipients to customize their requests, ensuring dignity and respect. Through meticulous organization and efficient resource distribution, our recipient managers orchestrate a symphony of support, weaving together communities in their quest to alleviate hunger and promote solidarity.</p>
            </div>
            {/*features card */}
            <div className='w-full lg:w-3/4'>
                <div className=''>
                    <div>
                     <img src="https://img.freepik.com/free-photo/smiley-male-volunteer-holding-food-donations_23-2148732651.jpg"/>
                     <h5 className='text-2xl font-semibold px-5 text-center'>Individuals struggling to put food on the table can request assistance.</h5>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}
