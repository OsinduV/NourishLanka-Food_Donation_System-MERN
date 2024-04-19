import { BrowserRouter,Routes,Route} from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Project from "./pages/Project"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Header from "./components/Header"
import Footer from './components/Footer'
import PrivateRoute from "./components/PrivateRoute"
import CreateEvent from "./Event/pages/CreateEvent"
import OnlyEventOgPrivateRoute from "./Event/components/OnlyEventOgPrivateRoute"
import UpdateEvent from "./Event/pages/UpdateEvent"
import EventPage from "./Event/pages/EventPage"
import EventHome from "./Event/pages/EventHome"
import Search from "./Event/pages/Search"
import DonationRequest from "./Event/pages/DonationRequest"
import EventDescription from "./Event/pages/EventDescription"
import UpdateDStatus from "./Event/pages/UpdateDStatus"
import FoodDriveRequest from "./Event/pages/FoodDriveRequest"
import UpdateFStatus from "./Event/pages/UpdateFStatus"
import ApprovedDonations from "./Event/pages/ApprovedDonations"
import DeclinedDonations from "./Event/pages/DeclinedDonations"


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
        <Route path="/search" element={<Search/>} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/donation-request" element={<DonationRequest />} />
          <Route path="/fooddrive-request" element={<FoodDriveRequest />} />
        </Route>

           {/*only for event organiser */}
      <Route element={<OnlyEventOgPrivateRoute />}>
        <Route path='/create-event' element={<CreateEvent />} />
        <Route path='/update-event/:eventId' element={<UpdateEvent />} />
        <Route path='/update-dstatus/:donationId' element={<UpdateDStatus />} />
        <Route path='/update-fstatus/:fooddriveId' element={<UpdateFStatus />} />
      </Route>
        <Route path="/projects" element={<Project/>} />
        <Route path="/event/:eventSlug" element={<EventPage/>} />
        
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  )
}
 