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

  const LoadingRow = () => <></>;

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

  </DashboardLayout>
  )
}

export default ManageJobs