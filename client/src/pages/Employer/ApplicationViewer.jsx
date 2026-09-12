import {useState , useMemo , useEffect} from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout'
import { Users , Calendar , MapPin , Briefcase , Download , Eye , ArrowLeft} from 'lucide-react';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate , useLocation } from 'react-router-dom';
import moment from 'moment';
import { getInitials } from '../../utils/helper';
import toast from 'react-hot-toast'

const ApplicationViewer = () => {

  const location = useLocation();
  const jobId = location.state?.jobId || null;

  const navigate = useNavigate();

  const [applications , setApplications] = useState([]);
  const [loading , setLoading] = useState(true);
  const [selectedApplicant , setSelectedApplicant] = useState(null);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.APPLICATIONS.GET_ALL_APPLICATIONS(jobId));
      setApplications(response.data);
    } catch (error) {
      console.log("Failed to fetch applications");
    }finally {
      setLoading(false);
    }
  }

  console.log(applications);
  

  useEffect(() => {
    if(jobId) {
      fetchApplication();
    }else {
      navigate("/manage-jobs");
    }
  },[]);

  //Group application by job

  const groupedApplications = useMemo(() => {
    const filtered = applications.filter((app) => app.job.title.toLowerCase());

    return filtered.reduce((acc , app) => {
      const jobId = app.job._id;

      if(!acc[jobId]) {
        acc[jobId] = {
          job : app.job,
          applications : []
        };
      }

      acc[jobId].applications.push(app);

      return acc;
    }, {});

  },[applications]);

  const handleDownloadResume = (resumeUrl) => {
    window.open(resumeUrl , "_blank")
  }
  return (
    <DashboardLayout activeMenu="manage-jobs">
      {
        !loading && (
          <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
            <div className='text-center'>
              <div className='animate-spin rounded-full w-12 h-12 border-b-2 border-gray-500 mx-auto'/>
                <p className='mt-4 text-gray-400'>Loading Applications</p>
            </div>
          </div>
        )
      }
    </DashboardLayout>
  )
}

export default ApplicationViewer