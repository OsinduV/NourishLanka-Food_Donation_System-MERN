import React, { useEffect } from 'react';
import { useInventorysContext } from '../hooks/useInventorysContext';

// Components
import InventoryDetails from '../components/InventoryDetails';
import InventoryForm from '../components/InventoryForm';
import endpoints from '../api/endpoints';

const Home = () => {
    const { inventorys, api_message, dispatch} = useInventorysContext();

    const fetchInventorys = async () => {
        try {
            const response = await fetch(endpoints.inventorys);
            if (response.ok) {
                const inventoryData = await response.json();
                dispatch({ type: 'SET_INVENTORYS', payload: inventoryData });
            } else {
                console.error('Error fetching inventory data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching inventory data:', error);
        }
    }

    useEffect(() => {
        fetchInventorys();
    }, [dispatch]);

    useEffect(() => {
        if (!api_message) return;
        if (api_message[0] !== "fetch_home") return;

        fetchInventorys();
    }, [api_message]);

    return (
        <div className="home">
            <>
                <div className="workouts">
                    {inventorys && inventorys.map(inventory => (
                        <InventoryDetails key={inventory._id} inventory={inventory} />
                    ))}
                    {
                        (api_message && api_message[0] === "empty_search") &&
                        <div className='no-search-result-message'>
                            No items found for given search entry!
                        </div>
                    }
                </div>
                <InventoryForm />
            </>
        </div>
    )
};

export default Home;