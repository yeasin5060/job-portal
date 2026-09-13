import React from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import {Save , X} from 'lucide-react'
 
const EditProfileDetails = ({ formData , handleImageChange , handleInputChange , handleCancel , handleSave , saving , uploading }) => {
  return (
    <DashboardLayout activeMenu='company-profile'>
      {
        formData && <div className='min-h-screen bg-gray-50 py-8 px-4'>
          <div className='max-w-4xl mx-auto'>
            <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
              {/*Header*/}
              <div className='bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6'>
                <h1 className='text-lg md:text-xl font-medium text-white'>
                  Edit Profile 
                </h1>
              </div>
              {/*Edit Form*/}
              <div className='p-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                  {/*Personal Information*/}
                  <div className='space-y-6'>
                    <h2 className='text-lg font-medium text-gray-800 border-b pb-2'>
                      Personal Information
                    </h2>
                    <div className='flex items-center space-x-2'>
                      <div className='relative'>
                        <img className='w-20 h-20 rounded-full object-cover border-4 border-gray-100 bg-gray-200' src={formData?.avatar} alt='Avatar'/>
                        {
                          uploading?.avatar &&  (
                            <div className='absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center'>
                              <div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                            </div>
                          )
                        }
                      </div>
                      <div>
                        <label className='block'>
                          <span className='sr-only'>Choose Avatar</span>
                          <input className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file: border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors' type='file' accept='image/*' onChange={(e) => handleImageChange(e , "avatar")}/>
                        </label>
                      </div>
                    </div>
                    {/*name input */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
                      <input type='text' value={formData.name} onChange={(e) => handleInputChange(e.target.value)} className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all' placeholder='Enter your full name' />
                    </div>
                    {/*email input */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                      <input type='email' value={formData.email} disabled className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600' />
                    </div>
                  </div>
                  
                   {/*company information */}
                  <div className='space-y-6'>
                    <h2 className='text-lg font-medium text-gray-800 border-b pb-2'>
                      Company Information
                    </h2>
                    <div className='flex items-center space-x-4'>
                      <div className='relative'>
                        <img className='w-20 h-20 rounded-lg object-cover border-4 border-gray-200' src={formData?.companyLogo} alt="logo" />
                        {
                          uploading?.logo &&  (
                            <div className='absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center'>
                              <div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                            </div>
                          )
                        }
                      </div>
                      <div>
                        <label className='block'>
                          <span className='sr-only'>Choose company logo</span>
                           <input className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file: border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-blue-100 transition-colors' type='file' accept='image/*' onChange={(e) => handleImageChange(e , "logo")}/>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Company name
                      </label>
                       <input className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all' type='text' value={formData.companyName} onChange={(e) => handleInputChange("companyName" , e.target.value)} placeholder='Enter company name'/>
                    </div>
                    {/*Company description */}
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Company Description
                      </label>
                      <textarea 
                        value={formData.companyDescription}
                        onChange={(e) => handleInputChange("companyDescription", e.target.value)}
                        rows={4}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none'
                        placeholder='Describe your company...'
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      }
    </DashboardLayout>
  )
}

export default EditProfileDetails