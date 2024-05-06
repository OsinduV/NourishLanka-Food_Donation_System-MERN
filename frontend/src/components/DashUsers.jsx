import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Table, TableHead } from 'flowbite-react';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showAdminsOnly, setShowAdminsOnly] = useState(false); 

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/getusers`)
                const data = await res.json();

                if (res.ok) {
                    setUsers(data.users);
                    setShowMore(data.users.length >= 9); // Hide the button if less than 9 users are fetched initially
                }

            } catch (error) {
                console.log(error.message)
            }
        };

        if (currentUser.isAdmin) {
            fetchUsers();
        }
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = users.length;

        try {
            const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
            const data = await res.json();

            if (res.ok) {
                setUsers((prev) => [...prev, ...data.users]);
                setShowMore(data.users.length >= 9); // Hide the button if less than 9 users are fetched in the subsequent call
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCheckboxChange = () => {
        setShowAdminsOnly(!showAdminsOnly);
    };

    const filteredUsers = users.filter(user =>
        (user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!showAdminsOnly || user.isAdmin)
    );

    const generateReport = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Username,Email,Admin\n";

        const rows = filteredUsers.map(user =>
            `${user.username},${user.email},${user.isAdmin ? "Yes" : "No"}`
        );

        const csvRows = rows.join("\n");

        const csv = csvContent + csvRows;

        const encodedUri = encodeURI(csv);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "user_report.csv");
        document.body.appendChild(link);
        link.click();
    };

    const deleteUser = async (userId) => {
        try {
            const res = await fetch(`/api/user/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (res.ok) {
                setUsers(users.filter(user => user._id !== userId));
                setShowModal(false);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
        dark: scrollbar-track-slate-700 dark: scrollbar-thumb-slate-500">
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search by username or email"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {currentUser.isAdmin && users.length > 0 && (
                    <>
                        <button onClick={generateReport} className="w-32 text-teal-500 text-sm py-2 px-4 border border-teal-500 rounded-md hover:bg-teal-500 hover:text-white">
                            Generate Report
                        </button>
                    </>
                )}
            </div>

            <div className="mb-4">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={showAdminsOnly}
                        onChange={handleCheckboxChange}
                        className="form-checkbox h-5 w-5 text-teal-500"
                    />
                    <span className="ml-2 text-gray-700">Show Admins Only</span>
                </label>
            </div>

            {currentUser.isAdmin && users.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">
                        <TableHead>
                            <Table.HeadCell>Date Created</Table.HeadCell>
                            <Table.HeadCell>User Image</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Admin</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                        </TableHead>

                        {filteredUsers.map((user) => (
                            <Table.Body className="divide-y" key={user._id}>
                                <Table.Row>
                                    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>

                                    <Table.Cell>
                                        <img src={user.profilePicture}
                                            alt={user.username}
                                            className="w-10 h-10 object-cover bg-gray-500 rounded-full" />
                                    </Table.Cell>

                                    <Table.Cell>{user.username}</Table.Cell>

                                    <Table.Cell>{user.email}</Table.Cell>

                                    <Table.Cell>{user.isAdmin ? (<FaCheck className='text-green-500' />) : (<FaTimes className='text-red-500' />)}</Table.Cell>

                                    <Table.Cell>
                                        <span
                                            onClick={() => {
                                                setShowModal(true);
                                                setUserIdToDelete(user._id);
                                            }}
                                            className="font-medium text-red-500 hover:underline cursor-pointer">Delete</span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        {/* Add edit button here */}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}

                    </Table>
                    {showMore && (
                        <span className="mt-4 block">
                            <button onClick={handleShowMore} className="w-32 text-teal-500 text-sm py-2 px-4 border border-teal-500 rounded-md hover:bg-teal-500 hover:text-white">
                                Show More
                            </button>
                        </span>
                    )}
                </>
            ) : (
                    <p>You have no users yet!</p>
                )}
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Delete User
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete this user?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={() => deleteUser(userIdToDelete)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Delete
                                </button>
                                <button onClick={() => setShowModal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>          
            )}
        </div>
    );
}
