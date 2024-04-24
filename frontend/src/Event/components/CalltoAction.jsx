import { Button } from 'flowbite-react'
import React from 'react'

export default function CalltoAction() {
    return (
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
            <div className="flex-1 justify-center flex flex-col">
                <h2 className='text-2xl'>
                    More about NourishLanka?
                </h2>
                <p className='text-gray-500 my-2'>
                    Checkout our projects
                </p>
                <Button className='px-2 py-1 bg-gradient-to-r from-green-500 via-green-300 to-green-400 rounded-lg text-white'>
                    <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>
                        Projects
                    </a>
                </Button>
            </div>
            <div className="p-7 flex-1">
                <img src="https://www.patriotsoftware.com/wp-content/uploads/2018/07/charitable-donations.jpg" />
            </div>
        </div>
      )
      
}
