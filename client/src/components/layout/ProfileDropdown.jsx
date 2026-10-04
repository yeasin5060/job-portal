import { ChevronDown, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileDropdown = ({
  isOpen,
  onToggle,
  avatar,
  companyName,
  email,
  onLogout,
  userRole,
}) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(userRole === 'jobseeker' ? '/profile' : '/company-profile');
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center space-x-3 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200/80 transition-all duration-200 active:scale-95 shadow-sm"
        onClick={onToggle}
      >
        {avatar ? (
          <img
            className="w-8 h-8 sm:w-9 sm:h-9 object-cover rounded-xl border border-slate-200"
            src={avatar}
            alt="avatar"
          />
        ) : (
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm shadow-blue-500/20">
            <span className="text-white font-bold text-sm">
              {(companyName || 'U').charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div className="hidden sm:block text-left max-w-[130px]">
          <p className="text-sm font-bold text-slate-900 truncate">
            {companyName || 'User'}
          </p>
          <p className="text-[11px] font-medium text-slate-500 capitalize truncate">
            {userRole || 'Member'}
          </p>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-slate-700 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-blue-600' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 overflow-hidden"
          >
            {/* Header info */}
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70">
              <p className="text-sm font-bold text-slate-900 truncate">
                {companyName}
              </p>
              <p className="text-xs text-slate-500 truncate mt-0.5">{email}</p>
              <span className="inline-block mt-1.5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 rounded-md">
                {userRole}
              </span>
            </div>

            {/* Menu Items */}
            <div className="p-1.5 space-y-0.5">
              <button
                type="button"
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-800 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-colors cursor-pointer text-left"
                onClick={handleProfileClick}
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>View Profile</span>
              </button>

              <button
                type="button"
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer text-left"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Sign out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;