
import { useState, useEffect } from "react";
import {
  Grid,
  List,
  ArrowLeft,
  Bookmark,
  BriefcaseBusiness,
} from "lucide-react";
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

  const getSavedJobs = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.JOBS.GET_SAVE_JOBS
      );

      setSavedJobList(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
      setSavedJobList([]);
    }
  };

  const handleUnsaveJob = async (jobId) => {
    try {
      await axiosInstance.delete(
        API_PATHS.JOBS.UNSAVE_JOB(jobId)
      );

      toast.success("Job removed successfully");
      getSavedJobs();
    } catch (error) {
      console.error("Error removing saved job:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong! Try again later"
      );
    }
  };

  useEffect(() => {
    if (user) {
      getSavedJobs();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/60 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        {savedJoblist && (
          <div>
            {/* Header */}
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              {/* Left */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-900 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                      Saved Jobs
                    </h1>

                    {savedJoblist.length > 0 && (
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                        {savedJoblist.length}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Keep track of the jobs you're interested in.
                  </p>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex w-fit items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  }`}
                  title="Grid view"
                >
                  <Grid className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  }`}
                  title="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div>
              {savedJoblist.length === 0 ? (
                /* Empty State */
                <div className="flex min-h-[500px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/80 px-6 py-12 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70">
                  <div className="max-w-md text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/30">
                      <Bookmark className="h-9 w-9 text-blue-600 dark:text-blue-400" />
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                      No saved jobs yet
                    </h3>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                      You haven't saved any jobs yet. Browse available
                      opportunities and save the ones you'd like to
                      explore later.
                    </p>

                    <button
                      type="button"
                      onClick={() => navigate("/find-jobs")}
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-95"
                    >
                      <BriefcaseBusiness className="h-4 w-4" />
                      Browse Jobs
                    </button>
                  </div>
                </div>
              ) : (
                /* Saved Jobs */
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2"
                      : "space-y-4"
                  }
                >
                  {savedJoblist.map((savedJob) => (
                    <div
                      key={savedJob._id}
                      className="group transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <JobCard
                        job={savedJob?.job}
                        onClick={() =>
                          navigate(
                            `/job/${savedJob?.job?._id}`
                          )
                        }
                        onToggleSave={() =>
                          handleUnsaveJob(savedJob?.job?._id)
                        }
                        saved
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedJobs;

