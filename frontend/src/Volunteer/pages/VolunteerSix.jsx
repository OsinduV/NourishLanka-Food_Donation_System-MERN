import React from 'react';
import { Select, TextInput, Button, Textarea, Alert } from 'flowbite-react';

import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function VolunteerSix() {
    
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const { userId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchVolunteers = async () => {
          const res = await fetch(`/api/volunteer/getvolunteer?userId=${userId}`);
          const data = await res.json();
          if (!res.ok) {
            setPublishError(data.message);
            return;
          }
          setFormData(data.volunteers[0] || {});
        };
        fetchVolunteers();
      }, [userId]);
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/volunteer/getvolunteer?userId=${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }

            if (res.ok) {
                setPublishError(null);
                navigate('/volunteer-one');
            }
        } catch (error) {
            setPublishError('Something went wrong');
        }
    };

    return (

        <div className='flex justify-between max-w-4xl mx-auto mt-10'>
        
        <div className='bg-white text-black border-green-500 rounded-lg shadow-md p-8 max-w-md '>
            <h1 className='text-3xl font-bold text-center mb-6'>Volunteering details</h1>
            <form className='flex flex-col gap-4 mb-7' onSubmit={handleSubmit}>
                
            </form>
          
            <div className=' border-gray-300 p-4  '>
                <h1 className='text-lg font-bold mb-2'>Volunteering Details</h1>
                <ul className=' list-inside'>
                    <li className='mb-2'>
                        <strong>fullName:</strong> {formData.fullName}
                    </li>
                    <li className='mb-2'>
                        <strong>email:</strong> {formData.email}
                    </li>
                    <li className='mb-2'>
                        <strong>address:</strong> {formData.address}
                    </li>
                    <li className='mb-2'>
                        <strong>phoneNumber:</strong> {formData.phoneNumber}
                    </li>
                    <li className='mb-2'>
                        <strong>district:</strong> {formData.district}
                    </li>
                    <li className='mb-2'>
                        <strong>date:</strong> {formData.date}
                    </li>
                    <li className='mb-2'>
                        <strong>day:</strong> {formData.day}
                    </li>
                    <li className='mb-2'>
                        <strong>category:</strong> {formData.category}
                    </li>
                    <li className='mb-2'>
                        <strong>time:</strong> {formData.time}
                    </li>
                </ul>
              
            </div>

           
            {publishError && (
                <Alert className='mt-5' color='failure'>
                    {publishError}
                </Alert>
            )}
        </div>
        <div className='flex-1 ml-4'>
                        <img src="https://img.freepik.com/free-photo/smiley-volunteers-preparing-food-provisions-donation_23-2148637978.jpg?t=st=1714180638~exp=1714184238~hmac=725fc4f845d749fb3126a98815415791d2f0deb3aee23ef4a64b28373fbf6b74&w=740" className='h-full' />
                    </div>
      
        
    </div>
        
    );
}
