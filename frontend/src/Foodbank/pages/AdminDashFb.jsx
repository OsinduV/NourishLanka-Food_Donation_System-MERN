import React, { useState, useEffect } from 'react';
import { Table, Button, Card ,Progress } from 'flowbite-react';
import { EditFoodBankPopover } from '../components/editfoodbankadminpopover.jsx';

export default function AdminDashFb() {
    // retreiving the foodbank pending requests
    const [pendingFoodBanks, setPendingFoodBanks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPendingFoodBanks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/foodbank/pendingfb?status=pending');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPendingFoodBanks(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchPendingFoodBanks();
    }, []);

    // ReadAll FoodBanks and show
    const [allFoodBanks, setAllFoodBanks] = useState([]);
    const [errorAll, setErrorAll] = useState(null);

    useEffect(() => {
        const fetchAllFoodBanks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/foodbank/readallfb');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAllFoodBanks(data);
            } catch (error) {
                setErrorAll(error.message);
            }
        };

        fetchAllFoodBanks();
    }, []);

    //delete button
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/foodbank/deletefb/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete food bank');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.message);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error deleting food bank:', error);
                setErrorAll('Error deleting food bank');
            });
    };
    //approve
    const handleApprove = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/foodbank/statusapprove/${id}`, {
                method: 'PUT'
            });
            if (!response.ok) {
                throw new Error('Failed to approve food bank');
            }
            window.location.reload();
        } catch (error) {
            console.error('Error approving food bank:', error);
            setError(error.message);
        }
    };
    //reject
    const handleReject = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/foodbank/statusreject/${id}`, {
                method: 'PUT'
            });
            if (!response.ok) {
                throw new Error('Failed to reject food bank');
            }
            window.location.reload();
        } catch (error) {
            console.error('Error rejecting food bank:', error);
            setError(error.message);
        }
    };

    return (
        <div className='min-h-screen'>
            {error && <p>{error}</p>}
            <h1 className='ml-40 mt-2'>Pending FoodBank Approvals</h1>
            <Card className='ml-10 mr-10 mt-2 mb-2'>
                <div className='flex row mt-2 justify-center'>
                    <div className="overflow-x-auto h-60 w-4/5">
                        <Table>
                            <Table.Head className='sticky top-0 z-50 bg-white'>
                                <Table.HeadCell>Foodbank Name</Table.HeadCell>
                                <Table.HeadCell>FoodBank Details</Table.HeadCell>
                                <Table.HeadCell>Contact</Table.HeadCell>
                                <Table.HeadCell>Status</Table.HeadCell>
                                <Table.HeadCell>Approvals</Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                {pendingFoodBanks.map((foodBank, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell>{foodBank.foodbankname}</Table.Cell>
                                        <Table.Cell>
                                            <p>
                                                Space:- {foodBank.storagespace} sqft <br />
                                                Location:- {foodBank.address}, {foodBank.district}<br />
                                                OpenTime:- {foodBank.opentime} to {foodBank.closetime}<br />
                                                More:-{foodBank.description}
                                            </p>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <p>
                                                PhoneNo:-{foodBank.phoneno}<br />
                                                Email:-{foodBank.email}
                                            </p>
                                        </Table.Cell>
                                        <Table.Cell>{foodBank.status}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex flex-wrap gap-2">
                                                <Button.Group>
                                                    <Button outline gradientDuoTone="greenToBlue" onClick={() => handleApprove(foodBank._id)}>APPROVE</Button>
                                                    <Button outline gradientDuoTone="pinkToOrange" onClick={() => handleReject(foodBank._id)}>REJECT</Button>
                                                </Button.Group>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </Card>

            {errorAll && <p>{errorAll}</p>}
            <h1 className='ml-40 mt-6'>All Food Banks</h1>
            
            <Card className='ml-10 mr-10 mt-2 mb-2'>
                <div className='flex row mt-2 justify-center'>
                    <div className="overflow-x-auto w-4/5 h-4/7">
                        <Table>
                            <Table.Head className='sticky top-0 z-50 bg-white'>
                                <Table.HeadCell>Foodbank Name</Table.HeadCell>
                                <Table.HeadCell>RemainingSpace</Table.HeadCell>
                                <Table.HeadCell>FoodBank Details</Table.HeadCell>
                                <Table.HeadCell>Contact</Table.HeadCell>
                                <Table.HeadCell>Status</Table.HeadCell>
                                <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                {allFoodBanks.map((foodBank, index) => (
                                    <Table.Row key={index}>
                                        <Table.Cell>{foodBank.foodbankname}</Table.Cell>
                                        <Table.Cell><Progress className='w-40'
                                                progress={foodBank.currentspace}
                                                progressLabelPosition="inside"
                                                textLabelPosition="outside"
                                                size="lg"
                                                labelProgress
                                                />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <p>
                                                Space:- {foodBank.storagespace} sqft <br />
                                                Location:- {foodBank.address}, {foodBank.district}<br />
                                                OpenTime:- {foodBank.opentime} to {foodBank.closetime}<br />
                                                More:-{foodBank.description}
                                            </p>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <p>
                                                PhoneNo:-{foodBank.phoneno}<br />
                                                Email:-{foodBank.email}
                                            </p>
                                        </Table.Cell>
                                        <Table.Cell>{foodBank.status}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex flex-wrap gap-2">

                                                <EditFoodBankPopover foodBankId={foodBank._id} />
                                                <Button outline gradientDuoTone="pinkToOrange" onClick={() => handleDelete(foodBank._id)}>Delete</Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </Card>
        </div>
    );
}
