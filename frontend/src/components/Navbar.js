import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInventorysContext } from '../hooks/useInventorysContext';

const Navbar = () => {
    const { dispatch } = useInventorysContext();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        try {
            const response = await fetch(`/api/inventorys/search?title=${searchTerm}`);
            if (response.ok) {
                const searchResults = await response.json();
                dispatch({ type: 'SET_INVENTORYS', payload: searchResults });
            } else {
                console.error('Error searching inventory:', response.statusText);
            }
        } catch (error) {
            console.error('Error searching inventory:', error);
        }
    };

    const handleSortByQuantity = async () => {
        try {
            const response = await fetch(`/api/inventorys/sort/quantity`);
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
            const response = await fetch(`/api/inventorys/sort/expdate`);
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
                <Link to="/">
                    <h1>Inventory</h1>
                </Link>
                <div className="search-bar">
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className="sort-buttons">
                    <button onClick={handleSortByQuantity}>Sort by Quantity</button>
                    <button onClick={handleSortByExpDate}>Sort by Exp Date</button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
