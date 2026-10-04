import { MapPin, Building2, Clock, Users, ArrowLeft } from 'lucide-react';
import { TbCurrencyTaka } from "react-icons/tb";
import { useAuth } from '../../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import moment from 'moment';
import StatusBadge from '../../components/StatusBadge';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const JobDetails = () => {
  const { user } = useAuth();
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const getJobDetailsById = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.JOBS.GET_JOB_BY_Id(jobId), {
        params: { userId: user?._id || null }
      });
      setJobDetails(response.data);
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setLoading(false);
    }
  }, [jobId, user?._id]);

  const applyToJob = async () => {
    if (!user) {
      toast.error("আবেদন করতে অনুগ্রহ করে লগইন করুন");
      navigate("/login");
      return;
    }

    try {
      if (!jobId) return;

      await axiosInstance.post(
        API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId)
      );

      toast.success("Applied to job successfully");
      await getJobDetailsById();
    } catch (error) {
      console.error("Error applying to job:", error);
      toast.error(
        error.response?.data?.message ||
        "Something went wrong! Try again later"
      );
    }
  };

  useEffect(() => {
    if (jobId) {
      getJobDetailsById();
    }
  }, [jobId, getJobDetailsById]);

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 bg-white">
        {/* Back button */}
        <motion.button
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-bold text-sm shadow-xs hover:bg-slate-50 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>পেছনে ফিরে যান</span>
        </motion.button>

        {loading ? (
          <div className="py-20 text-center font-bold text-slate-500">
            চাকরির বিস্তারিত লোড হচ্ছে...
          </div>
        ) : jobDetails ? (
          <div className="space-y-6">
            {/* Main Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm"
            >
              {/* Decorative colorful glow orbs */}
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -left-20 -bottom-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  {/* Company + Job Info */}
                  <div className="flex min-w-0 items-start gap-4 sm:gap-5">
                    {/* Company Logo */}
                    {jobDetails?.company?.companyLogo ? (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xs sm:h-20 sm:w-20">
                        <img
                          src={jobDetails?.company?.companyLogo}
                          alt="companyLogo"
                          className="h-full w-full rounded-xl object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 sm:h-20 sm:w-20 text-white shadow-md shadow-blue-500/25">
                        <Building2 className="h-8 w-8 sm:h-9 sm:w-9" />
                      </div>
                    )}

                    {/* Job Details */}
                    <div className="min-w-0 pt-0.5">
                      {jobDetails?.company?.companyName && (
                        <p className="mb-1 text-sm font-bold text-blue-600">
                          {jobDetails.company.companyName}
                        </p>
                      )}

                      <h1 className="break-words text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl">
                        {jobDetails.title}
                      </h1>

                      {/* Location */}
                      <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-600">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <span className="truncate">{jobDetails.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Apply / Status */}
                  <div className="shrink-0 lg:pt-1">
                    {jobDetails?.applicationStatus ? (
                      <StatusBadge status={jobDetails.applicationStatus} />
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-7 py-3.5 text-sm font-extrabold text-white shadow-md shadow-blue-600/25 hover:shadow-lg transition-all sm:w-auto cursor-pointer"
                        onClick={applyToJob}
                      >
                        আবেদন করুন
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-slate-100" />

                {/* Job Meta Information */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-700">
                    {jobDetails.category}
                  </span>

                  <span className="inline-flex items-center rounded-xl border border-purple-200 bg-purple-50 px-3.5 py-1.5 text-xs font-bold text-purple-700">
                    {jobDetails.type}
                  </span>

                  <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700">
                    <Clock className="h-3.5 w-3.5 text-slate-500" />
                    <span>
                      {jobDetails?.createdAt
                        ? moment(jobDetails.createdAt).format("DD MMM YYYY")
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Compensation Card */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xs">
                    <TbCurrencyTaka className="h-7 w-7" />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      বেতন প্যাকেজ
                    </h3>
                    <div className="mt-1 flex flex-wrap items-baseline gap-2">
                      <span className="text-xl font-black text-slate-900">
                        ৳ {jobDetails.salaryMin} - {jobDetails.salaryMax}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        প্রতি মাসে
                      </span>
                    </div>
                  </div>
                </div>

                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-xs font-bold text-emerald-800">
                  <Users className="h-4 w-4 text-emerald-600" />
                  <span>প্রতিযোগিতামূলক বেতন</span>
                </div>
              </div>
            </div>

            {/* About This Role */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="flex items-center gap-3 text-lg font-black text-slate-900">
                <div className="h-6 w-1.5 rounded-full bg-blue-600" />
                <span>কাজের বিবরণী (Job Description)</span>
              </h3>

              <div className="mt-4 whitespace-pre-line text-sm leading-7 font-medium text-slate-700">
                {jobDetails?.descriptions}
              </div>
            </div>

            {/* What We're Looking For */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="flex items-center gap-3 text-lg font-black text-slate-900">
                <div className="h-6 w-1.5 rounded-full bg-purple-600" />
                <span>যোগ্যতা ও দক্ষতা (Requirements)</span>
              </h3>

              <div className="mt-4 whitespace-pre-line text-sm leading-7 font-medium text-slate-700">
                {jobDetails?.requirements}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-slate-600">
            চাকরির তথ্য খুঁজে পাওয়া যায়নি।
          </div>
        )}
      </main>
    </div>
  );
};

export default JobDetails;