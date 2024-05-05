import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { set } from "mongoose";
import Badge from "./Badge";
import { FaHandHoldingHeart, FaPager, FaUsers } from "react-icons/fa";
import { RiRefund2Fill } from "react-icons/ri";

export default function DashAdminDonations() {
  const { currentUser } = useSelector((state) => state.user);
  //   const [userPosts, setUserPosts] = useState([]);
  const [result, setResult] = useState([]);
  const [donations, setDonations] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [donationIdToDelete, setDonationIdToDelete] = useState("");
  const [donationCount, setDonationCount] = useState("");
  const [totalDonationAmount, setTotalDonationAmount] = useState("");


  useEffect(() => {
    const fetchDonations = async () => {
      try {
        // const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);

        const res = await fetch(`/api/frpdonation/getfrpdonations`);

        const data = await res.json();
        if (res.ok) {
          setResult(data);
          setDonations(data.frpDonations);
          setDonationCount(data.GotTotalFrpDonations);
          setTotalDonationAmount(data.totalFrpDonationsAmount);
          if (data.frpDonations.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchDonations();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = donations.length;
    try {
      const res = await fetch(
        `/api/frpdonation/getfrpdonations?&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setDonations((prev) => [...prev, ...data.frpDonations]);
        if (data.frpDonations.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteDonation = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/frpdonation/deletefrp/${donationIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setDonations((prev) =>
          prev.filter((donation) => donation._id !== donationIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {result && (
        <div className="mx-auto flex flex-col gap-5 justify-center sm:flex-row">
          <Badge
            icon={<RiRefund2Fill />}
            endCountNum={totalDonationAmount}
            startCountText="Rs."
            badgeText="total Donation Amount"
            containerStyles="min-w-64 pr-4"
          />
          <Badge
            icon={<FaHandHoldingHeart />}
            endCountNum={donationCount}
            startCountText=""
            badgeText="Donations"
            containerStyles="w-64"
          />
        </div>
      )}
      <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {donations.length > 0 ? (
          <>
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Doner Img</Table.HeadCell>
                <Table.HeadCell>Doner Name</Table.HeadCell>
                <Table.HeadCell>Frp Img</Table.HeadCell>
                <Table.HeadCell>Fundraising Page</Table.HeadCell>
                <Table.HeadCell>Amount</Table.HeadCell>
                {currentUser.isAdmin && <Table.HeadCell>Delete</Table.HeadCell>}
              </Table.Head>
              {donations.map((donation) => (
                <Table.Body className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(donation.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/`}>
                        <img
                          src={donation.userId.profilePicture}
                          alt="FrpProfPic"
                          className="w-10 h-10 object-cover bg-gray-500 rounded"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-gray-900 dark:text-white"
                        to={`/`}
                      >
                        {donation.userId.username}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/`}>
                        <img
                          src={donation.frpId.pageImage}
                          alt="FrpProfPic"
                          className="w-20 h-10 object-cover bg-gray-500 rounded"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-gray-900 dark:text-white"
                        to={`/`}
                      >
                        {donation.frpId.displayName}
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="font-medium text-gray-900 dark:text-white">
                      Rs.{donation.amount}
                    </Table.Cell>
                    {currentUser.isAdmin && (
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setDonationIdToDelete(donation._id);
                          }}
                          className="font-medium text-red-500 hover:underline cursor-pointer"
                        >
                          Delete
                        </span>
                      </Table.Cell>
                    )}
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
          <p>You have no posts yet!</p>
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
                Are you sure you want to delete this post?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteDonation}>
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
    </div>
  );
}
