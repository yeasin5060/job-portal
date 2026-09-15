
import React, { useEffect, useState } from "react";
import { Banknote, ArrowRight } from "lucide-react";

const SalaryRangeSlider = ({ filters, handleFilterChange }) => {
  const [minSalary, setMinSalary] = useState(filters?.minSalary || "");
  const [maxSalary, setMaxSalary] = useState(filters?.maxSalary || "");

  // Keep local state synced with parent filters
  useEffect(() => {
    setMinSalary(filters?.minSalary || "");
    setMaxSalary(filters?.maxSalary || "");
  }, [filters?.minSalary, filters?.maxSalary]);

  const formatSalary = (value) => {
    if (!value) return "0";
    return Number(value).toLocaleString("en-BD");
  };

  const handleMinSalaryChange = (e) => {
    const value = e.target.value;
    setMinSalary(value);
  };

  const handleMaxSalaryChange = (e) => {
    const value = e.target.value;
    setMaxSalary(value);
  };

  const handleMinSalaryBlur = () => {
    handleFilterChange(
      "minSalary",
      minSalary ? parseInt(minSalary, 10) : ""
    );
  };

  const handleMaxSalaryBlur = () => {
    handleFilterChange(
      "maxSalary",
      maxSalary ? parseInt(maxSalary, 10) : ""
    );
  };

  const hasSalaryFilter = minSalary || maxSalary;

  return (
    <div className="space-y-4">
      {/* Input Fields */}
      <div className="grid grid-cols-2 gap-3">
        {/* Minimum Salary */}
        <div>
          <label className="block mb-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            Minimum
          </label>

          <div className="relative">
            <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

            <input
              type="number"
              min="0"
              step="1000"
              placeholder="0"
              value={minSalary}
              onChange={handleMinSalaryChange}
              onBlur={handleMinSalaryBlur}
              className="w-full h-11 pl-9 pr-3 rounded-xl border border-slate-200 
              bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400
              outline-none transition-all
              focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10
              dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200
              dark:placeholder:text-slate-500 dark:focus:border-blue-500
              dark:focus:bg-slate-900"
            />
          </div>
        </div>

        {/* Maximum Salary */}
        <div>
          <label className="block mb-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            Maximum
          </label>

          <div className="relative">
            <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

            <input
              type="number"
              min="0"
              step="1000"
              placeholder="No limit"
              value={maxSalary}
              onChange={handleMaxSalaryChange}
              onBlur={handleMaxSalaryBlur}
              className="w-full h-11 pl-9 pr-3 rounded-xl border border-slate-200 
              bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400
              outline-none transition-all
              focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10
              dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200
              dark:placeholder:text-slate-500 dark:focus:border-blue-500
              dark:focus:bg-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Salary Range Preview */}
      {hasSalaryFilter && (
        <div className="relative overflow-hidden rounded-xl border border-blue-100 bg-blue-50/70 px-3.5 py-3 dark:border-blue-900/40 dark:bg-blue-950/20">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-blue-500 dark:text-blue-400">
                Salary Range
              </p>

              <p className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-200">
                ৳ {formatSalary(minSalary)}
              </p>
            </div>

            <ArrowRight className="w-4 h-4 shrink-0 text-blue-500" />

            <div className="text-right">
              <p className="text-[11px] font-medium uppercase tracking-wide text-blue-500 dark:text-blue-400">
                Maximum
              </p>

              <p className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-200">
                {maxSalary ? `৳ ${formatSalary(maxSalary)}` : "No Limit"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Helper Text */}
      <p className="text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
        Enter your preferred minimum and maximum monthly salary.
      </p>
    </div>
  );
};

export default SalaryRangeSlider;

