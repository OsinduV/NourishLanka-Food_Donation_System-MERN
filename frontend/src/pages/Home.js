import React, { useEffect } from 'react';
import { useInventorysContext } from '../hooks/useInventorysContext';

// Components
import InventoryDetails from '../components/InventoryDetails';
import InventoryForm from '../components/InventoryForm';

const Home = () => {
    const { inventorys, inventory, dispatch} = useInventorysContext();

    useEffect(() => {
        const fetchInventorys = async () => {
            try {
                const response = await fetch('/api/inventorys');
                if (response.ok) {
                    const inventoryData = await response.json();
                    dispatch({ type: 'SET_INVENTORYS', payload: inventoryData });
                } else {
                    console.error('Error fetching inventory data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching inventory data:', error);
            }
        };

        fetchInventorys();
    }, [dispatch]);

    return (
        <div className="home">
            {inventory ? (
                <InventoryDetails inventory={inventory} />
            ) : (
                <>
                    <div className="workouts">
                        {inventorys && inventorys.map(inventory => (
                            <InventoryDetails key={inventory._id} inventory={inventory} />
                        ))}
                    </div>
                    <InventoryForm />
                </>
            )}
        </div>
    )
};

export default Home;