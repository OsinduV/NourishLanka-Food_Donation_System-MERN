import React, { useEffect, useState } from "react";
import { useInventorysContext } from "../hooks/useInventorysContext";
import endpoints from "../api/endpoints";
import { Button } from "flowbite-react";

const InventoryDetails = ({ inventory }) => {
  const { dispatch } = useInventorysContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(inventory.title);
  const [editedQuantity, setEditedQuantity] = useState(inventory.quantity);
  const [editedLocation, setEditedLocation] = useState(inventory.location);
  const [editedDate, setEditedDate] = useState(
    new Date(inventory.expdate).toLocaleDateString()
  );

  // Array of district names in Sri Lanka
  const districts = ['Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya','Galle','Matara','Hambantota','Jaffna','Kilinochchi','Mannar','Vavuniya','Mullaitivu','Batticaloa','Ampara','Trincomalee','Kurunegala','Puttalam','Anuradhapura','Polonnaruwa','Badulla','Monaragala','Ratnapura','Kegalle'];

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`${endpoints.inventorys}/${inventory._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const deletedInventory = await response.json();
        dispatch({ type: "DELETE_INVENTORY", payload: deletedInventory });
      } else {
        console.error("Error deleting inventory:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting inventory:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(inventory.title);
    setEditedQuantity(inventory.quantity);
    setEditedLocation(inventory.location);
    setEditedDate(inventory.expdate);
  };

  const handleSaveEdit = async () => {
    const editedInventory = {
      ...inventory,
      title: editedTitle,
      quantity: editedQuantity,
      location: editedLocation,
      expdate: editedDate,
    };
    try {
      const response = await fetch(`${endpoints.inventorys}/${inventory._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedInventory),
      });
      if (response.ok) {
        const updatedInventory = await response.json();
        dispatch({ type: "UPDATE_INVENTORY", payload: updatedInventory });
        setIsEditing(false);
      } else {
        console.error("Error updating inventory:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setEditedTitle(value);
        break;
      case "quantity":
        setEditedQuantity(value);
        break;
      case "location":
        setEditedLocation(value);
        break;
      case "expdate":
        setEditedDate(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="workout-details bg-gray-200 dark:text-black">
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={editedTitle}
            onChange={handleChange}
          />
          <input
            type="text"
            name="quantity"
            value={editedQuantity}
            onChange={handleChange}
          />
          <select name="location" onChange={handleChange} value={editedLocation}>
            <option value="">Select District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>{district}</option>
            ))}
          </select>
          <input
            type="date"
            name="expdate"
            value={editedDate}
            onChange={handleChange}
          />
          <div className="flex gap-6">
            <Button
              className="sort-buttons"
              onClick={handleSaveEdit}
              gradientMonochrome="success"
            >
              Save
            </Button>
            <Button
              className="sort-buttons"
              onClick={handleCancelEdit}
              gradientMonochrome="success"
            >
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <h4>{inventory.title}</h4>

          <p>
            <strong>Quantity (KG):</strong> {inventory.quantity}
          </p>
          <p>
            <strong>Location :</strong> {inventory.location}
          </p>
          <p>
            <strong>Exp.Date :</strong> {inventory.expdate.split("T")[0]}
          </p>
          <div className="flex gap-6">
            <Button onClick={handleDeleteClick} gradientMonochrome="success">
              Delete
            </Button>
            {/* <button onClick={handleEditClick}>Edit</button> */}
            <Button onClick={handleEditClick} gradientMonochrome="success">
              Edit
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default InventoryDetails;
