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

import InventoryHome from "./Inventory_Management/pages/InventoryHome";
import { InventorysContextProvider } from "./Inventory_Management/context/InventoryContext";
import Navbar from "./Inventory_Management/components/Navbar";
import InventoryShow from "./Inventory_Management/pages/InventoryShow";

import FRHome from "./fundRaising/pages/FRHome";
import FRReg from "./fundRaising/pages/FRReg";
import FRPage from "./fundRaising/pages/FRPage";
import DonatePage from "./fundRaising/pages/DonatePage";
import OsinduTst from "./fundRaising/pages/OsinduTst";
import FRPCreate from "./fundRaising/pages/FRPCreate";
import FrpDonate from "./fundRaising/pages/FrpDonate";



import VolunteerOne from "./Volunteer/pages/VolunteerOne"
import VolunteerTwo from "./Volunteer/pages/VolunteerTwo"
import VolunteerThree from "./Volunteer/pages/VolunteerThree"
import VolunteerFour from "./Volunteer/pages/VolunteerFour"
import VolunteerFive from "./Volunteer/pages/VolunteerFive"
import CreateSchedules from "./Volunteer/pages/CreateSchedules"
import UpdateSchedules from "./Volunteer/pages/UpdateSchedules"
import VolunteerSix from "./Volunteer/pages/VolunteerSix"

import FbRegisterpage from "./Foodbank/pages/foodbank_register"
import Fbhome from './Foodbank/pages/foodbank_home'
import FoodbankDash from "./Foodbank/pages/foodbankDash"
import AdminDashFb from "./Foodbank/pages/AdminDashFb"



import CreateRecipientPost from "./CommunityManagement/pages/CreateRecipientPost"
import UpdateRecipientPost from "./CommunityManagement/pages/UpdateRecipientPost"
import RecipientPostPage from "./CommunityManagement/pages/RecipientPostPage"
import CommunityHome from "./CommunityManagement/pages/CommunityHome"
import CommunitySearch from "./CommunityManagement/pages/CommunitySearch"
import CreateFoodRequest from "./CommunityManagement/pages/CreateFoodRequest"
import FoodRequestPage from "./CommunityManagement/pages/FoodRequestPage"
import UpdateStatus from "./CommunityManagement/pages/UpdateStatus"


import CreateEvent from "./Event/pages/CreateEvent"
import UpdateEvent from "./Event/pages/UpdateEvent"
import EventPage from "./Event/pages/EventPage"
import EventHome from "./Event/pages/EventHome"
import Search from "./Event/pages/Search"
import DonationRequest from "./Event/pages/DonationRequest"
import EventDescription from "./Event/pages/EventDescription"
import UpdateDStatus from "./Event/pages/UpdateDStatus"
import FoodDriveRequest from "./Event/pages/FoodDriveRequest"
import UpdateFStatus from "./Event/pages/UpdateFStatus"
import DonationPage from "./Event/pages/DonationPage"
import FooddrivePage from "./Event/pages/FooddrivePage"
import PreviousDonations from "./Event/pages/PreviousDonations"
import PreviousFooddrives from "./Event/pages/PreviousFooddrives"

import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import Dshedules from "./Event/pages/Dshedules"

import ReviewPage from "./Ratings and Review_f/pages/ReviewPage"
import ReviewHome from "./Ratings and Review_f/pages/ReviewHome"
import FrpSearch from "./fundRaising/pages/FrpSearch";


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />




      <Routes>
        
         <Route path="/" element={<Home/>} />
        <Route path="/event-home" element={<EventHome/>} />
        <Route path="/event-description" element={<EventDescription/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/shedules" element={<Dshedules/>} />


          {/* volunteer routes */}
        <Route path="/volunteer-one" element={<VolunteerOne/>} />
        <Route path="/volunteer-two" element={<VolunteerTwo/>} />
        <Route path="/volunteer-three" element={<VolunteerThree/>} />
        <Route path="/volunteer-four/:foodbankId" element={<VolunteerFour/>} />
        <Route path="/volunteer-five/:scheduleId/:foodbankId" element={<VolunteerFive/>} />
        <Route path="/volunteer-six/:userId" element={<VolunteerSix/>} />

        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-schedules' element={<CreateSchedules />} />
          <Route path='/update-schedules/:scheduleId' element={<UpdateSchedules />} />
            </Route>

         
          
            

          {/* foodbank routes */}
          <Route path="/foodbankreg" element={<FbRegisterpage />} />
          <Route path="/foodbankhome" element={<Fbhome />} />
          <Route element={<PrivateRoute />}>
          <Route path="/foodbankDash" element={<FoodbankDash />} />
          </Route>
          <Route path="/AdminDashFb" element={<AdminDashFb />} />

          <Route path="/projects" element={<Project />} />

          <Route path="/communitysearch" element={<CommunitySearch />} />
          <Route path="/search" element={<Search />} />
          <Route path="/previousdonations" element={<PreviousDonations />} />
          <Route path="/previousfooddrives" element={<PreviousFooddrives />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-foodrequest" element={<CreateFoodRequest />} />
            <Route
              path="/foodrequest/:foodrequestSlug"
              element={<FoodRequestPage />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/donation-request" element={<DonationRequest />} />
            <Route path="/fooddrive-request" element={<FoodDriveRequest />} />
            <Route path="/donation/:donationSlug" element={<DonationPage />} />
            <Route
              path="/fooddrive/:fooddriveSlug"
              element={<FooddrivePage />}
            />
          </Route>

          <Route element={<OnlyAdminPrivateRoute />}>
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

            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/update-event/:eventId" element={<UpdateEvent />} />
            <Route
              path="/update-dstatus/:donationId"
              element={<UpdateDStatus />}
            />
            <Route
              path="/update-fstatus/:fooddriveId"
              element={<UpdateFStatus />}
            />
          </Route>

          <Route path="/projects" element={<Project />} />
          <Route path="/community" element={<CommunityHome />} />
          <Route path="/review-home" element={<ReviewHome />} />

          <Route
            path="/recipientpost/:postSlug"
            element={<RecipientPostPage />}
          />
          <Route path="/event/:eventSlug" element={<EventPage />} />

          {/* fundraising */}
          <Route path="/fr-home" element={<FRHome />} />
          <Route path="/donate-page" element={<DonatePage />} />
          <Route path="/frpdonate-page/:frpId" element={<FrpDonate />} />
          <Route path="/osindutst" element={<OsinduTst />} />
          <Route path="/frp-create" element={<FRPCreate />} />
          <Route path="/frp-search" element={<FrpSearch />} />
          <Route element={<PrivateRoute />}>
          <Route path="/fr-page/:frpId" element={<FRPage />} />
          <Route path="/fr-page/:frpId/:updatestat" element={<FRPage />} />
          <Route path="/fr-reg" element={<FRReg />} />
          </Route>

          {/* Reviwe management */}
          <Route path="/review-page" element={<ReviewPage />} />
        </Routes>

        <InventorysContextProvider>
          <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/inventory-home" element={<InventoryHome />} />

            <Route path="/inventory-show" element={<InventoryShow />} />

          </Route>

          </Routes>
        </InventorysContextProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
