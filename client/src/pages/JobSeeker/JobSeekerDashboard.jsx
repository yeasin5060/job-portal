
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  X,
  Grid,
  List,
} from "lucide-react";

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
  const [loading, setLoading] = useState(true);
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
  const fetchJobs = async (filterParams = {}) => {
  try {
    setLoading(true);
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

    // IMPORTANT: backend expects userId
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
  } catch (error) {
    console.error("Error fetching jobs:", error);

    setError("Failed to fetch jobs. Please try again later.");
    setJobs([]);
  } finally {
    setLoading(false);
  }
  };

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
  // Get API Filters
  // =========================
  const getApiFilters = () => {
    return {
      keyword: filters.keyword,
      location: filters.location,
      category: filters.category,
      minSalary: filters.minSalary,
      maxSalary: filters.maxSalary,
      type: filters.type,
      experience: filters.experience,
      remoteOnly: filters.remoteOnly,
    };
  };

  // =========================
  // Fetch when filters change
  // =========================
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchJobs(filters);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters]);
  // =========================
  // Immediate Search
  // =========================
  const handleImmediateSearch = () => {
    fetchJobs(getApiFilters());
  };

  // =========================
  // Mobile Filter Overlay
  // =========================
  const MobileFilterOverlay = () => {
    if (!showMobileFilters) {
      return null;
    }

    return (
      <div className="fixed inset-0 z-50 lg:hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setShowMobileFilters(false)}
        />

        {/* Sidebar */}
        <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white dark:bg-slate-900 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Filters
            </h3>

            <button
              type="button"
              onClick={() => setShowMobileFilters(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-slate-700 dark:text-slate-200" />
            </button>
          </div>

          {/* Filter Content */}
          <div className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
            <FilterContent
              toggleSection={toggleSection}
              clearAllFilters={clearAllFilters}
              expandedSections={expandedSections}
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
    );
  };

  // =========================
  // Save / Unsave Job
  // =========================
  const toggleSaveJob = async (jobId, isSaved) => {
    try {
      if (isSaved) {
        await axiosInstance.delete(
          API_PATHS.JOBS.UNSAVE_JOB(jobId)
        );

        toast.success("Job removed successfully!");
      } else {
        await axiosInstance.post(
          API_PATHS.JOBS.SAVE_JOB(jobId)
        );

        toast.success("Job saved successfully!");
      }

      // Keep current filters
      await fetchJobs(getApiFilters());
    } catch (error) {
      console.error("Error saving job:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong! Please try again."
      );
    }
  };

  // =========================
  // Apply Job
  // =========================
  const applyToJob = async (jobId) => {
    try {
      if (!jobId) return;

      await axiosInstance.post(
        API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId)
      );

      toast.success("Application submitted successfully!");

      // Keep current filters
      await fetchJobs(getApiFilters());
    } catch (error) {
      console.error("Error applying job:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong! Please try again."
      );
    }
  };

  // =========================
  // Initial Loading
  // =========================
  if (loading && jobs.length === 0 && !error) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <Navbar />

      <div className="min-h-screen mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">

          {/* Search Header */}
          <SearchHeader
            filters={filters}
            handleFilterChange={handleFilterChange}
            onSearch={handleImmediateSearch}
          />

          <div className="flex gap-6 lg:gap-8">

            {/* =========================
                Desktop Filter
            ========================= */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-6 sticky top-24">

                {/* Filter Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">

                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Filter className="w-4 h-4" />
                    </div>

                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      Filter Jobs
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
                  >
                    Reset All
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
            </div>

            {/* =========================
                Jobs Area
            ========================= */}
            <div className="flex-1 min-w-0">

              {/* Result Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800 shadow-sm">

                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />

                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base font-medium">
                    Showing{" "}

                    <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/50">
                      {jobs.length}
                    </span>{" "}

                    available {jobs.length === 1 ? "job" : "jobs"}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">

                  {/* Mobile Filter Button */}
                  <button
                    type="button"
                    className="lg:hidden inline-flex items-center gap-2 bg-white dark:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-medium text-xs sm:text-sm text-slate-700 dark:text-slate-200 shadow-sm"
                    onClick={() => setShowMobileFilters(true)}
                  >
                    <Filter className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>Filters</span>
                  </button>

                  {/* View Mode */}
                  <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/60">

                    <button
                      type="button"
                      className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                        viewMode === "grid"
                          ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      }`}
                      onClick={() => setViewMode("grid")}
                      title="Grid view"
                    >
                      <Grid className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                        viewMode === "list"
                          ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      }`}
                      onClick={() => setViewMode("list")}
                      title="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>

                  </div>
                </div>
              </div>

              {/* =========================
                  Loading While Filtering
              ========================= */}
              {loading ? (
                <div className="py-10 flex justify-center">
                  <LoadingSpinner />
                </div>
              ) : error ? (
                /* Error */
                <div className="text-center py-16 bg-white/60 backdrop-blur-xl rounded-2xl">
                  <Search className="h-16 w-16 mx-auto text-gray-400 mb-6" />

                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                    Something went wrong
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={() => fetchJobs(getApiFilters())}
                    className="mt-5 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                </div>
              ) : jobs.length === 0 ? (
                /* No Jobs */
                <div className="text-center py-16 lg:py-20 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20">

                  <div className="text-gray-400 mb-6">
                    <Search className="h-16 w-16 mx-auto" />
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                    No Jobs Found
                  </h3>

                  <p className="text-gray-500 mt-2">
                    Try adjusting your search criteria or filters.
                  </p>

                  <button
                    type="button"
                    className="mt-5 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                    onClick={clearAllFilters}
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                /* Jobs */
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4"
                      : "space-y-4 lg:space-y-6"
                  }
                >
                  {jobs.map((job) => (
                    <JobCard
                      key={job._id}
                      job={job}
                      onClick={() =>
                        navigate(`/job/${job._id}`)
                      }
                      onToggleSave={() =>
                        toggleSaveJob(
                          job._id,
                          job.isSaved
                        )
                      }
                      onApply={() =>
                        applyToJob(job._id)
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter */}
        <MobileFilterOverlay />
      </div>
    </div>
  );
};

export default JobSeekerDashboard;

