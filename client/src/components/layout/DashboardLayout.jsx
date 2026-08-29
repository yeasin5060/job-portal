import {useEffect , useState} from 'react';
import { Briefcase, Building2, Layout, X , Menu, LogOut} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { NAVIGATION_MENU } from '../../utils/data';

const DashboardLayout = ({activeMenu}) => {

    const {user , logout} = useAuth();
    const navigate = useNavigate();

    const [sidebarOpen , setSidebarOpne] = useState(false);
    const [activeNavItem , setActiveNavItem] = useState(activeMenu || "dashboard");
    const [profileDropdownOpen , setProfileDropdownOpen] = useState(false);
    const [isMobile , setIsMobile] = useState(false);

    useEffect (() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if(mobile) {
                setSidebarOpne(false)
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize" , handleResize);
        }
    },[]);

    useEffect (() => {
        const handleClickOutside = () => {
            if(profileDropdownOpen) {
                setProfileDropdownOpen(false)
            }
        }

        document.addEventListener("click" , handleClickOutside);
        return () => document.removeEventListener("click" , handleClickOutside)
    },[profileDropdownOpen]);

    const handleNavigation = (itemId) => {
        setActiveNavItem(itemId);
        navigate(`/${itemId}`);

        if(isMobile) {
            setSidebarOpne(false);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpne(!sidebarOpen)
    };

    const sidebarCollapsed = !isMobile && false;

  return (
    <div className='flex h-screen bg-gray-50'>
       <div className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ${isMobile ? sidebarOpen ? "translate-x-0" : "-translate-x-full" : "translate-x-0"} ${sidebarCollapsed ? "w-16" : "w-64"} bg-white border-r border-gray-200`}>
            <div className='flex items-center h-16 border-b border-gray-200 pl-6'>
                {
                    sidebarCollapsed ? (
                        <Link className='flex items-center space-x-3' to = "/" >
                            <div className='w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center'>
                                <Briefcase className='w-5 h-5 text-white'/>
                            </div>
                            <span className='text-xl font-bold text-gray-900'>Jobprotal</span>
                        </Link>
                    ) : (
                        <div className='w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center'>
                            <Building2 className='w-5 h-5 text-white'/>
                        </div>
                    )
                }
            </div>
            {/* Navigation */}

            {/* Logout */}
            <div className='absolute left-4 right-4 bottom-4'>
                <button className='w-fit flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200' onClick={logout}>
                    <LogOut className='h-5 w-5 flex shrink-0 text-gray-500'/>
                    {!sidebarCollapsed && <span className='ml-3'>Logout</span>}
                </button>
            </div>
       </div>
    </div>

  )
}

export default DashboardLayout

