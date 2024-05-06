import React, { useEffect } from "react";
import { useInventorysContext } from "../hooks/useInventorysContext";

// Components
import InventoryDetails from "../components/InventoryDetails";
import InventoryShow from "../components/InventoryShow";
import InventoryForm from "../components/InventoryForm";
import endpoints from "../api/endpoints";
import Navbar from "../components/Navbar";
import "../inventory.css";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import FoodBankDashboard from './../../Foodbank/pages/foodbankDash';


const InventoryHome = () => {
  const { inventorys, api_message, dispatch } = useInventorysContext();

  const fetchInventorys = async () => {
    try {
      const response = await fetch(endpoints.inventorys);
      if (response.ok) {
        const inventoryData = await response.json();
        dispatch({ type: "SET_INVENTORYS", payload: inventoryData });
      } else {
        console.error("Error fetching inventory data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    fetchInventorys();
  }, [dispatch]);

  useEffect(() => {
    if (!api_message) return;
    if (api_message[0] !== "fetch_home") return;

    fetchInventorys();
  }, [api_message]);

  return (
    <div>
      <Link to='/foodbankDash'>
                    <Button outline gradientDuoTone="greenToBlue" className="mt-5 ml-96">
                        FoodBankDashboard
                    </Button>
                </Link>
      
      <div className="pages">
        <div className="home">
          <>
            <div className="workouts">
              {inventorys &&
                inventorys.map((inventory) => (
                  <InventoryShow key={inventory._id} inventory={inventory} />
                ))}
              {api_message && api_message[0] === "empty_search" && (
                <div className="no-search-result-message">
                  No items found for given search entry!
                </div>
              )}
            </div>
            
          </>
        </div>
      </div>
    </div>
  );
};

export default InventoryHome;
