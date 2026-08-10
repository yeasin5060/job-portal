import React from 'react';
import {motion} from "framer-motion";
import {Briefcase} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header'
import Hero from './components/Hero';

const LandingPage = () => {
  return (
    <div className='min-h-screen'>
        <Header/>
        <Hero/>
    </div>
  )
}

export default LandingPage