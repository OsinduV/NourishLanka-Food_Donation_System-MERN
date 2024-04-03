import React, { useState } from 'react';
import { useInventorysContext } from '../hooks/useInventorysContext';

const InventoryDetails = ({ inventory }) => {
    const { dispatch } = useInventorysContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(inventory.title);
    const [editedDesc1, setEditedDesc1] = useState(inventory.desc1);
    const [editedDesc2, setEditedDesc2] = useState(inventory.desc2);
    const [editedDate, setEditedDate] = useState(inventory.expdate);

    const handleDeleteClick = async () => {
        try {
            const response = await fetch(`/api/inventorys/${inventory._id}`, {
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
        setEditedDesc1(inventory.desc1);
        setEditedDesc2(inventory.desc2);
        setEditedDate(inventory.expdate);
    };

    const handleSaveEdit = async () => {
        const editedInventory = { ...inventory, title: editedTitle, desc1: editedDesc1, desc2: editedDesc2,expdate:  editedDate};
        try {
            const response = await fetch(`/api/inventorys/${inventory._id}`, {
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
            case 'desc1':
                setEditedDesc1(value);
                break;
            case 'desc2':
                setEditedDesc2(value);
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
                    <input className='inputTh' type="text" name="title" value={editedTitle} onChange={handleChange} />
                    <input className='inputTh' type="text" name="desc1" value={editedDesc1} onChange={handleChange} />
                    <input className='inputTh' type="text" name="desc2" value={editedDesc2} onChange={handleChange} />
                    <input className='inputTh' type="text" name="expdate" value={editedDate} onChange={handleChange} />
                    <button className='buttonTh' onClick={handleSaveEdit}>Save</button>
                    <button className='buttonTh' onClick={handleCancelEdit}>Cancel</button>
                </>
            ) : (
                <>
                    <h4 className='h4Th'>{inventory.title}</h4>
                    <p className='pTh'><strong>Quantity :</strong> {inventory.desc1}</p>
                    <p className='pTh'><strong>Location :</strong> {inventory.desc2}</p>
                    <p className='pTh'><strong>Exp.Date :</strong> {inventory.expdate}</p>
                    <button className='buttonTh' onClick={handleDeleteClick}>Delete</button>
                    <button className='buttonTh' onClick={handleEditClick}>Edit</button>
                </>
            )}
        </div>
    );
};

export default InventoryDetails;
