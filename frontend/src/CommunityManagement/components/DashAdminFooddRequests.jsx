import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function DashAdminFoodRequests() {
    const { currentUser } = useSelector((state) => state.user);
    const [userFoodRequests, setFoodRequests] = useState([]);
    const [showMore, setShowMore] = useState(true);

    useEffect(() => {
        const fetchFoodRequests = async () => {
            try {
                const res = await fetch('/api/foodrequest/getfoodrequests');
                const data = await res.json();
                if (res.ok) {
                    setFoodRequests(data.foodrequests);
                    if (data.foodrequests.length < 9) {
                        setShowMore(false);
                      }
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (currentUser.isCommunityAdmin) {
            fetchFoodRequests();
        }
    }, [currentUser.isCommunityAdmin]);

    const handleShowMore = async () => {
        const startIndex = userFoodRequests.length;
        try {
          const res = await fetch(
            `/api/foodrequest/getfoodrequests?&startIndex=${startIndex}`
          );
          const data = await res.json();
          if (res.ok) {
            setFoodRequests((prev) => [...prev, ...data.foodrequests]);
            if (data.foodrequests.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isCommunityAdmin && userFoodRequests.length > 0 ? (
                <>
                    <div className="flex items-center mb-4"> {/* Flex container to align heading and button */}
                        <h2 className="text-2xl font-bold mr-4">All Recipients' Food Requests</h2>
                    </div>
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Date updated</Table.HeadCell>
                            <Table.HeadCell>Recipient Name</Table.HeadCell>
                            <Table.HeadCell>District</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Contact Number</Table.HeadCell>
                            <Table.HeadCell>Edit</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className='divide-y'>
                            {userFoodRequests.map((foodrequest) => (
                                <Table.Row key={foodrequest._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>{new Date(foodrequest.updatedAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>
                                        <Link className='font-medium text-gray-900 dark:text-white' to={`/foodrequest/${foodrequest.slug}`}>
                                            {foodrequest.recipientname}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>{foodrequest.district}</Table.Cell>
                                    <Table.Cell>{foodrequest.category}</Table.Cell>
                                    <Table.Cell>{foodrequest.email}</Table.Cell>
                                    <Table.Cell>{foodrequest.contactnumber}</Table.Cell>
        
                                    <Table.Cell>
                                    <Link
                                     className='text-teal-500 hover:underline'
                                     to={`/update-foodrequest/${foodrequest._id}`}
                                      >
                                    <span>Edit Status</span>
                                   </Link>
                                    </Table.Cell> {/* You can replace "Status" with actual status */}
                                    <Table.Cell>
                                        {foodrequest.status}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more Food Requests
            </button>
          )}
                </>
            ) : (
                <p>Currently there are no food requests!</p>
            )}
        </div>
    );
}
