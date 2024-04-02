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
import OnlyCommunityAdminPrivateRoute from "./CommunityManagement/components/OnlyCommunityAdminPrivateRoute"
import CreateRecipientPost from "./CommunityManagement/pages/CreateRecipientPost"

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
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyCommunityAdminPrivateRoute/>}>
          <Route path='/create-recipientpost' element={<CreateRecipientPost/>} />
        </Route>
        <Route path="/projects" element={<Project/>} />
        
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  )
}
 