import React, { useState } from 'react';
import { useInventorysContext } from '../hooks/useInventorysContext';

const InventoryForm = () => {
    const { dispatch } = useInventorysContext();
    const [title, setTitle] = useState('');
    const [desc1, setDesc1] = useState('');
    const [desc2, setDesc2] = useState('');
    const [expdate, setExpDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const inventory = { title, desc1, desc2, expdate };

        try {
            const response = await fetch('/api/inventorys', {
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
    };

    return (
        <form className="workout-details" onSubmit={handleSubmit}>
            <h3>Add an Inventory</h3>
            <label>Inventory Title</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} required />
            <label>Quantity</label>
            <input type="text" onChange={(e) => setDesc1(e.target.value)} value={desc1} required />
            <label>Location</label>
            <input type="text" onChange={(e) => setDesc2(e.target.value)} value={desc2} required />
            <label>Exp.Date</label>
            <input type="text" onChange={(e) => setExpDate(e.target.value)} value={expdate} required />
            <button type="submit">Add Detail</button>
        </form>
    );
};

export default InventoryForm;
