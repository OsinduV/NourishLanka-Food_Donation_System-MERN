import React from 'react';
import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function FoodRequestPage() {
  const { foodrequestSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [foodrequest, setFoodRequest] = useState(null);

  useEffect(() => {
    const fetchFoodRequest = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/foodrequest/getfoodrequests?slug=${foodrequestSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setFoodRequest(data.foodrequests[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchFoodRequest();
  }, [foodrequestSlug]);

  // Function to strip HTML tags
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  }

  function TableRow({ label, value }) {
    return (
      <tr>
        <td className="border border-gray-300 dark:border-gray-600 dark:text-gray-400 font-semibold px-4 py-2">{label}</td>
        <td className="border border-gray-300 dark:border-gray-600 dark:text-gray-400 font-semibold px-4 py-2">{value}</td>
      </tr>
    );
  }
  

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>District - {foodrequest && foodrequest.district}</h1>
      <Link to={`/search?category=${foodrequest && foodrequest.category}`} className='self-center mt-5'>
        <Button color='gray' pill size='xs'>
          {foodrequest && foodrequest.category}
        </Button>
      </Link>

      <table className="table-fixed w-full mt-10 border-collapse rounded-lg">
        <tbody>
          <TableRow label="Recipient Name" value={foodrequest && foodrequest.recipientname} />
          <TableRow label="Category" value={foodrequest && foodrequest.category} />
          <TableRow label="Recipient District" value={foodrequest && foodrequest.district} />
          <TableRow label="Recipient Email" value={foodrequest && foodrequest.email} />
          <TableRow label="Recipient Contact Number" value={foodrequest && foodrequest.contactnumber} />
          <TableRow label="No of Children" value={foodrequest && foodrequest.nochildren} />
          <TableRow label="No of Men" value={foodrequest && foodrequest.nomales} />
          <TableRow label="No of Females" value={foodrequest && foodrequest.nofemales} />
          <TableRow label="Recipient Address" value={foodrequest && foodrequest.address} />
          <TableRow
            label="GramaNiladhari Certificate"
            value={
              foodrequest && foodrequest.image ? (
                <img
                  src={foodrequest.image}
                  alt={foodrequest.recipientname}
                  className="p-3 h-[600px] w-[500px] object-cover mx-auto"
                />
              ) : (
                "No GramaNiladhari Document submitted"
              )
            }
          />
          <TableRow label="Special Needs" value={foodrequest && stripHtmlTags(foodrequest.content)} />
          <TableRow label="Food Request Status" value={foodrequest && foodrequest.status} />
        </tbody>
      </table>
    </main>
  );
}
