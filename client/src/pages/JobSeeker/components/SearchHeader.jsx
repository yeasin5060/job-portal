import { Search, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const POPULAR_SEARCHES = [
  "Frontend",
  "Backend",
  "React",
  "UI/UX Design",
  "Remote",
  "Full-Time",
];

const SearchHeader = ({
  filters,
  handleFilterChange,
  onSearch,
}) => {
  const handleSearch = () => {
    if (onSearch) {
      onSearch();
    }
  };

  const handleChipClick = (term) => {
    handleFilterChange("keyword", term);
    if (onSearch) {
      setTimeout(() => onSearch(), 50);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative overflow-hidden bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-lg shadow-slate-200/40 p-6 sm:p-8 lg:p-9 mb-6 lg:mb-8"
    >
      {/* Decorative colorful glow orbs */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-blue-400/20 via-indigo-400/15 to-purple-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-pink-400/15 via-purple-400/15 to-blue-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Title area with colorful pill */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/70 text-blue-700 text-xs font-bold mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>স্মার্ট ক্যারিয়ার সার্চ</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              আপনার{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                স্বপ্নের চাকরি
              </span>{" "}
              খুঁজুন
            </h1>

            <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium max-w-2xl">
              সেরা কোম্পানিগুলোর হাজারো চাকরির সুযোগ থেকে আপনার পছন্দের চাকরি খুঁজে আবেদন করুন
            </p>
          </div>
        </div>

        {/* Search Inputs Bar */}
        <div className="flex flex-col lg:flex-row gap-3 p-2 bg-slate-50/90 border border-slate-200/90 rounded-2xl shadow-inner">
          {/* Keyword Search */}
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-600 transition-colors pointer-events-none" />

            <input
              type="text"
              placeholder="চাকরির পদ, কোম্পানি বা কীওয়ার্ড..."
              value={filters?.keyword || ""}
              onChange={(e) =>
                handleFilterChange("keyword", e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="w-full pl-11 pr-4 py-3.5 text-sm sm:text-base rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-xs"
            />
          </div>

          {/* Location */}
          <div className="relative min-w-0 lg:min-w-[260px] group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-rose-500 transition-colors pointer-events-none" />

            <input
              type="text"
              placeholder="লোকেশন (ঢাকা, চট্টগ্রাম, রিমোট)..."
              value={filters?.location || ""}
              onChange={(e) =>
                handleFilterChange("location", e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="w-full pl-11 pr-4 py-3.5 text-sm sm:text-base rounded-xl bg-white border border-slate-200 text-slate-900 font-semibold placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-xs"
            />
          </div>

          {/* Search Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-200 shrink-0 cursor-pointer"
          >
            <Search className="h-4 w-4 stroke-[2.5]" />
            <span>খুঁজুন</span>
          </motion.button>
        </div>

        {/* Popular Tags / Quick Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mr-1">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
            <span>জনপ্রিয় সার্চ:</span>
          </div>

          {POPULAR_SEARCHES.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleChipClick(chip)}
              className="px-3 py-1 rounded-lg text-xs font-semibold bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border border-slate-200 hover:border-blue-300 text-slate-800 hover:text-blue-700 shadow-xs transition-all duration-150 cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchHeader;