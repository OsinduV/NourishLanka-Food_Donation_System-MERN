import { Sidebar } from 'flowbite-react';


import { HiUser, HiArrowSmRight, HiDocument, HiDocumentText, HiOutlineUserGroup, HiAnnotation } from 'react-icons/hi';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { BiSolidFoodMenu } from "react-icons/bi";
import { MdNotes } from "react-icons/md";



export default function DashSidebar() {
  const location = useLocation();
 
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className='w-full md:w-35'>
      <Sidebar.Items>
      <Sidebar.ItemGroup className='flex flex-col gap-1'>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}

              label={currentUser.isAdmin ? 'Admin' : 'User'}


              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>

          {currentUser.isAdmin && (
          <Link to='/dashboard?tab=schedules'>
            <Sidebar.Item 
              active={tab === 'schedules'}
              icon={HiDocumentText}
              labelColor='dark'
              as='div'
            >
            Schedules
            </Sidebar.Item>
          </Link>
          )}
           
           {currentUser.isAdmin && (

          <Link to='/dashboard?tab=volunteers'>
            <Sidebar.Item 
              active={tab === 'volunteers'}
              icon={HiUser}
              labelColor='dark'
              as='div'
            >
            Volunteers
            </Sidebar.Item>
          </Link>
           )}

<Link to='/dashboard?tab=volunteeringactivities'>
            <Sidebar.Item
              active={tab === 'profile'}
              
             
              labelColor='dark'
              as='div'
            >
              Volunteering activities
            </Sidebar.Item>
          </Link>

          


          <Link to='/dashboard?tab=users'>
            <Sidebar.Item
              active={tab === 'users'}
              icon={HiOutlineUserGroup}
              as='div'
            >
              Users
            </Sidebar.Item>
          </Link>
   
          {!currentUser.isAdmin && (
          <Link to='/dashboard?tab=myfoodrequests'>
            <Sidebar.Item 
              active={tab === 'myfoodrequests'}
              icon={BiSolidFoodMenu}
              labelColor='dark'
              as='div'
            >
            My Food Requests
            </Sidebar.Item>
          </Link>
          )}
               
 
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
              >
                 Community Posts
              </Sidebar.Item>
            </Link>
          )}

        {currentUser.isAdmin && (
          <Link to='/dashboard?tab=recipientsfoodrequests'>
            <Sidebar.Item 
              active={tab === 'recipientsfoodrequests'}
              icon={BiSolidFoodMenu}
              labelColor='dark'
              as='div'
            >
             Food Requests
            </Sidebar.Item>
          </Link>
          )} 
          
                    <Link to='/dashboard?tab=drequests'>
          {currentUser && !currentUser.isAdmin && (
            <Sidebar.Item
              active={tab === 'drequests'}
              icon={MdNotes}
              labelColor='dark'
              as='div'
            >
             My Donation Events
            </Sidebar.Item>
          )}
          </Link>

          {currentUser.isAdmin && (
              <Link to='/dashboard?tab=events'>
              <Sidebar.Item
                active={tab === 'events'}
                icon={HiDocumentText}
                as='div'
              >
                Events
              </Sidebar.Item>
              </Link>
          )}

          {currentUser.isAdmin && (
              <Link to='/dashboard?tab=donations'>
              <Sidebar.Item
                active={tab === 'donations'}
                icon={MdNotes}
                as='div'
              >
                Donation Requests
              </Sidebar.Item>
              </Link>
          )}

          {currentUser.isAdmin && (
              <Link to='/dashboard?tab=fooddrives'>
              <Sidebar.Item
                active={tab === 'fooddrives'}
                icon={MdNotes}
                as='div'
              >
                Food Drive Requests
              </Sidebar.Item>
              </Link>
          )}

          <Link to='/dashboard?tab=frequests'>
          {currentUser && !currentUser.isAdmin && (
            <Sidebar.Item
              active={tab === 'frequests'}
              icon={MdNotes}
              labelColor='dark'
              as='div'
            >
             My FoodDrives
            </Sidebar.Item>
          )}
          </Link>

          {currentUser.isAdmin && (
           
              <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Comments
                </Sidebar.Item>
              </Link>
            
          )}



          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      
    </Sidebar>
  );
}