import {Building , Building2 , MapPin , Calendar , Bookmark} from 'lucide-react'
import moment from 'moment'
import { useAuth } from '../../context/AuthContext'
import StatusBadge from '../StatusBadge'
 
const JobCard = ({job , onClick , onToggleSave , onApply ,saved , hideApply }) => {
    const {user} = useAuth();

    const formatSalary = (min, max) => {
        const formatNumber = (num) => {
            if (num >= 1000) {
                return `${(num / 1000).toFixed(0)}k`;
            }

            return num;
        };

        return `Taka ${formatNumber(min)} - ${formatNumber(max)}/m`;
    };
    
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top Header: Logo, Company info & Bookmark Button */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          {job?.company?.companyLogo ? (
            <img
              className="w-12 h-12 rounded-xl object-contain border border-slate-100 dark:border-slate-800 bg-white p-1 shadow-sm shrink-0"
              src={job?.company?.companyLogo}
              alt="company logo"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
          )}
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
              {job.title}
            </h3>
            <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">{job?.company?.companyName || 'Company'}</span>
            </p>
          </div>
        </div>
        {user && (
          <button
            className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            title={job?.isSaved || saved ? 'Saved' : 'Save job'}
          >
            <Bookmark
              className={`w-5 h-5 transition-colors ${
                job?.isSaved || saved
                  ? 'fill-blue-600 text-blue-600 dark:text-blue-500'
                  : 'hover:text-blue-600 text-slate-400'
              }`}
            />
          </button>
        )}
      </div>

      {/* Badges / Job attributes */}
      <div className="my-4">
        <div className="flex flex-wrap items-center gap-2">
          {job?.location && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {job.location}
            </span>
          )}
          {job?.type && (
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${
                job?.type === 'Full-Time'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40'
                  : job.type === 'Part-Time'
                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/40'
                  : job.type === 'Contract'
                  ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/40'
                  : 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/40'
              }`}
            >
              {job?.type}
            </span>
          )}
          {job?.category && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
              {job?.category}
            </span>
          )}
        </div>
      </div>

      {/* Date posted */}
      <div className="mb-4">
        <div className="flex items-center">
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            {job?.createdAt ? moment(job?.createdAt).format('DD MMM YYYY') : 'N/A'}
          </span>
        </div>
      </div>

      {/* Footer: Salary & Action button */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
        <div className="text-sm font-bold text-slate-900 dark:text-white">
          {formatSalary(job?.salaryMin, job?.salaryMax)}
        </div>
        {!saved && (
          <>
            {job?.applicationStatus ? (
              <StatusBadge status={job?.applicationStatus} />
            ) : (
              !hideApply && (
                <button
                  className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-medium rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-sm shadow-blue-500/20 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    onApply();
                  }}
                >
                  Apply Now
                </button>
              )
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default JobCard