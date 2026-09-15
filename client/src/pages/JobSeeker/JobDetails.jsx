import {MapPin , Building2 , Clock , Users} from 'lucide-react'
import { TbCurrencyTaka } from "react-icons/tb";
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useState , useEffect } from 'react';
import Navbar from '../../components/Navbar';
import moment from 'moment';
import StatusBadge from '../../components/StatusBadge';
import toast from 'react-hot-toast';


const JobDetails = () => {
  const {user} = useAuth();
  const {jobId} = useParams();

  const [jobDetails , setJobDetails] = useState(null);

  const getJobDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.JOBS.GET_JOB_BY_Id(jobId), {
        params : {userId : user?._id || null}
      });


      setJobDetails(response.data)
      console.log("USER ID:", user?._id); console.log("JOB DETAILS:", response.data); console.log("APPLICATION STATUS:", response.data?.applicationStatus);
    } catch (error) {
      console.error("Error fetching job details:", error);
      
    }
  }

  
const applyToJob = async () => {
  try {
    if (!jobId) return;

    await axiosInstance.post(
      API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId)
    );

    toast.success("Applied to job successfully");

    await getJobDetailsById();

  } catch (error) {
    console.error("Error:", error);

    toast.error(
      error.response?.data?.message ||
      "Something went wrong! Try again later"
    );
  }
};



  useEffect(() => {
    if(jobId && user) {
      getJobDetailsById()
    }
  },[jobId , user]);
  return (
    <div className='bg-gradient-to-br from-blue-50 via-white to-purple-50'>
      <Navbar />
      <div className='container mx-auto pt-24'>
        {
          jobDetails && (
            <div className='bg-white p-6 rounded-lg'>
              
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

                {/* Decorative Background */}
                <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
                <div className="absolute -left-20 -bottom-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

                <div className="relative p-6 sm:p-8">

                  {/* Top Section */}
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                    {/* Company + Job Info */}
                    <div className="flex min-w-0 items-start gap-4 sm:gap-5">

                      {/* Company Logo */}
                      {jobDetails?.company?.companyLogo ? (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:h-20 sm:w-20 dark:border-slate-700 dark:bg-slate-800">
                          <img
                            src={jobDetails?.company?.companyLogo}
                            alt="companyLogo"
                            className="h-full w-full rounded-xl object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 sm:h-20 sm:w-20 dark:border-blue-900/50 dark:bg-blue-950/30">
                          <Building2 className="h-7 w-7 text-blue-600 sm:h-8 sm:w-8 dark:text-blue-400" />
                        </div>
                      )}

                      {/* Job Details */}
                      <div className="min-w-0 pt-0.5">

                        {/* Company */}
                        {jobDetails?.company?.companyName && (
                          <p className="mb-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
                            {jobDetails.company.companyName}
                          </p>
                        )}

                        {/* Job Title */}
                        <h1 className="break-words text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                          {jobDetails.title}
                        </h1>

                        {/* Location */}
                        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                            <MapPin className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          </div>

                          <span className="truncate">
                            {jobDetails.location}
                          </span>
                        </div>
                      </div>
                    </div>

                      
                    {/* Apply / Status */}
                    <div className="shrink-0 lg:pt-1">
                      {jobDetails?.applicationStatus? (
                        <StatusBadge
                          status={jobDetails.applicationStatus}
                        />
                      ) : (
                        <button
                          type="button"
                          className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.97] sm:w-auto"
                          onClick={applyToJob}
                        >
                          Apply Now
                        </button>
                      )}
                    </div>

                  </div>

                  {/* Divider */}
                  <div className="my-6 border-t border-slate-100 dark:border-slate-800" />

                  {/* Job Meta Information */}
                  <div className="flex flex-wrap items-center gap-2.5">

                    {/* Category */}
                    <span className="inline-flex items-center rounded-xl border border-blue-100 bg-blue-50 px-3.5 py-2 text-xs font-semibold text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-400">
                      {jobDetails.category}
                    </span>

                    {/* Job Type */}
                    <span className="inline-flex items-center rounded-xl border border-purple-100 bg-purple-50 px-3.5 py-2 text-xs font-semibold text-purple-700 dark:border-purple-900/50 dark:bg-purple-950/30 dark:text-purple-400">
                      {jobDetails.type}
                    </span>

                    {/* Posted Date */}
                    <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />

                      <span>
                        {jobDetails?.createdAt
                          ? moment(jobDetails.createdAt).format("DD MMM YYYY")
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* contant section */}
              
              <div className="space-y-6 mt-4" >
                {/* Compensation */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      {/* Salary Info */}
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                          <TbCurrencyTaka className="h-6 w-6" />
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                            Compensation
                          </h3>

                          <div className="mt-1 flex flex-wrap items-baseline gap-2">
                            <span className="text-lg font-bold text-slate-900 dark:text-white">
                              {jobDetails.salaryMin} - {jobDetails.salaryMax}
                            </span>

                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                              Per Month
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Competitive */}
                      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3.5 py-2 text-xs font-semibold text-green-700 dark:bg-green-950/30 dark:text-green-400">
                        <Users className="h-4 w-4" />
                        <span>Competitive</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About This Role */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="flex items-center gap-3 text-lg font-bold text-slate-900 dark:text-white">
                    <div className="h-6 w-1 rounded-full bg-blue-600" />
                    <span>About This Role</span>
                  </h3>

                  <div className="mt-5">
                    <div className="whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {jobDetails?.descriptions}
                    </div>
                  </div>
                </div>

                {/* What We're Looking For */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="flex items-center gap-3 text-lg font-bold text-slate-900 dark:text-white">
                    <div className="h-6 w-1 rounded-full bg-purple-600" />
                    <span>What We're Looking For</span>
                  </h3>

                  <div className="mt-5">
                    <div className="whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {jobDetails?.requirements}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default JobDetails