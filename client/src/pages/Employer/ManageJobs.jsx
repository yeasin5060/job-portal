import {useState , useMemo , useEffect} from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import {Search , X , Plus , Edit , Trash2 , ChevronDown , ChevronUp , Users} from 'lucide-react';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import toast from 'react-hot-toast'

const ManageJobs = () => {

  const navigate = useNavigate();

  const [searchTerm , setSearchTerm] = useState("");
  const [statusFilter , setStatusFilter] = useState("All");
  const [currentPage , setCurrentPage] = useState(1);
  const [sortField , setSortField] = useState("title");
  const [sortDirection , setSortDirection] = useState("asc");
  const [isLoading , setIsLoading] = useState(false);

  const itemsPerPage = 8;

  // sample jobs data
  const [jobs , setJobs] = useState([]);

  //Filter and Sort jobs
  const filterAndSortJobs = useMemo(() => {
    let filtered = [];

    return filtered;
  }, [jobs , searchTerm , sortDirection , sortField , statusFilter]);

  //pagination
  const totalPages = Math.ceil(filterAndSortJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = filterAndSortJobs.slice(
    startIndex ,
    startIndex + itemsPerPage
  );

  const handleSort = (field) => {
    if(sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleStatusChange = async (jobId) => {
    try {
      const response = await axiosInstance.put(API_PATHS.JOBS.TOGGLE_CLOSE(jobId));
      getPostedJobs(true)
    } catch (error) {
      console.error("Error toggling job status:", error)
    }
  };

  const handleDeleteJobs = async (jobId) => {};

  const SortIcon = ({field}) => {};

  const LoadingRow = () => (
    <tr className='animate-spin'>
      <td className='px-6 py-4'>
        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-gray-100 rounded-full'></div>
          <div className='space-y-2'>
            <div className='h-4 w-32 rounded bg-gray-200'></div>
            <div className='h-3 w-24 rounded bg-gray-200'></div>
          </div>
        </div>
      </td>
      <td className='px-6 py-4'>
        <div className='h-4 w-16 rounded-full bg-gray-200'></div>
      </td>
       <td className='px-6 py-4'>
        <div className='h-4 w-12 rounded bg-gray-200'></div>
      </td>
       <td className='px-6 py-2'>
        <div className='flex space-x-2'>
          <div className='h-8 w-16 rounded bg-gray-200'></div>
          <div className='h-8 w-16 rounded bg-gray-200'></div>
          <div className='h-8 w-16 rounded bg-gray-200'></div>
        </div>
      </td>
    </tr>
  );

  const getPostedJobs = async (disableLoder) => {
    setIsLoading(!disableLoder);
    try {
      const response = await axiosInstance.get(API_PATHS.JOBS.GET_JOBS_EMPLOYER);

      if(response.status === 200 && response.data?.length > 0) {
        const formattedJobs = response.data?.map((job) => ({
          id: job._id,
          title : job?.title,
          company : job?.company?.name,
          status : job?.isClosed ? "Closed" : "Active",
          applicants : job?.applicationCount || 0,
          datePosted : moment(job?.createdAt).format("DD-MM-YYYY"),
          logo : job?.company?.companyLogo
        }));

        setJobs(formattedJobs)
      }
    } catch (error) {
      if(error.message) {
        console.error(error.response.data.message);
      }else {
        console.error("Error posting job , Please try again")
      }
    }finally {
      setIsLoading(false)
    }
  };

  

  useEffect (() => {
    getPostedJobs();
    return () => {}
  },[]);


  return (
  <DashboardLayout>
    <div className='min-h-screen p-4 sm:p-6 lg:p-8'>
      <div className='max-w-7xl mx-auto'>
        {/*Header */}
        <div className='mb-8'>
          <div className='flex flex-row items-center justify-between'>
            <div className='mb-4 sm:mb-0'>
              <h1 className='text-xl md:text-2xl font-semibold text-gray-900'>
                Job Management
              </h1>
              <p className='text-sm text-gray-600 mt-1'>
                Manage your job postings and traking application
              </p>
            </div>
            <button className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-sm text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap ' onClick={() => navigate("/post-job")}>
              <Plus className='w-5 h-5 mr-2'/>
              Add new jobs
            </button>
          </div>
        </div>

        {/*Filters */}
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-black/5 border border-white/20 p-6 mb-8'>
          <div className='flex flex-col sm:flex-row gap-4'>
            {/*Search */}
            <div className='flex-1 relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Search className='h-4 w-4 text-gray-400'/>
              </div>
              <input className='block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-0 transition-all duration-200 bg-gray-50/50 placeholder-gray-400' type='text' placeholder='Search' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)}/>
            </div>
            {/* Status Filters */}
            <div className='sm:w-48'>
              <select className='block w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-0 transition-all duration-200' value={statusFilter} onChange={(e)=> setStatusFilter(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
          {/* Results Summery */}
          <div className='my-4'>
            <p className='text-sm text-gray-600'>
              Showing {paginatedJobs.length} of {filterAndSortJobs.length}{" "} Jobs
            </p>
          </div>

          {/* Table */}
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden'>
            {
              filterAndSortJobs.length === 0 && !isLoading ? 
              (
                <div className='text-center py-12'>
                  <div className='w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                    <Search className='w-10 h-10 text-gray-500'/>
                  </div>
                  <h3 className='text-lg font-medium text-gray-900 mb-2'>
                    No Job Found
                  </h3>
                  <p className='text-gray-500'>
                    Try adjusting your search and filter criteria
                  </p>
                </div>
              ) : (
                <div className='w-[75vw] md:w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
                  <table className='min-w-full divide-y divide-gray-100'>
                    <thead className='bg-gradient-to-r from-gray-50 to-gray-100/50'>
                      <tr>
                        <th className='px-6 py-4 text-xs font-semibold text-left text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-all duration-200 min-w-[200px] sm:min-w-0' onClick={() => handleSort("title")}>
                          <div className='flex items-center space-x-1'>
                            <span>Job Title</span>
                            <SortIcon field = "title"/>
                          </div>
                        </th>
                        <th className='px-6 py-4 text-xs font-semibold text-left text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-all duration-200 min-w-[120px] sm:min-w-0' onClick={() => handleSort("status")}>
                          <div className='flex items-center space-x-1'>
                            <span>Status</span>
                            <SortIcon field = "status"/>
                          </div>
                        </th>
                        <th className='px-6 py-4 text-xs font-semibold text-left text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-all duration-200 min-w-[130px] sm:min-w-0' onClick={() => handleSort("applicants")}>
                          <div className='flex items-center space-x-1'>
                            <span>Applicants</span>
                            <SortIcon field = "applicants"/>
                          </div>
                        </th>
                        <th className='px-6 py-4 text-xs font-semibold text-left text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-all duration-200 min-w-[180px] sm:min-w-0'>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {
                        isLoading ? Array.from({ length : 5}).map((_, index)=> (
                          <LoadingRow key={index}/>
                        )) : paginatedJobs.map((job) => (
                          <></>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
  )
}

export default ManageJobs