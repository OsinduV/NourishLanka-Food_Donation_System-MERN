import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function CalltoAction() {
    return (
        <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
            <div className="flex-1 justify-center flex flex-col">
                <h2 className='text-2xl'>
                    More about NourishLanka?
                </h2>

                <Link to={'/'}>
            <Button gradientDuoTone='greenToBlue'
                type='button'
                className=' text-white rounded-lg px-2 py-1 mx-auto mt-5'
            >
             NourishLanka
            </Button>
            </Link>
            </div>
            <div className="p-7 flex-1">
                <img src="https://www.thefoodcloset.org/uploads/2/2/4/3/22433308/4_orig.png" />
            </div>
        </div>
      )
      
}
