import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
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

      {/* events... */}
      {tab === 'events' && <DashEvents />}

      {/* all donation requests... */}
      {tab === 'donations' && <DashDonations />}

      {/* my donation requests... */}
      {tab === 'drequests' && <DashDRequests />}

      {/* all fooddrive requests... */}
      {tab === 'fooddrives' && <DashFooddrives />}

      {/* my fooddrive requests... */}
      {tab === 'frequests' && <DashFRequests />}

      {/* my approved donation requests... */}
      {tab === 'dapproved' && <ApprovedDonations />}

      {/* my declined donation requests... */}
      {tab === 'ddeclined' && <DeclinedDonations />}

      {/* my approved fooddrive requests... */}
      {tab === 'fapproved' && <ApprovedFooddrives />}

      {/* my declined fooddrive requests... */}
      {tab === 'fdeclined' && <DeclinedFooddrives />}

      {/* all oneday fooddrive requests... */}
      {tab === 'foneday' && <OnedayFooddrives />}

      {/* all longday fooddrive requests... */}
      {tab === 'flongday' && <LongdayFooddrives />}


    </div>
  );
}
