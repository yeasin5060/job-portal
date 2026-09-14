import {useState , useEffect} from 'react'
import {Search , Filter , X , Grid , List} from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const JobSeekerDashboard = () => {

  const {user} = useAuth();

  const [jobs , setJobs] = useState([]);
  const [loading , setLoading] = useState(true);
  const [viewMode , setViewMode] = useState("grid");
  const [showMobileFilters , setShowMobileFilters] = useState(false);
  const [error , setError] = useState(null);

  const navigate = useNavigate();

  const [filters , setFilters] = useState({
    keyword : "",
    location : "",
    category : "",
    type : "",
    minSalary : "",
    maxSalary : "",
  });

  const [expandedSections , setExpandedSections] = useState({
    jobType : true,
    salary : true,
    categories : true
  });

  const fetchJobs = async (filterParams = {}) => {
    try {

      setLoading(true);
      setError(null)

      const params = new URLSearchParams();

      if(filterParams.keyword) params.append("keyword" , filterParams.keyword);
      if(filterParams.location) params.append("location" , filterParams.location);
      if(filterParams.maxSalary) params.append("maxSalary" , filterParams.maxSalary);
      if(filterParams.minSalary) params.append("minSalary" , filterParams.minSalary);
      if(filterParams.type) params.append("type" , filterParams.type);
      if(filterParams.category) params.append("category" , filterParams.category);

      if(user) params.append("user" , user?._id);

      const response = await axiosInstance.get(`${API_PATHS.JOBS.GET_ALL_JOBS}?${params.toString()}`);

      const jobsData = Array.isArray(response.data) ? response.data : response.data.jobs || [] ;

      setJobs(jobsData);

    } catch (error) {
      console.error("Error Fetching jobs:", error);
      setError("Failed to fetcj jobs. Please try again later");
      setJobs({});
    }finally {
      setLoading(false);
    }
  };

  //Fetch jobs whan filter change
  useEffect(() => {

    const timeoutId = setTimeout (() => {
      const apiFilters = {
        keyword : filters.keyword,
        location : filters.location,
        category : filters.category,
        minSalary : filters.minSalary,
        maxSalary : filters.maxSalary,
        type : filters.type,
        experience : filters.experience,
        remoteOnly : filters.remoteOnly
      }

      const hasFilters = Object.values(apiFilters).some((value) => 
        value !== "" &&
        value !== false &&
        value !== null &&
        value !== undefined
      );

      if(hasFilters) {
        fetchJobs(apiFilters)
      }else {
        fetchJobs()
      }

      return () => clearTimeout(timeoutId)
    },5000);

  },[filters , user]);

  const hasFilterChange = (key , value) => {
    setFilters((prev) => ({...prev , [key]:value}));
  }

  const toggleSection = (section) =>  {
    setExpandedSections((prev) => ({...prev , [section] : !prev[section]}));
  }

  const clearAllFilters = () => {
    setFilters ({
      keyword : "",
      location : "",
      category : "",
      type : "",
      minSalary : "",
      maxSalary : "",
    });
  };

  const mobaileFilterOverlay = () => {
    <div className={`fixed inset-0 z-40 lg:hidden ${showMobileFilters ? "" : "hidden"}`}>

    </div>
  }

  const toggleSaveJob = async (jobId , isSaved) => {

  };

  const applyToJob = async (jobId) => {

  };

  if(jobs.length == 0 && loading ) {
    return <LoadingSpinner/>
  }
  return (
    <div>JobSeekerDashboard</div>
  )
}

export default JobSeekerDashboard