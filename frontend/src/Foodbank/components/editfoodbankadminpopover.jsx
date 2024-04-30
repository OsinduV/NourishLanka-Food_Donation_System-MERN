import React, { useState, useEffect } from "react";
import { BiCaretDown } from "react-icons/bi";
import { Button, Popover, Label, TextInput } from "flowbite-react";

export function EditFoodBankPopover({ foodBankId, onSave, onCancel }) {
  const [open, setOpen] = useState(false);
  const [foodBankData, setFoodBankData] = useState(null);

  useEffect(() => {
    if (open && foodBankId) {
      fetch(`http://localhost:3500/api/foodbank/readfb/${foodBankId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch food bank data");
          }
          return response.json();
        })
        .then((data) => {
          setFoodBankData(data);
        })
        .catch((error) => {
          console.error("Error fetching food bank data:", error);
        });
    }
  }, [open, foodBankId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodBankData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    fetch(`http://localhost:3500/api/foodbank/updatefb/${foodBankId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodBankData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update food bank");
        }
        return response.json();
      })
      .then((data) => {
        onSave(data, foodBankId);
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error updating food bank:", error);
      });
      window.location.reload();
  };

  return (
    
    <Popover
      aria-labelledby="edit-food-bank-popover"
      open={open}
      onOpenChange={setOpen}
      position="top"
      content={
        <div className="flex flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400 w-60">
          <h2 id="edit-food-bank-popover" className="text-base text-gray-500">
            Edit Food Bank
          </h2>
          {foodBankData && (
            <>
              <div>
                <Label htmlFor="foodbankname" value="Food Bank Name" />
                <TextInput
                  id="foodbankname"
                  name="foodbankname"
                  value={foodBankData.foodbankname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="address" value="Address" />
                <TextInput
                  id="address"
                  name="address"
                  value={foodBankData.address}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="storagespace" value="Storagespace" />
                <TextInput
                  id="storagespace"
                  name="storagespace"
                  value={foodBankData.storagespace}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="currentspace" value="Currentspace" />
                <TextInput
                  id="currentspace"
                  name="currentspace"
                  value={foodBankData.currentspace}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="opentime" value="Open Time" />
                <TextInput
                  id="opentime"
                  name="opentime"
                  value={foodBankData.opentime}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="closetime" value="Close Time" />
                <TextInput
                  id="closetime"
                  name="closetime"
                  value={foodBankData.closetime}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="phoneno" value="Phone Number" />
                <TextInput
                  id="phoneno"
                  name="phoneno"
                  value={foodBankData.phoneno}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  name="email"
                  value={foodBankData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="status" value="status" />
                <TextInput
                  id="status"
                  name="status"
                  value={foodBankData.status}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="flex justify-center">
          <Button outline gradientDuoTone="greenToBlue" onClick={handleSave}>Save</Button>
          </div>
        </div>
      }
    >
      <Button onClick={() => setOpen(!open)}>
        Edit <BiCaretDown className="ml-2" />
      </Button>
    </Popover>
  );
}
