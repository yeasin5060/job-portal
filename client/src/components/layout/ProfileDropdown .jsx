import React from 'react'
import {ChevronDown} from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom'
 
const ProfileDropdown  = ({isOpen , onToggle , avatar , companyName , email , onLogout }) => {
    const navigate = useNavigate();
  return (
    <div className='relative'>
        <button className='flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200' onClick={onToggle}>
            {
                avatar ? (
                    <img className='w-9 h-9 object-cover rounded-xl' src={avatar} alt='avatar'/>
                ) : (
                   <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center'>
                        <span className='text-white font-semibold text-sm'>
                            {companyName.charAt(0).toUpperCase()}
                        </span>
                   </div>
                )

            }
            <div className='hidden sm:block text-left'>
                <p className='text-sm font-medium text-gray-900'>{companyName}</p>
                <p className='text-xs text-gray-500'>Employer</p>
            </div>
            <ChevronDown className='w-4 h-4 text-gray-400'/>
        </button>
        {
            isOpen && (
                <div className='absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50'>
                    <div className='px-4 py-3 border-r border-gray-100'>
                        <p className='text-sm font-medium text-gray-900'>{companyName}</p>
                        <p className='text-xs text-gray-500'>{email}</p>
                    </div>
                    <Link className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors' onClick={ () => navigate(userRole === "jobseeker" ? "/profile" : "/company-profile")}>
                        View Profile
                    </Link>
                    <div className='border-2 border-gray-100 mt-2 pt-2'>
                        <Link className='block px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors' to="#" onClick={onLogout}>
                            Sign out
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ProfileDropdown 