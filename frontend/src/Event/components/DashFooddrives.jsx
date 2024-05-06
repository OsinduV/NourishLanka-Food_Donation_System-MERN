//component in event organiser dashboard where event organiser see all the requests made by donors
import { Button, Modal, Select, Spinner, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashFooddrives() {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const [userFooddrives, setUserFooddrives] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [fooddriveIdToDelete, setFooddriveIdToDelete] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("");
  console.log(userFooddrives);
  useEffect(() => {
    const fetchFooddrives = async () => {
      try {
        setLoading(true);
        let apiUrl = `/api/fooddrive/getfooddrives`;

        // Append query parameters only if they exist
        const queryParams = [];

        if (selectedStatus) {
          queryParams.push(`status=${selectedStatus}`);
        }

        if (selectedType) {
          queryParams.push(`type=${selectedType}`);
        }

        if (selectedDate) {
          const selectedISODate = new Date(selectedDate)
            .toISOString()
            .split("T")[0];
          queryParams.push(`date=${selectedISODate}`);
        }

        // Construct the full URL with query parameters
        if (queryParams.length > 0) {
          apiUrl += `?${queryParams.join("&")}`;
        }

        const res = await fetch(apiUrl);
        const data = await res.json();
        if (res.ok) {
          // Sort data based on eventdate if selectedDate exists
          if (selectedDate) {
            data.fooddrives.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
          }
          setUserFooddrives(data.fooddrives);
          setLoading(false);
          if (data.fooddrives.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    if (currentUser.isAdmin) {
      fetchFooddrives();
    }
  }, [currentUser._id, selectedStatus, selectedDate, selectedType]);

  const handleShowMore = async () => {
    const startIndex = userFooddrives.length;
    try {
      const res = await fetch(
        `/api/fooddrive/getfooddrives?&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserFooddrives((prev) => [...prev, ...data.fooddrives]);
        if (data.fooddrives.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteFooddrive = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/fooddrive/deletefooddrive/${fooddriveIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserFooddrives((prev) =>
          prev.filter((fooddrive) => fooddrive._id !== fooddriveIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen ml-40">
        <Spinner size="xl" />
      </div>
    );

  const generateReport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "FooddriveID, Date Created,Event Title,Event Status,Requested donor email,Requested dono id\n";
    const rows = userFooddrives.map(
      (request) =>
        `${request.fooddriveId},${new Date(
          request.createdAt
        ).toLocaleDateString()},${request.eventtitle},${request.status},${
          request.donoremail
        },${request.dnid}`
    );
    const csvRows = rows.join("\n");
    const csv = csvContent + csvRows;
    const encodedUri = encodeURI(csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "fooddrive_request_report.csv");
    document.body.appendChild(link);
    link.click();
  };
  

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div className="flex items-center mb-10 justify-center mt-10 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold flex"> FoodDrive Request List</h2>
      </div>
      <div className="flex flex-row">
      <div className="flex space-x-12 font-semibold mr-10 items-center w-full">
        <div className="flex space-x-4 font-semibold mr-10 items-center">
          <Select
            className="w-full"
            onChange={(e) => setSelectedStatus(e.target.value)}
            value={selectedStatus}
          >
            <option value="">Sort by Status</option>
            <option value="approved">Approved</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="declined">Declined</option>
          </Select>
        </div>

        <div className="flex space-x-4 font-semibold mr-10 items-center">
          <Select
            className="w-full"
            onChange={(e) => setSelectedType(e.target.value)}
            value={selectedType}
          >
            <option value="">Sort by Event Type</option>
            <option value="onedaydrive">One Day Drive</option>
            <option value="longdrive">Long Drive</option>
          </Select>
        </div>
      </div>

      <Button
          type="button"
          gradientDuoTone="greenToBlue"
          onClick={generateReport}
        >
          Generate Report
        </Button>
        </div>
      {/*if the user is event orgniser and if the requests are more than 0 , then display the requests and if not just display a message no requests yet */}
      {currentUser.isAdmin && userFooddrives.length > 0 ? (
        <>
          <Table hoverable className="shadow-md mt-10">
            <Table.Head>
              <Table.HeadCell>Request created date</Table.HeadCell>
              <Table.HeadCell>Request ID</Table.HeadCell>
              <Table.HeadCell>Donor ID</Table.HeadCell>
              <Table.HeadCell>FoodDrive Type</Table.HeadCell>
              <Table.HeadCell>Event Details</Table.HeadCell>
              <Table.HeadCell>Current Status</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>

            {userFooddrives.map((fooddrive) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(fooddrive.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{fooddrive.fooddriveId}</Table.Cell>
                  <Table.Cell>{fooddrive.dnid}</Table.Cell>
                  <Table.Cell>{fooddrive.type}</Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/fooddrive/${fooddrive.slug}`}
                    >
                      <span>View more Details</span>
                    </Link>
                  </Table.Cell>

                  <Table.Cell>{fooddrive.status}</Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-fstatus/${fooddrive._id}`}
                    >
                      <span>Edit status</span>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setFooddriveIdToDelete(fooddrive._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no food drive requests yet!</p>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this request?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteFooddrive}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
