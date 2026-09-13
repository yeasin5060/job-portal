import {useState , useMemo , useEffect} from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout'
import { Users , Calendar , MapPin , Briefcase , Download , Eye , ArrowLeft} from 'lucide-react';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate , useLocation } from 'react-router-dom';
import moment from 'moment';
import { getInitials } from '../../utils/helper';
import toast from 'react-hot-toast'
import StatusBadge from '../../components/StatusBadge';
import ApplicantProfileViewer from '../../components/Cards/ApplicantProfileViewer ';

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
        loading && (
          <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
            <div className='text-center'>
              <div className='animate-spin rounded-full w-12 h-12 border-b-2 border-gray-500 mx-auto'/>
                <p className='mt-4 text-gray-400'>Loading Applications</p>
            </div>
          </div>
        )
      }

      <div className='min-h-screen bg-gray-50'>
        {/*Header */}
        <div className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center gap-4 mb-4 sm:mb-0 '>
              <button className='group flex items-center px-3 py-2 space-x-2 text-sm font-medium text-gray-600 hover:text-white bg-white/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 border border-gray-200 hover:bg-transparent rounded-xl transition-all duration-300 shadow-lg shadow-gray-100 hover:shadow-xl' onClick={() => navigate('/manage-jobs')}>
                <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1'/>
                <span>Back</span>
              </button>
              <h1 className='text-xl md:text-2xl font-semibold text-gray-900'>Application Overview</h1>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 pb-8'>
          {
            Object.keys(groupedApplications).length === 0 ?
            (
                //Empty state
              <div className='text-center py-16'>
                <Users className='mx-auto w-24 h-24 text-gray-300'/>
                <h3 className='mt-4 text-lg font-medium text-gray-900'> No application available</h3>
                <p className='mt-2 text-gray-500'>No application found at this moment</p>
              </div>
            ) : (
              // Application by job
              <div className='space-y-4'>
                {
                  Object.values(groupedApplications).map(({job , applications}) => (
                    <div key={job._id} className='bg-white rounded-xl shadow-md overflow-hidden'>
                      {/* Job Header */}
                      <div className='bg-graldient-to-r from-blue-500 to-blue-600 px-6 py-4'>
                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                          <div>
                            <h2 className='text-lg font-semibold text-white'>
                              {job.title}
                            </h2>
                            <div className='flex flex-wrap items-center gap-4 mt-2 text-blue-100'>
                              <div className='flex items-center gap-1'>
                                <MapPin className='h-4 w-4'/>
                                <span className='text-sm'>{job.location}</span>
                              </div>
                              <div className='flex items-center gap-1'>
                                <Briefcase className='h-4 w-4'/>
                                <span className='text-sm'>{job.type}</span>
                              </div>
                              <div className='flex items-center gap-1'>
                                <span className='text-sm'>{job.category}</span>
                              </div>
                            </div>
                          </div>
                          <div className='bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2'>
                            <span className='text-sm text-white font-medium'>
                              {applications.length} Applications
                              {applications.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Application list */}
                      <div className='p-6'>
                        <div className='space-y-4'>
                          {
                            applications.map((application) => (
                              <div key={application._id} className='flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
                                <div className='flex items-center gap-4'>
                                  {/* Avatar */}
                                  <div className='flex shrink-0'>
                                    {
                                      application.applicant.avatar ? 
                                      (
                                        <img className='h-12 w-12 rounded-full object-cover' src={application.applicant.avatar} alt={application.applicant.name}/>
                                      ) : (
                                        <div className='h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center'>
                                          <span className='text-blue-600 font-semibold'>
                                            {getInitials(application.applicant.name)}
                                          </span>
                                        </div>
                                      )
                                    }
                                  </div>
                                  {/* Application Info */}
                                  <div className='min-w-0 flex-1'>
                                    <h3 className='font-semibold text-gray-900'>{application.applicant.name}</h3>
                                    <p className='text-sm text-gray-600'>{application.applicant.email}</p>
                                    <div className='flex items-center gap-1 mt-1 text-gray-500 text-xs'>
                                      <Calendar className='h-3 w-3'/>
                                      <span className=''>
                                        Applied {" "}
                                        {moment(application.createdAt)?.format( " DD MM YYYY ")}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                {/*Actions */}
                                <div className='flex items-center gap-3 mt-4 md:m-0'>
                                  <StatusBadge status = {application.status}/>
                                  <button className='inline-flex items-center gsp-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors' onClick={() => handleDownloadResume(application.applicant.resume)}>
                                    <Download className='h-4 w-4'/>
                                    Resume
                                  </button>
                                  <button className='inline-flex items-center gsp-2 px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors' onClick={() => setApplications(application)}>
                                    <Eye className='h-4 w-4'/>
                                    View Profile
                                  </button>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
        {/* Profile Modal */}
        {
          selectedApplicant && (
            <ApplicantProfileViewer
              selectedApplicant = {selectedApplicant}
              setSelectedApplicant = {setSelectedApplicant}
              handleDownloadResume = {handleDownloadResume}
              hangleClose = {() => {
                setSelectedApplicant(null)
                fetchApplication()
              }}
            />
          )
        }
      </div>
    </DashboardLayout>
  )
}

export default ApplicationViewer