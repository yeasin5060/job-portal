import { useState, useEffect, useCallback } from "react";
import {
  Grid,
  List,
  ArrowLeft,
  Bookmark,
  BriefcaseBusiness,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import Navbar from "../../components/Navbar";
import JobCard from "../../components/Cards/JobCard";
import toast from "react-hot-toast";

const SavedJobs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [savedJoblist, setSavedJobList] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);

  const getSavedJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.JOBS.GET_SAVE_JOBS);
      setSavedJobList(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
      setSavedJobList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUnsaveJob = async (jobId) => {
    try {
      await axiosInstance.delete(API_PATHS.JOBS.UNSAVE_JOB(jobId));
      toast.success("Job removed successfully");
      getSavedJobs();
    } catch (error) {
      console.error("Error removing saved job:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong! Try again later"
      );
    }
  };

  useEffect(() => {
    if (user) {
      getSavedJobs();
    } else {
      setLoading(false);
    }
  }, [user, getSavedJobs]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8 bg-white">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs"
        >
          {/* Left */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-xs hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.button>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  সংরক্ষিত চাকরি
                </h1>

                {savedJoblist.length > 0 && (
                  <span className="rounded-full bg-blue-600 px-3 py-0.5 text-xs font-extrabold text-white shadow-xs">
                    {savedJoblist.length}
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm font-medium text-slate-600">
                আপনার পছন্দের ও সংরক্ষিত চাকরির তালিকা এখানে দেখুন
              </p>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex w-fit items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white text-blue-600 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="Grid view"
            >
              <Grid className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-white text-blue-600 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <div>
          {loading ? (
            <div className="py-20 text-center text-slate-500 font-medium">
              লোড হচ্ছে...
            </div>
          ) : savedJoblist.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex min-h-[440px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 shadow-xs"
            >
              <div className="max-w-md text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-50 to-indigo-50 border border-blue-100 text-blue-600">
                  <Bookmark className="h-9 w-9 text-blue-600 animate-pulse" />
                </div>

                <h3 className="mt-6 text-2xl font-black text-slate-900">
                  এখনো কোনো চাকরি সংরক্ষণ করেননি
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm font-medium leading-6 text-slate-600">
                  নতুন চাকরির সুযোগগুলো দেখুন এবং যেগুলোতে আবেদন করতে চান সেগুলো সংরক্ষণ করে রাখুন।
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => navigate("/find-jobs")}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/25 hover:shadow-lg transition-all cursor-pointer"
                >
                  <BriefcaseBusiness className="h-4 w-4" />
                  চাকরি খুঁজুন
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* Saved Jobs List */
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 },
                },
              }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-5 md:grid-cols-2"
                  : "space-y-4"
              }
            >
              {savedJoblist.map((savedJob) => (
                <JobCard
                  key={savedJob._id}
                  job={savedJob?.job}
                  onClick={() => navigate(`/job/${savedJob?.job?._id}`)}
                  onToggleSave={() => handleUnsaveJob(savedJob?.job?._id)}
                  saved
                />
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SavedJobs;
