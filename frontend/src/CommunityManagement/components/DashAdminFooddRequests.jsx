import React, { useEffect, useState } from "react";
import { Table, Button, Select } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashAdminFoodRequests() {
  const { currentUser } = useSelector((state) => state.user);
  const [userFoodRequests, setFoodRequests] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDistrict, setSortDistrict] = useState("");
  const [sortCategory, setSortCategory] = useState("");
  const [sortStatus, setSortStatus] = useState("");

  useEffect(() => {
    const fetchFoodRequests = async () => {
      try {
        const res = await fetch("/api/foodrequest/getfoodrequests");
        const data = await res.json();
        if (res.ok) {
          setFoodRequests(data.foodrequests);
          if (data.foodrequests.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchFoodRequests();
    }
  }, [currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = userFoodRequests.length;
    try {
      const res = await fetch(
        `/api/foodrequest/getfoodrequests?&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setFoodRequests((prev) => [...prev, ...data.foodrequests]);
        if (data.foodrequests.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = () => {
    const filteredRequests = userFoodRequests.filter(
      (request) =>
        request.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFoodRequests(filteredRequests);
  };

  const handleSort = () => {
    let sortedRequests = [...userFoodRequests];
    if (sortDistrict !== "") {
      sortedRequests = sortedRequests.filter(
        (request) => request.district === sortDistrict
      );
    }
    if (sortCategory !== "") {
      sortedRequests = sortedRequests.filter(
        (request) => request.category === sortCategory
      );
    }
    if (sortStatus !== "") {
      sortedRequests = sortedRequests.filter(
        (request) => request.status === sortStatus
      );
    }
    setFoodRequests(sortedRequests);
  };

  const generateReport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Food Request ID,Date Updated,District,Recipient Name,Category,Position,Contact Number,Email,Address,Zip Code,Population Of Orphange,Population of ElderlyHome,Population Of School,Income Level,House Hold Size,Number of Children,Number of Males,Number of Femalse,Status\n";
    const rows = userFoodRequests.map(
      (request) =>
        `${request.foodrequestId},${new Date(
          request.updatedAt
        ).toLocaleDateString()},${request.district},${request.recipientname},${
          request.category
        },${request.position},${request.contactnumber},${request.email},${
          request.address
        },${request.zipcode},${request.porphange},${request.pelders},${
          request.pschool
        },${request.incomeLevel},${request.householdSize},${
          request.nochildren
        },${request.nomales},${request.nofemales}${request.status}`
    );
    const csvRows = rows.join("\n");
    const csv = csvContent + csvRows;
    const encodedUri = encodeURI(csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "food_request_report.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userFoodRequests.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-4 mt-4">
            <h2 className="text-2xl font-bold mr-4">
              All Recipients' Food Requests
            </h2>
            <Button
              type="button"
              gradientDuoTone="greenToBlue"
              onClick={generateReport}
              className="ml-auto"
            >
              Generate Report
            </Button>
          </div>

          <div className="flex items-center mb-4 mt-4">
            <div className="flex items-center space-x-4">
              <Select
                value={sortDistrict}
                onChange={(e) => setSortDistrict(e.target.value)}
                
              >
                <option value="">Sort by District</option>
                <option value="Colombo">Colombo</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Kandy">Kandy</option>
                <option value="Matale">Matale</option>
                <option value="Nuwara Eliya">Nuwara Eliya</option>
                <option value="Galle">Galle</option>
                <option value="Matara">Matara</option>
                <option value="Hambantota">Hambantota</option>
                <option value="Jaffna">Jaffna</option>
                <option value="Kilinochchi">Kilinochchi</option>
                <option value="Mannar">Mannar</option>
                <option value="Vavuniya">Vavuniya</option>
                <option value="Mullaitivu">Mullaitivu</option>
                <option value="Batticaloa">Batticaloa</option>
                <option value="Ampara">Ampara</option>
                <option value="Trincomalee">Trincomalee</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Puttalam">Puttalam</option>
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Polonnaruwa">Polonnaruwa</option>
                <option value="Badulla">Badulla</option>
                <option value="Monaragala">Monaragala</option>
                <option value="Ratnapura">Ratnapura</option>
                <option value="Kegalle">Kegalle</option>
                {/* Add district options here */}
              </Select>
              <Select
                value={sortCategory}
                onChange={(e) => setSortCategory(e.target.value)}
                
              >
                <option value="">Sort by Category</option>
                <option value="uncategorized">Select a Category</option>
                <option value="Low-Income Families">Low-Income Families</option>
                <option value="Orphanages">Orphanages</option>
                <option value="Elderly Care Homes">Elderly care Homes</option>
                <option value="Schools">Schools</option>

                {/* Add category options here */}
              </Select>
              <Select
                value={sortStatus}
                onChange={(e) => setSortStatus(e.target.value)}
                
              >
                <option value="">Sort by Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Declined">Declined</option>
                <option value="Published">Published</option>

                {/* Add status options here */}
              </Select>
              <Button
                type="button"
                gradientDuoTone="greenToBlue"
                onClick={handleSort}
              >
                Sort
              </Button>
            </div>
          </div>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Food Request ID</Table.HeadCell>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>District</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Details</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {userFoodRequests.map((foodrequest) => (
                <Table.Row
                  key={foodrequest._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{foodrequest.foodrequestID}</Table.Cell>
                  <Table.Cell>
                    {new Date(foodrequest.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{foodrequest.district}</Table.Cell>
                  <Table.Cell>{foodrequest.category}</Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-foodrequest/${foodrequest._id}`}
                    >
                      Edit Status
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{foodrequest.status}</Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/foodrequest/${foodrequest.slug}`}
                    >
                      View Details
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more Food Requests
            </button>
          )}
        </>
      ) : (
        <p>Currently there are no food requests!</p>
      )}
    </div>
  );
}
