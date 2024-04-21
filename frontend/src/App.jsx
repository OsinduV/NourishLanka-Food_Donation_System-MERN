import { BrowserRouter,Routes,Route} from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Project from "./pages/Project"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import About from "./pages/About"
import Header from "./components/Header"
import Footer from './components/Footer'
import PrivateRoute from "./components/PrivateRoute"
import VolunteerOne from "./Volunteer/pages/VolunteerOne"
import VolunteerTwo from "./Volunteer/pages/VolunteerTwo"
import VolunteerThree from "./Volunteer/pages/VolunteerThree"
import VolunteerFour from "./Volunteer/pages/VolunteerFour"
import VolunteerFive from "./Volunteer/pages/VolunteerFive"
import OnlyVolunteerAdminPrivateRoute from "./Volunteer/components/OnlyVolunteerAdminPrivateRoute"
import CreateSchedules from "./Volunteer/pages/CreateSchedules"
import UpdateSchedules from "./Volunteer/pages/UpdateSchedules"



export default function App() {
  return (
    <div>
    <BrowserRouter>
     <Header/>

      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/volunteer-one" element={<VolunteerOne/>} />
        <Route path="/volunteer-two" element={<VolunteerTwo/>} />
        <Route path="/volunteer-three" element={<VolunteerThree/>} />
        <Route path="/volunteer-four" element={<VolunteerFour/>} />
        <Route path="/volunteer-five" element={<VolunteerFive/>} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyVolunteerAdminPrivateRoute />}>
          <Route path='/create-schedules' element={<CreateSchedules />} />
          <Route path='/update-schedules/:scheduleId' element={<UpdateSchedules />} />
        </Route>
        <Route path="/projects" element={<Project/>} />
        
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  )
}
 