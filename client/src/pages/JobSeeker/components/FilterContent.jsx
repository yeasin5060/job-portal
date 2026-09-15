
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CATEGORIES, JOB_TYPES } from "../../../utils/data";
import SalaryRangeSlider from "../../../components/SalaryRangeSlider";

const FilterSection = ({
  title,
  children,
  isExpended,
  onToggle,
}) => {
  return (
    <div className="border-b border-slate-100 dark:border-slate-800 last:border-b-0 py-3.5">
      <button
        type="button"
        className="w-full flex items-center justify-between text-left py-1.5 px-2 rounded-xl text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-semibold text-sm transition-all duration-200 group cursor-pointer"
        onClick={onToggle}
      >
        <span className="tracking-tight">{title}</span>

        <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40 flex items-center justify-center text-slate-500 group-hover:text-blue-600 transition-colors">
          {isExpended ? (
            <ChevronUp className="w-4 h-4 transition-transform" />
          ) : (
            <ChevronDown className="w-4 h-4 transition-transform" />
          )}
        </div>
      </button>

      {isExpended && (
        <div className="pt-3 pb-1 px-2 animate-fadeIn transition-all">
          {children}
        </div>
      )}
    </div>
  );
};

const FilterContent = ({
  toggleSection,
  clearAllFilters,
  expandedSections,
  filters,
  handleFilterChange,
}) => {

  console.log(filters);
  
  return (
    <>
      {/* Clear All */}
      <div className="flex justify-between items-center mb-6">
        <button
          type="button"
          onClick={clearAllFilters}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Job Type */}
      <FilterSection
        title="Job Type"
        isExpended={expandedSections?.jobType}
        onToggle={() => toggleSection("jobType")}
      >
        <div className="space-y-2">
          {JOB_TYPES.map((type) => (
            <label
              key={type.value}
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id={type.value}
                value={type.value}
                checked={filters.type === type.value}
                onChange={(e) =>
                  handleFilterChange(
                    "type",
                    e.target.checked ? type.value : ""
                  )
                }
                className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
              />

              <span className="ml-2 text-sm font-medium text-slate-900 dark:text-slate-300">
                {type.value}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Salary Range */}
      <FilterSection
        title="Salary Range"
        isExpended={expandedSections?.salary}
        onToggle={() => toggleSection("salary")}
      >
        <SalaryRangeSlider
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      </FilterSection>

      {/* Category */}
      <FilterSection
        title="Category"
        isExpended={expandedSections?.category}
        onToggle={() => toggleSection("category")}
      >
        <div className="space-y-2">
          {CATEGORIES.map((type) => (
            <label
              key={type.value}
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id={type.value}
                value={type.value}
                checked={filters.category === type.value}
                onChange={(e) =>
                  handleFilterChange(
                    "category",
                    e.target.checked ? type.value : ""
                  )
                }
                className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
              />

              <span className="ml-2 text-sm font-medium text-slate-900 dark:text-slate-300">
                {type.value}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
    </>
  );
};

export default FilterContent;

