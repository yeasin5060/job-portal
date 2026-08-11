import React from 'react';
import {motion} from "framer-motion";
import {Briefcase} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header'
import Hero from './components/Hero';
import Features from './components/Features';

const LandingPage = () => {
  return (
    <div className='min-h-screen md-[100vh]'>
        <Header/>
        <Hero/>
        <Features/>
    </div>
  )
}

export default LandingPage