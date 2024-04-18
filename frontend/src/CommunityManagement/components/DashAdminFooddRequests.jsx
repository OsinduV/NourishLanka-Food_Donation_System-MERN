import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function DashAdminFoodRequests() {
    const { currentUser } = useSelector((state) => state.user);
    const [allFoodRequests, setAllFoodRequests] = useState([]);
    const [showMore, setShowMore] = useState(true);

    useEffect(() => {
        const fetchAllFoodRequests = async () => {
            try {
                const res = await fetch('/api/foodrequest/getallfoodrequests');
                const data = await res.json();
                if (res.ok) {
                    setAllFoodRequests(data.allfoodrequests);
                    if (data.allfoodrequests.length < 9) {
                        setShowMore(false);
                      }
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (currentUser.isCommunityAdmin) {
            fetchAllFoodRequests();
        }
    }, [currentUser.isCommunityAdmin]);

    const handleShowMore = async () => {
        const startIndex = allFoodRequests.length;
        try {
          const res = await fetch(
            `/api/foodrequest/getallfoodrequests?&startIndex=${startIndex}`
          );
          const data = await res.json();
          if (res.ok) {
            setAllFoodRequests((prev) => [...prev, ...data.allfoodrequests]);
            if (data.allfoodrequests.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isCommunityAdmin && allFoodRequests.length > 0 ? (
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
                            <Table.HeadCell>Delete</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className='divide-y'>
                            {allFoodRequests.map((foodrequest) => (
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
                                        <span className='font-medium text-red-500 hover:underline cursor-pointer'>Reject</span>
                                    </Table.Cell>
                                    <Table.Cell>Pending</Table.Cell> {/* You can replace "Status" with actual status */}
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
                </>
            ) : (
                <p>Currently there are no food requests!</p>
            )}
        </div>
    );
}
