

import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LandingPage from './pages/LandingPage/LandingPage';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import JobSeekerDashboard from './pages/JobSeeker/JobSeekerDashboard';
import JobDetails from './pages/JobSeeker/JobDetails';
import SavedJobs from './pages/JobSeeker/SavedJobs';
import UserProfile from './pages/JobSeeker/UserProfile';
import EmployerDashboard from './pages/Employer/EmployerDashboard';
import ProtectRoute from './routes/ProtectRoute';
import JobPostingForm from './pages/Employer/JobPostingForm';
import ManageJobs from './pages/Employer/ManageJobs';
import ApplicationViewer from './pages/Employer/ApplicationViewer';
import EmployerProfilePage from './pages/Employer/EmployerProfilePage';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);
 
  return (
    <div>

      <Router>
        <Routes>
          {/*Public Routes */}
          <Route path='/' element = {<LandingPage/>}/>
          <Route path='/signup' element = {<SignUp/>}/>
          <Route path='/login' element = {<Login/>}/>

          <Route path='/find-jobs' element = {<JobSeekerDashboard/>}/>
          <Route path='/job/:jobId' element = {<JobDetails/>}/>
          <Route path='/saved-jobs' element = {<SavedJobs/>}/>
          <Route path='/profile' element = {<UserProfile/>}/>

          {/*Portect Routes */}
          <Route element = {<ProtectRoute requiredRole = "employer" />}>
            <Route path='/employer-dashboard' element = {<EmployerDashboard/>}/>
            <Route path='/post-job' element = {<JobPostingForm/>}/>
            <Route path='/manage-jobs' element = {<ManageJobs/>}/>
            <Route path='/applicants' element = {<ApplicationViewer/>}/>
            <Route path='/company-profile' element = {<EmployerProfilePage/>}/>
          </Route>

          {/*Cathe all route */}
          <Route path='*' element = {<Navigate to="/" replace/>}/>
        </Routes>
      </Router>
      <Toaster 
        toastOptions={{
        className : "",
        style : {
          fontSize : "13px"
        }
      }}
      />
    </div>
  )
}

export default App
