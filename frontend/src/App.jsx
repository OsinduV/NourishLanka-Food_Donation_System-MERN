import { BrowserRouter,Routes,Route} from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Project from "./pages/Project"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Header from "./components/Header"
import Footer from './components/Footer'
import PrivateRoute from "./components/PrivateRoute"


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



export default function App() {
  return (
    <div>
    <BrowserRouter>
     <Header/>

      <Routes>

        <Route path="/" element={<EventHome/>} />
        <Route path="/event-description" element={<EventDescription/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/shedules" element={<Dshedules/>} />

        <Route path='/communitysearch' element={<CommunitySearch />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/previousdonations" element={<PreviousDonations/>} />
        <Route path="/previousfooddrives" element={<PreviousFooddrives/>} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/create-foodrequest" element={<CreateFoodRequest/>} />
          <Route path='/foodrequest/:foodrequestSlug' element={<FoodRequestPage/>}/>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/donation-request" element={<DonationRequest />} />
          <Route path="/fooddrive-request" element={<FoodDriveRequest />} />
          <Route path="/donation/:donationSlug" element={<DonationPage/>} />
          <Route path="/fooddrive/:fooddriveSlug" element={<FooddrivePage/>} />

        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
          <Route path='/create-recipientpost' element={<CreateRecipientPost/>} />
          <Route path='/update-recipientpost/:postId' element={<UpdateRecipientPost/>} />
          <Route path='update-foodrequest/:foodrequestId'element={<UpdateStatus/>}/>

          <Route path='/create-event' element={<CreateEvent />} />
         <Route path='/update-event/:eventId' element={<UpdateEvent />} />
         <Route path='/update-dstatus/:donationId' element={<UpdateDStatus />} />
         <Route path='/update-fstatus/:fooddriveId' element={<UpdateFStatus />} />
        </Route>


        <Route path="/projects" element={<Project/>} />
        <Route path="/community" element={<CommunityHome/>} />
      

        <Route path='/recipientpost/:postSlug' element={<RecipientPostPage/>} />
         <Route path="/event/:eventSlug" element={<EventPage/>} />

      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  )
}
 