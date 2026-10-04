import { useState, useEffect } from 'react';
import { Briefcase, Bookmark } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileDropdown from './layout/ProfileDropdown';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [profileDropdownOpen]);

  return (
    <header className="fixed left-0 top-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            className="flex items-center gap-2.5 group transition-transform active:scale-95"
            to="/find-jobs"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all duration-200">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-900 tracking-tight leading-none">
                জবপোর্টাল
              </span>
              <span className="text-[10px] font-semibold text-blue-600 tracking-wider uppercase mt-0.5">
                Job Seeker
              </span>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {user && (
              <button
                type="button"
                className="p-2.5 rounded-xl text-slate-800 hover:text-blue-600 hover:bg-slate-100 transition-all duration-200 relative active:scale-95 border border-slate-200/70"
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
                  e.stopPropagation();
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
                avatar={user?.avatar || ''}
                companyName={user?.name || ''}
                email={user?.email || ''}
                userRole={user?.role || ''}
                onLogout={logout}
              />
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  className="text-slate-900 hover:text-blue-600 font-bold text-sm px-4 py-2 rounded-xl hover:bg-slate-100 transition-all"
                  to="/login"
                >
                  লগইন
                </Link>
                <Link
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all duration-200 active:scale-95"
                  to="/signup"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;