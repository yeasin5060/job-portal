import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  X,
  Grid,
  List,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import LoadingSpinner from "../../components/LoadingSpinner";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

import FilterContent from "./components/FilterContent";
import SearchHeader from "./components/SearchHeader";
import Navbar from "../../components/Navbar";
import JobCard from "../../components/Cards/JobCard";

const JobSeekerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);       // প্রথম লোড
  const [filterLoading, setFilterLoading] = useState(false); // ফিল্টার রিলোড
  const [viewMode, setViewMode] = useState("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    category: "",
    type: "",
    minSalary: "",
    maxSalary: "",
    experience: "",
    remoteOnly: false,
  });

  // Filter sections
  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    salary: true,
    category: true,
  });

  // =========================
  // Fetch Jobs
  // =========================
  const fetchJobs = useCallback(
    async (filterParams = {}, isFilter = false) => {
      try {
        if (isFilter) {
          setFilterLoading(true);
        } else {
          setLoading(true);
        }
        setError(null);

        const params = new URLSearchParams();

        if (filterParams.keyword) {
          params.append("keyword", filterParams.keyword);
        }

        if (filterParams.location) {
          params.append("location", filterParams.location);
        }

        if (filterParams.category) {
          params.append("category", filterParams.category);
        }

        if (filterParams.type) {
          params.append("type", filterParams.type);
        }

        if (filterParams.minSalary) {
          params.append("minSalary", filterParams.minSalary);
        }

        if (filterParams.maxSalary) {
          params.append("maxSalary", filterParams.maxSalary);
        }

        if (filterParams.experience) {
          params.append("experience", filterParams.experience);
        }

        if (filterParams.remoteOnly) {
          params.append("remoteOnly", "true");
        }

        // Pass userId if available so backend attaches isSaved / applicationStatus
        if (user?._id) {
          params.append("userId", user._id);
        }

        const response = await axiosInstance.get(
          `${API_PATHS.JOBS.GET_ALL_JOBS}?${params.toString()}`
        );

        const jobsData = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.jobs)
          ? response.data.jobs
          : [];

        setJobs(jobsData);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs. Please try again later.");
        setJobs([]);
      } finally {
        setLoading(false);
        setFilterLoading(false);
      }
    },
    [user?._id]
  );

  // =========================
  // Filter Change
  // =========================
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // =========================
  // Toggle Filter Section
  // =========================
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // =========================
  // Clear Filters
  // =========================
  const clearAllFilters = () => {
    setFilters({
      keyword: "",
      location: "",
      category: "",
      type: "",
      minSalary: "",
      maxSalary: "",
      experience: "",
      remoteOnly: false,
    });
  };

  // =========================
  // Remove single active filter
  // =========================
  const removeFilter = (key) => {
    handleFilterChange(key, "");
  };

  // =========================
  // Immediate Search
  // =========================
  const handleImmediateSearch = () => {
    fetchJobs(filters);
  };

  // =========================
  // Fetch when filters or user change (debounced)
  // =========================
  // প্রথম লোড
  useEffect(() => {
    fetchJobs(filters, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchJobs]);

  // ফিল্টার পরিবর্তনে debounced reload (inline spinner)
  useEffect(() => {
    // প্রথম রেন্ডারে skip করা হয়
    if (loading) return;
    const timeoutId = setTimeout(() => {
      fetchJobs(filters, true);
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [
    filters.keyword,
    filters.location,
    filters.category,
    filters.type,
    filters.minSalary,
    filters.maxSalary,
    filters.experience,
    filters.remoteOnly,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ]);

  // =========================
  // Save / Unsave Job
  // =========================
  const toggleSaveJob = async (jobId, isSaved) => {
    if (!user) {
      toast.error("অনুগ্রহ করে লগইন করুন");
      navigate("/login");
      return;
    }

    try {
      if (isSaved) {
        await axiosInstance.delete(API_PATHS.JOBS.UNSAVE_JOB(jobId));
        toast.success("Job removed successfully!");
      } else {
        await axiosInstance.post(API_PATHS.JOBS.SAVE_JOB(jobId));
        toast.success("Job saved successfully!");
      }

      await fetchJobs(filters);
    } catch (err) {
      console.error("Error saving job:", err);
      toast.error(
        err.response?.data?.message || "Something went wrong! Please try again."
      );
    }
  };

  // =========================
  // Apply Job
  // =========================
  const applyToJob = async (jobId) => {
    if (!user) {
      toast.error("আবেদন করতে অনুগ্রহ করে লগইন করুন");
      navigate("/login");
      return;
    }

    try {
      if (!jobId) return;

      await axiosInstance.post(API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId));
      toast.success("Application submitted successfully!");
      await fetchJobs(filters);
    } catch (err) {
      console.error("Error applying job:", err);
      toast.error(
        err.response?.data?.message || "Something went wrong! Please try again."
      );
    }
  };

  // Check if any filter is active
  const hasActiveFilters = Boolean(
    filters.keyword ||
      filters.location ||
      filters.category ||
      filters.type ||
      filters.minSalary ||
      filters.maxSalary
  );

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <Navbar />

      <main className="min-h-screen mt-16 bg-white pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-8">
          {/* Search Header */}
          <SearchHeader
            filters={filters}
            handleFilterChange={handleFilterChange}
            onSearch={handleImmediateSearch}
          />

          <div className="flex gap-6 lg:gap-8 items-start">
            {/* =========================
                Desktop Filter Sidebar
            ========================= */}
            <aside className="hidden lg:block w-80 shrink-0">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/90 p-6 sticky top-24">
                {/* Filter Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                      <Filter className="w-4 h-4" />
                    </div>
                    <h2 className="font-extrabold text-lg text-slate-900 tracking-tight">
                      ফিল্টার করুন
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>রিসেট</span>
                  </button>
                </div>

                <FilterContent
                  toggleSection={toggleSection}
                  clearAllFilters={clearAllFilters}
                  expandedSections={expandedSections}
                  filters={filters}
                  handleFilterChange={handleFilterChange}
                />
              </div>
            </aside>

            {/* =========================
                Jobs Content Area
            ========================= */}
            <section className="flex-1 min-w-0">
              {/* Result Stats Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />

                  <p className="text-slate-800 text-sm sm:text-base font-bold">
                    উপলব্ধ চাকরি:{" "}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-600 text-white shadow-xs">
                      {jobs.length}
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  {/* Mobile Filter Button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    className="lg:hidden inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 font-bold text-xs sm:text-sm text-slate-900 shadow-xs hover:bg-slate-50 cursor-pointer"
                    onClick={() => setShowMobileFilters(true)}
                  >
                    <Filter className="h-4 w-4 text-blue-600" />
                    <span>ফিল্টার ({hasActiveFilters ? "সক্রিয়" : "সব"})</span>
                  </motion.button>

                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      className={`p-1.5 sm:p-2 rounded-lg transition-all cursor-pointer ${
                        viewMode === "grid"
                          ? "bg-white text-blue-600 shadow-xs font-bold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                      onClick={() => setViewMode("grid")}
                      title="Grid view"
                    >
                      <Grid className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      className={`p-1.5 sm:p-2 rounded-lg transition-all cursor-pointer ${
                        viewMode === "list"
                          ? "bg-white text-blue-600 shadow-xs font-bold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                      onClick={() => setViewMode("list")}
                      title="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filter Chips */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="text-xs font-bold text-slate-500">
                    সক্রিয় ফিল্টার:
                  </span>

                  {filters.keyword && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      কীওয়ার্ড: {filters.keyword}
                      <button
                        type="button"
                        onClick={() => removeFilter("keyword")}
                        className="hover:text-blue-900 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  )}

                  {filters.location && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      স্থান: {filters.location}
                      <button
                        type="button"
                        onClick={() => removeFilter("location")}
                        className="hover:text-rose-900 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  )}

                  {filters.type && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ধরন: {filters.type}
                      <button
                        type="button"
                        onClick={() => removeFilter("type")}
                        className="hover:text-emerald-900 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  )}

                  {filters.category && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      ক্যাটেগরি: {filters.category}
                      <button
                        type="button"
                        onClick={() => removeFilter("category")}
                        className="hover:text-indigo-900 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline px-2 py-1 cursor-pointer"
                  >
                    সব মুছুন
                  </button>
                </div>
              )}

              {/* =========================
                  Jobs Content State
              ========================= */}
              {loading || filterLoading ? (
                // লোডিং: inline ছোট স্পিনার — Navbar ও Sidebar দেখা যাবে
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xs">
                  <LoadingSpinner inline />
                </div>
              ) : error ? (
                /* Error */
                <div className="text-center py-16 bg-white rounded-3xl border border-rose-100 shadow-sm p-8">
                  <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    কোনো চাকরি পাওয়া যায়নি
                  </h3>

                  <p className="text-slate-600 mt-2 text-sm">{error}</p>

                  <button
                    type="button"
                    onClick={() => fetchJobs(filters)}
                    className="mt-5 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/25 cursor-pointer"
                  >
                    আবার চেষ্টা করুন
                  </button>
                </div>
              ) : jobs.length === 0 ? (
                /* Empty state */
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 lg:py-24 bg-white rounded-3xl border border-dashed border-slate-300 p-8 shadow-xs"
                >
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center mx-auto mb-5 text-blue-600">
                    <Sparkles className="h-10 w-10 animate-pulse" />
                  </div>

                  <h3 className="text-2xl font-black text-slate-900">
                    কোনো চাকরি পাওয়া যায়নি
                  </h3>

                  <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-md mx-auto">
                    আপনার ফিল্টারের সাথে মিলে এমন কোনো চাকরি পাওয়া যায়নি। সার্চ কীওয়ার্ড পরিবর্তন করুন বা ফিল্টার রিসেট করুন।
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-bold rounded-xl shadow-md shadow-blue-500/25 hover:shadow-lg cursor-pointer"
                    onClick={clearAllFilters}
                  >
                    সব ফিল্টার রিসেট করুন
                  </motion.button>
                </motion.div>
              ) : (
                /* Jobs Cards */
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5"
                      : "space-y-4"
                  }
                >
                  {jobs.map((job) => (
                    <JobCard
                      key={job._id}
                      job={job}
                      onClick={() => navigate(`/job/${job._id}`)}
                      onToggleSave={() =>
                        toggleSaveJob(job._id, job.isSaved)
                      }
                      onApply={() => applyToJob(job._id)}
                    />
                  ))}
                </motion.div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* =========================
          Mobile Filter Drawer (Animated)
      ========================= */}
      <AnimatePresence>
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
              onClick={() => setShowMobileFilters(false)}
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 240 }}
              className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-2xl flex flex-col z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                    <Filter className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">
                    ফিল্টার অপশন
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>
              </div>

              {/* Filter Content Body */}
              <div className="p-6 overflow-y-auto flex-1 bg-white">
                <FilterContent
                  toggleSection={toggleSection}
                  clearAllFilters={clearAllFilters}
                  expandedSections={expandedSections}
                  filters={filters}
                  handleFilterChange={handleFilterChange}
                />
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-200 bg-white flex gap-3">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="flex-1 py-3 border border-slate-200 text-slate-800 font-bold rounded-xl text-sm hover:bg-slate-50"
                >
                  রিসেট
                </button>
                <button
                  type="button"
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-sm shadow-md shadow-blue-500/25"
                >
                  ফলাফল দেখুন ({jobs.length})
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobSeekerDashboard;
