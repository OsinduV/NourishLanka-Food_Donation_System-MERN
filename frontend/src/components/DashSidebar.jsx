import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight,HiDocumentText  } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

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
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Volunteer Manager':'User'}
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