import {
  Building2,
  MapPin,
  Calendar,
  Bookmark,
  Briefcase,
} from "lucide-react";
import moment from "moment";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import StatusBadge from "../StatusBadge";

const JobCard = ({
  job,
  onClick,
  onToggleSave,
  onApply,
  saved,
  hideApply,
}) => {
  const { user } = useAuth();

  const formatSalary = (min, max) => {
    const formatNumber = (num) => {
      if (!num) return 0;
      if (num >= 1000) {
        return `${(num / 1000).toFixed(0)}k`;
      }
      return num;
    };

    return `৳ ${formatNumber(min)} - ${formatNumber(max)} / মাস`;
  };

  const isJobSaved = job?.isSaved || saved;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.006 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group relative flex flex-col justify-between p-6 bg-white border border-slate-200/90 rounded-2xl shadow-xs hover:shadow-xl hover:border-blue-400/80 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top subtle colorful gradient bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5 min-w-0">
            {job?.company?.companyLogo ? (
              <img
                className="w-12 h-12 rounded-xl object-contain border border-slate-200 bg-white p-1 shadow-xs shrink-0"
                src={job.company.companyLogo}
                alt="company logo"
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 border border-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 shrink-0 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
            )}

            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {job?.title}
              </h3>

              <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mt-1">
                <Briefcase className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className="truncate">
                  {job?.company?.companyName || "Company"}
                </span>
              </p>
            </div>
          </div>

          {/* Save Button */}
          {user && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-xl border transition-all shrink-0 ${
                isJobSaved
                  ? "bg-blue-50 border-blue-200 text-blue-600 shadow-xs"
                  : "bg-white border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave();
              }}
              title={isJobSaved ? "Saved" : "Save job"}
            >
              <Bookmark
                className={`w-4 h-4 transition-colors ${
                  isJobSaved
                    ? "fill-blue-600 text-blue-600"
                    : "text-slate-600 group-hover:text-blue-600"
                }`}
              />
            </motion.button>
          )}
        </div>

        {/* Job Attributes / Colorful Badges */}
        <div className="my-4">
          <div className="flex flex-wrap items-center gap-2">
            {job?.type && (
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border shadow-xs ${
                  job.type === "Full-Time"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : job.type === "Part-Time"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : job.type === "Contract"
                    ? "bg-purple-50 text-purple-800 border-purple-200"
                    : "bg-blue-50 text-blue-800 border-blue-200"
                }`}
              >
                {job.type}
              </span>
            )}

            {job?.category && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-xs">
                {job.category}
              </span>
            )}

            {job?.location && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                {job.location}
              </span>
            )}
          </div>
        </div>

        {/* Posted Date */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {job?.createdAt
              ? moment(job.createdAt).format("DD MMM YYYY")
              : "N/A"}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
        {/* Salary */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            বেতন
          </span>
          <div className="text-sm sm:text-base font-extrabold text-slate-900">
            {formatSalary(job?.salaryMin, job?.salaryMax)}
          </div>
        </div>

        {/* Application Status / Apply */}
        <div>
          {job?.applicationStatus ? (
            <StatusBadge status={job.applicationStatus} />
          ) : (
            !hideApply && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-4 sm:px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-sm shadow-blue-500/25 transition-all cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onApply();
                }}
              >
                আবেদন করুন
              </motion.button>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;