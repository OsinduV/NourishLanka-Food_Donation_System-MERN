import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';

import DashSchedules from '../Volunteer/components/DashSchedules';

import DashUsers  from '../components/DashUsers';

import DashRecipientPost from '../CommunityManagement/components/DashRecipientPost';
import DashFoodRequests from '../CommunityManagement/components/DashFoodRequests';
import DashAdminFooddRequests from '../CommunityManagement/components/DashAdminFooddRequests';
import DashEvents from '../Event/components/DashEvents';
import DashDonations from '../Event/components/DashDonations';
import DashDRequests from '../Event/components/DashDRequests';
import DashFooddrives from '../Event/components/DashFooddrives';
import DashFRequests from '../Event/components/DashFRequests';
import ApprovedDonations from '../Event/pages/ApprovedDonations';
import ApprovedFooddrives from '../Event/pages/ApprovedFooddrives';
import DeclinedFooddrives from '../Event/pages/DeclinedFooddrives';
import DeclinedDonations from '../Event/pages/DeclinedDonations';
import OnedayFooddrives from '../Event/pages/OnedayFooddrives';
import LongdayFooddrives from '../Event/pages/LongdayFooddrives';
import AppAllFdLong from '../Event/pages/AppAllFdLong';
import DecAllFdLong from '../Event/pages/DecAllFLong';
import AppAllFone from '../Event/pages/AppAllFone';
import DecAllFone from '../Event/pages/DecAllFone';
import ComAllFone from '../Event/pages/ComAllFone';
import ComAllFdLong from '../Event/pages/ComAllFdLong';
import AppAllDonations from '../Event/pages/AppAllDonations';
import DecAllDonations from '../Event/pages/DecAllDonations';
import ComAllDonations from '../Event/pages/ComAllDonations';
import CompletedDonations from '../Event/pages/CompletedDonations';
import CompletedFooddrives from '../Event/pages/CompletedFooddrives';
import DashComments from '../Ratings and Review_f/components/DashComments';



export default function Dashboard() {

  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}

       {/* schedules... */}
       {tab === 'schedules' && <DashSchedules/>}
       {/* volunteering activities... */}
       {tab === 'volunteeringactivities' && <Volunteeractivities/>}
       


       {/* users... */}
       {tab === 'users' && <DashUsers />}


        {/* posts... */}
        {tab === 'posts' && <DashRecipientPost/>}
        {/*myfoodrequests*/}
        {tab ==='myfoodrequests' && <DashFoodRequests/>}
        {/*recipientsfoodrequests*/}
        {tab ==='recipientsfoodrequests' && <DashAdminFooddRequests/>}
        
              {/* events... */}
      {tab === 'events' && <DashEvents />}



{/*EVENT ORGANISER DASHBOARD */}
      {/* all donation requests... */}
      {tab === 'donations' && <DashDonations />}

      {/* all donation requests... */}
      {tab === 'declineddonations' && <DecAllDonations />}

      {/* all approved donation requests... */}
      {tab === 'approveddonations' && <AppAllDonations />}

      {/* all completed donation requests... */}
      {tab === 'completeddonations' && <ComAllDonations />}



      {/* all fooddrive requests... */}
      {tab === 'fooddrives' && <DashFooddrives />}

      {/* all longday fooddrive requests... */}
      {tab === 'flongday' && <LongdayFooddrives />}

      {/* all longday approved fooddrive requests... */}
      {tab === 'fapprovedlong' && <AppAllFdLong />}

      {/* all longday declined fooddrive requests... */}
      {tab === 'fdeclinedlong' && <DecAllFdLong />}

      {/* all longday completed fooddrive requests... */}
      {tab === 'fcompletedlong' && <ComAllFdLong />}



      {/* all oneday fooddrive requests... */}
      {tab === 'foneday' && <OnedayFooddrives />}

      {/* all oneday approved fooddrive requests... */}
      {tab === 'fapprovedone' && <AppAllFone />}

      {/* all oneday declined fooddrive requests... */}
      {tab === 'fdeclinedone' && <DecAllFone />}

      {/* all oneday completed fooddrive requests... */}
      {tab === 'fcompletedone' && <ComAllFone />}




{/*USER DASHBOARD */}
      {/* my donation requests... */}
      {tab === 'drequests' && <DashDRequests />}

      {/* my approved donation requests... */}
      {tab === 'dapproved' && <ApprovedDonations />}

      {/* my declined donation requests... */}
      {tab === 'ddeclined' && <DeclinedDonations />}

      {/* my completed donation requests... */}
      {tab === 'dcompleted' && <CompletedDonations />}



      {/* my fooddrive requests... */}
      {tab === 'frequests' && <DashFRequests />}

      {/* my approved fooddrive requests... */}
      {tab === 'fapproved' && <ApprovedFooddrives />}

      {/* my declined fooddrive requests... */}
      {tab === 'fdeclined' && <DeclinedFooddrives />}

      {/* my completed fooddrive requests... */}
      {tab === 'fcompleted' && <CompletedFooddrives />}


      {/* comments  */}
      {tab === 'comments' && <DashComments />}


    </div>

  );
}
