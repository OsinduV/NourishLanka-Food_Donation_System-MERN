import React from "react";

import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import PostCard from "../components/PostCard";

export default function FrpSearch() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    // category: 'uncategorized',
  });

  console.log(sidebarData);
  const [frps, setFrps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    // const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        // category: categoryFromUrl,
      });
    }

    const fetchFrps = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      //   const res = await fetch(`/api/post/getposts?${searchQuery}`);
      const res = await fetch(`/api/frp/getfrps?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setFrps(data.frps);
        setLoading(false);
        if (data.frps.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchFrps();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    // if (e.target.id === 'category') {
    //   const category = e.target.value || 'uncategorized';
    //   setSidebarData({ ...sidebarData, category });
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    // urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    // navigate(`/search?${searchQuery}`);
    navigate(`/frp-search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfFrps = frps.length;
    const startIndex = numberOfFrps;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    //   const res = await fetch(`/api/post/getposts?${searchQuery}`);
    const res = await fetch(`/api/frp/getfrps?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setFrps([...frps, ...data.frps]);
      if (data.frps.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex   items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          {/* <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
            >
              <option value='uncategorized'>Uncategorized</option>
              <option value='reactjs'>React.js</option>
              <option value='nextjs'>Next.js</option>
              <option value='javascript'>JavaScript</option>
            </Select>
          </div> */}
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">
          Fundraising Pages :
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && frps.length === 0 && (
            <p className="text-xl text-gray-500">No Fundraising pages found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            frps &&
            frps.map((frp) => (
              <div className="group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all">
                <Link to={`/fr-page/${frp._id}`}>
                  <div className="relative">
                    <img
                      src={frp.bannerImage}
                      alt="post cover"
                      className="h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div> {/* Dark overlay */}
                    <div className="absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 self-center cursor-pointer shadow-md rounded-full">
                      <img
                        src={frp.pageImage}
                        alt="PagePhoto"
                        className="rounded-full w-full h-full object-cover border-4 border-[lightgray] "
                      />
                    </div>
                  </div>
                </Link>
                <div className="p-3 flex flex-col gap-2">
                  <p className="text-xl font-semibold line-clamp-2">
                    {frp.displayName}
                  </p>
                  <span className="italic text-sm">Goal : Rs.{frp.goal}</span>
                  <span className="italic text-sm">
                    Date updated :{" "}
                    {new Date(frp.updatedAt).toLocaleDateString()}
                  </span>
                  <Link
                    to={`/fr-page/${frp._id}`}
                    className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
                  >
                    View Fundraising Page
                  </Link>
                </div>
              </div>
            ))}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
