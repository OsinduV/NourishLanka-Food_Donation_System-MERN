import React, { useEffect, useState } from 'react';
import { Spinner, Table, Button } from 'flowbite-react';
import { useParams } from 'react-router-dom';

export default function MyFoodRequest() {
    const { myfoodrequestSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [myfoodrequest, setFoodRequest] = useState(null);

    useEffect(() => {
        const fetchMyFoodRequest = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/foodrequest/getmyfoodrequests?slug=${myfoodrequestSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                } else {
                    setFoodRequest(data.myfoodrequests[0]);
                }
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchMyFoodRequest();
    }, [myfoodrequestSlug]);

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size='xl' />
            </div>
        );
    }

    return <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
    <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{myfoodrequest && myfoodrequest.district}</h1>
    
    <Button color='gray' pill size='xs'>{myfoodrequest && myfoodrequest.category}</Button>
    
    <img src={myfoodrequest && myfoodrequest.image} alt={myfoodrequest && myfoodrequest.recipientname} className='mt-10 p-3 max-h-[600px] w-full object-cover'/>
    <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{myfoodrequest && new Date(myfoodrequest.createdAt).toLocaleDateString()}</span>
        
    </div>
    <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html: myfoodrequest && myfoodrequest.content}}>

    </div>
  </main>;
}