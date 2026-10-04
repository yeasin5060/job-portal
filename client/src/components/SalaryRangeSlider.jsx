import { useEffect, useState } from "react";
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

  const hasSalaryFilter = Boolean(minSalary || maxSalary);

  return (
    <div className="space-y-4 pt-1">
      {/* Input Fields */}
      <div className="grid grid-cols-2 gap-3">
        {/* Minimum Salary */}
        <div>
          <label className="block mb-1.5 text-xs font-bold text-slate-900">
            Minimum (৳)
          </label>

          <div className="relative">
            <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />

            <input
              type="number"
              min="0"
              step="1000"
              placeholder="0"
              value={minSalary}
              onChange={handleMinSalaryChange}
              onBlur={handleMinSalaryBlur}
              className="w-full h-11 pl-9 pr-3 rounded-xl border border-slate-200 
              bg-white text-sm font-semibold text-slate-900 placeholder:text-slate-400
              outline-none transition-all
              focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-500/20 shadow-xs"
            />
          </div>
        </div>

        {/* Maximum Salary */}
        <div>
          <label className="block mb-1.5 text-xs font-bold text-slate-900">
            Maximum (৳)
          </label>

          <div className="relative">
            <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />

            <input
              type="number"
              min="0"
              step="1000"
              placeholder="No limit"
              value={maxSalary}
              onChange={handleMaxSalaryChange}
              onBlur={handleMaxSalaryBlur}
              className="w-full h-11 pl-9 pr-3 rounded-xl border border-slate-200 
              bg-white text-sm font-semibold text-slate-900 placeholder:text-slate-400
              outline-none transition-all
              focus:border-blue-600 focus:bg-white focus:ring-3 focus:ring-blue-500/20 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Salary Range Preview */}
      {hasSalaryFilter && (
        <div className="relative overflow-hidden rounded-xl border border-blue-200/90 bg-gradient-to-r from-blue-50/90 to-indigo-50/90 px-3.5 py-3 shadow-xs">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                Min Salary
              </p>

              <p className="mt-1 text-sm font-extrabold text-slate-900">
                ৳ {formatSalary(minSalary)}
              </p>
            </div>

            <div className="w-7 h-7 rounded-full bg-white shadow-xs flex items-center justify-center shrink-0 border border-blue-100">
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
            </div>

            <div className="text-right">
              <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                Max Salary
              </p>

              <p className="mt-1 text-sm font-extrabold text-slate-900">
                {maxSalary ? `৳ ${formatSalary(maxSalary)}` : "No Limit"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Helper Text */}
      <p className="text-[11px] font-medium leading-relaxed text-slate-600">
        Enter your preferred monthly salary range in BDT (৳).
      </p>
    </div>
  );
};

export default SalaryRangeSlider;
