import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, JOB_TYPES } from "../../../utils/data";
import SalaryRangeSlider from "../../../components/SalaryRangeSlider";

const FilterSection = ({
  title,
  children,
  isExpended,
  onToggle,
  activeCount = 0,
}) => {
  return (
    <div className="border-b border-slate-100 last:border-b-0 py-3.5">
      <button
        type="button"
        className="w-full flex items-center justify-between text-left py-2 px-2.5 rounded-xl text-slate-900 hover:text-blue-600 hover:bg-slate-50 font-bold text-sm transition-all duration-200 group cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <span className="tracking-tight text-slate-900 group-hover:text-blue-600">
            {title}
          </span>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
              {activeCount}
            </span>
          )}
        </div>

        <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center text-slate-700 group-hover:text-blue-600 transition-colors">
          {isExpended ? (
            <ChevronUp className="w-4 h-4 transition-transform" />
          ) : (
            <ChevronDown className="w-4 h-4 transition-transform" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpended && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-3 pb-1 px-2.5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
  const activeCountJobType = filters?.type ? 1 : 0;
  const activeCountCategory = filters?.category ? 1 : 0;
  const activeCountSalary = filters?.minSalary || filters?.maxSalary ? 1 : 0;

  return (
    <div className="bg-white">
      {/* Clear All / Header summary */}
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Selected Filters
        </span>
        <button
          type="button"
          onClick={clearAllFilters}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer hover:underline px-2 py-1 rounded-md hover:bg-blue-50"
        >
          Clear All
        </button>
      </div>

      {/* Job Type */}
      <FilterSection
        title="Job Type"
        isExpended={expandedSections?.jobType}
        onToggle={() => toggleSection("jobType")}
        activeCount={activeCountJobType}
      >
        <div className="space-y-2">
          {JOB_TYPES.map((type) => {
            const isChecked = filters.type === type.value;
            return (
              <label
                key={type.value}
                className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-150 border ${
                  isChecked
                    ? "bg-blue-50/70 border-blue-200 text-blue-900"
                    : "bg-white border-transparent hover:bg-slate-50 text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      id={type.value}
                      value={type.value}
                      checked={isChecked}
                      onChange={(e) =>
                        handleFilterChange(
                          "type",
                          e.target.checked ? type.value : ""
                        )
                      }
                      onClick={(e) => e.stopPropagation()}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                        isChecked
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-slate-300 bg-white hover:border-blue-500"
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <span className="text-sm font-semibold text-slate-900">
                    {type.value}
                  </span>
                </div>

                {isChecked && (
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100/70 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </FilterSection>

      {/* Salary Range */}
      <FilterSection
        title="Salary Range"
        isExpended={expandedSections?.salary}
        onToggle={() => toggleSection("salary")}
        activeCount={activeCountSalary}
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
        activeCount={activeCountCategory}
      >
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {CATEGORIES.map((type) => {
            const isChecked = filters.category === type.value;
            return (
              <label
                key={type.value}
                className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-150 border ${
                  isChecked
                    ? "bg-indigo-50/70 border-indigo-200 text-indigo-950"
                    : "bg-white border-transparent hover:bg-slate-50 text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      id={type.value}
                      value={type.value}
                      checked={isChecked}
                      onChange={(e) =>
                        handleFilterChange(
                          "category",
                          e.target.checked ? type.value : ""
                        )
                      }
                      onClick={(e) => e.stopPropagation()}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                        isChecked
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "border-slate-300 bg-white hover:border-indigo-500"
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <span className="text-sm font-semibold text-slate-900">
                    {type.value}
                  </span>
                </div>

                {isChecked && (
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100/70 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </FilterSection>
    </div>
  );
};

export default FilterContent;
