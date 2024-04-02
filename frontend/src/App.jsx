import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Project from "./pages/Project";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

import InventoryHome from "./Inventory/pages/InventoryHome";
import Navbar from "./Inventory/components/Navbar";

import { InventorysContextProvider } from "./Inventory/context/InventoryContext";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/projects" element={<Project />} />
        </Routes>

          <React.StrictMode>
            <InventorysContextProvider>
              <Navbar />
              <div className="pages">
              <Routes>                
                <Route path="/inventory" element={<InventoryHome />} />
              </Routes>
              </div>
            </InventorysContextProvider>
          </React.StrictMode>

          
        <Footer />
      </BrowserRouter>
    </div>
  );
}
