import React, { useEffect, useState } from 'react';
import { useInventorysContext } from '../hooks/useInventorysContext';
import endpoints from '../api/endpoints';

const InventoryDetails = ({ inventory }) => {
    const { dispatch } = useInventorysContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(inventory.title);
    const [editedQuantity, setEditedQuantity] = useState(inventory.quantity);
    const [editedlocation, setEditedlocation] = useState(inventory.location);
    const [editedDate, setEditedDate] = useState(new Date(inventory.expdate).toLocaleDateString());

    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`${endpoints.inventorys}/${inventory._id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                const deletedInventory = await response.json();
                dispatch({ type: 'DELETE_INVENTORY', payload: deletedInventory });
            } else {
                console.error('Error deleting inventory:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting inventory:', error);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedTitle(inventory.title);
        setEditedQuantity(inventory.quantity);
        setEditedlocation(inventory.location);
        setEditedDate(inventory.expdate);
    };

    const handleSaveEdit = async () => {
        const editedInventory = { ...inventory, title: editedTitle, quantity: editedQuantity, location: editedlocation,expdate:  editedDate};
        try {
            const response = await fetch(`${endpoints.inventorys}/${inventory._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedInventory)
            });
            if (response.ok) {
                const updatedInventory = await response.json();
                dispatch({ type: 'UPDATE_INVENTORY', payload: updatedInventory });
                setIsEditing(false);
            } else {
                console.error('Error updating inventory:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating inventory:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                setEditedTitle(value);
                break;
            case 'quantity':
                setEditedQuantity(value);
                break;
            case 'location':
                setEditedlocation(value);
                break;
                case 'expdate':
                    setEditedDate(value);
                    break;
            default:
                break;
        }
    };

    return (
        <div className="workout-details">
            {isEditing ? (
                <>
                    <input type="text" name="title" value={editedTitle} onChange={handleChange} />
                    <input type="text" name="quantity" value={editedQuantity} onChange={handleChange} />
                    <input type="text" name="location" value={editedlocation} onChange={handleChange} />
                    <input type="date" name="expdate" value={editedDate} onChange={handleChange} />
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{inventory.title}</h4>

                    <p><strong>Quantity :</strong> {inventory.quantity}</p>
                    <p><strong>Location :</strong> {inventory.location}</p>
                    <p><strong>Exp.Date :</strong> {inventory.expdate.split("T")[0]}</p>

                    <button onClick={handleDeleteClick}>Delete</button>
                    <button onClick={handleEditClick}>Edit</button>
                </>
            )}
        </div>
    );
};

export default InventoryDetails;