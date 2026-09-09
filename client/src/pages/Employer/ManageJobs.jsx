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

  const [searchTerm , serSearchTerm] = useState("");
  const [statusFilter , setStatusFilter] = useState("All");
  const [currentPage , setCurrentPage] = useState(1);
  const [sortField , setSortField] = useState("title");
  const [sortDescription , setDescription] = useState("asc");
  const [isLoading , setIsLoading] = useState(false);

  const itemsPerPage = 8;

  // sample jobs data
  const [jobs , setJobs] = useState([]);

  //Filter and Sort jobs
  const filterAndSortJobs = useMemo(() => {
    let filtered = [];

    return filtered;
  }, [jobs , searchTerm , sortDescription , sortField , statusFilter]);

  //pagination
  const totalPages = Math.ceil(filterAndSortJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = filterAndSortJobs.slice(
    startIndex ,
    startIndex + itemsPerPage
  );

  const handleSort = (field) => {};

  const handleStatusChange = async (jobId) => {};

  const handleDeleteJobs = async (jobId) => {};

  const sortIcon = ({field}) => {};

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
      </div>
    </div>
  </DashboardLayout>
  )
}

export default ManageJobs