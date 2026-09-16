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
    <header className="fixed left-0 top-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            className="flex items-center gap-2.5 group transition-transform active:scale-95"
            to="/find-jobs"
          >
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 dark:from-white dark:to-slate-200 bg-clip-text text-transparent tracking-tight">
              জবপোর্টাল
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {user && (
              <button
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 relative active:scale-95"
                onClick={() => navigate('/saved-jobs')}
                title="Saved Jobs"
              >
                <Bookmark className="h-5 w-5" />
              </button>
            )}

            {isAuthenticated ? (
              <ProfileDropdown
                isOpen={profileDropdownOpen}
                onToggle={(e) => {
                  e.stopPropagation()
                  setProfileDropdownOpne(!profileDropdownOpen)
                }}
                avatar={user?.avatar || ''}
                companyName={user?.name || ''}
                email={user?.email || ''}
                userRole={user?.role || ''}
                onLogout={logout}
              />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium text-sm px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-sm shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/30 transition-all duration-200 active:scale-95"
                  to="/signup"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar