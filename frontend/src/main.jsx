import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {InventorysContextProvider} from './context/InventoryContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InventorysContextProvider>
    <App />
    </InventorysContextProvider>
  </React.StrictMode>,
)

