import { Table ,Modal} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { set } from 'mongoose';
import { BiFolderPlus } from "react-icons/bi";
export default function DashFoodRequests() {
    const { currentUser } = useSelector((state) => state.user);
    const [userFoodRequests, setUserFoodRequests] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [foodrequestIdToDelete, setFoodrequestIdToDelete] = useState('');

    useEffect(() => {
      const fetchmyFoodRequests = async () => {
        try {
          const res = await fetch(`/api/foodrequest/getfoodrequests?userId=${currentUser._id}`);
          const data = await res.json();
          if (res.ok) {
            setUserFoodRequests(data.foodrequests);
            if (data.foodrequests.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      if (!currentUser.isCommunityAdmin) {
        fetchmyFoodRequests();
      }
    }, [currentUser._id]);

    const handleShowMore = async () => {
      const startIndex = userFoodRequests.length;
      try {
        const res = await fetch(
          `/api/foodrequest/getfoodrequests?userId=${currentUser._id}&startIndex=${startIndex}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserFoodRequests((prev) => [...prev, ...data.foodrequests]);
          if (data.foodrequests.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const handleDeleteFoodRequest = async () => {
      setShowModal(false);
      try {
        const res = await fetch(
          `/api/foodrequest/deletemyfoodrequest/${foodrequestIdToDelete}/${currentUser._id}`,
          {
            method: 'DELETE',
          }
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          setUserFoodRequests((prev) =>
            prev.filter((foodrequest) =>foodrequest._id !== foodrequestIdToDelete)
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    


    return (

        
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {!currentUser.isCommunityAdmin && userFoodRequests.length > 0 ? (
          <>
            <div className="flex items-center mb-4"> {/* Flex container to align heading and button */}
              <h2 className="text-2xl font-bold mr-4">My Food Requests</h2>
              <a href="create-foodrequest" className="ml-auto">
               <Button type='button' gradientDuoTone='greenToBlue'>
               <BiFolderPlus className="mr-2" style={{ fontSize: '1.8em' }} /> {/* Adjust icon size */}
                Add a New Food Request
              </Button>
             </a>
            </div>
            <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Date Created</Table.HeadCell>
                <Table.HeadCell>Recipient Name</Table.HeadCell>
                <Table.HeadCell>District</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Contact Number</Table.HeadCell>
                <Table.HeadCell>Delete Food Request</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>  
              </Table.Head>
              {userFoodRequests.map((foodrequest) => (
                <Table.Body className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      {new Date(foodrequest.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(foodrequest.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className='font-medium text-gray-900 dark:text-white'
                        to={`/foodrequest/${foodrequest.slug}`}
                      >
                        {foodrequest.recipientname}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{foodrequest.district}</Table.Cell>
                    <Table.Cell>{foodrequest.category}</Table.Cell>
                    <Table.Cell>{foodrequest.email}</Table.Cell>
                    <Table.Cell>{foodrequest.contactnumber}</Table.Cell>
                  
                    <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setFoodrequestIdToDelete(foodrequest._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                        Delete 
                      </span>
                    </Table.Cell>
                    <Table.Cell>{foodrequest.status}</Table.Cell>
                    
                  </Table.Row>
                </Table.Body>
              ))}
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
          <p>Currently you haven't created any food requests!</p>
        )}
        <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this Food Request?
            </h3>
            <p className='mb-3 text-sm text-gray-400 dark:text-gray-200'>
              By deleting this ,your food request details no longer will be availabe</p>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteFoodRequest}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      </div>
    );
  }
         