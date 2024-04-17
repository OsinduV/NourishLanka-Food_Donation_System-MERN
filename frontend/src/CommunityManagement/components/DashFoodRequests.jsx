import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

export default function DashFoodRequests() {
    const { currentUser } = useSelector((state) => state.user);
    const [userFoodRequests, setUserFoodRequests] = useState([]);
    
    useEffect(() => {
      const fetchmyFoodRequests = async () => {
        try {
          const res = await fetch(`/api/foodrequest/getmyfoodrequests?userId=${currentUser._id}`);
          const data = await res.json();
          if (res.ok) {
            setUserFoodRequests(data.myfoodrequests);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      if (!currentUser.isCommunityAdmin) {
        fetchmyFoodRequests();
      }
    }, [currentUser._id]);

    return (

        
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {!currentUser.isCommunityAdmin && userFoodRequests.length > 0 ? (
          <>
            <div className="flex items-center mb-4"> {/* Flex container to align heading and button */}
              <h2 className="text-2xl font-bold mr-4">My Food Requests</h2>
              <a href="create-foodrequest" className="ml-auto"> {/* Adjust button positioning */}
                <Button type='button' gradientDuoTone='greenToBlue'>Add New Food Request</Button>
              </a>
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
              {userFoodRequests.map((myfoodrequest) => (
                <Table.Body className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(myfoodrequest.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className='font-medium text-gray-900 dark:text-white'
                        to={`/myfoodrequest/${myfoodrequest.slug}`}
                      >
                        {myfoodrequest.recipientname}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{myfoodrequest.district}</Table.Cell>
                    <Table.Cell>{myfoodrequest.category}</Table.Cell>
                    <Table.Cell>{myfoodrequest.email}</Table.Cell>
                    <Table.Cell>{myfoodrequest.contactnumber}</Table.Cell>
                  
                    <Table.Cell>
                      <span className='font-medium text-red-500 hover:underline cursor-pointer'>
                        Delete
                      </span>
                    </Table.Cell>
                    
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </>
        ) : (
          <p>Currently you haven't any food requests!</p>
        )}
      </div>
    );
  }
         