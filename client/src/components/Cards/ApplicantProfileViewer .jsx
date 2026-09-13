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
                <div className='space-y-4'>
                    <div className='bg-gray-50 rounded-lg p-4'>
                        <h5 className='text-gray-900 font-medium mb-2'>
                            Applied Position
                        </h5>
                        <p className='text-gray-700'>{selectedApplicant.job.title}</p>
                        <p className='text-gray-600 text-sm mt-1'>{selectedApplicant.job.location}*{selectedApplicant.job.type}</p>
                    </div>
                    <div className='bg-gray-50 rounded-lg p-4'>
                        <h5 className='text-gray-900 font-medium mb-2'>
                            Application Details
                        </h5>
                        <div className='space-y-2'>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Status:</span>
                                <StatusBadge status={currentStatus}/>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600'>Applied Date :</span>
                                <span className='text-gray-900'>
                                    {moment(selectedApplicant.createdAt)?.format("DD MM YYYY")}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className='w-full inline-flex justify-center items-center gxp-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors' onClick={() => handleDownloadResume(selectedApplicant.applicant.resume)}>
                        <Download className='h-4 w-4'/>
                        Download Resume
                    </button>

                    {/*Status Dropdown */}
                    <div className='mt-4'>
                        <label className='block mb-1 text-sm font-medium text-gray-700'>
                            Change application status
                        </label>
                        <select className='w-full border border-gray-300 p-2 rounded-lg focus:ring-blue-500 focus:border-blue-500' value={currentStatus} onChange={onChangeStatus} disabled = {loading}>
                            {
                                statusOption.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))
                            }
                        </select>
                        {
                            loading && (
                                <p className='text-xs text-gray-500 mt-1'>Updating status..</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ApplicantProfileViewer 