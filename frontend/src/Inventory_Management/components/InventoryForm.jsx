import React, { useState } from 'react';
import { useInventorysContext } from '../hooks/useInventorysContext';
import endpoints from '../api/endpoints';

const InventoryForm = () => {
    const { dispatch } = useInventorysContext();
    const [title, setTitle] = useState('');
    const [quantity, setQuantity] = useState('');
    const [location, setLocation] = useState('');
    const [expdate, setExpDate] = useState('');

    // Array of district names in Sri Lanka
    const districts = ['Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya','Galle','Matara','Hambantota','Jaffna','Kilinochchi','Mannar','Vavuniya','Mullaitivu','Batticaloa','Ampara','Trincomalee','Kurunegala','Puttalam','Anuradhapura','Polonnaruwa','Badulla','Monaragala','Ratnapura','Kegalle'];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if quantity is a valid number
        if (!isNaN(quantity)) {
            const inventory = { title, quantity: Number(quantity), location, expdate };

            try {
                const response = await fetch(endpoints.inventorys, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(inventory)
                });

                if (response.ok) {
                    const newInventory = await response.json();
                    dispatch({ type: 'CREATE_INVENTORY', payload: newInventory });
                    setTitle('');
                    setQuantity('');
                    setLocation('');
                    setExpDate('');
                } else {
                    console.error('Error adding inventory:', response.statusText);
                }
            } catch (error) {
                console.error('Error adding inventory:', error);
            }
        } else {
            // Display error message for invalid quantity
            console.error('Invalid quantity. Please enter a number.');
        }
    };

    return (
        <form className="workout-details bg-gray-200 dark:text-black flex flex-col gap-5" onSubmit={handleSubmit}>
            <h3 className='font-bold text-lg'>Add an Inventory</h3>
            <div>
                <label>Inventory Title</label>
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} required />
            </div>
            <div>
                <label>Quantity (KG)</label>
                <input type="text" pattern="[0-9]*" onChange={(e) => setQuantity(e.target.value)} value={quantity} required />
            </div>
            <div>
                <label>Location</label>
                <select onChange={(e) => setLocation(e.target.value)} value={location} required>
                    <option value="">Select District</option>
                    {districts.map((district, index) => (
                        <option key={index} value={district}>{district}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Exp.Date</label>
                <input type="date" onChange={(e) => setExpDate(e.target.value)} value={expdate} required />
            </div>
            <button type="submit">Add Detail</button>
        </form>
    );
};

export default InventoryForm;
