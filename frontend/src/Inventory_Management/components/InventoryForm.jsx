import React, { useState } from 'react';
import { useInventorysContext } from '../hooks/useInventorysContext';
import endpoints from '../api/endpoints';

const InventoryForm = () => {
    const { dispatch } = useInventorysContext();
    const [title, setTitle] = useState('');
    const [quantity, setQuantity] = useState('');
    const [location, setlocation] = useState('');
    const [expdate, setExpDate] = useState('');

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
                    setlocation('');
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
        <form className="workout-details bg-gray-200 dark:text-black" onSubmit={handleSubmit}>
            <h3>Add an Inventory</h3>
            <label>Inventory Title</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} required />
            <label>Quantity</label>
            <input type="text" pattern="[0-9]*" onChange={(e) => setQuantity(e.target.value)} value={quantity} required />
            <label>Location</label>
            <input type="text" onChange={(e) => setlocation(e.target.value)} value={location} required />
            <label>Exp.Date</label>
            <input type="date" onChange={(e) => setExpDate(e.target.value)} value={expdate} required />
            <button type="submit">Add Detail</button>
        </form>
    );
};

export default InventoryForm;
