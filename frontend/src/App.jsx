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
import FRHome from "./fundRaising/pages/FRHome";
import FRReg from "./fundRaising/pages/FRReg";
import FRPage from "./fundRaising/pages/FRPage";
import DonatePage from "./fundRaising/pages/DonatePage";
import OsinduTst from "./fundRaising/pages/OsinduTst";
import FRPCreate from "./fundRaising/pages/FRPCreate";

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
            <Route path="/fr-reg" element={<FRReg />} />
          </Route>
          <Route path="/projects" element={<Project />} />
          <Route path="/fr-home" element={<FRHome />} />
          <Route path="/fr-page" element={<FRPage />} />
          <Route path="/donate-page" element={<DonatePage />} />
          <Route path="/osindutst" element={<OsinduTst />} />
          <Route path="/frp-create" element={<FRPCreate />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
