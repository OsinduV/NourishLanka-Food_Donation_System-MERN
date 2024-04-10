import React from 'react'
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import CommunityFeatures from '../components/CommunityFeatures';

export default function CommunityHome() {
  return (
    <div className='md:px-12 p-4 max-w-screen-2xl mx-auto mt-20'>
    <div>
        <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-10'>
            <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
                {/* Banner content */}
                <div className='md:w-3/5 text-left'>
                    <h2 className='md:text-4xl text-4xl font-bold mb-6 leading-relaxed'>Uniting Communities, Nourishing Lives: Empowering Sri Lanka's Fight Against Hunger"</h2>
                    <p className='mb-8'>Step into our world of compassion and action, where each click resonates with the heartbeat of humanity! Here at our Community Management platform in Sri Lanka, we're not just fighting hunger; we're sowing seeds of hope and weaving threads of unity in the fabric of our community. In a world where every meal is a lifeline, we stand as guardians of dignity and empathy. Through our innovative platform, we empower individuals and families grappling with food insecurity to tailor their needs, transforming mere requests into profound expressions of self-worth and resilience.</p>

                    <div className="flex gap-10 mb-8 justify-start">
                        <a  href="create-foodrequest">
                        <Button type='button' gradientDuoTone='greenToBlue'>Send a Food Request</Button>
                        </a>
                        <a href="/communitysearch">
                            <Button type='button' gradientDuoTone='greenToBlue'>Find Recipients </Button>
                        </a>
                    </div>
                </div>
                
                {/* Banner image */}
                <div>
                    <img src="https://www.thefoodcloset.org/uploads/2/2/4/3/22433308/4_orig.png" className='lg:h-[300px]'/>
                </div>
            </div>
        </div>
    </div>
    <CommunityFeatures/>
</div>

  )
}
