import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import { useInventorysContext } from '../hooks/useInventorysContext';
import endpoints from '../api/endpoints';
import { Button } from 'flowbite-react';

const Navbar = () => {
    const { dispatch } = useInventorysContext();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        if (searchTerm === '' && location === '') {
            dispatch({ type: 'FETCH_HOME' });
            return;
        }
    
        try {
            const queryParams = new URLSearchParams();
            if (searchTerm !== '') {
                queryParams.append('title', searchTerm);
            }
            if (location !== '') {
                queryParams.append('location', searchTerm);
            }
    
            const response = await fetch(`${endpoints.inventorys}/search?${queryParams.toString()}`);
            if (response.ok) {
                const searchResult = await response.json();
                dispatch({ type: 'SEARCH_INVENTORY', payload: searchResult });
    
                if (searchResult.length === 0) {
                    dispatch({ type: 'EMPTY_SEARCH' })
                }
            } else {
                console.error('Error searching inventory:', response.statusText);
            }
        } catch (error) {
            console.error('Error searching inventory:', error);
        }
    };
    

    // Function to handle PDF report generation
    const handleGenerateReport = async () => {
        try {
            const response = await fetch(`${endpoints.inventorys}/report/reportgen`);
            if (response.ok) {
                // Handle successful PDF generation, e.g., open in new tab
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                window.open(url);
            } else {
                console.error('Error generating PDF report:', response.statusText);
            }
        } catch (error) {
            console.error('Error generating PDF report:', error);
        }
    };

    const handleSortByQuantity = async () => {
        try {
            const response = await fetch(`${endpoints.inventorys}/sort/quantity`);
            if (response.ok) {
                const sortedInventory = await response.json();
                dispatch({ type: 'SET_INVENTORYS', payload: sortedInventory });
            } else {
                console.error('Error sorting inventory by quantity:', response.statusText);
            }
        } catch (error) {
            console.error('Error sorting inventory by quantity:', error);
        }
    };

    const handleSortByExpDate = async () => {
        try {
            const response = await fetch(`${endpoints.inventorys}/sort/expdate`);
            if (response.ok) {
                const sortedInventory = await response.json();
                dispatch({ type: 'SET_INVENTORYS', payload: sortedInventory });
            } else {
                console.error('Error sorting inventory by expiration date:', response.statusText);
            }
        } catch (error) {
            console.error('Error sorting inventory by expiration date:', error);
        }
    };

    return (
        <header>
            <div className="container flex items-center justify-between mx-auto my-0 px-5 py-2.5">
                
                    <h1 className='text-lg'>Inventory Management</h1>

                <div className="search-bar">
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <Button onClick={handleSearch} gradientMonochrome="success">Search</Button>
                </div>
                <div className="sort-buttons">
                    <button onClick={handleSortByQuantity}>Sort by Quantity</button>
                    <button onClick={handleSortByExpDate}>Sort by Exp Date</button>
                    <button onClick={handleGenerateReport}>Generate Report</button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
