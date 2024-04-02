import React, { createContext, useContext, useReducer } from "react";

// Creating context
export const InventorysContext = createContext();

// Reducer function
export const inventorysReducer = (state, action) => {
    switch (action.type) {
        case 'SET_INVENTORYS':
            return {
                ...state,
                inventorys: action.payload
            };
        case 'CREATE_INVENTORY':
            return {
                ...state,
                inventorys: [action.payload, ...state.inventorys]
            };
        case 'DELETE_INVENTORY':
            return {
                ...state,
                inventorys: state.inventorys.filter(inventory => inventory._id !== action.payload._id)
            };
        case 'UPDATE_INVENTORY':
            return {
                ...state,
                inventorys: state.inventorys.map(inventory =>
                    inventory._id === action.payload._id ? action.payload : inventory
                )
            };
        default:
            return state;
    }
};

// Custom hook to access context
export const useInventorysContext = () => useContext(InventorysContext);

// Provider component
export const InventorysContextProvider = ({ children }) => {
    const initialState = {
        inventorys: null
    };

    const [state, dispatch] = useReducer(inventorysReducer, initialState);

    return (
        <InventorysContext.Provider value={{ ...state, dispatch }}>
            {children}
        </InventorysContext.Provider>
    );
};
