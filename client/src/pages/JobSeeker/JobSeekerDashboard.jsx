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
import JobCard from '../../components/Cards/JobCard'

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
    const timeoutId = setTimeout(() => {
      const apiFilters = {
        keyword: filters.keyword,
        location: filters.location,
        category: filters.category,
        minSalary: filters.minSalary,
        maxSalary: filters.maxSalary,
        type: filters.type,
        experience: filters.experience,
        remoteOnly: filters.remoteOnly,
      };

      const hasFilters = Object.values(apiFilters).some(
        (value) =>
          value !== "" &&
          value !== false &&
          value !== null &&
          value !== undefined
      );

      if (hasFilters) {
        fetchJobs(apiFilters);
      } else {
        fetchJobs();
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [filters, user]);

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

  const MobaileFilterOverlay = () => {
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
    if (jobId) {
      await axiosInstance.post(
        API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId)
      );

      toast.success("Application submitted successfully!");
      fetchJobs();
    }
  } catch (error) {
    console.error("Error:", error);

    toast.error(
      error.response?.data?.message ||
      "Something went wrong! Please try again"
    );
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
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-6 sticky top-24 transition-all">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Filter className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Filter Jobs</h3>
                  </div>
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors"
                  >
                    Reset All
                  </button>
                </div>
                <FilterContent
                  toggleSection={toggleSection}
                  clearAllFilters={clearAllFilters}
                  expandedSections={expandedSections}
                  filters={filters}
                  hasFilterChange={hasFilterChange}
                />
              </div>
            </div>
            <div className='flex-1 min-w-0'>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium">
                    Showing{' '}
                    <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/50">
                      {jobs.length}
                    </span>{' '}
                    available {jobs.length === 1 ? 'job' : 'jobs'}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <button
                    className="lg:hidden inline-flex items-center gap-2 bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 shadow-sm transition-all active:scale-95"
                    onClick={() => setShowMobileFilters(true)}
                  >
                    <Filter className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>Filters</span>
                  </button>

                  <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/60 shadow-inner">
                    <button
                      className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                        viewMode === 'grid'
                          ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                      }`}
                      onClick={() => setViewMode('grid')}
                      title="Grid view"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                        viewMode === 'list'
                          ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                      }`}
                      onClick={() => setViewMode('list')}
                      title="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {
                jobs.length === 0 ? (
                  <div className='text-center py-16 lg:py-20 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20'>
                    <div className='text-gray-400 mb-6'>
                      <Search className='h-16 w-16 mx-auto'/>
                    </div>
                    <h3 className='text-xl lg:text-2xl font-bold text-gray-900'>
                      No Jobs Found
                    </h3>
                    <p className=''>
                      Tyr adjusting your search criteria or fillters.
                    </p>
                    <button className='' onClick={clearAllFilters}>
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-4" : "space-y-4 lg:space-y-6"}>
                      {
                        jobs.map ((job) => (
                          <JobCard
                            key = {job._id} 
                            job = {job}
                            onClick = {() => navigate(`/jobs/${job._id}`)}
                            onToggleSave = {() => toggleSaveJob(job._id , job.isSaved)}
                            onApply = {() => applyToJob(job._id)}
                          />
                        ))
                      }
                    </div>
                  </>
                )
              }
            </div>
          </div>
        </div>
        <MobaileFilterOverlay/>
      </div>
    </div>
  )
}

export default JobSeekerDashboard
