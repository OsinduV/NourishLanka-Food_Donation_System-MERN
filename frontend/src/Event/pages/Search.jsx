import { Button, Select, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';

export default function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        status: 'nostatus',
        category: 'uncategorized',
      });
    console.log(sidebarData);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const statusFromUrl = urlParams.get('status');
        const categoryFromUrl = urlParams.get('category');
        if (searchTermFromUrl || sortFromUrl || statusFromUrl || categoryFromUrl) {
          setSidebarData({
            ...sidebarData,
            searchTerm: searchTermFromUrl,
            sort: sortFromUrl,
            status: statusFromUrl,
            category: categoryFromUrl,
          });
        }

        const fetchEvents = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/event/getevents?${searchQuery}`);
            if (!res.ok) {
              setLoading(false);
              return;
            }
            if (res.ok) {
              const data = await res.json();
              setEvents(data.events);
              setLoading(false);
              if (data.events.length === 9) {
                setShowMore(true);
              } else {
                setShowMore(false);
              }
            }
          };
          fetchEvents();
    }, [location.search]);

    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
          setSidebarData({ ...sidebarData, searchTerm: e.target.value });
        }
        if (e.target.id === 'sort') {
          const order = e.target.value || 'desc';
          setSidebarData({ ...sidebarData, sort: order });
        }
        if (e.target.id === 'status') {
          const status = e.target.value || 'nostatus'; 
          setSidebarData({ ...sidebarData, status }); 
        }
        if (e.target.id === 'category') {
          const category = e.target.value || 'uncategorized';
          setSidebarData({ ...sidebarData, category });
        }
        };

      const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('status', sidebarData.status);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
      };

      const handleShowMore = async () => {
        const numberOfEvents = events.length;
        const startIndex = numberOfEvents;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/event/getevents?${searchQuery}`);
        if (!res.ok) {
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setEvents([...events, ...data.events]);
          if (data.events.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      };

  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b md:border-r md:min-h-screen border-teal-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>

        <div className='flex   items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <TextInput
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
        </div>


        {/* <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <Select
              onChange={handleChange} 
              value={sidebarData.sort} 
              id='sort'>
                <option value='desc'>Latest</option>
                <option value='asc'>Oldest</option>
            </Select>
          </div> */}

          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Status:</label>
            <Select
              onChange={handleChange} 
              value={sidebarData.status} 
              id='status'>
                 <option value='nostatus'>Event status</option>
                 <option value='approved'>Approved</option>
                 <option value='processing'>Processing</option>
                 <option value='ongoing'>Ongoing</option>
                 <option value='completed'>Completed</option>
            </Select>
          </div>

          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
            >
              <option value='uncategorized'>Uncategorized</option>
              <option value='DonationEvent'>Donation event</option>
              <option value='FoodDrive'>Food drive</option>
            </Select>
          </div>
          <Button type='submit' outline gradientDuoTone='greenToBlue'>
            Apply Filter
          </Button>
        </form>
        </div>
        <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-teal-500 p-3 mt-5 '>Event Results :</h1>
            <div className='p-7 gap-4'>
                {!loading && events.length === 0 && (
                <p className='text-xl text-gray-500'>No posts found.</p>
                )}
                 {loading && <p className='text-xl text-gray-500'>Loading...</p>}
                 {!loading && events &&
                    events.map((event) => <EventCard key={event._id} event={event} />)}

                {showMore && (
                     <button 
                        onClick={handleShowMore}
                        className='text-teal-500 text-lg hover:underline p-7 w-full'>
                        Show More
                    </button>
          )}
            </div>
        </div>
    </div>
  )
}
