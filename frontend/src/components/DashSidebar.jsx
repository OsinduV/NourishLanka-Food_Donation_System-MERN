import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight, HiDocumentText } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MdNotes } from "react-icons/md";

export default function DashSidebar() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isEventOrganiser ? 'Event Organiser' : 'User'}
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>

          <Link to='/dashboard?tab=drequests'>
          {currentUser && !currentUser.isEventOrganiser && (
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

          {currentUser.isEventOrganiser && (
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

          {currentUser.isEventOrganiser && (
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

          {currentUser.isEventOrganiser && (
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
          {currentUser && !currentUser.isEventOrganiser && (
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