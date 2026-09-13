import React, { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import {Building2 , Mail , Edit3} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'
import uploadImage from '../../utils/uploadImage'


const EmployerProfilePage = () => {

  const {user , updateUser} = useAuth();
  const [profileData , setProfileData] = useState({
    name : user?.name || "",
    email : user?.email || "",
    avatar : user?.avatar || "" ,
    companyName : user?.companyName || "",
    companyDescription : user?.companyDescription || "",
    companyLogo : user?.companyLogo || ""
  });

  const [editMode , setEditMode] = useState(false);
  const [formData , setFormData] = useState({...profileData});
  const [uploading , setUploading] = useState({avatar : false , logo : false});
  const [saving , setSaving] = useState(false);


  const handleInputChange = ({field , value}) => {
    setFormData((prev) => ({
      ...prev,
      [field] : value
    }));
  };

  const handleImageUpload = async (field , type) => {};

  const handleImageChange = async (e , type) => {};

  const handleSave = () => {};

  const handleCancel = () => {
    setFormData({...profileData});
    setEditMode(false);
  }
  return ( 
    <DashboardLayout activeMenu="company-profile">
      <div className='min-h-screen bg-gray-50 px-8 py-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-white rounded-xl shadow overflow-hidden'>
            {/*header */}
            <div className='bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 flex items-center justify-between'>
              <h1 className='text-xl font-medium text-white'>
                Employer Profile
              </h1>
              <button className='bg-white/10 hover:bg-opacicy-30 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2' onClick={() => setEditMode(false)}>
                <Edit3 className='w-4 h-4'/>
                <span>Edit Profile</span>
              </button>
            </div>
            {/*Profile content */}
            <div className='p-8'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/*Profile information */}
                <div className='space-y-6'>
                  <h2 className='text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2'>
                    Profile Information
                  </h2>
                  <div className='flex items-center space-x-4'>
                    <img className='w-20 h-20 rounded-full object-cover border-4 border-blue-50' src={profileData.avatar} alt="avatar" />
                    <div>
                      <h3 className='text-lg font-semibold text-gray-800'>{profileData.name}</h3>
                      <div className='flex items-center text-sm text-gray-600 mt-1'>
                        <Mail className='w-4 h-4 mr-2'/>
                        <span className=''>{formData.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default EmployerProfilePage