import { InventorysContext } from "../context/InventoryContext";
import { useContext } from "react";

export const useInventorysContext = ()=>{
    const context =useContext(InventorysContext)

    if(!context){
        throw Error('useInventorysContext must be used inside an InventorysContectProvider')
    }

    return context
}