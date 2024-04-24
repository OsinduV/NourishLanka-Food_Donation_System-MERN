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
import OnlyCommunityAdminPrivateRoute from "./CommunityManagement/components/OnlyCommunityAdminPrivateRoute";
import CreateRecipientPost from "./CommunityManagement/pages/CreateRecipientPost";
import UpdateRecipientPost from "./CommunityManagement/pages/UpdateRecipientPost";
import RecipientPostPage from "./CommunityManagement/pages/RecipientPostPage";
import CommunityHome from "./CommunityManagement/pages/CommunityHome";
import CommunitySearch from "./CommunityManagement/pages/CommunitySearch";
import CreateFoodRequest from "./CommunityManagement/pages/CreateFoodRequest";
import FoodRequestPage from "./CommunityManagement/pages/FoodRequestPage";
import UpdateStatus from "./CommunityManagement/pages/UpdateStatus";
import InventoryHome from "./Inventory_Management/pages/InventoryHome"
import { InventorysContextProvider } from "./Inventory_Management/context/InventoryContext";
import Navbar from "./Inventory_Management/components/Navbar"

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
          <Route path="/communitysearch" element={<CommunitySearch />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-foodrequest" element={<CreateFoodRequest />} />
            <Route
              path="/foodrequest/:foodrequestSlug"
              element={<FoodRequestPage />}
            />
          </Route>
          <Route element={<OnlyCommunityAdminPrivateRoute />}>
            <Route
              path="/create-recipientpost"
              element={<CreateRecipientPost />}
            />
            <Route
              path="/update-recipientpost/:postId"
              element={<UpdateRecipientPost />}
            />
            <Route
              path="update-foodrequest/:foodrequestId"
              element={<UpdateStatus />}
            />
          </Route>
          <Route path="/projects" element={<Project />} />
          <Route path="/community" element={<CommunityHome />} />

          <Route
            path="/recipientpost/:postSlug"
            element={<RecipientPostPage />}
          />
        </Routes>
        {/* <React.StrictMode> */}
          <InventorysContextProvider>
            <Navbar />
            <div className="pages">
              <Routes>
                <Route path="/inventory-home" element={<InventoryHome />} />
              </Routes>
            </div>
          </InventorysContextProvider>
        {/* </React.StrictMode> */}
        ,
        <Footer />
      </BrowserRouter>
    </div>
  );
}
