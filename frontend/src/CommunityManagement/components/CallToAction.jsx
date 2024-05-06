import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
            Want to join our cause to fight hunger and ensure everyone has enough to eat?

            </h2>
            <p className='text-gray-500 my-2'>
            Be a beacon of hope by extending a meal to those in need
            </p>
            <Button gradientDuoTone='greenToBlue' className='rounded-tl-xl rounded-bl-none'>
                <a href="/fr-home" target='_blank' rel='noopener noreferrer'>
                    Donate Now
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://www.thefoodcloset.org/uploads/2/2/4/3/22433308/4_orig.png" />
        </div>
    </div>
  )
}