import {useState , useMemo , useEffect} from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import {Search , X , Plus , Edit , Trash2 , ChevronDown , ChevronUp , Users} from 'lucide-react';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import toast from 'react-hot-toast'

const ManageJobs = () => {

  const navigate = useNavigate();

  const [searchTerm , setSearchTerm] = useState("");
  const [statusFilter , setStatusFilter] = useState("All");
  const [currentPage , setCurrentPage] = useState(1);
  const [sortField , setSortField] = useState("title");
  const [sortDirection , setSortDirection] = useState("asc");
  const [isLoading , setIsLoading] = useState(false);

  const itemsPerPage = 8;

  // sample jobs data
  const [jobs , setJobs] = useState([]);

  //Filter and Sort jobs
  const filterAndSortJobs = useMemo(() => {
    let filtered = jobs.filter((job) => {
      const matchsSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||job.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchsSatus = statusFilter === "All" || job.status === statusFilter;

      return matchsSearch && matchsSatus
    });

    // Sort jobs 
    filtered.sort((a , b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if(sortField === "applicants") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if(sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      }else {
        return aValue < bValue ? 1 : -1
      }
    });

    return filtered;
  }, [jobs , searchTerm , sortDirection , sortField , statusFilter]);

  //pagination
  const totalPages = Math.ceil(filterAndSortJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = filterAndSortJobs.slice(
    startIndex ,
    startIndex + itemsPerPage
  );

  

  const handleSort = (field) => {
    if(sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleStatusChange = async (jobId) => {
    try {
      const response = await axiosInstance.put(API_PATHS.JOBS.TOGGLE_CLOSE(jobId));
      getPostedJobs(true)
    } catch (error) {
      console.error("Error toggling job status:", error)
    }
  };

  const handleDeleteJobs = async (jobId) => {
    try {
      await axiosInstance.delete(API_PATHS.JOBS.DELETE_JOB(jobId));
      setJobs(jobs.filter((job)=> job.id !== jobId));
      toast.success("Job listing delete successfully")
    } catch (error) {
      console.error("Error deleting job:", error)
    }
  };

  const SortIcon = ({field}) => {
    if(sortField !== field) return <ChevronUp className='w-4 h-4 text-gray-400'/>
    return sortDirection === "asc" ? (
      <ChevronUp className='w-4 h-4 text-blue-400'/>
    ) : (
      <ChevronDown className='w-4 h-4 text-blue-400'/>
    )
  };

  const LoadingRow = () => (
    <tr className='animate-spin'>
      <td className='px-6 py-4'>
        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-gray-100 rounded-full'></div>
          <div className='space-y-2'>
            <div className='h-4 w-32 rounded bg-gray-200'></div>
            <div className='h-3 w-24 rounded bg-gray-200'></div>
          </div>
        </div>
      </td>
      <td className='px-6 py-4'>
        <div className='h-4 w-16 rounded-full bg-gray-200'></div>
      </td>
       <td className='px-6 py-4'>
        <div className='h-4 w-12 rounded bg-gray-200'></div>
      </td>
       <td className='px-6 py-2'>
        <div className='flex space-x-2'>
          <div className='h-8 w-16 rounded bg-gray-200'></div>
          <div className='h-8 w-16 rounded bg-gray-200'></div>
          <div className='h-8 w-16 rounded bg-gray-200'></div>
        </div>
      </td>
    </tr>
  );

  const getPostedJobs = async (disableLoder) => {
    setIsLoading(!disableLoder);
    try {
      const response = await axiosInstance.get(API_PATHS.JOBS.GET_JOBS_EMPLOYER);

      if(response.status === 200 && response.data?.length > 0) {
        const formattedJobs = response.data?.map((job) => ({
          id: job._id,
          title : job?.title,
          company : job?.company?.name,
          status : job?.isClosed ? "Closed" : "Active",
          applicants : job?.applicationCount || 0,
          datePosted : moment(job?.createdAt).format("DD-MM-YYYY"),
          logo : job?.company?.companyLogo
        }));

        setJobs(formattedJobs)
      }
    } catch (error) {
      if(error.message) {
        console.error(error.response.data.message);
      }else {
        console.error("Error posting job , Please try again")
      }
    }finally {
      setIsLoading(false)
    }
  };

  

  

  useEffect (() => {
    getPostedJobs();
    return () => {}
  },[]);


  return (
  <DashboardLayout activeMenu="manage-jobs">
  <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">

      {/* ================= HEADER ================= */}
      <div className="mb-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-2 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              নিয়োগ ব্যবস্থাপনা
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              চাকরির ব্যবস্থাপনা
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              আপনার চাকরির পোস্ট এবং আবেদনকারীদের তথ্য পরিচালনা করুন
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/post-job")}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-500/20
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:from-blue-700
              hover:to-indigo-700
              hover:shadow-xl
            "
          >
            <Plus className="h-5 w-5" />
            নতুন চাকরি পোস্ট করুন
          </button>
        </div>
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* ================= FILTER HEADER ================= */}
        <div className="border-b border-slate-100 bg-white p-5 sm:p-6">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

            {/* Search */}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-4 w-4 text-slate-400" />
              </div>

              <input
                type="text"
                placeholder="চাকরি খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  block
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  text-slate-700
                  outline-none
                  transition-all
                  placeholder:text-slate-400
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              />
            </div>

            {/* Status Filter */}
            <div className="w-full lg:w-52">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="
                  block
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  outline-none
                  transition-all
                  focus:border-blue-500
                  focus:bg-white
                  focus:ring-4
                  focus:ring-blue-500/10
                "
              >
                <option value="All">সব স্ট্যাটাস</option>
                <option value="Active">সক্রিয়</option>
                <option value="Closed">বন্ধ</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                মোট{" "}
                <span className="font-semibold text-slate-800">
                  {filterAndSortJobs.length}
                </span>{" "}
                টি চাকরি পাওয়া গেছে
              </p>
            </div>

            <div className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 sm:block">
              দেখানো হচ্ছে {paginatedJobs.length} টি
            </div>
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div>
          {filterAndSortJobs.length === 0 && !isLoading ? (
            <div className="px-6 py-16 text-center">

              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100">
                <Search className="h-9 w-9 text-slate-400" />
              </div>

              <h3 className="text-lg font-semibold text-slate-800">
                কোনো চাকরি পাওয়া যায়নি
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                আপনার সার্চ বা ফিল্টারের শর্ত পরিবর্তন করে আবার চেষ্টা করুন।
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                }}
                className="mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                ফিল্টার পরিষ্কার করুন
              </button>
            </div>
          ) : (
            <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">

              <table className="min-w-full divide-y divide-slate-100">

                {/* ================= TABLE HEAD ================= */}
                <thead className="bg-slate-50">
                  <tr>

                    {/* Job Title */}
                    <th
                      className="
                        min-w-[220px]
                        cursor-pointer
                        px-6
                        py-4
                        text-left
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wider
                        text-slate-500
                        transition-colors
                        hover:bg-slate-100
                      "
                      onClick={() => handleSort("title")}
                    >
                      <div className="flex items-center gap-2">
                        <span>চাকরির নাম</span>
                        <SortIcon field="title" />
                      </div>
                    </th>

                    {/* Status */}
                    <th
                      className="
                        min-w-[130px]
                        cursor-pointer
                        px-6
                        py-4
                        text-left
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wider
                        text-slate-500
                        transition-colors
                        hover:bg-slate-100
                      "
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center gap-2">
                        <span>স্ট্যাটাস</span>
                        <SortIcon field="status" />
                      </div>
                    </th>

                    {/* Applicants */}
                    <th
                      className="
                        min-w-[140px]
                        cursor-pointer
                        px-6
                        py-4
                        text-left
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wider
                        text-slate-500
                        transition-colors
                        hover:bg-slate-100
                      "
                      onClick={() => handleSort("applicants")}
                    >
                      <div className="flex items-center gap-2">
                        <span>আবেদনকারী</span>
                        <SortIcon field="applicants" />
                      </div>
                    </th>

                    {/* Actions */}
                    <th className="min-w-[190px] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      অ্যাকশন
                    </th>
                  </tr>
                </thead>

                {/* ================= TABLE BODY ================= */}
                <tbody className="divide-y divide-slate-100 bg-white">

                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <LoadingRow key={index} />
                    ))
                  ) : (
                    paginatedJobs.map((job) => (
                      <tr
                        key={job.id}
                        className="group transition-colors duration-200 hover:bg-blue-50/30"
                      >

                        {/* ================= JOB TITLE ================= */}
                        <td className="px-6 py-5">
                          <div>
                            <h3 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                              {job.title}
                            </h3>

                            <p className="mt-1 text-xs font-medium text-slate-500">
                              {job.company}
                            </p>
                          </div>
                        </td>

                        {/* ================= STATUS ================= */}
                        <td className="px-6 py-5">
                          <span
                            className={`
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-full
                              border
                              px-3
                              py-1.5
                              text-xs
                              font-semibold
                              ${
                                job.status === "Active"
                                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                  : "border-slate-200 bg-slate-100 text-slate-600"
                              }
                            `}
                          >
                            <span
                              className={`
                                h-1.5
                                w-1.5
                                rounded-full
                                ${
                                  job.status === "Active"
                                    ? "bg-emerald-500"
                                    : "bg-slate-400"
                                }
                              `}
                            />

                            {job.status === "Active"
                              ? "সক্রিয়"
                              : "বন্ধ"}
                          </span>
                        </td>

                        {/* ================= APPLICANTS ================= */}
                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() =>
                              navigate("/applicants", {
                                state: {
                                  jobId: job.id,
                                },
                              })
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-lg
                              px-2
                              py-1.5
                              text-sm
                              font-semibold
                              text-blue-600
                              transition-colors
                              hover:bg-blue-50
                              hover:text-blue-700
                            "
                          >
                            <Users className="h-4 w-4" />
                            {job.applicants}
                            <span className="text-xs font-normal text-slate-400">
                              জন
                            </span>
                          </button>
                        </td>

                        {/* ================= ACTIONS ================= */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-1.5">

                            {/* Edit */}
                            <button
                              type="button"
                              title="সম্পাদনা করুন"
                              onClick={() =>
                                navigate("/post-job", {
                                  state: {
                                    jobId: job.id,
                                  },
                                })
                              }
                              className="
                                rounded-lg
                                p-2
                                text-blue-600
                                transition-colors
                                hover:bg-blue-50
                                hover:text-blue-700
                              "
                            >
                              <Edit className="h-4 w-4" />
                            </button>

                            {/* Active / Close */}
                            {job.status === "Active" ? (
                              <button
                                type="button"
                                title="চাকরি বন্ধ করুন"
                                onClick={() =>
                                  handleStatusChange(job.id)
                                }
                                className="
                                  inline-flex
                                  items-center
                                  gap-1.5
                                  rounded-lg
                                  p-2
                                  text-orange-600
                                  transition-colors
                                  hover:bg-orange-50
                                  hover:text-orange-700
                                "
                              >
                                <X className="h-4 w-4" />

                                <span className="hidden text-xs font-semibold sm:inline">
                                  বন্ধ করুন
                                </span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                title="চাকরি সক্রিয় করুন"
                                onClick={() =>
                                  handleStatusChange(job.id)
                                }
                                className="
                                  inline-flex
                                  items-center
                                  gap-1.5
                                  rounded-lg
                                  p-2
                                  text-emerald-600
                                  transition-colors
                                  hover:bg-emerald-50
                                  hover:text-emerald-700
                                "
                              >
                                <Plus className="h-4 w-4" />

                                <span className="hidden text-xs font-semibold sm:inline">
                                  সক্রিয় করুন
                                </span>
                              </button>
                            )}

                            {/* Delete */}
                            <button
                              type="button"
                              title="ডিলিট করুন"
                              onClick={() =>
                                handleDeleteJobs(job.id)
                              }
                              className="
                                rounded-lg
                                p-2
                                text-red-600
                                transition-colors
                                hover:bg-red-50
                                hover:text-red-700
                              "
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="border-t border-slate-100 bg-white px-5 py-5 sm:px-6">

            {/* Mobile Pagination */}
            <div className="flex items-center justify-between sm:hidden">

              <button
                type="button"
                onClick={() =>
                  setCurrentPage(
                    Math.max(1, currentPage - 1)
                  )
                }
                disabled={currentPage === 1}
                className="
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-slate-600
                  transition-colors
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                পূর্ববর্তী
              </button>

              <span className="text-sm font-medium text-slate-500">
                {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      totalPages,
                      currentPage + 1
                    )
                  )
                }
                disabled={currentPage === totalPages}
                className="
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-slate-600
                  transition-colors
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                পরবর্তী
              </button>
            </div>

            {/* Desktop Pagination */}
            <div className="hidden sm:flex sm:items-center sm:justify-between">

              <p className="text-sm text-slate-500">
                দেখানো হচ্ছে{" "}
                <span className="font-semibold text-slate-700">
                  {startIndex + 1}
                </span>{" "}
                থেকে{" "}
                <span className="font-semibold text-slate-700">
                  {Math.min(
                    startIndex + itemsPerPage,
                    filterAndSortJobs.length
                  )}
                </span>{" "}
                এর মধ্যে মোট{" "}
                <span className="font-semibold text-slate-700">
                  {filterAndSortJobs.length}
                </span>{" "}
                টি
              </p>

              <nav className="inline-flex items-center gap-1">

                {/* Previous */}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage(
                      Math.max(1, currentPage - 1)
                    )
                  }
                  disabled={currentPage === 1}
                  className="
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-slate-500
                    transition-colors
                    hover:bg-slate-50
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  পূর্ববর্তী
                </button>

                {/* Pages */}
                {Array.from(
                  { length: totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    type="button"
                    key={page}
                    onClick={() =>
                      setCurrentPage(page)
                    }
                    className={`
                      min-w-[38px]
                      rounded-lg
                      border
                      px-3
                      py-2
                      text-sm
                      font-medium
                      transition-all
                      ${
                        currentPage === page
                          ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                          : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      }
                    `}
                  >
                    {page}
                  </button>
                ))}

                {/* Next */}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage(
                      Math.min(
                        totalPages,
                        currentPage + 1
                      )
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-slate-500
                    transition-colors
                    hover:bg-slate-50
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  পরবর্তী
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
  </DashboardLayout>
  )
}

export default ManageJobs