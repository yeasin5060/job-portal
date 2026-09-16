import React from 'react'
import {Search , MapPin} from 'lucide-react'

const SearchHeader = ({filters ,handleFilterChange}) => {
  return (
    <div className="relative overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-800 p-5 sm:p-7 lg:p-9 mb-6 lg:mb-8 transition-all">
      {/* Subtle Background Glow/Gradient Accent */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-5 lg:gap-6">
        {/* Title & Subtitle */}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Dream Job</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-1.5 font-normal">
            Discover opportunities that match your passion and skillset
          </p>
        </div>

        {/* Search & Filter Inputs Bar */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-3.5">
          {/* Keyword Search */}
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
            <input
              type="text"
              placeholder="Job title, company or keywords..."
              value={filters?.keyword || ''}
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-sm sm:text-base rounded-xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
            />
          </div>

          {/* Location Input */}
          <div className="relative min-w-0 lg:min-w-[240px] group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
            <input
              type="text"
              placeholder="Location or remote..."
              value={filters?.location || ''}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-sm sm:text-base rounded-xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"
            />
          </div>

          {/* Search Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] text-white px-7 py-3 rounded-xl font-semibold text-sm shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 shrink-0 cursor-pointer"
          >
            <Search className="h-4 w-4" />
            <span>Search Jobs</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchHeader