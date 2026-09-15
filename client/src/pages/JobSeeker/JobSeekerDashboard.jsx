import {useState , useEffect} from 'react'
import {Search , Filter , X , Grid , List} from 'lucide-react'
import LoadingSpinner from '../../components/LoadingSpinner'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import FilterContent from './components/FilterContent'
import SearchHeader from './components/SearchHeader'
import Navbar from '../../components/Navbar'

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
    }, 400);

  },[filters , user]);

  const handleImmediateSearch = () => {
    const apiFilters = {
      keyword : filters.keyword,
      location : filters.location,
      category : filters.category,
      minSalary : filters.minSalary,
      maxSalary : filters.maxSalary,
      type : filters.type,
      experience : filters.experience,
      remoteOnly : filters.remoteOnly
    };
    fetchJobs(apiFilters);
  };

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
    return (
      <div
        className={`fixed inset-0 z-40 lg:hidden ${showMobileFilters ? "" : "hidden"}`}
        role="presentation"
      >
       <div className='fixed inset-0 bg-black/50' onClick={() => setShowMobileFilters(false)}>
        <div className='fixed inset-y-0 w-full max-w-sm text-white shadow-xl'>
          <div className='flex items-center justify-center p-6 border-b border-gray-200'>
            <h3 className='text-lg font-bold text-gray-900'>Filters</h3>
            <button onClick={setShowMobileFilters(false)} className='p-2 hover:bg-gray-100 rounded-xl transition-colors' >
              <X className='w-5 h-5'/>
            </button>
          </div>
          <div className='p-6 overflow-y-auto h-full pb-20'>
            <FilterContent toggleSection = {toggleSection} clearAllFilters = {clearAllFilters} expandedSections = {expandedSections} filters = {filters} hasFilterChange = {hasFilterChange}/>
          </div>
        </div>
       </div>
      </div>
    );
  };

  const toggleSaveJob = async (jobId , isSaved) => {
    try {
      if(isSaved) {
        await axiosInstance.delete(API_PATHS.JOBS.UNSAVE_JOB(jobId));
        toast.success("Job remove successfully!");
      }else{
        await axiosInstance.post(API_PATHS.JOBS.SAVE_JOB(jobId));
        toast.success("Job saved successfully!");
      }

      fetchJobs();

    } catch (error) {
      console.error("Error:",error);
      toast.error("Something wont wrong!Please try again")
    }
  };

  const applyToJob = async (jobId) => {
    try {
      if(jobId) {
        await axiosInstance.delete(API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId));
      }
    } catch (error) {
      console.error("Error" , error);
      toast.error("Something wont wrong!Please try again")
    }
  };

  if(jobs.length == 0 && loading ) {
    return <LoadingSpinner/>
  }
  return (
    <div className='bg-gradient-to-br from-blue-50 via-white to-purple-50'>
      <Navbar/>
      <div className='min-h-screen mt-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  py-4 lg:py-8'>
          <SearchHeader filters={filters} hasFilterChange={hasFilterChange} onSearch={handleImmediateSearch} />
          <div className='flex gap-6 lg:gap-8'>
            <div className='hidden lg:block w-80 flex-shrink-0'>
              <div className='bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 sticky top-20'>
                <h3 className='font-bold text-xl text-gray-900 mb-6'>Filter Jobs</h3>
                <FilterContent toggleSection={toggleSection} clearAllFilters={clearAllFilters} expandedSections={expandedSections} filters={filters} hasFilterChange={hasFilterChange}/>
              </div>
            </div>
            <div className='flex-1 min-w-0'>
              <div className='flex flex-col lg:flex-row lg:items-center justify-between mb-6 lg:mb-8 gap-4'>
                <div>
                  <p className='text-gray-600 text-sm lg:text-base'>
                    Showing
                    <span className='font-bold text-gray-900'>{jobs.length}</span> {" "}
                  </p>
                </div>
                <div className='flex items-center justify-center lg:justify-end gap-4'>
                  <button className='lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 font-medium text-gray-700 hover:bg-gray-50 transition-colors' onClick={() => setShowMobileFilters(false)}>
                    <Filter className='h-4 w-4'/>
                    Filters
                  </button>
                  <div className='flex items-center gap-3 lg:gap-4'>
                    <div className='flex items-center border border-gray-200 rounded-xl p-1 bg-white'>
                      <button className={`p-2 rounded-lg transition-colors ${viewMode ==="grid" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`} onClick={() => setViewMode("grid")}>
                        <Grid className='w-4 h-4'/>
                      </button>
                      <button className={`p-2 rounded-lg transition-colors ${viewMode ==="list" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`} onClick={() => setViewMode("list")}>
                        <List className='w-4 h-4'/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <mobaileFilterOverlay />
      </div>
    </div>
  )
}

export default JobSeekerDashboard
