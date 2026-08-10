import React from 'react';
import {motion} from "framer-motion";
import {Briefcase} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header'

const LandingPage = () => {
  return (
    <div className='min-h-screen'>
        <Header/>
    </div>
  )
}

export default LandingPage