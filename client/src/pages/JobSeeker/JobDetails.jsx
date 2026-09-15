import {MapPin , Building2 , Clock , Users} from 'lucide-react'
import { TbCurrencyTaka } from "react-icons/tb";
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useState , useEffect } from 'react';
import Navbar from '../../components/Navbar';
import moment from 'moment';
import StatusBadge from '../../components/StatusBadge';
import toast from 'react-hot-toast';


const JobDetails = () => {
  const {user} = useAuth();
  const {jobId} = useParams();

  const [jobDetails , setJobDetails] = useState(null);

  const getJobDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.JOBS.GET_JOB_BY_Id(jobId), {
        params : {userId : user?._id || null}
      });

      setJobDetails(response.data)
    } catch (error) {
      console.error("Error fetching job details:", error);
      
    }
  }

  const applyToJob = async () => {
    try {
      if(jobId) {
        await axiosInstance.post(API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId));
        toast.success("Applied to job successfully")
      }

      getJobDetailsById()
    } catch (error) {
      console.error("Error" , error);
      toast.error("Someting went wrong! Tyr again later")
    }
  }

  
  return (
    <div>JobDetails</div>
  )
}

export default JobDetails