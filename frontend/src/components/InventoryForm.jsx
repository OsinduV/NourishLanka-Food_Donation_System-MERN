import React, { useState } from 'react';
import { useInventorysContext } from '../hooks/useInventorysContext';
import endpoints from '../api/endpoints';

const InventoryForm = () => {
    const { dispatch } = useInventorysContext();
    const [title, setTitle] = useState('');
    const [desc1, setDesc1] = useState('');
    const [desc2, setDesc2] = useState('');
    const [expdate, setExpDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if desc1 is a valid number
        if (!isNaN(desc1)) {
            const inventory = { title, desc1: Number(desc1), desc2, expdate };

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
                    setDesc1('');
                    setDesc2('');
                    setExpDate('');
                } else {
                    console.error('Error adding inventory:', response.statusText);
                }
            } catch (error) {
                console.error('Error adding inventory:', error);
            }
        } else {
            // Display error message for invalid desc1
            console.error('Invalid desc1. Please enter a number.');
        }
    };

    return (
        <form className="workout-details" onSubmit={handleSubmit}>
            <h3>Add an Inventory</h3>
            <label>Inventory Title</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} required />
            <label>Quantity</label>
            <input type="text" pattern="[0-9]*" onChange={(e) => setDesc1(e.target.value)} value={desc1} required />
            <label>Location</label>
            <input type="text" onChange={(e) => setDesc2(e.target.value)} value={desc2} required />
            <label>Exp.Date</label>
            <input type="date" onChange={(e) => setExpDate(e.target.value)} value={expdate} required />
            <button type="submit">Add Detail</button>
        </form>
    );
};

export default InventoryForm;
