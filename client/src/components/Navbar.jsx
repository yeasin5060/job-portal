import {useState , useEffect} from 'react'
import {Briefcase , Bookmark} from 'lucide-react'
import { useNavigate , Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ProfileDropdown from './layout/ProfileDropdown '


const Navbar = () => {

    const { user , isAuthenticated , logout} = useAuth();
    const navigate = useNavigate();

    const [profileDropdownOpen , setProfileDropdownOpne] = useState(false);

    useEffect(() => {
        const handleClickOutsite = () => {
            if(profileDropdownOpen) {
                setProfileDropdownOpne(false)
            }
        }

        document.addEventListener("click" , handleClickOutsite);
        return () => document.removeEventListener('click' , handleClickOutsite);
    },[profileDropdownOpen]);
  return (
    <header className='fiwed left-0 top-0 right-0 z-50 bg-white/95 backdrop-blur-sm border border-gray-100'>
        <div className='container mx-auto px-4'>
            <div className='flex items-center justify-between h-16'>
                {/*logo*/}
                <Link className='flex items-center space-x-3' to='/find-jobs'>
                    <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center'>
                        <Briefcase className='w-5 h-5 text-white'/>
                    </div>
                    <span className='text-lg font-medium text-gray-900'>জবপোর্টাল</span>
                </Link>
                <div className='flex items-center space-x-3'>
                    {
                        user && (
                            <button className='p-2 hover:bg-gray-100 transition-colors duration-200 relative' onClick={() => navigate('/saved-jobs')}>
                                <Bookmark className='h-5 w-5 text-gray-500'/>
                            </button>
                        )
                    }

                    {
                        isAuthenticated  ? (
                            <ProfileDropdown isOpen={profileDropdownOpen} onToggle={(e) => { e.stopPropagation() ; setProfileDropdownOpne(!profileDropdownOpen)}} avatar={user?.avatar || ""} companyName={user?.name || ""} email={user?.email || ""} uerRole = {user?.role || ""} onLogout={logout}/>
                        ) : (
                            <>
                                <a className='text-gray-600 hover:text-gray-900 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-gray-500' href='/login'>Login</a>
                                <a className='bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md' href='/signup'>Sign up</a>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar