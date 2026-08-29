import {useEffect , useState} from 'react';
import { Briefcase, Building2, Layout, X , Menu} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { NAVIGATION_MENU } from '../../utils/data';

const DashboardLayout = ({activeMenu}) => {

    const {user , layout} = useAuth();
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

  return (
    <div>DashboardLayout</div>
    
  )
}

export default DashboardLayout

