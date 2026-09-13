import {useState} from 'react'
import { Download , X } from 'lucide-react'
import axiosInstance from '../../utils/axiosinstance'
import { getInitials } from '../../utils/helper'
import moment from 'moment'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'
import StatusBadge from '../StatusBadge'

const statusOption = ["Applied" , "In Review" , "Rejected" , "Accepted"]

const ApplicantProfileViewer  = ({ selectedApplicant , setSelectedApplicant , handleDownloadResume , hangleClose}) => {

    const [currentStatus , setCurrentStatus] = useState(selectedApplicant.status);
    const [loading , setLoading] = useState(false);

    const onChangeStatus = async (e) => {
        const newStatus = e.target.value;
         
        setCurrentStatus(newStatus);
        setLoading(true);

        try {
            const response = await axiosInstance.put(API_PATHS.APPLICATIONS.UPDATE_STATUS(selectedApplicant._id) , {status : newStatus});

            if(response.status === 200) {
                setSelectedApplicant({...selectedApplicant , status : newStatus});
                toast.success("Application status updated successfully");
            }


        } catch (error) {
            console.error("Error uploading status:" , error);
            setCurrentStatus(selectedApplicant.status);
        }finally {
            setLoading(false);
        }
    }

  return (
    <div className='fixed inset-0 bg-[rgba(0,0,0,0.2)] bg-opacity-50 flex items-center justify-center p-4 z-50'>
        <div className='bg-white rounded-xl shadow-xl max-w-lg max-h-[90vh] overflow-y-auto'>
            {/* Modal header */}
            <div className='flex items-center justify-between p-6 border-b border-gray-200'>
                <h3 className='text-lg font-semibold text-gray-900'>Applicant Profile</h3>
                <button
                    onClick={() => hangleClose()}
                    className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                >
                    <X className='w-5 h-5 text-gray-500'/>
                </button>
            </div>
            {/* Modal contant */}
            <div className='p-6 '>
                <div className='text-center mb-6'>
                    {selectedApplicant.applicant.avatar ? 
                        (
                            <img className='h-20 w-20 rounded-full object-cover mx-auto' src={selectedApplicant.applicant.avatar} alt={selectedApplicant.applicant.name}/>
                        ) : (
                            <div className='h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto'>
                                <span className='text-blue-600 font-semibold'>
                                {getInitials(selectedApplicant.applicant.name)}
                                </span>
                            </div>
                        )
                    }

                    <h3 className='mt-4 text-xl font-semibold text-gray-900'>{selectedApplicant.applicant.name}</h3>
                    <p className=' text-gray-600'>{selectedApplicant.applicant.email}</p>
                </div>
                <div className=''>
                    <div className=''>
                        <h5 className=''>
                            Applied Position
                        </h5>
                        <p className=''>{selectedApplicant.job.title}</p>
                        <p className=''>{selectedApplicant.job.location}*{selectedApplicant.job.type}</p>
                    </div>
                    <div className=''>
                        <h5 className=''>
                            Application Details
                        </h5>
                        <div className=''>
                            <div className=''>
                                <span className=''>Status:</span>
                                <StatusBadge status={currentStatus}/>
                            </div>
                            <div className=''>
                                <span className=''>Applied Date :</span>
                                <span className=''>
                                    {moment(selectedApplicant.createdAt)?.format("DD MM YYYY")}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className='' onClick={() => handleDownloadResume(selectedApplicant.applicant.resume)}>
                        <Download className=''/>
                        Download Resume
                    </button>

                    {/*Status Dropdown */}
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default ApplicantProfileViewer 